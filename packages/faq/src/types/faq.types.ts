export type FaqIconTypeStringValues =
  | "add"
  | "none"
  | "tick"
  | "dots"
  | "export"
  | "update"
  | "search"
  | "notify"
  | "document"
  | "support";

export interface FaqClassNames {
  root?: string;
  item?: string;
  icon?: string;
  text?: string;
  title?: string;
  header?: string;
  content?: string;
}

export interface FaqStyles {
  root?: React.CSSProperties;
  item?: React.CSSProperties;
  icon?: React.CSSProperties;
  text?: React.CSSProperties;
  title?: React.CSSProperties;
  header?: React.CSSProperties;
  content?: React.CSSProperties;
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
  style?: FaqStyles;
  className?: FaqClassNames;
  toggleAccordion?: () => void;
}

export interface FaqItemV1Props {
  title: string;
  isOpen: boolean;
  content: string;
  id: string | number;
  style?: FaqItemV1Styles;
  className?: FaqItemV1ClassNames;
  onToggle: () => void;
  renderContent?: (content: string) => React.ReactNode;
  renderTitle?: (title: string, isOpen: boolean) => React.ReactNode;
}

export interface FaqItemV1Styles {
  root?: React.CSSProperties;
  icon?: React.CSSProperties;
  text?: React.CSSProperties;
  header?: React.CSSProperties;
  contentInner?: React.CSSProperties;
  titleWrapper?: React.CSSProperties;
  accordionItem?: React.CSSProperties;
  contentWrapper?: React.CSSProperties;
}

export interface FaqItemV1ClassNames {
  root?: string;
  text?: string;
  icon?: string;
  header?: string;
  contentInner?: string;
  titleWrapper?: string;
  accordionItem?: string;
  contentWrapper?: string;
}

export interface FaqV1Props {
  data: FaqData[];
  style?: FaqItemV1Styles;
  allowMultiple?: boolean;
  defaultOpenIndexes?: number[];
  className?: FaqItemV1ClassNames;
  renderTitle?: FaqItemV1Props["renderTitle"];
  renderContent?: FaqItemV1Props["renderContent"];
}

export interface FaqV2Props {
  data: FaqData[];
  style?: FaqStyles;
  className?: FaqClassNames;
}

export interface FaqV3ItemProps {
  item: FaqData;
  style?: FaqStyles;
  className?: FaqClassNames;
  iconType: {
    default: FaqIconTypeStringValues;
    custom?: null | React.ReactElement;
  };
}

export interface FaqV3Props extends FaqV2Props {
  iconType: {
    default: FaqIconTypeStringValues;
    custom?: null | React.ReactElement;
  };
}
