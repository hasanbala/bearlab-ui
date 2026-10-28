export type TabActionType = "button" | "underline";

export type TabKey = string | number;

export interface TabItem {
  key: TabKey;
  disabled?: boolean;
  title: React.ReactNode;
  content: React.ReactNode;
  notify?: number | null;
  icon?: React.ElementType | null;
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
  activeKey?: TabKey;
  defaultActiveKey?: TabKey;
  onChange?: (key: TabKey) => void;
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
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export interface TabContentProps {
  tab: TabItem;
  tabId: string;
  panelId: string;
  isActive: boolean;
  style?: Pick<TabStyles, "content">;
  className?: Pick<TabClassNames, "content">;
}

export interface UseTabProps {
  tabs: TabItem[];
  activeKey?: TabKey;
  defaultActiveKey?: TabKey;
  onChange?: (key: TabKey) => void;
}

export interface UseTabReturn {
  activeTab: TabKey | undefined;
  setActiveTab: (key: TabKey) => void;
}
