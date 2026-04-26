export interface AccordionDataItem {
  title: string;
  content: string;
  id?: string | number;
}

export interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  content: string;
  id: string | number;
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
  defaultOpenIndexes?: number[];
  className?: AccordionClassNames;
  renderTitle?: AccordionItemProps["renderTitle"];
  renderContent?: AccordionItemProps["renderContent"];
}

export interface AccordionStyles {
  root?: React.CSSProperties;
  icon?: React.CSSProperties;
  text?: React.CSSProperties;
  header?: React.CSSProperties;
  titleWrapper?: React.CSSProperties;
  contentInner?: React.CSSProperties;
  accordionItem?: React.CSSProperties;
  contentWrapper?: React.CSSProperties;
}

export interface AccordionClassNames {
  root?: string;
  icon?: string;
  text?: string;
  header?: string;
  contentInner?: string;
  titleWrapper?: string;
  accordionItem?: string;
  contentWrapper?: string;
}
