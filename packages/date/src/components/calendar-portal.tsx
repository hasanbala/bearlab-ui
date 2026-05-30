import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { useCalendarPortal } from "../hooks/use-calendar-portal";
import { CalendarPortalProps } from "../types/date.types";

export const CalendarPortal = forwardRef<HTMLDivElement, CalendarPortalProps>(
  (props, ref) => {
    const { anchorRef, isVisible, calendarZIndex, children } = props;
    const coords = useCalendarPortal(isVisible, anchorRef);

    if (!isVisible) return null;

    return createPortal(
      <div
        ref={ref}
        style={{
          position: "absolute",
          top: coords.top,
          left: coords.left,
          zIndex: calendarZIndex,
        }}
      >
        {children}
      </div>,
      document.body
    );
  }
);

CalendarPortal.displayName = "CalendarPortal";
