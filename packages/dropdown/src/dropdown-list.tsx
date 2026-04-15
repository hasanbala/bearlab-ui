import { useId } from "react";
import classnames from "classnames";
import styles from "./styles/dropdown-list.module.scss";
import { Button } from "@bearlab/button";
import { DropdownListProps } from "./types/dropdown.types";
import { useDropdown } from "./hooks/use-dropdown";
import { Dropdown } from "./dropdown";
import { DropdownOptions } from "./components/dropdown-options";

export const DropdownList = (props: DropdownListProps) => {
  const { list, className, style, id } = props;

  const uid = useId().replace(/:/g, "");
  const buttonId = id ?? `dropdown-toggle-${uid}`;
  const menuId = `dropdown-menu-${uid}`;

  const { isOpen, toggle, close } = useDropdown({ buttonId, menuId });

  return (
    <div
      className={classnames(styles.dropdownList, className?.root)}
      style={style?.root}
    >
      <Button
        label={list.dropdownLabel}
        buttonType={"iconWithText"}
        iconType={{ default: "arrow_down2" }}
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        className={{
          root: classnames(
            isOpen && styles.active,
            "dropdown-toggle",
            className?.dropdownButton
          ),
        }}
        style={{
          root: style?.dropdownButton,
        }}
      />
      <Dropdown
        show={isOpen}
        onClose={close}
        id={menuId}
        labelledBy={buttonId}
        className={classnames(styles.dropdown, className?.dropdown)}
        style={style?.dropdown}
      >
        {list.options.map((group, groupIndex) => (
          <DropdownOptions
            key={groupIndex}
            group={group}
            className={className}
            style={style}
          />
        ))}
      </Dropdown>
    </div>
  );
};
