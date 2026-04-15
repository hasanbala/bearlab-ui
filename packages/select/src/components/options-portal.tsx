import { forwardRef, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { OptionsPortalProps } from "../types/select.types";

export const OptionsPortal = forwardRef<HTMLDivElement, OptionsPortalProps>(
  (props, ref) => {
    const { anchorRef, isVisible, children, disabled, optionZIndex } = props;
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

    if (!isVisible || disabled) return null;

    return createPortal(
      <div
        ref={ref}
        style={{
          position: "absolute",
          top: coords.top,
          left: coords.left,
          width: coords.width,
          zIndex: optionZIndex,
        }}
      >
        {children}
      </div>,
      document.body
    );
  }
);
