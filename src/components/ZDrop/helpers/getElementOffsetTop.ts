export const getElementOffsetTop = (element: HTMLElement | null): number =>
  element ? element.getBoundingClientRect().top + (window.scrollY ?? 0) : 0;

export const getReferenceElementDimensions = (
  element: HTMLElement | null,
  elementParentClass: string
): { top: number; bottom: number; height: number } | undefined => {
  for (let el = element?.parentElement; el; el = el.parentElement) {
    if (el.classList.contains(elementParentClass)) {
      const top = getElementOffsetTop(el);
      const height = el.scrollHeight;

      return { top, bottom: top + height, height };
    }
  }
};
