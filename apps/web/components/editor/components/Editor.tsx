import { cn } from "@app/ui/lib/utils";
import { MenuBar } from "./MenuBar";
import { defaultContent } from "./constants";
import { extensions } from "./extentions";
import { EditorContent, JSONContent, EditorOptions, useEditor } from "@tiptap/react";
import React, { forwardRef } from "react";

interface Props {
  defaultValue?: string | JSONContent;
  className?: string;
  contentClassName?: string;
  onChange?: (e: React.FormEvent<HTMLDivElement>) => void;
  editorProps?: EditorOptions["editorProps"];
  editable?: EditorOptions["editable"];
}

export const Editor: React.FC<Props> = forwardRef<HTMLDivElement, Props>(
  (
    { defaultValue, className, contentClassName, onChange, editorProps, editable },
    ref
  ) => {
    const editor = useEditor({
      extensions,
      content: defaultValue || defaultContent,
      editorProps,
      editable,
    });

    return (
      <section
        ref={ref}
        className={cn("border-2 border-gray-700 rounded-sm", className)}
      >
        {editor?.isEditable && <MenuBar editor={editor} />}
        <EditorContent
          editor={editor}
          className={cn("p-3", contentClassName)}
          ref={ref}
          onChange={onChange}
        />
      </section>
    );
  }
);

Editor.displayName = "Editor";
