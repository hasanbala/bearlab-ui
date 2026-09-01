import type {
  CircleGeometry,
  DirectionType,
  GapPosition,
  ProgressSize,
  ProgressStatus,
  ResolvePercentParams,
  StrokeColor,
} from "../types/progress.types";
import { SIZE_MAP } from "../constants/progress-config";

export const clamp = (n: number, min: number, max: number): number =>
  Math.min(Math.max(n, min), max);

export const resolvePercent = ({
  percent,
  value,
  minValue = 0,
  maxValue = 100,
}: ResolvePercentParams): number => {
  if (percent != null) return clamp(percent, 0, 100);

  if (value != null) {
    const range = maxValue - minValue;
    if (range <= 0) return 0;
    return clamp(((value - minValue) / range) * 100, 0, 100);
  }

  return 0;
};

export const resolveStatus = (
  percent: number,
  status?: ProgressStatus
): ProgressStatus => {
  if (status) return status;
  return percent >= 100 ? "success" : "normal";
};

export const isGradient = (
  color?: StrokeColor
): color is { from: string; to: string; direction?: DirectionType } =>
  typeof color === "object" &&
  color !== null &&
  "from" in color &&
  "to" in color;

const DIRECTION_KEYWORDS: Record<string, number> = {
  "to top": 0,
  "to top right": 45,
  "to right top": 45,
  "to right": 90,
  "to bottom right": 135,
  "to right bottom": 135,
  "to bottom": 180,
  "to bottom left": 225,
  "to left bottom": 225,
  "to left": 270,
  "to top left": 315,
  "to left top": 315,
};

export const getCircleGradientCoords = (
  direction?: string
): { x1: string; y1: string; x2: string; y2: string } => {
  let deg = 90;
  if (direction) {
    const match = direction.match(/^(-?[\d.]+)deg$/i);
    if (match) {
      deg = parseFloat(match[1]);
    } else {
      deg = DIRECTION_KEYWORDS[direction.toLowerCase().trim()] ?? 90;
    }
  }
  const rad = (deg * Math.PI) / 180;
  const fmt = (n: number) => `${(n * 100).toFixed(2)}%`;
  return {
    x1: fmt(0.5 - 0.5 * Math.sin(rad)),
    y1: fmt(0.5 + 0.5 * Math.cos(rad)),
    x2: fmt(0.5 + 0.5 * Math.sin(rad)),
    y2: fmt(0.5 - 0.5 * Math.cos(rad)),
  };
};

export const getLineColor = (color?: StrokeColor): string | undefined => {
  if (!color) return undefined;
  if (typeof color === "string") return color;
  const direction = color.direction ?? "to right";
  return `linear-gradient(${direction}, ${color.from}, ${color.to})`;
};

export const getLineHeight = (
  size: ProgressSize = "default",
  strokeWidth?: number
): number => {
  if (strokeWidth != null) return strokeWidth;
  if (typeof size === "number") return size;
  return SIZE_MAP[size].lineHeight;
};

export const getCircleSize = (size: ProgressSize = "default"): number => {
  if (typeof size === "number") return size;
  return SIZE_MAP[size].circleSize;
};

export const getInfoFontSize = (size: ProgressSize = "default"): number => {
  if (typeof size === "number") return SIZE_MAP.default.fontSize;
  return SIZE_MAP[size].fontSize;
};

export const getCircleGeometry = (
  strokeWidth: number,
  gapDegree: number,
  gapPosition: GapPosition
): CircleGeometry => {
  const radius = (100 - strokeWidth) / 2;
  const perimeter = 2 * Math.PI * radius;
  const gapLength = perimeter * (clamp(gapDegree, 0, 360) / 360);

  let beginPositionX = 0;
  let beginPositionY = -radius;
  let endPositionX = 0;
  let endPositionY = -radius * 2;

  switch (gapPosition) {
    case "left":
      beginPositionX = -radius;
      beginPositionY = 0;
      endPositionX = radius * 2;
      endPositionY = 0;
      break;
    case "right":
      beginPositionX = radius;
      beginPositionY = 0;
      endPositionX = -radius * 2;
      endPositionY = 0;
      break;
    case "bottom":
      beginPositionY = radius;
      endPositionY = radius * 2;
      break;
    default:
      break;
  }

  const pathString = `M 50,50 m ${beginPositionX},${beginPositionY} a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY} a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;

  return { radius, perimeter, gapLength, pathString };
};
