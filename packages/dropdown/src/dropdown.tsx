import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { Button, BUTTON_TYPE, ICON_TYPE } from "@bearlab/button";
import styles from "./dropdown.module.scss";

export const Dropdown = (props: IDropdown) => {
  const { show, children, className, onClose } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!show) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className={classnames(styles.dropdownContainer, className)}
    >
      {children}
    </div>
  );
};

export const DropdownItem = (props: IDropdownItem) => {
  const {
    tag = "button",
    href,
    onClick,
    onItemClick,
    className = "",
    children,
  } = props;

  const handleClick = (event: React.MouseEvent) => {
    if (tag == "button") {
      event.preventDefault();
    }

    if (onClick) {
      onClick();
    }

    if (onItemClick) {
      onItemClick();
    }
  };

  if (tag == "a" && href) {
    return (
      <a
        href={href}
        className={classnames(styles.dropdownItemContainer, className)}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={classnames(styles.dropdownItemContainer, className)}
    >
      {children}
    </button>
  );
};

export const DropdownBasic = (props: IDropdownBasic) => {
  const { list, className } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={classnames(styles.dropdownBasic, className)}>
      <Button
        label={list.dropdownLabel}
        buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
        iconType={{ default: ICON_TYPE.ARROW_DOWN2 }}
        onClick={handleDropdown}
        className={classnames(isOpen && styles.active, "dropdown-toggle")}
      />
      <Dropdown
        show={isOpen}
        onClose={() => setIsOpen(false)}
        className={styles.dropdown}
      >
        {list.options.map((_, index: number) => (
          <ul key={index}>
            {list.options[index].map((item, index) => (
              <li key={index}>
                <DropdownItem
                  onItemClick={() => console.log(item.href)}
                  tag="a"
                  href={item.href}
                  className={styles.dropdownItem}
                >
                  {item.icon && <item.icon className={styles.icon} />}
                  {item.label}
                </DropdownItem>
              </li>
            ))}
          </ul>
        ))}
      </Dropdown>
    </div>
  );
};

export interface IDropdown {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface IDropdownItem {
  tag?: "a" | "button";
  href?: string;
  onClick?: () => void;
  onItemClick?: () => void;
  baseClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export interface IDropdownBasic {
  list: {
    dropdownLabel: string;
    options: {
      label: string;
      icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
      href: string;
    }[][];
  };
  className?: string;
}
