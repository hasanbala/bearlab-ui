export type TimelineMode = "left" | "right" | "alternate";
export type TimelineOrientation = "vertical" | "horizontal";
export type TimelineItemPosition = "left" | "right";
export type StatusKey = "success" | "warning" | "error" | "info";
export type TimelineIcon = React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
>;

export interface TimelineItem {
  key?: string | number;
  content?: React.ReactNode;
  label?: React.ReactNode;
  color?: string;
  dot?: React.ReactNode;
  icon?: TimelineIcon;
  position?: TimelineItemPosition;
  onClick?: (item: TimelineItem, index: number) => void;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
  info?: boolean;
  isActive?: boolean;
  isPing?: boolean;
}

export interface TimelineClassNames {
  root?: string;
  item?: string;
  itemTail?: string;
  itemHead?: string;
  itemDot?: string;
  itemDotCustom?: string;
  itemContent?: string;
  itemLabel?: string;
  pending?: string;
  pendingDot?: string;
}

export interface TimelineStyles {
  root?: React.CSSProperties;
  item?: React.CSSProperties;
  itemTail?: React.CSSProperties;
  itemHead?: React.CSSProperties;
  itemDot?: React.CSSProperties;
  itemDotCustom?: React.CSSProperties;
  itemContent?: React.CSSProperties;
  itemLabel?: React.CSSProperties;
  pending?: React.CSSProperties;
  pendingDot?: React.CSSProperties;
}

export interface TimelineProps {
  items: TimelineItem[];
  mode?: TimelineMode;
  orientation?: TimelineOrientation;
  pending?: React.ReactNode | boolean;
  pendingDot?: React.ReactNode;
  reverse?: boolean;
  solid?: boolean;
  className?: TimelineClassNames;
  style?: TimelineStyles;
}

export interface ResolvedTimelineItem {
  key: string | number;
  item: TimelineItem;
  index: number;
  isPending: boolean;
  isLast: boolean;
  side: TimelineItemPosition;
}

export interface UseTimelineItems {
  items: TimelineItem[];
  mode: TimelineMode;
  reverse?: boolean;
  pending?: React.ReactNode | boolean;
  pendingDot?: React.ReactNode;
}

export interface TimelineItemProps {
  resolved: ResolvedTimelineItem;
  orientation: TimelineOrientation;
  hasLabels: boolean;
  solid?: boolean;
  className?: TimelineClassNames;
  style?: TimelineStyles;
}
