import type {
  GapPosition,
  ProgressProps,
  ProgressSize,
  ProgressStatus,
  SizePreset,
} from "../types/progress.types";

export const DEFAULT_GAP_DEGREE = 75;
export const DEFAULT_GAP_POSITION: GapPosition = "bottom";
export const CIRCLE_VIEWBOX = 100;

export const SIZE_MAP: Record<Exclude<ProgressSize, number>, SizePreset> = {
  small: { lineHeight: 6, circleSize: 80, circleStroke: 6, fontSize: 0.75 },
  default: { lineHeight: 8, circleSize: 120, circleStroke: 6, fontSize: 1 },
  large: { lineHeight: 12, circleSize: 160, circleStroke: 6, fontSize: 1.25 },
};

export const STATUS_COLOR: Partial<Record<ProgressStatus, string>> = {
  success: "#12b76a",
  exception: "#f04438",
};

export const RADIUS_BY_LINECAP: Record<
  NonNullable<ProgressProps["strokeLinecap"]>,
  string
> = {
  round: "9999px",
  square: "0",
  butt: "0",
};
