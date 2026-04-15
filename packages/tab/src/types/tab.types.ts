export type TabActionType = "button" | "underline";

export interface TabItem {
  key: number;
  title: string;
  content: string;
  notify: number | null;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null;
}

export interface TabClassNames {
  root?: string;
  header?: string;
  nav?: string;
  button?: string;
  notify?: string;
  content?: string;
}

export interface TabStyles {
  root?: React.CSSProperties;
  header?: React.CSSProperties;
  nav?: React.CSSProperties;
  button?: React.CSSProperties;
  notify?: React.CSSProperties;
  content?: React.CSSProperties;
}

export interface TabProps {
  tabs: TabItem[];
  actionType: TabActionType;
  isVertical?: boolean;
  className?: TabClassNames;
  style?: TabStyles;
}

export interface TabButtonProps {
  tab: TabItem;
  isActive: boolean;
  onClick: () => void;
  tabId: string;
  panelId: string;
  className?: Pick<TabClassNames, "button" | "notify">;
  style?: Pick<TabStyles, "button" | "notify">;
}

export interface TabContentProps {
  tab: TabItem;
  isActive: boolean;
  tabId: string;
  panelId: string;
  className?: Pick<TabClassNames, "content">;
  style?: Pick<TabStyles, "content">;
}
