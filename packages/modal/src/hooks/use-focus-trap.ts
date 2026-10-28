import { useCallback, useEffect, useRef, useState } from "react";
import type {
  UseFocusTrapProps,
  UseFocusTrapReturn,
} from "../types/modal.types";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

const getFocusable = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));

export const useFocusTrap = ({
  isActive,
  initialFocusRef,
}: UseFocusTrapProps): UseFocusTrapReturn => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !container) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const target =
      initialFocusRef?.current ?? getFocusable(container)[0] ?? container;
    target.focus();

    return () => {
      previousFocusRef.current?.focus();
    };
  }, [isActive, container, initialFocusRef]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key !== "Tab" || !container) return;

      const elements = getFocusable(container);
      if (!elements.length) {
        e.preventDefault();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === container)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [container]
  );

  return { ref: setContainer, handleKeyDown };
};
