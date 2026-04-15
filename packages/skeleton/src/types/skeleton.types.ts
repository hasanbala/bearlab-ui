export type SkeletonVariant = "default" | "article" | "card" | "list";

export interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
  lines?: number;
  animated?: boolean;
  style?: React.CSSProperties;
}

export interface SkeletonLineProps {
  animated: boolean;
  style?: React.CSSProperties;
}

export interface SkeletonArticleProps {
  animated: boolean;
  lines: number;
}

export interface SkeletonCardProps {
  animated: boolean;
  lines: number;
}

export interface SkeletonListProps {
  animated: boolean;
  lines: number;
}

export interface SkeletonListItemProps {
  animated: boolean;
}

export interface SkeletonDefaultProps {
  animated: boolean;
  lines: number;
}
