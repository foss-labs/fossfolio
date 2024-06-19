import { cn } from "@app/ui/lib/utils";
import { MenuBar } from "./MenuBar";
import { defaultContent } from "./constants";
import { extensions } from "./extentions";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { forwardRef } from "react";

interface Props {
  defaultValue?: string;
  className?: string;
  contentClassName?: string;
  onChange?: (e: React.FormEvent<HTMLDivElement>) => void;
}

export const Editor: React.FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ defaultValue, className, contentClassName, onChange }, ref) => {
    const editor = useEditor({
      extensions: extensions,
      content: defaultValue || defaultContent,
    });

    return (
      <section
        ref={ref}
        className={cn("border-2 border-gray-700 rounded-sm", className)}
      >
        <MenuBar editor={editor} />
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
