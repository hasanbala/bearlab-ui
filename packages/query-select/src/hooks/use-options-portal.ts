import { useState, useLayoutEffect } from "react";

export const useOptionsPortal = (
  isVisible: boolean,
  anchorRef: React.RefObject<HTMLElement | null>
) => {
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  useLayoutEffect(() => {
    if (!isVisible || !anchorRef.current) return;

    const updateCoords = () => {
      const rect = anchorRef.current!.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    updateCoords();

    window.addEventListener("scroll", updateCoords, { passive: true });
    window.addEventListener("resize", updateCoords, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateCoords);
      window.removeEventListener("resize", updateCoords);
    };
  }, [isVisible, anchorRef]);

  return coords;
};
