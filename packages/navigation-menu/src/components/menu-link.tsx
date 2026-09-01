import classnames from "classnames";
import type { MenuLinkProps } from "../types/navigation-menu.types";
import { IconExternalLink } from "../assets/icons";
import styles from "../styles/navigation-menu.module.scss";

export const MenuLink = (props: MenuLinkProps) => {
  const { link, className, style, renderLink, onSelect } = props;
  const { label, href, description, external, disabled, icon: Icon } = link;

  const linkClass = classnames(
    styles.link,
    description && styles.linkWithDescription,
    disabled && styles.linkDisabled,
    className?.link
  );

  const children = (
    <>
      {Icon && (
        <span
          className={classnames(styles.linkIcon, className?.linkIcon)}
          style={style?.linkIcon}
        >
          <Icon aria-hidden="true" focusable="false" />
        </span>
      )}
      <span className={styles.linkText}>
        <span
          className={classnames(styles.linkLabel, className?.linkLabel)}
          style={style?.linkLabel}
        >
          {label}
          {external && (
            <IconExternalLink
              aria-hidden="true"
              focusable="false"
              className={styles.externalIcon}
            />
          )}
        </span>
        {description && (
          <span
            className={classnames(
              styles.linkDescription,
              className?.linkDescription
            )}
            style={style?.linkDescription}
          >
            {description}
          </span>
        )}
      </span>
    </>
  );

  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onSelect();
  };

  if (renderLink && !disabled) {
    return (
      <>
        {renderLink(link, children, {
          href,
          className: linkClass,
          style: style?.link,
          target: external ? "_blank" : undefined,
          rel: external ? "noopener noreferrer" : undefined,
          onClick: handleClick,
          role: "menuitem",
          "data-nav-link": "",
        })}
      </>
    );
  }

  return (
    <a
      data-nav-link=""
      role="menuitem"
      href={disabled ? undefined : href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      onClick={handleClick}
      className={linkClass}
      style={style?.link}
    >
      {children}
    </a>
  );
};
