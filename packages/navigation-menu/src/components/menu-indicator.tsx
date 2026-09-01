import { useState } from "react";
import classnames from "classnames";
import type {
  IndicatorRect,
  MenuIndicatorProps,
} from "../types/navigation-menu.types";
import styles from "../styles/navigation-menu.module.scss";
import { useIsomorphicLayoutEffect } from "../hooks/use-isomorphic-layout-effect";

export const MenuIndicator = (props: MenuIndicatorProps) => {
  const { activeValue, orientation, listRef, className, style } = props;
  const [rect, setRect] = useState<IndicatorRect | null>(null);

  const isVertical = orientation === "vertical";

  useIsomorphicLayoutEffect(() => {
    if (!activeValue || !listRef.current) {
      setRect(null);
      return;
    }

    const list = listRef.current;

    const updateRect = () => {
      const trigger = list.querySelector<HTMLElement>(
        `[data-nav-value="${CSS.escape(activeValue)}"]`
      );

      if (!trigger) {
        setRect(null);
        return;
      }

      const item = trigger.closest<HTMLElement>('[role="none"]') ?? trigger;

      setRect(
        isVertical
          ? { start: item.offsetTop, size: item.offsetHeight }
          : { start: item.offsetLeft, size: item.offsetWidth }
      );
    };

    updateRect();

    window.addEventListener("resize", updateRect, { passive: true });
    return () => window.removeEventListener("resize", updateRect);
  }, [activeValue, isVertical, listRef]);

  return (
    <li
      role="none"
      aria-hidden="true"
      className={classnames(
        styles.indicator,
        rect && styles.indicatorVisible,
        className
      )}
      style={{
        ...(rect
          ? isVertical
            ? {
                transform: `translateY(${rect.start}px)`,
                height: `${rect.size}px`,
              }
            : {
                transform: `translateX(${rect.start}px)`,
                width: `${rect.size}px`,
              }
          : undefined),
        ...style,
      }}
    />
  );
};
