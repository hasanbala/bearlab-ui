export type TabActionType = "button" | "underline";

export interface TabItem {
  key: number;
  title: string;
  content: string;
  notify: number | null;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null;
}

export interface TabClassNames {
  nav?: string;
  root?: string;
  header?: string;
  button?: string;
  notify?: string;
  content?: string;
}

export interface TabStyles {
  nav?: React.CSSProperties;
  root?: React.CSSProperties;
  header?: React.CSSProperties;
  button?: React.CSSProperties;
  notify?: React.CSSProperties;
  content?: React.CSSProperties;
}

export interface TabProps {
  tabs: TabItem[];
  style?: TabStyles;
  isVertical?: boolean;
  className?: TabClassNames;
  actionType: TabActionType;
}

export interface TabButtonProps {
  tab: TabItem;
  tabId: string;
  panelId: string;
  isActive: boolean;
  style?: Pick<TabStyles, "button" | "notify">;
  className?: Pick<TabClassNames, "button" | "notify">;
  onClick: () => void;
}

export interface TabContentProps {
  tab: TabItem;
  tabId: string;
  panelId: string;
  isActive: boolean;
  style?: Pick<TabStyles, "content">;
  className?: Pick<TabClassNames, "content">;
}
