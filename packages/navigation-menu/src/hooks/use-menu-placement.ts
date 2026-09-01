import { useState, type RefObject } from "react";
import type {
  ContentCoords,
  NavigationMenuOrientation,
} from "../types/navigation-menu.types";
import { CONTENT_VIEWPORT_MARGIN } from "../constants/navigation-config";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

const INITIAL_COORDS: ContentCoords = { top: 0, left: 0 };

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), Math.max(min, max));

export const useMenuPlacement = (
  isOpen: boolean,
  panelRef: RefObject<HTMLElement | null>,
  anchorRef: RefObject<HTMLElement | null>,
  orientation: NavigationMenuOrientation,
  offset: number
): ContentCoords => {
  const [coords, setCoords] = useState<ContentCoords>(INITIAL_COORDS);

  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    const anchor = anchorRef.current;

    if (!isOpen || !panel || !anchor) return;

    const update = () => {
      const isVertical = orientation === "vertical";
      const { top, left, right, bottom } = anchor.getBoundingClientRect();
      const { width, height } = panel.getBoundingClientRect();
      const { clientWidth, clientHeight } = document.documentElement;

      const margin = CONTENT_VIEWPORT_MARGIN;
      const maxTop = clientHeight - margin - height;
      const maxLeft = clientWidth - margin - width;

      setCoords({
        top: Math.round(
          clamp(isVertical ? top : bottom + offset, margin, maxTop) +
            window.scrollY
        ),
        left: Math.round(
          clamp(isVertical ? right + offset : left, margin, maxLeft) +
            window.scrollX
        ),
      });
    };

    update();

    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true, capture: true });

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [isOpen, panelRef, anchorRef, orientation, offset]);

  return coords;
};
