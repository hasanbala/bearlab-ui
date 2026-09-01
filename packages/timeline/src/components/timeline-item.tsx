import classnames from "classnames";
import type { StatusKey, TimelineItemProps } from "../types/timeline.types";
import {
  IconError,
  IconInfo,
  IconSpinner,
  IconSuccess,
  IconWarning,
} from "../assets/icons";
import styles from "../styles/timeline.module.scss";
import { STATUS_PRIORITY } from "../constants/timeline-config";

const STATUS_ICONS: Record<
  StatusKey,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  success: IconSuccess,
  warning: IconWarning,
  error: IconError,
  info: IconInfo,
};

export const TimelineItemNode = (props: TimelineItemProps) => {
  const { resolved, hasLabels, solid, className, style } = props;
  const { item, index, isPending, isLast, side } = resolved;
  const {
    content,
    label,
    color,
    dot,
    icon: Icon,
    onClick,
    isActive,
    isPing,
  } = item;

  const activeStatus = STATUS_PRIORITY.find((k) => item[k]);

  const dotStyle = color
    ? ({ "--_timeline-dot-color": color } as React.CSSProperties)
    : undefined;

  const isInteractive = typeof onClick === "function";

  const handleClick = () => onClick?.(item, index);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.(item, index);
    }
  };

  const renderDot = () => {
    if (dot) {
      return (
        <span
          className={classnames(
            styles.itemDot,
            styles.itemDotCustom,
            className?.itemDot,
            className?.itemDotCustom,
            isPending && className?.pendingDot
          )}
          style={{ ...style?.itemDot, ...style?.itemDotCustom }}
        >
          {dot}
        </span>
      );
    }

    if (isPending) {
      return (
        <span
          className={classnames(
            styles.itemDot,
            styles.pendingDot,
            className?.itemDot,
            className?.pendingDot
          )}
          style={{ ...style?.itemDot, ...style?.pendingDot }}
        >
          <IconSpinner aria-hidden="true" />
        </span>
      );
    }

    if (activeStatus) {
      const StatusIcon = STATUS_ICONS[activeStatus];
      return (
        <span
          className={classnames(
            styles.itemDot,
            styles.itemDotStatus,
            className?.itemDot
          )}
          style={style?.itemDot}
        >
          {isPing && <span className={styles.pingRing} aria-hidden="true" />}
          <StatusIcon aria-hidden="true" />
        </span>
      );
    }

    return (
      <span
        className={classnames(
          styles.itemDot,
          Icon && styles.itemDotIcon,
          solid && !Icon && styles.itemDotSolid,
          isActive && styles.itemDotActive,
          className?.itemDot
        )}
        style={{ ...dotStyle, ...style?.itemDot }}
      >
        {isActive && (
          <span className={styles.pingRingStatus} aria-hidden="true" />
        )}
        {Icon && <Icon aria-hidden="true" />}
      </span>
    );
  };

  return (
    <li
      className={classnames(
        styles.item,
        side === "left" ? styles.sideLeft : styles.sideRight,
        isLast && styles.itemLast,
        isPending && styles.pending,
        isPending && className?.pending,
        isInteractive && styles.itemClickable,
        className?.item
      )}
      style={{ ...style?.item, ...(isPending ? style?.pending : undefined) }}
    >
      {hasLabels && (
        <div
          className={classnames(styles.itemLabel, className?.itemLabel)}
          style={style?.itemLabel}
          aria-hidden={!label ? "true" : undefined}
        >
          {label}
        </div>
      )}
      <div
        className={classnames(styles.itemHead, className?.itemHead)}
        style={style?.itemHead}
      >
        <span
          aria-hidden="true"
          className={classnames(styles.itemTail, className?.itemTail)}
          style={style?.itemTail}
        />
        {renderDot()}
      </div>
      {(content !== undefined && content !== null) || isInteractive ? (
        <div
          className={classnames(styles.itemContent, className?.itemContent)}
          style={style?.itemContent}
          {...(isInteractive
            ? {
                role: "button",
                tabIndex: 0,
                onClick: handleClick,
                onKeyDown: handleKeyDown,
              }
            : {})}
        >
          {content}
        </div>
      ) : null}
    </li>
  );
};
