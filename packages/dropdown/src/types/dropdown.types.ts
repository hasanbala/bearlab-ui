export interface DropdownContextValue {
  close?: () => void;
}

export interface DropdownProps {
  id?: string;
  show: boolean;
  closeOnSelect?: boolean;
  className?: string;
  labelledBy?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClose: () => void;
}

export interface DropdownItemProps {
  href?: string;
  linkComponent?: React.ElementType;
  className?: string;
  disabled?: boolean;
  tag?: "a" | "button";
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  onItemClick?: () => void;
}

export interface DropdownListProps {
  id?: string;
  linkComponent?: React.ElementType;
  style?: DropdownListStyles;
  className?: DropdownListClassNames;
  list: {
    dropdownLabel: string;
    options: {
      href: string;
      label: string;
      icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    }[][];
  };
}

export interface UseClickOutsideOptions {
  enabled?: boolean;
  excludeSelector?: string;
}

export interface UseDropdownReturn {
  isOpen: boolean;
  close: () => void;
  toggle: () => void;
}

export interface UseDropdown {
  menuId?: string;
}

export interface DropdownOptionsProps {
  linkComponent?: React.ElementType;
  style?: DropdownListStyles;
  className?: DropdownListClassNames;
  group: {
    href: string;
    label: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | undefined;
  }[];
}

export interface DropdownOptionProps {
  href: string;
  linkComponent?: React.ElementType;
  label: string;
  style?: DropdownListStyles;
  className?: DropdownListClassNames;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | undefined;
}

export interface DropdownListClassNames {
  root?: string;
  dropdown?: string;
  dropdownIcon?: string;
  dropdownItem?: string;
  dropdownLabel?: string;
  dropdownButton?: string;
  dropdownOption?: string;
  dropdownOptions?: string;
}

export interface DropdownListStyles {
  root?: React.CSSProperties;
  dropdown?: React.CSSProperties;
  dropdownIcon?: React.CSSProperties;
  dropdownItem?: React.CSSProperties;
  dropdownLabel?: React.CSSProperties;
  dropdownOption?: React.CSSProperties;
  dropdownButton?: React.CSSProperties;
  dropdownOptions?: React.CSSProperties;
}
