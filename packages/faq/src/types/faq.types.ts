import type React from "react";

export type FaqIconTypeStringValues =
  | "none"
  | "export"
  | "add"
  | "document"
  | "update"
  | "search"
  | "notify"
  | "dots"
  | "tick"
  | "support";

export interface FaqClassNames {
  root?: string;
  item?: string;
  header?: string;
  title?: string;
  icon?: string;
  content?: string;
  text?: string;
}

export interface FaqStyles {
  root?: React.CSSProperties;
  item?: React.CSSProperties;
  header?: React.CSSProperties;
  title?: React.CSSProperties;
  icon?: React.CSSProperties;
  content?: React.CSSProperties;
  text?: React.CSSProperties;
}

export interface FaqData {
  title: string;
  content: string;
  id?: string | number;
}

export interface FaqItemProps {
  title: string;
  content: string;
  isOpen?: boolean;
  toggleAccordion?: () => void;
  className?: FaqClassNames;
  style?: FaqStyles;
}

export interface FaqItemV1Props {
  id: string | number;
  title: string;
  isOpen: boolean;
  content: string;
  style?: FaqItemV1Styles;
  className?: FaqItemV1ClassNames;
  onToggle: () => void;
  renderContent?: (content: string) => React.ReactNode;
  renderTitle?: (title: string, isOpen: boolean) => React.ReactNode;
}

export interface FaqItemV1Styles {
  root?: React.CSSProperties;
  accordionItem?: React.CSSProperties;
  header?: React.CSSProperties;
  titleWrapper?: React.CSSProperties;
  icon?: React.CSSProperties;
  contentWrapper?: React.CSSProperties;
  contentInner?: React.CSSProperties;
  text?: React.CSSProperties;
}

export interface FaqItemV1ClassNames {
  root?: string;
  accordionItem?: string;
  header?: string;
  titleWrapper?: string;
  icon?: string;
  contentWrapper?: string;
  contentInner?: string;
  text?: string;
}

export interface FaqProps {
  style?: FaqItemV1Styles;
  allowMultiple?: boolean;
  data: FaqData[];
  className?: FaqItemV1ClassNames;
  defaultOpenIndexes?: number[];
  renderTitle?: FaqItemV1Props["renderTitle"];
  renderContent?: FaqItemV1Props["renderContent"];
}

export interface FaqV1Props {
  data: FaqData[];
  className?: FaqClassNames;
  style?: FaqStyles;
}

export interface FaqV3ItemProps {
  item: FaqData;
  iconType: {
    default: FaqIconTypeStringValues;
    custom?: null | React.ReactElement;
  };
  className?: FaqClassNames;
  style?: FaqStyles;
}

export interface FaqV3Props extends FaqProps {
  iconType: {
    default: FaqIconTypeStringValues;
    custom?: null | React.ReactElement;
  };
}
