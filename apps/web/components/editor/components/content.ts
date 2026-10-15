import type { JSONContent } from "@tiptap/react";

export type EditorValue = JSONContent | string | null;

export const emptyContent: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

/** Accept both existing serialized Novel documents and HTML without unsafe JSON.parse in pages. */
export const parseContent = (value?: EditorValue): JSONContent | string => {
  if (!value) return emptyContent;
  if (typeof value !== "string") {
    return value.type === "doc" ? value : emptyContent;
  }
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === "string") return parseContent(parsed);
    return parsed?.type === "doc" ? parsed : emptyContent;
  } catch {
    // A broken serialized document should not crash the surrounding page.
    if (/^[\s]*[\[{]/.test(value)) return emptyContent;
    if (/<\/?[a-z][\s\S]*>/i.test(value)) return value;
    return {
      type: "doc",
      content: value.split("\n").map((text) => ({
        type: "paragraph",
        ...(text ? { content: [{ type: "text", text }] } : {}),
      })),
    };
  }
};

export const isSafeUrl = (value: string, image = false) => {
  try {
    const url = new URL(value);
    return (
      image ? ["https:", "http:"] : ["https:", "http:", "mailto:", "tel:"]
    ).includes(url.protocol);
  } catch {
    return false;
  }
};
