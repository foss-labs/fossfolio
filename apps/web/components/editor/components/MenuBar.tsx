import { Editor } from "@tiptap/react";
import clsx from "clsx";
import React from "react";
import { Separator } from "@app/ui/components/separator";

interface Props {
  editor: Editor | null;
}

export const MenuBar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 px-5 py-2">
        <button
          onClick={() => editor.chain().focus().run()}
          disabled={!editor.can().chain().focus().run()}
          className={clsx(
            editor.isActive("bold") && "is-active",
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().run()}
          disabled={!editor.can().chain().focus().run()}
          className={clsx(
            editor.isActive("italic") && "is-active",
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().run()}
          disabled={!editor.can().chain().focus().run()}
          className={clsx(
            editor.isActive("strike") && "is-active",
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          Strike
        </button>

        <button
          onClick={() => editor.chain().focus().run()}
          className={clsx(
            editor.isActive("heading", { level: 1 }) && "is-active",
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().run()}
          className={clsx(
            editor.isActive("heading", { level: 2 }) && "is-active",
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().run()}
          className={clsx(
            editor.isActive("heading", { level: 3 }) && "is-active",
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().run()}
          className={clsx(
            editor.isActive("heading", { level: 4 }) && "is-active",
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          H4
        </button>
      </div>
      <Separator className="bg-gray-700" />
    </div>
  );
};
