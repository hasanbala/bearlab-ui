import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";
import { MonthPicker } from "./month-picker";
import { YearPicker } from "./year-picker";
import { WeekdayPicker } from "./weekday-picker";
import { TimePicker } from "./time-picker";
import styles from "../styles/date.module.scss";
import { CalendarProps } from "../types/date.types";

export const Calendar = (props: CalendarProps) => {
  const {
    viewYear,
    viewMonth,
    viewMode,
    yearRangeStart,
    calendarDays,
    startTime,
    endTime,
    selectedDates,
    mode,
    granularity,
    locale,
    showTimePicker,
    minuteStep,
    canGoPrev,
    canGoNext,
    labels,
    getDayStatus,
    getMonthStatus,
    getYearStatus,
    getWeekdayStatus,
    isDayDisabled,
    onPrev,
    onNext,
    onMonthViewClick,
    onYearViewClick,
    onDayClick,
    onDayHover,
    onMonthClick,
    onYearClick,
    onWeekdayClick,
    onTimeChange,
    onMonthHover,
    onYearHover,
  } = props;

  const isWeekdayMode = granularity === "weekday";

  return (
    <div className={styles.calendar} role="dialog" aria-modal="false">
      {!isWeekdayMode && (
        <CalendarHeader
          viewYear={viewYear}
          viewMonth={viewMonth}
          viewMode={viewMode}
          yearRangeStart={yearRangeStart}
          locale={locale}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          labels={labels}
          onPrev={onPrev}
          onNext={onNext}
          onMonthClick={onMonthViewClick}
          onYearClick={onYearViewClick}
        />
      )}
      {isWeekdayMode && (
        <WeekdayPicker
          locale={locale}
          getWeekdayStatus={getWeekdayStatus}
          onWeekdayClick={onWeekdayClick}
        />
      )}
      {!isWeekdayMode && viewMode === "days" && (
        <CalendarGrid
          calendarDays={calendarDays}
          viewYear={viewYear}
          viewMonth={viewMonth}
          locale={locale}
          getDayStatus={getDayStatus}
          isDayDisabled={isDayDisabled}
          onDayClick={onDayClick}
          onDayHover={onDayHover}
        />
      )}
      {!isWeekdayMode && viewMode === "months" && (
        <MonthPicker
          locale={locale}
          getMonthStatus={getMonthStatus}
          onMonthClick={onMonthClick}
          onMonthHover={onMonthHover}
        />
      )}
      {!isWeekdayMode && viewMode === "years" && (
        <YearPicker
          yearRangeStart={yearRangeStart}
          getYearStatus={getYearStatus}
          onYearClick={onYearClick}
          onYearHover={onYearHover}
        />
      )}
      {showTimePicker && granularity === "day" && viewMode === "days" && (
        <TimePicker
          mode={mode}
          startTime={startTime}
          endTime={endTime}
          minuteStep={minuteStep}
          hasEndDate={selectedDates.length === 2}
          labels={labels}
          onTimeChange={onTimeChange}
        />
      )}
    </div>
  );
};
