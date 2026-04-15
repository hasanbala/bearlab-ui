import type { TabButtonProps } from "../types/tab.types";
import styles from "../styles/tab.module.scss";
import classnames from "classnames";

export const TabButton = (props: TabButtonProps) => {
  const { tab, isActive, onClick, tabId, panelId, className, style } = props;

  return (
    <button
      id={tabId}
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      className={classnames(
        isActive ? styles.active : styles.inactive,
        className?.button
      )}
      style={style?.button}
    >
      {tab.icon && <tab.icon aria-hidden="true" focusable="false" />}
      {tab.title}
      {tab.notify !== null && tab.notify !== undefined && (
        <span
          aria-label={`${tab.notify} notification${tab.notify !== 1 ? "s" : ""}`}
          className={className?.notify}
          style={style?.notify}
        >
          {tab.notify}
        </span>
      )}
    </button>
  );
};
