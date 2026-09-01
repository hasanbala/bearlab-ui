import { useEffect, type RefObject } from "react";
import type { MenubarOverflow } from "../types/navigation-menu.types";

const SCROLL_EPSILON = 1;

const resolveOverflow = (list: HTMLElement): MenubarOverflow => {
  const maxScroll = list.scrollWidth - list.clientWidth;
  if (maxScroll <= SCROLL_EPSILON) return "none";

  const atStart = list.scrollLeft <= SCROLL_EPSILON;
  const atEnd = list.scrollLeft >= maxScroll - SCROLL_EPSILON;

  if (atStart) return "end";
  if (atEnd) return "start";
  return "both";
};

export const useMenubarOverflow = (
  listRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  itemCount: number
): void => {
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (!enabled) {
      delete list.dataset.overflow;
      return;
    }

    const update = () => {
      list.dataset.overflow = resolveOverflow(list);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(list);
    for (const child of list.children) observer.observe(child);

    list.addEventListener("scroll", update, { passive: true });

    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", update);
    };
  }, [listRef, enabled, itemCount]);
};
