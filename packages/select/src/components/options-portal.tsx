import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { OptionsPortalProps } from "../types/select.types";
import { useOptionsPortal } from "../hooks/use-options-portal";

export const OptionsPortal = forwardRef<HTMLDivElement, OptionsPortalProps>(
  (props, ref) => {
    const { anchorRef, isVisible, children, optionZIndex } = props;
    const coords = useOptionsPortal(isVisible, anchorRef);

    if (!isVisible) return null;

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
