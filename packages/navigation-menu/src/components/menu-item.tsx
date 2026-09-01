import { useId, useRef } from "react";
import classnames from "classnames";
import type { MenuItemProps } from "../types/navigation-menu.types";
import { MenuContent } from "./menu-content";
import { ContentPortal } from "./content-portal";
import { useMenuPlacement } from "../hooks/use-menu-placement";
import { IconChevronDown, IconExternalLink } from "../assets/icons";
import {
  navigateTrigger,
  focusFirstContentLink,
  getContentLinks,
  getAdjacentTrigger,
} from "../utils/navigation-utils";
import styles from "../styles/navigation-menu.module.scss";

export const MenuItem = (props: MenuItemProps) => {
  const {
    item,
    orientation,
    isOpen,
    sideOffset,
    portalRef,
    portalStyle,
    className,
    style,
    renderLink,
    onTriggerEnter,
    onTriggerLeave,
    onTriggerClick,
    onContentEnter,
    onContentLeave,
    onClose,
  } = props;

  const { value, label, href, external, disabled, icon: Icon, content } = item;

  const itemRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const uid = useId().replace(/:/g, "");
  const triggerId = `nav-trigger-${value}-${uid}`;
  const contentId = `nav-content-${value}-${uid}`;

  const isTrigger = !!content;

  const coords = useMenuPlacement(
    isOpen,
    contentRef,
    itemRef,
    orientation,
    sideOffset
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const { key } = event;
    const openKey = orientation === "vertical" ? "ArrowRight" : "ArrowDown";

    if (isTrigger && key === openKey) {
      event.preventDefault();
      if (!isOpen) onTriggerClick(value);
      requestAnimationFrame(() => focusFirstContentLink(contentRef.current));
      return;
    }

    if (isTrigger && isOpen && key === "Tab" && !event.shiftKey) {
      event.preventDefault();
      focusFirstContentLink(contentRef.current);
      return;
    }

    if (navigateTrigger(event.currentTarget, key, orientation)) {
      event.preventDefault();
    }
  };

  const handleContentKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;

    const links = getContentLinks(contentRef.current);
    const index = links.indexOf(event.target as HTMLElement);
    if (index === -1) return;

    const leavingForwards = !event.shiftKey && index === links.length - 1;
    const leavingBackwards = event.shiftKey && index === 0;
    if (!leavingForwards && !leavingBackwards) return;

    event.preventDefault();
    const next = leavingForwards
      ? getAdjacentTrigger(triggerRef.current, 1)
      : triggerRef.current;

    onClose();
    requestAnimationFrame(() => next?.focus());
  };

  const itemClass = classnames(styles.item, className?.item);

  if (!isTrigger) {
    const triggerClass = classnames(
      styles.trigger,
      styles.triggerLink,
      disabled && styles.triggerDisabled,
      className?.trigger
    );

    const linkChildren = (
      <>
        {Icon && (
          <Icon
            aria-hidden="true"
            focusable="false"
            className={classnames(styles.triggerIcon, className?.triggerIcon)}
          />
        )}
        <span>{label}</span>
        {external && (
          <IconExternalLink
            aria-hidden="true"
            focusable="false"
            className={styles.externalIcon}
          />
        )}
      </>
    );

    return (
      <li ref={itemRef} role="none" className={itemClass} style={style?.item}>
        {renderLink && !disabled ? (
          renderLink(
            { label, href: href ?? "#", external, disabled, icon: Icon },
            linkChildren,
            {
              href: href ?? "#",
              className: triggerClass,
              style: style?.trigger,
              target: external ? "_blank" : undefined,
              rel: external ? "noopener noreferrer" : undefined,
              onClick: () => onClose(),
              onKeyDown: handleKeyDown,
              role: "menuitem",
              "data-nav-trigger": "",
              "data-nav-value": value,
            }
          )
        ) : (
          <a
            data-nav-trigger=""
            data-nav-value={value}
            role="menuitem"
            href={disabled ? undefined : (href ?? "#")}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : undefined}
            onKeyDown={handleKeyDown}
            onClick={() => !disabled && onClose()}
            className={triggerClass}
            style={style?.trigger}
          >
            {linkChildren}
          </a>
        )}
      </li>
    );
  }

  return (
    <li
      ref={itemRef}
      role="none"
      className={itemClass}
      style={style?.item}
      onMouseEnter={() => !disabled && onTriggerEnter(value)}
      onMouseLeave={onTriggerLeave}
    >
      <button
        id={triggerId}
        ref={triggerRef}
        type="button"
        data-nav-trigger=""
        data-nav-value={value}
        role="menuitem"
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? contentId : undefined}
        data-state={isOpen ? "open" : "closed"}
        onClick={() => onTriggerClick(value)}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => !disabled && onTriggerEnter(value)}
        className={classnames(
          styles.trigger,
          isOpen && styles.triggerOpen,
          disabled && styles.triggerDisabled,
          className?.trigger
        )}
        style={style?.trigger}
      >
        {Icon && (
          <Icon
            aria-hidden="true"
            focusable="false"
            className={classnames(styles.triggerIcon, className?.triggerIcon)}
          />
        )}
        <span>{label}</span>
        <IconChevronDown
          aria-hidden="true"
          focusable="false"
          className={styles.triggerCaret}
        />
      </button>
      <ContentPortal
        ref={portalRef}
        isOpen={isOpen}
        side={orientation === "vertical" ? "inline-end" : "block-end"}
        coords={coords}
        style={portalStyle}
      >
        <MenuContent
          id={contentId}
          labelledBy={triggerId}
          content={content}
          contentRef={contentRef}
          className={className}
          style={style}
          renderLink={renderLink}
          onMouseEnter={onContentEnter}
          onMouseLeave={onContentLeave}
          onKeyDown={handleContentKeyDown}
          onClose={onClose}
        />
      </ContentPortal>
    </li>
  );
};
