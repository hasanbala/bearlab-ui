export const navigateMenuItem = (
  currentElement: HTMLElement,
  direction: "next" | "prev"
): void => {
  const menu = currentElement.closest('[role="menu"]');
  if (!menu) return;

  const items = Array.from(
    menu.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])'
    )
  );

  const currentIndex = items.indexOf(currentElement);
  if (currentIndex === -1) return;

  const nextIndex =
    direction === "next"
      ? (currentIndex + 1) % items.length
      : (currentIndex - 1 + items.length) % items.length;

  items[nextIndex]?.focus();
};
