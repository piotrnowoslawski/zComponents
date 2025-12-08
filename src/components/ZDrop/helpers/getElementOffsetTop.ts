export const getElementOffsetTop = (element: HTMLElement | null): number => {
  if (!element) return 0;

  const rect = element.getBoundingClientRect();
  const scrollTop =
    window.pageYOffset ??
    document.documentElement.scrollTop ??
    document.body.scrollTop ??
    0;

  return rect.top + scrollTop;
};

export const getReferenceElementDimensions = (
  element: HTMLElement | null,
  elementParentClass: string
): { top: number; bottom: number; height: number } | undefined => {
  const parent = element?.parentElement;
  if (!parent) return;

  if (parent.classList.contains(elementParentClass)) {
    const top = getElementOffsetTop(parent);
    const height = parent.scrollHeight;

    return {
      top,
      bottom: top + height,
      height,
    };
  }

  return getReferenceElementDimensions(parent, elementParentClass);
};
