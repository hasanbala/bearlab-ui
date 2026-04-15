import { useId, useState } from "react";
import classnames from "classnames";
import styles from "../styles/view-card.module.scss";
import type { ViewCardProps } from "../types/view-card.types";
import { IconChevronDown } from "../assets/icons";

export const ViewCardWithContent = (props: ViewCardProps) => {
  const {
    title,
    description,
    className,
    children,
    style,
    collapsible = false,
    defaultOpen = true,
  } = props;

  const titleId = useId();
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    if (collapsible) setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={classnames(
        styles.containerWithCard,
        collapsible && styles.collapsible,
        className?.root
      )}
      style={style?.root}
      role={title ? "region" : undefined}
      aria-labelledby={title ? titleId : undefined}
    >
      {title && (
        <div
          className={classnames(
            styles.header,
            collapsible && styles.headerToggleable,
            className?.header
          )}
          style={style?.header}
          {...(collapsible
            ? {
                role: "button",
                tabIndex: 0,
                "aria-expanded": isOpen,
                "aria-controls": panelId,
                onClick: handleToggle,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggle();
                  }
                },
              }
            : {})}
        >
          <div className={styles.headerContent}>
            <h3
              id={titleId}
              className={classnames(styles.title, className?.title)}
              style={style?.title}
            >
              {title}
            </h3>
            {description && (
              <p
                className={classnames(
                  styles.description,
                  className?.description
                )}
                style={style?.description}
              >
                {description}
              </p>
            )}
          </div>
          {collapsible && (
            <IconChevronDown
              aria-hidden="true"
              className={classnames(
                styles.chevron,
                isOpen && styles.chevronOpen
              )}
            />
          )}
        </div>
      )}
      {collapsible ? (
        <div
          id={panelId}
          aria-hidden={!isOpen}
          inert={!isOpen || undefined}
          className={classnames(
            styles.collapsibleWrapper,
            isOpen && styles.collapsibleOpen
          )}
        >
          <div className={styles.collapsibleInner}>
            <div
              className={classnames(styles.content, className?.content)}
              style={style?.content}
            >
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={classnames(styles.content, className?.content)}
          style={style?.content}
        >
          {children}
        </div>
      )}
    </div>
  );
};
