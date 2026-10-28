import classnames from "classnames";
import styles from "../styles/dropdown-item.module.scss";
import type { DropdownItemProps } from "../types/dropdown.types";
import { navigateMenuItem } from "../utils/dropdown-utils";
import { useDropdownContext } from "../context/dropdown-context";

export const DropdownItem = (props: DropdownItemProps) => {
  const {
    tag = "button",
    href,
    linkComponent,
    onClick,
    onItemClick,
    className,
    style,
    children,
    disabled = false,
  } = props;

  const { close } = useDropdownContext();
  const isLink = tag === "a" && !!href;

  const select = () => {
    onClick?.();
    onItemClick?.();
    close?.();
  };

  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (!isLink) event.preventDefault();
    select();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case "Enter":
        if (isLink && !disabled) break;
        event.preventDefault();
        if (!disabled) select();
        break;
      case " ":
        event.preventDefault();
        if (disabled) break;
        if (isLink) event.currentTarget.click();
        else select();
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

  if (isLink) {
    const LinkComponent = linkComponent ?? "a";
    return (
      <LinkComponent href={disabled ? undefined : href} {...sharedProps}>
        {children}
      </LinkComponent>
    );
  }

  return (
    <button {...sharedProps} type="button" disabled={disabled}>
      {children}
    </button>
  );
};
