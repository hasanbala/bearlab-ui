import classnames from "classnames";
import type { MenuContentProps } from "../types/navigation-menu.types";
import { MenuLink } from "./menu-link";
import styles from "../styles/navigation-menu.module.scss";

export const MenuContent = (props: MenuContentProps) => {
  const {
    id,
    labelledBy,
    content,
    contentRef,
    className,
    style,
    renderLink,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onClose,
  } = props;

  const { groups, custom } = content;

  return (
    <div
      ref={contentRef}
      id={id}
      aria-labelledby={labelledBy}
      className={classnames(styles.content, className?.content)}
      style={style?.content}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
    >
      <div
        className={classnames(styles.contentInner, className?.contentInner)}
        style={style?.contentInner}
      >
        {custom
          ? custom
          : groups?.map((group, groupIndex) => (
              <div
                key={group.label ?? groupIndex}
                role="menu"
                aria-label={group.label}
                className={classnames(styles.group, className?.group)}
                style={style?.group}
              >
                {group.label && (
                  <p
                    className={classnames(
                      styles.groupLabel,
                      className?.groupLabel
                    )}
                    style={style?.groupLabel}
                  >
                    {group.label}
                  </p>
                )}
                {group.links.map((link) => (
                  <MenuLink
                    key={link.href + link.label}
                    link={link}
                    className={className}
                    style={style}
                    renderLink={renderLink}
                    onSelect={onClose}
                  />
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};
