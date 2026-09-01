import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

export const useOptionsPortal = (
  isVisible: boolean,
  anchorRef: React.RefObject<HTMLElement | null>,
  isSelectionCard: boolean
) => {
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  useIsomorphicLayoutEffect(() => {
    const anchor = anchorRef.current;

    if (!isVisible || !anchor) return;

    const updateCoords = () => {
      const rect = anchor.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    updateCoords();

    window.addEventListener("resize", updateCoords, { passive: true });
    window.addEventListener("scroll", updateCoords, {
      passive: true,
      capture: true,
    });

    let resizeObserver: ResizeObserver | null = null;
    if (isSelectionCard) {
      resizeObserver = new ResizeObserver(updateCoords);
      resizeObserver.observe(anchor);
    }

    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
      resizeObserver?.disconnect();
    };
  }, [isVisible, anchorRef, isSelectionCard]);

  return coords;
};