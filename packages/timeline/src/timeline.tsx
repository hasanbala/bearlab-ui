import classnames from "classnames";
import type { TimelineProps } from "./types/timeline.types";
import { useTimelineItems } from "./hooks/use-timeline-items";
import { TimelineItemNode } from "./components/timeline-item";
import styles from "./styles/timeline.module.scss";

export const Timeline = (props: TimelineProps) => {
  const {
    items,
    mode = "left",
    orientation = "vertical",
    pending,
    pendingDot,
    reverse,
    solid,
    className,
    style,
  } = props;

  const resolvedItems = useTimelineItems({
    items,
    mode,
    reverse,
    pending,
    pendingDot,
  });

  const hasLabels = resolvedItems.some(
    (r) => r.item.label !== undefined && r.item.label !== null
  );

  return (
    <div className={styles.timelineRoot}>
      <ul
        role="list"
        data-orientation={orientation}
        data-mode={mode}
        className={classnames(
          styles.container,
          orientation === "horizontal"
            ? styles.rootHorizontal
            : styles.rootVertical,
          styles[`mode${mode[0].toUpperCase()}${mode.slice(1)}`],
          hasLabels && styles.hasLabels,
          className?.root
        )}
        style={style?.root}
      >
        {resolvedItems.map((resolved) => (
          <TimelineItemNode
            key={resolved.key}
            resolved={resolved}
            orientation={orientation}
            hasLabels={hasLabels}
            solid={solid}
            className={className}
            style={style}
          />
        ))}
      </ul>
    </div>
  );
};
