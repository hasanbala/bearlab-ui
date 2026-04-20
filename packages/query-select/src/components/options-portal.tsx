import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { QuerySelectOptionsPortalProps } from "../types/query-select.types";
import { useOptionsPortal } from "../hooks/use-options-portal";

export const OptionsPortal = forwardRef<
  HTMLDivElement,
  QuerySelectOptionsPortalProps
>((props, ref) => {
  const { anchorRef, isVisible, children, disabled, optionZIndex } = props;
  const coords = useOptionsPortal(isVisible, anchorRef);

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
});
