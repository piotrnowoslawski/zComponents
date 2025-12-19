const thumbInteractArea = 24;

export const checkIsInputSwapAllowed = (
  activeIndex: number,
  comparedIndex: number,
  clientPosition: number | null | undefined,
  valuePosition: number
): boolean => {
  return (
    activeIndex === comparedIndex &&
    clientPosition !== null &&
    clientPosition !== undefined &&
    clientPosition < valuePosition + thumbInteractArea &&
    clientPosition > valuePosition - thumbInteractArea
  );
};
