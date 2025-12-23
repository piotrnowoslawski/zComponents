export const getElementVerticalBorders = (el: HTMLElement): number => {
  const s = getComputedStyle(el);
  return (
    (parseFloat(s.borderTopWidth) || 0) + (parseFloat(s.borderBottomWidth) || 0)
  );
};
