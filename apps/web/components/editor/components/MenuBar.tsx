import { Editor } from "@tiptap/react";
import React, { useState } from "react";
import { cn } from "@app/ui/lib/utils";
import {
  LuBold,
  LuItalic,
  LuUnderline,
  LuStrikethrough,
  LuCode,
  LuList,
  LuListOrdered,
  LuListChecks,
  LuQuote,
  LuCode2,
  LuMinus,
  LuUndo,
  LuRedo,
  LuLink,
  LuUnlink,
  LuImage,
  LuHighlighter,
  LuRemoveFormatting,
} from "react-icons/lu";
import { isSafeUrl } from "./content";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [panel, setPanel] = useState<"link" | "image" | null>(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  if (!editor) return null;

  const actions = [
    {
      label: "Bold",
      icon: LuBold,
      active: editor.isActive("bold"),
      run: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      icon: LuItalic,
      active: editor.isActive("italic"),
      run: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "Underline",
      icon: LuUnderline,
      active: editor.isActive("underline"),
      run: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      label: "Strikethrough",
      icon: LuStrikethrough,
      active: editor.isActive("strike"),
      run: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      label: "Inline code",
      icon: LuCode,
      active: editor.isActive("code"),
      run: () => editor.chain().focus().toggleCode().run(),
    },
    {
      label: "Highlight",
      icon: LuHighlighter,
      active: editor.isActive("highlight"),
      run: () => editor.chain().focus().toggleHighlight().run(),
    },
    {
      label: "Bullet list",
      icon: LuList,
      active: editor.isActive("bulletList"),
      run: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Numbered list",
      icon: LuListOrdered,
      active: editor.isActive("orderedList"),
      run: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Checklist",
      icon: LuListChecks,
      active: editor.isActive("taskList"),
      run: () => editor.chain().focus().toggleTaskList().run(),
    },
    {
      label: "Quote",
      icon: LuQuote,
      active: editor.isActive("blockquote"),
      run: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      label: "Code block",
      icon: LuCode2,
      active: editor.isActive("codeBlock"),
      run: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      label: "Divider",
      icon: LuMinus,
      run: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      label: "Link",
      icon: LuLink,
      active: editor.isActive("link"),
      run: () => {
        setPanel("link");
        setUrl(editor.getAttributes("link").href || "");
        setError("");
      },
    },
    {
      label: "Remove link",
      icon: LuUnlink,
      disabled: !editor.isActive("link"),
      run: () =>
        editor.chain().focus().extendMarkRange("link").unsetLink().run(),
    },
    {
      label: "Image",
      icon: LuImage,
      run: () => {
        setPanel("image");
        setUrl("");
        setError("");
      },
    },
    {
      label: "Clear formatting",
      icon: LuRemoveFormatting,
      run: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      label: "Undo",
      icon: LuUndo,
      disabled: !editor.can().undo(),
      run: () => editor.chain().focus().undo().run(),
    },
    {
      label: "Redo",
      icon: LuRedo,
      disabled: !editor.can().redo(),
      run: () => editor.chain().focus().redo().run(),
    },
  ];

  const applyUrl = () => {
    const href = url.trim();
    if (!isSafeUrl(href, panel === "image")) {
      setError(
        panel === "image"
          ? "Enter an http or https image URL."
          : "Enter an http, https, mailto or tel URL.",
      );
      return;
    }
    if (panel === "image") editor.chain().focus().setImage({ src: href }).run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setPanel(null);
  };

  return (
    <div className="border-b bg-muted/30 rounded-t-md">
      <div
        role="group"
        aria-label="Text formatting"
        className="flex flex-wrap items-center gap-1 p-2"
      >
        <select
          aria-label="Text style"
          className="h-8 rounded border bg-background px-2 text-sm focus-visible:ring-2 focus-visible:ring-ring"
          value={
            editor.isActive("heading")
              ? String(editor.getAttributes("heading").level)
              : "paragraph"
          }
          onChange={(event) => {
            const level = Number(event.target.value) as 1 | 2 | 3 | 4 | 5 | 6;
            if (event.target.value === "paragraph")
              editor.chain().focus().setParagraph().run();
            else editor.chain().focus().setHeading({ level }).run();
          }}
        >
          <option value="paragraph">Paragraph</option>
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <option key={level} value={level}>
              Heading {level}
            </option>
          ))}
        </select>
        {actions.map(({ label, icon: Icon, active, disabled, run }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={run}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded text-base hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed",
              active &&
                "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            <Icon aria-hidden="true" />
          </button>
        ))}
      </div>
      {panel && (
        <div
          className="flex flex-wrap items-center gap-2 border-t p-2"
          role="group"
          aria-label={panel === "image" ? "Insert image" : "Edit link"}
        >
          <input
            aria-label={panel === "image" ? "Image URL" : "Link URL"}
            type="url"
            autoFocus
            value={url}
            placeholder="https://example.com"
            className="min-w-0 flex-1 rounded border bg-background p-2 text-sm"
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                applyUrl();
              }
              if (event.key === "Escape") {
                event.preventDefault();
                setPanel(null);
                editor.commands.focus();
              }
            }}
          />
          <button
            type="button"
            className="rounded bg-primary px-3 py-2 text-sm text-primary-foreground"
            onClick={applyUrl}
          >
            Apply
          </button>
          <button
            type="button"
            className="rounded border px-3 py-2 text-sm"
            onClick={() => {
              setPanel(null);
              editor.commands.focus();
            }}
          >
            Cancel
          </button>
          {error && (
            <p role="alert" className="w-full text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
