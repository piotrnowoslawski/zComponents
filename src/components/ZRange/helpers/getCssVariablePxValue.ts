export const getCssVariablePxValue = (
  element: HTMLElement,
  cssVariableName: string,
  fallbackPx: number
): number => {
  const rawValue = getComputedStyle(element)
    .getPropertyValue(cssVariableName)
    .trim();

  const parsedPx = parseFloat(rawValue);
  return Number.isFinite(parsedPx) ? parsedPx : fallbackPx;
};
