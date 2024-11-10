import { cn } from "@app/ui/lib/utils";
import { MenuBar } from "./MenuBar";
import { defaultContent } from "./constants";
import { extensions } from "./extentions";
import { Editor as EditorType, EditorContent, useEditor } from "@tiptap/react";
import React, { forwardRef, HTMLAttributes, useCallback } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  className?: string;
  contentClassName?: string;
  getEditor: (data: EditorType | null) => void;
}

export const Editor: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<HTMLDivElement>
> = forwardRef(
  (
    {
      defaultValue,
      className,
      contentClassName,
      onChange,
      getEditor,
      ...props
    },
    ref
  ) => {
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
          onChange={(e) => getEditor(editor)}
        />
      </section>
    );
  }
);

Editor.displayName = "Editor";
