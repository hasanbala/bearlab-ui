import { useState, useCallback, useEffect } from "react";
import { UseDropdown, UseDropdownReturn } from "../types/dropdown.types";

export const useDropdown = ({
  buttonId,
  menuId,
}: UseDropdown = {}): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      close();
      requestAnimationFrame(() => {
        if (buttonId) {
          (document.getElementById(buttonId) as HTMLElement | null)?.focus();
        }
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close, buttonId]);

  useEffect(() => {
    if (!isOpen || !menuId) return;

    requestAnimationFrame(() => {
      const menu = document.getElementById(menuId);
      const firstItem = menu?.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      );
      firstItem?.focus();
    });
  }, [isOpen, menuId]);

  return { isOpen, close, toggle };
};
