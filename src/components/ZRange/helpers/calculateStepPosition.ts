export const calculateStepPosition = (
  currentValue: number,
  element: HTMLInputElement | null,
  min: number,
  max: number
): number => {
  if (!element) {
    return 0;
  }

  return ((currentValue - min) * element.clientWidth) / (max - min);
};
