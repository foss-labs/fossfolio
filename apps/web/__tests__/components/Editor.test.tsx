import { Editor } from "@app/components/editor";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Editor", () => {
  it("hides formatting controls when editing is disabled", () => {
    render(
      <Editor
        defaultValue={{
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Read only content" }],
            },
          ],
        }}
        editorProps={{
          editable: () => false,
        }}
      />
    );

    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(screen.getByText("Read only content")).toBeTruthy();
  });
});
