import { getMonthNames } from "../utils/date-utils";
import { IconChevronLeft, IconChevronRight } from "../assets/icons";
import styles from "../styles/date.module.scss";
import { CalendarHeaderProps } from "../types/date.types";

export const CalendarHeader = (props: CalendarHeaderProps) => {
  const {
    viewYear,
    viewMonth,
    viewMode,
    yearRangeStart,
    locale,
    canGoPrev,
    canGoNext,
    labels,
    onPrev,
    onNext,
    onMonthClick,
    onYearClick,
  } = props;

  const monthNames = getMonthNames(locale, "long");

  const renderTitle = () => {
    if (viewMode === "days") {
      return (
        <div className={styles.monthYearButtons}>
          <button
            type="button"
            className={styles.monthYearButton}
            onClick={onMonthClick}
            aria-label={labels?.selectMonth ?? "Select month"}
          >
            {monthNames[viewMonth]}
          </button>
          <button
            type="button"
            className={styles.monthYearButton}
            onClick={onYearClick}
            aria-label={labels?.selectYear ?? "Select year"}
          >
            {viewYear}
          </button>
        </div>
      );
    }

    if (viewMode === "months") {
      return (
        <button
          type="button"
          className={styles.monthYearButton}
          onClick={onYearClick}
          aria-label={labels?.selectYear ?? "Select year"}
        >
          {viewYear}
        </button>
      );
    }

    return (
      <span className={styles.monthYear}>
        {yearRangeStart}&thinsp;–&thinsp;{yearRangeStart + 11}
      </span>
    );
  };

  return (
    <div className={styles.calendarHeader}>
      <button
        type="button"
        aria-label={labels?.previous ?? "Previous"}
        onClick={onPrev}
        disabled={!canGoPrev}
        className={styles.navButton}
      >
        <IconChevronLeft aria-hidden="true" />
      </button>
      {renderTitle()}
      <button
        type="button"
        aria-label={labels?.next ?? "Next"}
        onClick={onNext}
        disabled={!canGoNext}
        className={styles.navButton}
      >
        <IconChevronRight aria-hidden="true" />
      </button>
    </div>
  );
};
