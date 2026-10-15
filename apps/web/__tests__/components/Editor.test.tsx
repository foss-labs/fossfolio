import React from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Editor as TiptapEditor } from "@tiptap/react";
import { Editor } from "@app/components/editor";
import { extensions } from "@app/components/editor/components/extentions";
import {
  emptyContent,
  isSafeUrl,
  parseContent,
} from "@app/components/editor/components/content";

const document = (text: string) => ({
  type: "doc",
  content: [{ type: "paragraph", content: [{ type: "text", text }] }],
});

beforeAll(() => {
  window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0);
  window.cancelAnimationFrame = window.clearTimeout;
  window.scrollTo = vi.fn(() => {});
  Range.prototype.getClientRects = () => [] as unknown as DOMRectList;
  Range.prototype.getBoundingClientRect = () => new DOMRect();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("Rich text content", () => {
  it("accepts saved Novel JSON, HTML, plain text and empty content", () => {
    expect(parseContent(JSON.stringify(document("Saved")))).toEqual(
      document("Saved"),
    );
    expect(parseContent("<h2>Saved HTML</h2>")).toBe("<h2>Saved HTML</h2>");
    expect(parseContent("Plain text")).toEqual(document("Plain text"));
    expect(parseContent(null)).toEqual(emptyContent);
    expect(parseContent('{"type":')).toEqual(emptyContent);
    expect(parseContent("null")).toEqual(emptyContent);
  });

  it("round-trips legacy rich text nodes and marks", () => {
    const editor = new TiptapEditor({ extensions, content: emptyContent });
    editor.commands.setContent(
      '<h2>Heading</h2><ul><li>List</li></ul><ul data-type="taskList"><li data-type="taskItem" data-checked="true">Done</li></ul><p><a href="https://example.com"><u>Link</u></a><mark data-color="#ff0" style="background-color: #ff0">Highlight</mark><span style="color: red">Color</span></p><pre><code>code</code></pre><img src="https://example.com/image.png">',
    );
    const saved = editor.getJSON();
    editor.commands.setContent(JSON.parse(JSON.stringify(saved)));
    expect(editor.getJSON()).toEqual(saved);
    const types = saved.content?.map((node) => node.type);
    expect(types).toEqual([
      "heading",
      "bulletList",
      "taskList",
      "paragraph",
      "codeBlock",
      "image",
    ]);
    expect(editor.getHTML()).toContain("<u>Link</u>");
    expect(editor.getHTML()).toContain('data-checked="true"');
    editor.destroy();
  });

  it("rejects executable link and image URL protocols", () => {
    expect(isSafeUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeUrl("data:text/html,test")).toBe(false);
    expect(isSafeUrl("https://example.com")).toBe(true);
    expect(isSafeUrl("mailto:hello@example.com")).toBe(true);
    expect(isSafeUrl("mailto:hello@example.com", true)).toBe(false);
    const editor = new TiptapEditor({
      extensions,
      content: '<p><a href="javascript:alert(1)">Unsafe</a></p>',
    });
    expect(editor.getHTML()).not.toContain("javascript:");
    editor.destroy();
  });
});

describe("Shared editor", () => {
  it("emits JSON on formatting changes, and supports undo/redo", async () => {
    const onChange = vi.fn();
    render(<Editor defaultValue={document("Format me")} onChange={onChange} />);
    const select = await screen.findByLabelText("Text style");
    fireEvent.change(select, { target: { value: "2" } });
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    expect(onChange.mock.lastCall?.[0].content[0].type).toBe("heading");
    expect(screen.getByText("Format me").tagName).toBe("H2");
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(screen.getByText("Format me").tagName).toBe("P");
    fireEvent.click(screen.getByRole("button", { name: "Redo" }));
    expect(screen.getByText("Format me").tagName).toBe("H2");
  });

  it("loads updated values without emitting changes or writing public content to storage", async () => {
    const onChange = vi.fn();
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    const { rerender } = render(
      <Editor
        value={null}
        editable={false}
        onChange={onChange}
        storageKey="public"
      />,
    );
    rerender(
      <Editor
        value={JSON.stringify(document("Loaded later"))}
        editable={false}
        onChange={onChange}
        storageKey="public"
      />,
    );
    await screen.findByText("Loaded later");
    expect(screen.queryByLabelText("Text formatting")).toBeNull();
    expect(
      screen.getByLabelText("Rich text editor").getAttribute("contenteditable"),
    ).toBe("false");
    expect(onChange).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });

  it("restores and persists only an explicitly scoped draft", async () => {
    localStorage.setItem("task:one", JSON.stringify(document("My draft")));
    localStorage.setItem("unrelated", "keep me");
    render(<Editor storageKey="task:one" />);
    await screen.findByText("My draft");
    fireEvent.change(screen.getByLabelText("Text style"), {
      target: { value: "3" },
    });
    await waitFor(() =>
      expect(
        JSON.parse(localStorage.getItem("task:one")!).content[0].type,
      ).toBe("heading"),
    );
    expect(localStorage.getItem("unrelated")).toBe("keep me");
  });

  it("still permits editing when browser storage is blocked", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const onChange = vi.fn();
    render(
      <Editor
        storageKey="blocked"
        onChange={onChange}
        defaultValue={document("Still editable")}
      />,
    );
    fireEvent.change(await screen.findByLabelText("Text style"), {
      target: { value: "1" },
    });
    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });

  it("shows URL validation without submitting an enclosing form", async () => {
    const submit = vi.fn();
    render(
      <form onSubmit={submit}>
        <Editor defaultValue={document("Link text")} />
      </form>,
    );
    fireEvent.click(await screen.findByRole("button", { name: "Link" }));
    fireEvent.change(screen.getByLabelText("Link URL"), {
      target: { value: "javascript:alert(1)" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(screen.getByRole("alert").textContent).toContain("Enter an http");
    expect(submit).not.toHaveBeenCalled();
  });
});
