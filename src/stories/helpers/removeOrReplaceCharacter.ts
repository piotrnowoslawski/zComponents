export const removeOrReplaceCharacter = (
  str: string,
  charToRemove: string,
  replacement: string | null = null
): string => {
  if (replacement !== null) {
    return str.split(charToRemove).join(replacement);
  }

  return str.split(charToRemove).join("");
};
