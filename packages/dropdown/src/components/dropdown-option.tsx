import type { DropdownOptionProps } from "../types/dropdown.types";
import { DropdownItem } from "./dropdown-item";
import styles from "../styles/dropdown-list.module.scss";
import classnames from "classnames";

export const DropdownOption = (props: DropdownOptionProps) => {
  const { href, label, icon, className, style } = props;

  const Icon = icon || null;

  return (
    <li
      role="none"
      className={className?.dropdownOption}
      style={style?.dropdownOption}
    >
      <DropdownItem
        tag="a"
        href={href}
        onItemClick={close}
        className={classnames(styles.dropdownItem, className?.dropdownItem)}
        style={style?.dropdownItem}
      >
        {Icon && (
          <Icon
            style={style?.dropdownIcon}
            className={classnames(styles.icon, className?.dropdownIcon)}
            aria-hidden="true"
            focusable="false"
          />
        )}
        <span className={className?.dropdownLabel} style={style?.dropdownLabel}>
          {label}
        </span>
      </DropdownItem>
    </li>
  );
};
