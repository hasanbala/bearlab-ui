import classnames from "classnames";
import { ProgressInfo } from "./progress-info";
import type { ProgressStepsProps } from "../types/progress.types";
import { getLineColor, getLineHeight } from "../utils/progress-utils";
import styles from "../styles/progress.module.scss";

export const ProgressSteps = (props: ProgressStepsProps) => {
  const {
    steps,
    size,
    strokeWidth,
    strokeColor,
    trailColor,
    showInfo = true,
    format,
    value,
    percent,
    displayPercent,
    status,
    className,
    style,
  } = props;

  const count = typeof steps === "number" ? steps : steps.count;
  const gap = typeof steps === "number" ? 2 : (steps.gap ?? 2);
  const height = getLineHeight(size, strokeWidth);
  const filledColor = getLineColor(strokeColor);
  const filledCount = Math.round((percent / 100) * count);

  return (
    <div
      style={style?.inner}
      className={classnames(styles.lineInner, className?.inner)}
    >
      <div
        style={{ gap, ...style?.steps }}
        className={classnames(styles.steps, className?.steps)}
      >
        {Array.from({ length: count }, (_, index) => {
          const isActive = index < filledCount;

          return (
            <span
              key={index}
              style={{
                height,
                ...(isActive
                  ? { background: filledColor, ...style?.stepActive }
                  : { ...(trailColor ? { backgroundColor: trailColor } : {}) }),
                ...style?.step,
              }}
              className={classnames(
                styles.step,
                isActive && styles.stepActive,
                isActive && styles[`step_${status}`],
                className?.step,
                isActive && className?.stepActive
              )}
            />
          );
        })}
      </div>
      {showInfo && (
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
