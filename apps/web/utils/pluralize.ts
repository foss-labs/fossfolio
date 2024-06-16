export const pluralize = (
  word: string,
  count: number,
  shouldCombine = false
) => {
  if (count <= 1) {
    if (shouldCombine) {
      return `${count} ${word}`;
    } else {
      return word;
    }
  }
  if (count > 1) {
    if (shouldCombine) {
      return `${count} ${word}s`;
    } else {
      return `${word}s`;
    }
  }
};
