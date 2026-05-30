import classNames from "classnames";
import { getWeekdayLabels, isToday } from "../utils/date-utils";
import styles from "../styles/date.module.scss";
import { CalendarGridProps } from "../types/date.types";

export const CalendarGrid = (props: CalendarGridProps) => {
  const {
    calendarDays,
    viewYear,
    viewMonth,
    locale,
    getDayStatus,
    isDayDisabled,
    onDayClick,
    onDayHover,
  } = props;

  const weekdayLabels = getWeekdayLabels(locale);

  return (
    <div className={styles.calendarGrid}>
      <div className={styles.weekdays} aria-hidden="true">
        {weekdayLabels.map((label) => (
          <div key={label} className={styles.weekday}>
            {label}
          </div>
        ))}
      </div>
      <div className={styles.days} role="grid">
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const {
            isSelected,
            isInSelectedRange,
            isRangeStart,
            isRangeEnd,
            isHoverRange,
          } = getDayStatus(date);
          const disabled = isDayDisabled(date);
          const today = isToday(date);
          const isNormalSelected = isSelected && !isInSelectedRange;

          return (
            <button
              key={index}
              type="button"
              role="gridcell"
              tabIndex={isCurrentMonth && !disabled ? 0 : -1}
              disabled={disabled}
              aria-label={date.toLocaleDateString(locale, {
                dateStyle: "long",
              })}
              aria-selected={isSelected || isRangeStart || isRangeEnd}
              aria-current={today ? "date" : undefined}
              aria-disabled={disabled || undefined}
              onClick={() => !disabled && onDayClick(date, viewYear, viewMonth)}
              onMouseEnter={() => !disabled && onDayHover(date)}
              onMouseLeave={() => onDayHover(null)}
              className={classNames(styles.day, {
                [styles.dayOtherMonth]: !isCurrentMonth,
                [styles.dayDisabled]: disabled,
                [styles.dayToday]:
                  today && !isNormalSelected && !isRangeStart && !isRangeEnd,
                [styles.daySelected]: isNormalSelected,
                [styles.dayRangeStart]: isRangeStart,
                [styles.dayRangeEnd]: isRangeEnd && !isRangeStart,
                [styles.dayRangeBoth]: isRangeStart && isRangeEnd,
                [styles.dayInRange]:
                  isInSelectedRange && !isRangeStart && !isRangeEnd,
                [styles.dayHoverRange]: isHoverRange,
              })}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
