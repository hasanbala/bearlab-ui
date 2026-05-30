import classNames from "classnames";
import styles from "../styles/date.module.scss";
import { YearPickerProps } from "../types/date.types";

export const YearPicker = (props: YearPickerProps) => {
  const { yearRangeStart, getYearStatus, onYearClick, onYearHover } = props;

  const years = Array.from({ length: 12 }, (_, i) => yearRangeStart + i);

  return (
    <div className={styles.yearPickerGrid}>
      {years.map((year) => {
        const {
          isSelected,
          isInSelectedRange,
          isRangeStart,
          isRangeEnd,
          isDisabled,
          isHoverRange,
          isCurrentYear,
        } = getYearStatus(year);

        return (
          <button
            key={year}
            type="button"
            disabled={isDisabled}
            aria-selected={isSelected || isRangeStart || isRangeEnd}
            onClick={() => !isDisabled && onYearClick(year)}
            onMouseEnter={() => onYearHover?.(year)}
            onMouseLeave={() => onYearHover?.(null)}
            className={classNames(styles.yearCell, {
              [styles.yearSelected]: isSelected || isRangeStart || isRangeEnd,
              [styles.yearRangeStart]: isRangeStart && !isRangeEnd,
              [styles.yearRangeEnd]: isRangeEnd && !isRangeStart,
              [styles.yearInRange]:
                isInSelectedRange && !isRangeStart && !isRangeEnd,
              [styles.yearHoverRange]:
                isHoverRange && !isRangeStart && !isRangeEnd,
              [styles.yearToday]:
                isCurrentYear && !isSelected && !isRangeStart && !isRangeEnd,
              [styles.yearDisabled]: isDisabled,
            })}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
};
