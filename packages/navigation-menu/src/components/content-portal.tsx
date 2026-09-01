import { forwardRef } from "react";
import { createPortal } from "react-dom";
import type { ContentPortalProps } from "../types/navigation-menu.types";
import styles from "../styles/navigation-menu.module.scss";

export const ContentPortal = forwardRef<HTMLDivElement, ContentPortalProps>(
  (props, ref) => {
    const { isOpen, side, coords, style, children } = props;

    if (!isOpen || typeof document === "undefined") return null;

    return createPortal(
      <div
        ref={ref}
        data-side={side}
        className={styles.portal}
        style={{
          position: "absolute",
          top: coords.top,
          left: coords.left,
          ...style,
        }}
      >
        {children}
      </div>,
      document.body
    );
  }
);

ContentPortal.displayName = "ContentPortal";
