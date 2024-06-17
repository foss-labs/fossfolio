import { MenuBar } from "./MenuBar";
import { defaultContent } from "./constants";
import { extensions } from "./extentions";
import { EditorContent, useEditor } from "@tiptap/react";

interface Props {
  defaultValue?: string;
}

export const Editor = ({ defaultValue }: Props) => {
  const editor = useEditor({
    extensions: extensions,
    content: defaultValue || defaultContent,
  });
  return (
    <section className="border-2 border-gray-700 rounded-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="p-3" />
    </section>
  );
};
