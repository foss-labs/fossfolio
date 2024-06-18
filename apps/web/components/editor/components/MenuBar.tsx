import { Editor } from "@tiptap/react";
import React from "react";
import { cn } from "@app/ui/lib/utils";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuBold,
  LuItalic,
  LuStrikethrough,
} from "react-icons/lu";
import { Separator } from "@app/ui/components/separator";

interface Props {
  editor: Editor | null;
}

export const MenuBar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  const activeStyle = "bg-black text-white";

  return (
    <div>
      <div className="flex flex-wrap gap-2 px-5 py-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={cn(
            editor.isActive("bold") && activeStyle,
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          <LuBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={cn(
            editor.isActive("italic") && activeStyle,
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          <LuItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={cn(
            editor.isActive("strike") && activeStyle,
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          <LuStrikethrough />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn(
            editor.isActive("heading", { level: 1 }) && activeStyle,
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          <LuHeading1 />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            editor.isActive("heading", { level: 2 }) && activeStyle,
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          <LuHeading2 />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            editor.isActive("heading", { level: 3 }) && activeStyle,
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          <LuHeading3 />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={cn(
            editor.isActive("heading", { level: 4 }) && activeStyle,
            "border rounded-sm px-2 hover:bg-gray-300 delay-100"
          )}
        >
          <LuHeading4 />
        </button>
      </div>
      <Separator className="bg-gray-700" />
    </div>
  );
};
