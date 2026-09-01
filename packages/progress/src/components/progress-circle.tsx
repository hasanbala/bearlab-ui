import { useId } from "react";
import classnames from "classnames";
import { ProgressInfo } from "./progress-info";
import type { ProgressCircleProps } from "../types/progress.types";
import {
  CIRCLE_VIEWBOX,
  DEFAULT_GAP_DEGREE,
  DEFAULT_GAP_POSITION,
  SIZE_MAP,
  STATUS_COLOR,
} from "../constants/progress-config";
import {
  getCircleGeometry,
  getCircleGradientCoords,
  getCircleSize,
  getInfoFontSize,
  isGradient,
} from "../utils/progress-utils";
import styles from "../styles/progress.module.scss";

export const ProgressCircle = (props: ProgressCircleProps) => {
  const {
    type = "circle",
    size,
    strokeWidth,
    strokeColor,
    trailColor,
    strokeLinecap = "round",
    showInfo = true,
    format,
    indeterminate,
    gapDegree,
    gapPosition = DEFAULT_GAP_POSITION,
    value,
    percent,
    displayPercent,
    status,
    className,
    style,
  } = props;

  const gradientId = useId();
  const isDashboard = type === "dashboard";
  const diameter = getCircleSize(size);

  const strokeUnits =
    strokeWidth != null
      ? (strokeWidth / diameter) * CIRCLE_VIEWBOX
      : typeof size === "number"
        ? SIZE_MAP.default.circleStroke
        : SIZE_MAP[size ?? "default"].circleStroke;

  const effectiveGapDegree = isDashboard
    ? (gapDegree ?? DEFAULT_GAP_DEGREE)
    : (gapDegree ?? 0);

  const { perimeter, gapLength, pathString } = getCircleGeometry(
    strokeUnits,
    effectiveGapDegree,
    isDashboard ? gapPosition : "top"
  );

  const visibleLength = perimeter - gapLength;
  const dashOffset = -gapLength / 2;

  const gradient = isGradient(strokeColor) ? strokeColor : null;
  const gradientCoords = gradient
    ? getCircleGradientCoords(gradient.direction)
    : null;
  const pathStroke = gradient
    ? `url(#${gradientId})`
    : ((typeof strokeColor === "string" ? strokeColor : undefined) ??
      STATUS_COLOR[status]);

  return (
    <div
      style={
        {
          width: diameter,
          height: diameter,
          "--_progress-info-font-size": `${getInfoFontSize(size)}rem`,
          ...style?.inner,
        } as React.CSSProperties
      }
      className={classnames(
        styles.circleInner,
        { [styles.circleIndeterminate]: indeterminate },
        className?.inner
      )}
    >
      <svg
        viewBox={`0 0 ${CIRCLE_VIEWBOX} ${CIRCLE_VIEWBOX}`}
        className={styles.circleSvg}
        role="presentation"
      >
        {gradient && gradientCoords && (
          <defs>
            <linearGradient
              id={gradientId}
              x1={gradientCoords.x1}
              y1={gradientCoords.y1}
              x2={gradientCoords.x2}
              y2={gradientCoords.y2}
            >
              <stop offset="0%" stopColor={gradient.from} />
              <stop offset="100%" stopColor={gradient.to} />
            </linearGradient>
          </defs>
        )}
        <path
          d={pathString}
          fill="none"
          strokeWidth={strokeUnits}
          strokeLinecap={strokeLinecap}
          className={classnames(styles.circleTrail, className?.trail)}
          style={{
            ...(trailColor ? { stroke: trailColor } : {}),
            strokeDasharray: `${visibleLength}px ${perimeter}px`,
            strokeDashoffset: `${dashOffset}px`,
            ...style?.trail,
          }}
        />
        <path
          d={pathString}
          fill="none"
          strokeWidth={strokeUnits}
          strokeLinecap={strokeLinecap}
          className={classnames(
            styles.circlePath,
            styles[`circlePath_${status}`],
            { [styles.circlePathIndeterminate]: indeterminate },
            className?.bar
          )}
          style={
            indeterminate
              ? {
                  strokeDasharray: `${visibleLength * 0.25}px ${perimeter}px`,
                  strokeDashoffset: `${dashOffset}px`,
                  ...style?.bar,
                }
              : {
                  ...(pathStroke ? { stroke: pathStroke } : {}),
                  strokeDasharray: `${(percent / 100) * visibleLength}px ${perimeter}px`,
                  strokeDashoffset: `${dashOffset}px`,
                  ...style?.bar,
                }
          }
        />
      </svg>
      {showInfo && !indeterminate && (
        <ProgressInfo
          type="circle"
          value={value}
          status={status}
          format={format}
          displayPercent={displayPercent}
          className={className}
          style={style}
        />
      )}
    </div>
  );
};
