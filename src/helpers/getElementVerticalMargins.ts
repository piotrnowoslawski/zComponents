export const getElementVerticalMargins = (el: HTMLElement): number => {
  const s = getComputedStyle(el);

  return (parseFloat(s.marginTop) || 0) + (parseFloat(s.marginBottom) || 0);
};
