import { useRef } from "react";
import classnames from "classnames";
import styles from "./styles/dropdown.module.scss";
import { useClickOutside } from "./hooks/use-click-outside";
import { DropdownProps } from "./types/dropdown.types";

export const Dropdown = (props: DropdownProps) => {
  const { show, children, className, onClose, style, id, labelledBy } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, onClose, {
    excludeSelector: ".dropdown-toggle",
    enabled: show,
  });

  if (!show) return null;

  return (
    <div
      ref={dropdownRef}
      id={id}
      role="menu"
      aria-labelledby={labelledBy}
      className={classnames(styles.dropdownContainer, className)}
      style={style}
    >
      {children}
    </div>
  );
};
