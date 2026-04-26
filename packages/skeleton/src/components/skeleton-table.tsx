import classnames from "classnames";
import type { SkeletonTableProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

const COLUMN_WIDTHS = [35, 25, 22, 18] as const;

export const SkeletonTable = (props: SkeletonTableProps) => {
  const { animated, lines, className, style } = props;

  return (
    <div
      className={classnames(styles.content, className?.content)}
      style={style?.content}
    >
      <div
        className={classnames(
          styles.tableRow,
          styles.tableHeaderRow,
          className?.row,
        )}
        style={style?.row}
      >
        {COLUMN_WIDTHS.map((width, index) => (
          <div
            key={index}
            className={classnames(
              styles.tableHeaderCell,
              styles.skeleton,
              !animated && styles.static,
              className?.header,
            )}
            style={{ width: `${width}%`, ...style?.header }}
          />
        ))}
      </div>

      <div
        className={classnames(styles.tableBody, className?.body)}
        style={style?.body}
      >
        {Array.from({ length: lines }, (_, rowIndex) => (
          <div
            key={rowIndex}
            className={classnames(styles.tableRow, className?.row)}
            style={style?.row}
          >
            {COLUMN_WIDTHS.map((width, colIndex) => (
              <div
                key={colIndex}
                className={classnames(
                  styles.tableCell,
                  styles.skeleton,
                  !animated && styles.static,
                  className?.cell,
                )}
                style={{
                  width: `${width * (0.65 + Math.random() * 0.35)}%`,
                  ...style?.cell,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
