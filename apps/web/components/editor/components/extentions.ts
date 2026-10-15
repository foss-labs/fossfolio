import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

// Keep the same node and mark names as saved Novel documents.
export const extensions = [
  StarterKit,
  TextStyle,
  Color,
  Underline,
  Highlight.configure({ multicolor: true }),
  Link.configure({ openOnClick: false, defaultProtocol: "https" }),
  Image,
  TaskList,
  TaskItem.configure({ nested: true }),
  Placeholder.configure({ placeholder: "Start writing…" }),
];
