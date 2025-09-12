import { useState } from "react";
import classnames from "classnames";
import styles from "./tab.module.scss";

export const Tab = (props: Props) => {
  const { tabs, actionType, isVertical } = props;

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      className={classnames(
        styles.container,
        actionType == "underline" && styles.underLine,
        isVertical && styles.vertical
      )}
    >
      <div className={styles.header}>
        <nav>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={activeTab == tab.key ? styles.active : styles.inactive}
            >
              {tab.icon && <tab.icon />}
              {tab.title}
              {tab.notify && <span>{tab.notify}</span>}
            </button>
          ))}
        </nav>
      </div>
      <div className={styles.content}>
        {tabs.map(
          (tab) =>
            activeTab == tab.key && (
              <div key={tab.key}>
                <h3>{tab.title}</h3>
                <p>{tab.content}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export interface Props {
  tabs: {
    key: number;
    title: string;
    content: string;
    notify: number | null;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null;
  }[];
  actionType: "button" | "underline";
  isVertical?: boolean;
}
