import { cn } from "@app/ui/lib/utils";
import { MenuBar } from "./MenuBar";
import { extensions } from "./extentions";
import { EditorValue, parseContent } from "./content";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import React, { forwardRef, useEffect } from "react";

interface Props {
  value?: EditorValue;
  defaultValue?: EditorValue;
  className?: string;
  contentClassName?: string;
  onChange?: (content: JSONContent) => void;
  editable?: boolean;
  storageKey?: string;
}

export const Editor = forwardRef<HTMLDivElement, Props>(
  (
    {
      value,
      defaultValue,
      className,
      contentClassName,
      onChange,
      editable = true,
      storageKey,
    },
    ref,
  ) => {
    const editor = useEditor({
      extensions,
      immediatelyRender: false,
      content: parseContent(value !== undefined ? value : defaultValue),
      editable,
      editorProps: {
        attributes: { "aria-label": "Rich text editor" },
      },
      onUpdate: ({ editor }) => {
        const content = editor.getJSON();
        onChange?.(content);
        if (editable && storageKey) {
          try {
            localStorage.setItem(storageKey, JSON.stringify(content));
          } catch {
            // Storage can be unavailable or full; editing must still work.
          }
        }
      },
    });

    useEffect(() => {
      if (!editor || value === undefined) return;
      const content = parseContent(value);
      if (JSON.stringify(content) !== JSON.stringify(editor.getJSON())) {
        editor.commands.setContent(content, false);
      }
    }, [editor, value]);

    useEffect(() => {
      editor?.setEditable(editable, false);
    }, [editor, editable]);

    useEffect(() => {
      if (!editor || !editable || !storageKey || value !== undefined) return;
      try {
        const draft = localStorage.getItem(storageKey);
        editor.commands.setContent(parseContent(draft ?? defaultValue), false);
      } catch {
        // Do not make local storage a requirement for the editor.
      }
    }, [editor, editable, storageKey, defaultValue, value]);

    return (
      <section
        ref={ref}
        className={cn(
          "rich-text-editor min-w-0 rounded-md bg-background text-foreground",
          editable && "border focus-within:ring-2 focus-within:ring-ring",
          className,
        )}
        data-editable={editable}
      >
        {editable && <MenuBar editor={editor} />}
        <EditorContent
          editor={editor}
          className={cn("p-4", contentClassName)}
        />
      </section>
    );
  },
);

Editor.displayName = "Editor";
