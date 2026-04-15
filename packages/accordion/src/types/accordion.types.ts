export interface AccordionDataItem {
  title: string;
  content: string;
  id?: string | number;
}

export interface AccordionItemProps {
  id: string | number;
  title: string;
  isOpen: boolean;
  content: string;
  style?: AccordionStyles;
  className?: AccordionClassNames;
  onToggle: () => void;
  renderContent?: (content: string) => React.ReactNode;
  renderTitle?: (title: string, isOpen: boolean) => React.ReactNode;
}

export interface AccordionProps {
  style?: AccordionStyles;
  allowMultiple?: boolean;
  items: AccordionDataItem[];
  className?: AccordionClassNames;
  defaultOpenIndexes?: number[];
  renderTitle?: AccordionItemProps["renderTitle"];
  renderContent?: AccordionItemProps["renderContent"];
}

export interface AccordionStyles {
  root?: React.CSSProperties;
  accordionItem?: React.CSSProperties;
  header?: React.CSSProperties;
  titleWrapper?: React.CSSProperties;
  icon?: React.CSSProperties;
  contentWrapper?: React.CSSProperties;
  contentInner?: React.CSSProperties;
  text?: React.CSSProperties;
}

export interface AccordionClassNames {
  root?: string;
  accordionItem?: string;
  header?: string;
  titleWrapper?: string;
  icon?: string;
  contentWrapper?: string;
  contentInner?: string;
  text?: string;
}
