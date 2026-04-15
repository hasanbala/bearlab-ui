export interface ViewCardClassNames {
  root?: string;
  header?: string;
  title?: string;
  description?: string;
  content?: string;
  icon?: string;
}

export interface ViewCardStyles {
  root?: React.CSSProperties;
  header?: React.CSSProperties;
  title?: React.CSSProperties;
  description?: React.CSSProperties;
  content?: React.CSSProperties;
  icon?: React.CSSProperties;
}

export interface ViewCardProps {
  className?: ViewCardClassNames;
  style?: ViewCardStyles;
  title?: string;
  description?: string;
  children?: React.ReactNode | null | undefined;
  collapsible?: boolean;
  defaultOpen?: boolean;
}
