export type SkeletonVariant =
  | "default"
  | "article"
  | "card"
  | "list"
  | "modal"
  | "profile"
  | "table"
  | "form";

export interface SkeletonClassNames {
  root?: string;
  content?: string;
  header?: string;
  body?: string;
  footer?: string;
  avatar?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  line?: string;
  image?: string;
  item?: string;
  label?: string;
  input?: string;
  button?: string;
  row?: string;
  cell?: string;
}

export interface SkeletonStyles {
  root?: React.CSSProperties;
  content?: React.CSSProperties;
  header?: React.CSSProperties;
  body?: React.CSSProperties;
  footer?: React.CSSProperties;
  avatar?: React.CSSProperties;
  title?: React.CSSProperties;
  subtitle?: React.CSSProperties;
  description?: React.CSSProperties;
  line?: React.CSSProperties;
  image?: React.CSSProperties;
  item?: React.CSSProperties;
  label?: React.CSSProperties;
  input?: React.CSSProperties;
  button?: React.CSSProperties;
  row?: React.CSSProperties;
  cell?: React.CSSProperties;
}

export interface SkeletonProps {
  lines?: number;
  className?: SkeletonClassNames;
  animated?: boolean;
  variant?: SkeletonVariant;
  style?: SkeletonStyles;
}

export interface SkeletonLineProps {
  animated: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface SkeletonArticleProps {
  lines: number;
  animated: boolean;
  className?: SkeletonClassNames;
  style?: SkeletonStyles;
}

export interface SkeletonCardProps {
  lines: number;
  animated: boolean;
  className?: SkeletonClassNames;
  style?: SkeletonStyles;
}

export interface SkeletonListProps {
  lines: number;
  animated: boolean;
  className?: SkeletonClassNames;
  style?: SkeletonStyles;
}

export interface SkeletonListItemProps {
  animated: boolean;
  className?: SkeletonClassNames;
  style?: SkeletonStyles;
}

export interface SkeletonDefaultProps {
  lines: number;
  animated: boolean;
  className?: SkeletonClassNames;
  style?: SkeletonStyles;
}

export interface SkeletonModalProps {
  lines: number;
  animated: boolean;
  className?: SkeletonClassNames;
  style?: SkeletonStyles;
}

export interface SkeletonProfileProps {
  lines: number;
  animated: boolean;
  className?: SkeletonClassNames;
  style?: SkeletonStyles;
}

export interface SkeletonTableProps {
  lines: number;
  animated: boolean;
  className?: SkeletonClassNames;
  style?: SkeletonStyles;
}

export interface SkeletonFormProps {
  lines: number;
  animated: boolean;
  className?: SkeletonClassNames;
  style?: SkeletonStyles;
}
