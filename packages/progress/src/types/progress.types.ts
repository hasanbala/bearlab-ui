export type ProgressType = "line" | "circle" | "dashboard";
export type ProgressStatus = "normal" | "active" | "success" | "exception";
export type ProgressSize = "small" | "default" | "large" | number;
export type StrokeLinecap = "round" | "butt" | "square";
export type GapPosition = "top" | "bottom" | "left" | "right";
export type DirectionType =
  | "to top"
  | "to top right"
  | "to right top"
  | "to right"
  | "to bottom right"
  | "to right bottom"
  | "to bottom"
  | "to bottom left"
  | "to left bottom"
  | "to left"
  | "to top left"
  | "to left top";
export type StrokeColor =
  | string
  | { from: string; to: string; direction?: DirectionType };

export interface ProgressStepsConfig {
  count: number;
  gap?: number;
}

export interface ProgressInfo {
  value?: number;
}

export interface ProgressProps {
  type?: ProgressType;
  percent?: number;
  value?: number;
  minValue?: number;
  maxValue?: number;
  status?: ProgressStatus;
  indeterminate?: boolean;
  bufferValue?: number;
  showInfo?: boolean;
  format?: (percent: number, info: ProgressInfo) => React.ReactNode;
  size?: ProgressSize;
  strokeWidth?: number;
  strokeColor?: StrokeColor;
  trailColor?: string;
  strokeLinecap?: StrokeLinecap;
  steps?: number | ProgressStepsConfig;
  gapDegree?: number;
  gapPosition?: GapPosition;
  "aria-label"?: string;
  className?: ProgressClassNames;
  style?: ProgressStyles;
}

export interface ProgressClassNames {
  root?: string;
  inner?: string;
  bar?: string;
  trail?: string;
  buffer?: string;
  info?: string;
  text?: string;
  steps?: string;
  step?: string;
  stepActive?: string;
}

export interface ProgressStyles {
  root?: React.CSSProperties;
  inner?: React.CSSProperties;
  bar?: React.CSSProperties;
  trail?: React.CSSProperties;
  buffer?: React.CSSProperties;
  info?: React.CSSProperties;
  text?: React.CSSProperties;
  steps?: React.CSSProperties;
  step?: React.CSSProperties;
  stepActive?: React.CSSProperties;
}

export interface ProgressCircleProps extends Pick<
  ProgressProps,
  | "type"
  | "size"
  | "strokeWidth"
  | "strokeColor"
  | "trailColor"
  | "strokeLinecap"
  | "showInfo"
  | "format"
  | "indeterminate"
  | "gapDegree"
  | "gapPosition"
  | "value"
  | "className"
  | "style"
> {
  percent: number;
  displayPercent: number;
  status: ProgressStatus;
}

export interface ProgressInfoProps {
  displayPercent: number;
  status: ProgressStatus;
  type: "line" | "circle";
  value?: number;
  format?: (percent: number, info: ProgressInfo) => React.ReactNode;
  className?: ProgressClassNames;
  style?: ProgressStyles;
}

export interface ProgressStepsProps extends Pick<
  ProgressProps,
  | "size"
  | "strokeWidth"
  | "strokeColor"
  | "trailColor"
  | "showInfo"
  | "format"
  | "value"
  | "className"
  | "style"
> {
  steps: number | ProgressStepsConfig;
  percent: number;
  displayPercent: number;
  status: ProgressStatus;
}

export type UseProgressParams = Pick<
  ProgressProps,
  | "percent"
  | "value"
  | "minValue"
  | "maxValue"
  | "status"
  | "bufferValue"
  | "indeterminate"
>;

export interface UseProgressReturn {
  percent: number;
  bufferPercent: number | null;
  status: ProgressStatus;
  isComplete: boolean;
  displayPercent: number;
}

export interface ProgressLineProps extends Pick<
  ProgressProps,
  | "size"
  | "strokeWidth"
  | "strokeColor"
  | "trailColor"
  | "strokeLinecap"
  | "showInfo"
  | "format"
  | "indeterminate"
  | "value"
  | "className"
  | "style"
> {
  percent: number;
  displayPercent: number;
  bufferPercent: number | null;
  status: ProgressStatus;
}

export interface CircleGeometry {
  radius: number;
  perimeter: number;
  gapLength: number;
  pathString: string;
}

export interface ResolvePercentParams {
  percent?: number;
  value?: number;
  minValue?: number;
  maxValue?: number;
}

export interface SizePreset {
  lineHeight: number;
  circleSize: number;
  circleStroke: number;
  fontSize: number;
}
