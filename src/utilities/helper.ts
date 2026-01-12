export const convertHypenStringToRegular = (text: string) => {
  const regularText = text.split("-");

  return `${regularText[0]} ${regularText[1]}`;
};
