import type { DropdownOptionsProps } from "../types/dropdown.types";
import { DropdownOption } from "./dropdown-option";

export const DropdownOptions = (props: DropdownOptionsProps) => {
  const { group, linkComponent, className, style } = props;

  return (
    <ul
      role="group"
      className={className?.dropdownOptions}
      style={style?.dropdownOptions}
    >
      {group.map((item, itemIndex) => (
        <DropdownOption
          key={itemIndex}
          href={item.href}
          label={item.label}
          icon={item.icon}
          linkComponent={linkComponent}
          className={className}
          style={style}
        />
      ))}
    </ul>
  );
};
