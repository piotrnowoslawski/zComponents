import { useEffect } from "react";

type Settings = {
  isActive?: boolean;
};

type OutsideHandler = (event: MouseEvent | KeyboardEvent) => void;

type RefLike = { current: HTMLElement | null };

export const useOutsideClose = (
  ref: RefLike,
  onOutsideClose: OutsideHandler,
  settings?: Settings
) => {
  const isActive = settings?.isActive ?? true;

  useEffect(() => {
    const handleClick = (e: MouseEvent): void => {
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

    if (isActive) {
      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleKey);
    } else {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    }

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onOutsideClose, ref, isActive]);
};

export default useOutsideClose;
