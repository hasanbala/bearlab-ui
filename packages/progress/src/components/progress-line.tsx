import classnames from "classnames";
import { ProgressInfo } from "./progress-info";
import type { ProgressLineProps } from "../types/progress.types";
import { getLineColor, getLineHeight } from "../utils/progress-utils";
import styles from "../styles/progress.module.scss";
import { RADIUS_BY_LINECAP } from "../constants/progress-config";

export const ProgressLine = (props: ProgressLineProps) => {
  const {
    size,
    strokeWidth,
    strokeColor,
    trailColor,
    strokeLinecap = "round",
    showInfo = true,
    format,
    indeterminate,
    value,
    percent,
    displayPercent,
    bufferPercent,
    status,
    className,
    style,
  } = props;

  const height = getLineHeight(size, strokeWidth);
  const barColor = getLineColor(strokeColor);
  const borderRadius = RADIUS_BY_LINECAP[strokeLinecap];

  return (
    <div
      style={style?.inner}
      className={classnames(styles.lineInner, className?.inner)}
    >
      <div
        style={{
          height,
          borderRadius,
          ...(trailColor ? { backgroundColor: trailColor } : {}),
          ...style?.trail,
        }}
        className={classnames(styles.lineTrail, className?.trail)}
      >
        {bufferPercent != null && !indeterminate && (
          <div
            style={{
              width: `${bufferPercent}%`,
              borderRadius,
              ...style?.buffer,
            }}
            className={classnames(styles.lineBuffer, className?.buffer)}
          />
        )}
        <div
          style={{
            borderRadius,
            ...(indeterminate ? {} : { width: `${percent}%` }),
            ...(barColor ? { background: barColor } : {}),
            ...style?.bar,
          }}
          className={classnames(
            styles.lineBar,
            styles[`lineBar_${status}`],
            { [styles.lineBarIndeterminate]: indeterminate },
            className?.bar
          )}
        />
      </div>
      {showInfo && !indeterminate && (
        <ProgressInfo
          type="line"
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
