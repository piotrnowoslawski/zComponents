import { RefObject, useEffect } from "react";

type OutsideHandler = (event: MouseEvent | KeyboardEvent) => void;

type RefLike = { current: HTMLElement | null };

export const useOutsideClose = (
  ref: RefLike,
  onOutsideClose: OutsideHandler
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref &&
        ref.current &&
        !ref.current.contains(e.target as Node | null)
      ) {
        onOutsideClose(e);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOutsideClose(e);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onOutsideClose, ref]);
};

export default useOutsideClose;
