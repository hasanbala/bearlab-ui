import { useState, useCallback, useEffect } from "react";
import { UseDropdown, UseDropdownReturn } from "../types/dropdown.types";

export const useDropdown = ({
  menuId,
}: UseDropdown = {}): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

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
