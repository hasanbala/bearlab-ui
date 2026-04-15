import type React from "react";

export interface DropdownProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  labelledBy?: string;
}

export interface DropdownItemProps {
  tag?: "a" | "button";
  href?: string;
  onClick?: () => void;
  onItemClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownListProps {
  list: {
    dropdownLabel: string;
    options: {
      label: string;
      href: string;
      icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    }[][];
  };
  className?: DropdownListClassNames;
  style?: DropdownListStyles;
  id?: string;
}

export interface UseClickOutsideOptions {
  excludeSelector?: string;
  enabled?: boolean;
}

export interface UseDropdownReturn {
  isOpen: boolean;
  close: () => void;
  toggle: () => void;
}

export interface UseDropdown {
  buttonId?: string;
  menuId?: string;
}

export interface DropdownOptionsProps {
  group: {
    href: string;
    label: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | undefined;
  }[];
  className?: DropdownListClassNames;
  style?: DropdownListStyles;
}

export interface DropdownOptionProps {
  href: string;
  label: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | undefined;
  className?: DropdownListClassNames;
  style?: DropdownListStyles;
}

export interface DropdownListClassNames {
  root?: string;
  dropdown?: string;
  dropdownButton?: string;
  dropdownItem?: string;
  dropdownOptions?: string;
  dropdownOption?: string;
  dropdownIcon?: string;
  dropdownLabel?: string;
}

export interface DropdownListStyles {
  root?: React.CSSProperties;
  dropdown?: React.CSSProperties;
  dropdownButton?: React.CSSProperties;
  dropdownItem?: React.CSSProperties;
  dropdownOptions?: React.CSSProperties;
  dropdownOption?: React.CSSProperties;
  dropdownIcon?: React.CSSProperties;
  dropdownLabel?: React.CSSProperties;
}
