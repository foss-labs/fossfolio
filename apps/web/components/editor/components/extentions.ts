import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Bold from "@tiptap/extension-bold";
import List from "@tiptap/extension-list-item";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";

export const extensions = [
  Document,
  Paragraph,
  Text,
  TextStyle,
  Bold,
  List,
  Italic,
  Strike,
  Heading.configure({
    levels: [1, 2, 3, 4],
  }),
];
