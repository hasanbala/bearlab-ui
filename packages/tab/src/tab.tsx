import classnames from "classnames";
import styles from "./styles/tab.module.scss";
import type { TabProps } from "./types/tab.types";
import { useTab } from "./hooks/use-tab";
import { TabButton } from "./components/tab-button";
import { TabContent } from "./components/tab-content";

export const Tab = (props: TabProps) => {
  const { tabs, actionType, isVertical, className, style } = props;
  const { activeTab, setActiveTab } = useTab(tabs[0]?.key ?? 0);

  return (
    <div
      className={classnames(
        styles.container,
        actionType === "underline" && styles.underLine,
        isVertical && styles.vertical,
        className?.root
      )}
      style={style?.root}
    >
      <div
        className={classnames(styles.header, className?.header)}
        style={style?.header}
      >
        <nav
          role="tablist"
          aria-orientation={isVertical ? "vertical" : "horizontal"}
          className={className?.nav}
          style={style?.nav}
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              tab={tab}
              isActive={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              tabId={`tab-${tab.key}`}
              panelId={`tabpanel-${tab.key}`}
              className={{
                button: className?.button,
                notify: className?.notify,
              }}
              style={{ button: style?.button, notify: style?.notify }}
            />
          ))}
        </nav>
      </div>
      <div
        className={classnames(styles.content, className?.content)}
        style={style?.content}
      >
        {tabs.map((tab) => (
          <TabContent
            key={tab.key}
            tab={tab}
            isActive={activeTab === tab.key}
            tabId={`tab-${tab.key}`}
            panelId={`tabpanel-${tab.key}`}
          />
        ))}
      </div>
    </div>
  );
};
