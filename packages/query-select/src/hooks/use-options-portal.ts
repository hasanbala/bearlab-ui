import { useState, useLayoutEffect } from "react";

export const useOptionsPortal = (
  isVisible: boolean,
  anchorRef: React.RefObject<HTMLElement | null>,
  isSelectionCard: boolean
) => {
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  useLayoutEffect(() => {
    if (!isVisible || !anchorRef.current) return;

    const el = anchorRef.current;

    const updateCoords = () => {
      const rect = el.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    updateCoords();
    window.addEventListener("scroll", updateCoords, { passive: true });
    window.addEventListener("resize", updateCoords, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (isSelectionCard) {
      resizeObserver = new ResizeObserver(updateCoords);
      resizeObserver.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", updateCoords);
      window.removeEventListener("resize", updateCoords);
      resizeObserver?.disconnect();
    };
  }, [isVisible, anchorRef, isSelectionCard]);

  return coords;
};
