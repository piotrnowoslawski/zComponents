type AvailableSpace = {
  top: number;
  bottom: number;
};

export const getAvailableSpace = (
  element: HTMLElement | null
): AvailableSpace => {
  if (!element) return { top: 0, bottom: 0 };

  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  const spaceTop = Math.max(0, rect.top);
  const spaceBottom = Math.max(0, viewportHeight - rect.bottom);

  return {
    top: spaceTop,
    bottom: spaceBottom,
  };
};
