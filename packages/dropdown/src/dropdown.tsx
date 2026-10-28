import { useMemo, useRef } from "react";
import classnames from "classnames";
import styles from "./styles/dropdown.module.scss";
import { useClickOutside } from "./hooks/use-click-outside";
import { DropdownProps } from "./types/dropdown.types";
import { DropdownContext } from "./context/dropdown-context";

export const Dropdown = (props: DropdownProps) => {
  const {
    id,
    show,
    style,
    children,
    className,
    labelledBy,
    closeOnSelect = true,
    onClose,
  } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const contextValue = useMemo(
    () => ({ close: closeOnSelect ? onClose : undefined }),
    [closeOnSelect, onClose]
  );

  useClickOutside(dropdownRef, onClose, {
    excludeSelector: ".dropdown-toggle",
    enabled: show,
  });

  if (!show) return null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    event.stopPropagation();
    onClose();
    if (labelledBy) document.getElementById(labelledBy)?.focus();
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div
        ref={dropdownRef}
        id={id}
        role="menu"
        aria-labelledby={labelledBy}
        onKeyDown={handleKeyDown}
        className={classnames(styles.dropdownContainer, className)}
        style={style}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};
