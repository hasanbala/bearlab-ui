import { useEffect, type RefObject } from "react";
import { UseClickOutsideOptions } from "../types/dropdown.types";

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  { excludeSelector, enabled = true }: UseClickOutsideOptions = {}
): void => {
  useEffect(() => {
    if (!enabled) return;

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!ref.current || ref.current.contains(target)) return;

      if (excludeSelector && target.closest(excludeSelector)) return;

      handler();
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [ref, handler, excludeSelector, enabled]);
};
