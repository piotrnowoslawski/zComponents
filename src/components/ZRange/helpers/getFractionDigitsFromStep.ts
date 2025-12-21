export const getFractionDigitsFromStep = (step: number): number => {
  if (!Number.isFinite(step)) {
    return 0;
  }

  const stepAsString = String(step);

  const scientificNotationMatch = stepAsString.match(/e-(\d+)/i);
  if (scientificNotationMatch) {
    return Number(scientificNotationMatch[1]);
  }

  const dot = stepAsString.indexOf(".");
  return dot >= 0 ? stepAsString.length - dot - 1 : 0;
};
