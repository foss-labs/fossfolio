export const convert2base64 = (
  file: File,
  selectCover: (name: string | undefined) => void
) => {
  const reader = new FileReader();

  reader.onloadend = () => [selectCover(reader.result?.toString())];

  reader.readAsDataURL(file);
};
