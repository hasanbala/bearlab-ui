import { useId } from "react";
import classnames from "classnames";
import styles from "./styles/tab.module.scss";
import type { TabProps } from "./types/tab.types";
import { useTab } from "./hooks/use-tab";
import { TabButton } from "./components/tab-button";
import { TabContent } from "./components/tab-content";

export const Tab = (props: TabProps) => {
  const {
    tabs,
    style,
    activeKey,
    className,
    actionType,
    isVertical,
    defaultActiveKey,
    onChange,
  } = props;
  const { activeTab, setActiveTab } = useTab({
    tabs,
    activeKey,
    defaultActiveKey,
    onChange,
  });
  const uid = useId();
  const getTabId = (index: number) => `${uid}-tab-${index}`;
  const getPanelId = (index: number) => `${uid}-tabpanel-${index}`;

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";
    const nextKey = isVertical ? "ArrowDown" : "ArrowRight";
    const enabled = tabs
      .map((tab, i) => ({ tab, i }))
      .filter(({ tab }) => !tab.disabled);
    const position = enabled.findIndex(({ i }) => i === index);
    if (!enabled.length) return;

    let target: (typeof enabled)[number] | undefined;
    if (event.key === nextKey) target = enabled[(position + 1) % enabled.length];
    else if (event.key === prevKey)
      target = enabled[(position - 1 + enabled.length) % enabled.length];
    else if (event.key === "Home") target = enabled[0];
    else if (event.key === "End") target = enabled[enabled.length - 1];
    if (!target) return;

    event.preventDefault();
    setActiveTab(target.tab.key);
    document.getElementById(getTabId(target.i))?.focus();
  };

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
          {tabs.map((tab, index) => (
            <TabButton
              key={tab.key}
              tab={tab}
              isActive={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              tabId={getTabId(index)}
              panelId={getPanelId(index)}
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
        {tabs.map((tab, index) => (
          <TabContent
            key={tab.key}
            tab={tab}
            isActive={activeTab === tab.key}
            tabId={getTabId(index)}
            panelId={getPanelId(index)}
          />
        ))}
      </div>
    </div>
  );
};
