export const shrinkName = (str: string): string => {
  const first = str.trim()[0];
  const num = str.match(/\d+$/)?.[0] ?? "";

  return first + num;
};
