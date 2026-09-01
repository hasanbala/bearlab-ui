import { useEffect, type RefObject } from "react";
import { UseClickOutsideOptions } from "../types/navigation-menu.types";

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  { enabled = true, ignoreRef }: UseClickOutsideOptions = {}
): void => {
  useEffect(() => {
    if (!enabled) return;

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!ref.current || ref.current.contains(target)) return;
      if (ignoreRef?.current?.contains(target)) return;

      handler();
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [ref, handler, enabled, ignoreRef]);
};
