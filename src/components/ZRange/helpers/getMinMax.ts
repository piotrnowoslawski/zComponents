export const getMinMax = (
  firstValue: number,
  secondValue: number
): { min: number; max: number } => {
  const min = firstValue < secondValue ? firstValue : secondValue;
  const max = firstValue > secondValue ? firstValue : secondValue;

  return { min, max };
};
