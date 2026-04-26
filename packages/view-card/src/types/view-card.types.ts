export interface ViewCardClassNames {
  root?: string;
  icon?: string;
  title?: string;
  header?: string;
  content?: string;
  description?: string;
}

export interface ViewCardStyles {
  root?: React.CSSProperties;
  icon?: React.CSSProperties;
  title?: React.CSSProperties;
  header?: React.CSSProperties;
  content?: React.CSSProperties;
  description?: React.CSSProperties;
}

export interface ViewCardProps {
  title?: string;
  description?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  style?: ViewCardStyles;
  className?: ViewCardClassNames;
  children?: React.ReactNode | null | undefined;
}
