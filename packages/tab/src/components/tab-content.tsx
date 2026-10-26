import type { TabContentProps } from "../types/tab.types";
import styles from "../styles/tab.module.scss";

export const TabContent = (props: TabContentProps) => {
  const { tab, isActive, tabId, panelId, className, style } = props;

  if (!isActive) return null;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
      className={className?.content}
      style={style?.content}
    >
      <h3>{tab.title}</h3>
      <div className={styles.text}>{tab.content}</div>
    </div>
  );
};
