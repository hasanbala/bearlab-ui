import { useMemo, useRef } from "react";
import classnames from "classnames";
import type { NavigationMenuProps } from "./types/navigation-menu.types";
import { useNavigationMenu } from "./hooks/use-navigation-menu";
import { useClickOutside } from "./hooks/use-click-outside";
import { useMenubarOverflow } from "./hooks/use-menubar-overflow";
import { MenuItem } from "./components/menu-item";
import { MenuIndicator } from "./components/menu-indicator";
import { pickCustomProperties } from "./utils/navigation-utils";
import {
  CONTENT_SIDE_OFFSET,
  DEFAULT_ARIA_LABEL,
} from "./constants/navigation-config";
import styles from "./styles/navigation-menu.module.scss";

export const NavigationMenu = (props: NavigationMenuProps) => {
  const {
    items,
    orientation = "horizontal",
    value,
    defaultValue,
    onValueChange,
    delayDuration,
    skipDelayDuration,
    showIndicator = true,
    sideOffset = CONTENT_SIDE_OFFSET,
    renderLink,
    "aria-label": ariaLabel = DEFAULT_ARIA_LABEL,
    className,
    style,
  } = props;

  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const portalStyle = useMemo(
    () => pickCustomProperties(style?.root),
    [style?.root]
  );

  const {
    activeValue,
    onTriggerEnter,
    onTriggerLeave,
    onTriggerClick,
    onContentEnter,
    onContentLeave,
    close,
  } = useNavigationMenu({
    value,
    defaultValue,
    delayDuration,
    skipDelayDuration,
    onValueChange,
  });

  useClickOutside(navRef, close, {
    enabled: activeValue !== null,
    ignoreRef: portalRef,
  });

  useMenubarOverflow(listRef, orientation === "horizontal", items.length);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || activeValue === null) return;

    event.preventDefault();
    const openTrigger = navRef.current?.querySelector<HTMLElement>(
      `[data-nav-value="${CSS.escape(activeValue)}"]`
    );
    close();
    requestAnimationFrame(() => openTrigger?.focus());
  };

  return (
    <nav
      ref={navRef}
      aria-label={ariaLabel}
      data-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={classnames(
        styles.root,
        orientation === "vertical" && styles.rootVertical,
        className?.root
      )}
      style={style?.root}
    >
      <ul
        ref={listRef}
        role="menubar"
        aria-orientation={orientation}
        className={classnames(styles.list, className?.list)}
        style={style?.list}
      >
        {items.map((item) => (
          <MenuItem
            key={item.value}
            item={item}
            orientation={orientation}
            isOpen={activeValue === item.value}
            sideOffset={sideOffset}
            portalRef={portalRef}
            portalStyle={portalStyle}
            className={className}
            style={style}
            renderLink={renderLink}
            onTriggerEnter={onTriggerEnter}
            onTriggerLeave={onTriggerLeave}
            onTriggerClick={onTriggerClick}
            onContentEnter={onContentEnter}
            onContentLeave={onContentLeave}
            onClose={close}
          />
        ))}
        {showIndicator && (
          <MenuIndicator
            activeValue={activeValue}
            orientation={orientation}
            listRef={listRef}
            className={className?.indicator}
            style={style?.indicator}
          />
        )}
      </ul>
    </nav>
  );
};
