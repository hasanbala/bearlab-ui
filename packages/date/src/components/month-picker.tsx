import classNames from "classnames";
import { getMonthNames } from "../utils/date-utils";
import styles from "../styles/date.module.scss";
import { MonthPickerProps } from "../types/date.types";

export const MonthPicker = (props: MonthPickerProps) => {
  const { locale, getMonthStatus, onMonthClick, onMonthHover } = props;

  const monthNames = getMonthNames(locale, "short");

  return (
    <div className={styles.monthPickerGrid}>
      {monthNames.map((name, index) => {
        const {
          isSelected,
          isInSelectedRange,
          isRangeStart,
          isRangeEnd,
          isDisabled,
          isHoverRange,
          isCurrentMonth,
        } = getMonthStatus(index);

        return (
          <button
            key={index}
            type="button"
            disabled={isDisabled}
            aria-selected={isSelected || isRangeStart || isRangeEnd}
            onClick={() => !isDisabled && onMonthClick(index)}
            onMouseEnter={() => onMonthHover?.(index)}
            onMouseLeave={() => onMonthHover?.(null)}
            className={classNames(styles.monthCell, {
              [styles.monthSelected]: isSelected || isRangeStart || isRangeEnd,
              [styles.monthRangeStart]: isRangeStart && !isRangeEnd,
              [styles.monthRangeEnd]: isRangeEnd && !isRangeStart,
              [styles.monthInRange]:
                isInSelectedRange && !isRangeStart && !isRangeEnd,
              [styles.monthHoverRange]:
                isHoverRange && !isRangeStart && !isRangeEnd,
              [styles.monthToday]:
                isCurrentMonth && !isSelected && !isRangeStart && !isRangeEnd,
              [styles.monthDisabled]: isDisabled,
            })}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
