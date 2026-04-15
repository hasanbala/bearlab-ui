import classnames from "classnames";
import styles from "../styles/dropdown-item.module.scss";
import type { DropdownItemProps } from "../types/dropdown.types";
import { navigateMenuItem } from "../utils/dropdown-utils";

export const DropdownItem = (props: DropdownItemProps) => {
  const {
    tag = "button",
    href,
    onClick,
    onItemClick,
    className,
    style,
    children,
    disabled = false,
  } = props;

  const handleClick = (event: React.MouseEvent) => {
    if (disabled) return;
    if (tag === "button") event.preventDefault();
    onClick?.();
    onItemClick?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (!disabled) {
          onClick?.();
          onItemClick?.();
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        navigateMenuItem(event.currentTarget, "next");
        break;
      case "ArrowUp":
        event.preventDefault();
        navigateMenuItem(event.currentTarget, "prev");
        break;
      default:
        break;
    }
  };

  const sharedProps = {
    role: "menuitem" as const,
    "aria-disabled": disabled || undefined,
    tabIndex: disabled ? -1 : 0,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    className: classnames(styles.dropdownItemContainer, className),
    style,
  };

  if (tag === "a" && href) {
    return (
      <a href={disabled ? undefined : href} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <button {...sharedProps} type="button" disabled={disabled}>
      {children}
    </button>
  );
};
