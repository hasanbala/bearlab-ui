import classnames from "classnames";
import { useProgress } from "./hooks/use-progress";
import { ProgressLine } from "./components/progress-line";
import { ProgressSteps } from "./components/progress-steps";
import { ProgressCircle } from "./components/progress-circle";
import type { ProgressProps } from "./types/progress.types";
import styles from "./styles/progress.module.scss";

export const Progress = (props: ProgressProps) => {
  const {
    type = "line",
    percent,
    value,
    minValue,
    maxValue,
    status,
    indeterminate = false,
    bufferValue,
    showInfo = true,
    format,
    size = "default",
    strokeWidth,
    strokeColor,
    trailColor,
    strokeLinecap = "round",
    steps,
    gapDegree,
    gapPosition,
    "aria-label": ariaLabel,
    className,
    style,
  } = props;

  const {
    percent: resolvedPercent,
    bufferPercent,
    status: resolvedStatus,
    displayPercent,
  } = useProgress({
    percent,
    value,
    minValue,
    maxValue,
    status,
    bufferValue,
    indeterminate,
  });

  const isCircular = type === "circle" || type === "dashboard";

  const renderContent = () => {
    if (isCircular) {
      return (
        <ProgressCircle
          type={type}
          size={size}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          trailColor={trailColor}
          strokeLinecap={strokeLinecap}
          showInfo={showInfo}
          format={format}
          indeterminate={indeterminate}
          gapDegree={gapDegree}
          gapPosition={gapPosition}
          value={value}
          percent={resolvedPercent}
          displayPercent={displayPercent}
          status={resolvedStatus}
          className={className}
          style={style}
        />
      );
    }

    if (steps) {
      return (
        <ProgressSteps
          steps={steps}
          size={size}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          trailColor={trailColor}
          showInfo={showInfo}
          format={format}
          value={value}
          percent={resolvedPercent}
          displayPercent={displayPercent}
          status={resolvedStatus}
          className={className}
          style={style}
        />
      );
    }

    return (
      <ProgressLine
        size={size}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
        trailColor={trailColor}
        strokeLinecap={strokeLinecap}
        showInfo={showInfo}
        format={format}
        indeterminate={indeterminate}
        value={value}
        percent={resolvedPercent}
        displayPercent={displayPercent}
        bufferPercent={bufferPercent}
        status={resolvedStatus}
        className={className}
        style={style}
      />
    );
  };

  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : displayPercent}
      aria-valuetext={indeterminate ? undefined : `${displayPercent}%`}
      aria-busy={indeterminate || undefined}
      style={style?.root}
      className={classnames(
        styles.container,
        isCircular ? styles.rootCircle : styles.rootLine,
        styles[`root_${resolvedStatus}`],
        className?.root
      )}
    >
      {renderContent()}
    </div>
  );
};
