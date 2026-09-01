import type { NavigationMenuOrientation } from "../types/navigation-menu.types";

export const navigateTrigger = (
  currentElement: HTMLElement,
  key: string,
  orientation: NavigationMenuOrientation
): boolean => {
  const list = currentElement.closest('[role="menubar"]');
  if (!list) return false;

  const items = Array.from(
    list.querySelectorAll<HTMLElement>(
      '[data-nav-trigger]:not([aria-disabled="true"]):not([disabled])'
    )
  );

  const currentIndex = items.indexOf(currentElement);
  if (currentIndex === -1) return false;

  const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
  const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";

  let nextIndex: number | null = null;

  if (key === nextKey) {
    nextIndex = (currentIndex + 1) % items.length;
  } else if (key === prevKey) {
    nextIndex = (currentIndex - 1 + items.length) % items.length;
  } else if (key === "Home") {
    nextIndex = 0;
  } else if (key === "End") {
    nextIndex = items.length - 1;
  }

  if (nextIndex === null) return false;

  const next = items[nextIndex];
  if (!next) return false;

  next.focus({ preventScroll: true });
  next.scrollIntoView({ block: "nearest", inline: "nearest" });
  return true;
};

const CONTENT_LINK_SELECTOR =
  'a[href]:not([aria-disabled="true"]), [data-nav-link]:not([aria-disabled="true"])';

export const getContentLinks = (panel: HTMLElement | null): HTMLElement[] =>
  panel
    ? Array.from(panel.querySelectorAll<HTMLElement>(CONTENT_LINK_SELECTOR))
    : [];

export const focusFirstContentLink = (panel: HTMLElement | null): void => {
  getContentLinks(panel)[0]?.focus();
};

export const getAdjacentTrigger = (
  current: HTMLElement | null,
  direction: 1 | -1
): HTMLElement | null => {
  const list = current?.closest('[role="menubar"]');
  if (!current || !list) return null;

  const items = Array.from(
    list.querySelectorAll<HTMLElement>(
      '[data-nav-trigger]:not([aria-disabled="true"]):not([disabled])'
    )
  );

  const index = items.indexOf(current);
  if (index === -1) return null;

  return items[(index + direction + items.length) % items.length] ?? null;
};

export const pickCustomProperties = (
  style?: React.CSSProperties
): React.CSSProperties =>
  Object.fromEntries(
    Object.entries(style ?? {}).filter(([key]) => key.startsWith("--"))
  );
