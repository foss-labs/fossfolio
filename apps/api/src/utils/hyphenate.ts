export const hyphenate = (text: string): string => {
  return text.trim().replace(/ /g, "-");
};
