import { useCallback, useId, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { DateProps, DateComponent } from "./types/date.types";
import { useCalendar } from "./hooks/use-calendar";
import { useClickOutside } from "./hooks/use-click-outside";
import { CalendarPortal } from "./components/calendar-portal";
import { Calendar } from "./components/calendar";
import { IconCalendar, IconErrorTriangle } from "./assets/icons";
import {
  parseDate,
  parseWeekdayValue,
  parseMonthValue,
  parseYearValue,
  getWeekdayNamesLong,
  getMonthNames,
  formatDateByFormat,
  getLocaleDefaultLabels,
  extractTimeFromStr,
} from "./utils/date-utils";
import styles from "./styles/date.module.scss";

export const Date: DateComponent = (props) => {
  const {
    name,
    label,
    value,
    error,
    style,
    disabled,
    className,
    isRequired,
    placeholder = "Select a date",
    mode = "single",
    granularity = "day",
    minDate: minDateStr,
    maxDate: maxDateStr,
    locale = "en-US",
    outputFormat = "DD-MM-YYYY",
    outputType = "formatted",
    showTimePicker = false,
    minuteStep = 1,
    labels,
    calendarZIndex = 8888,
    onDateChange,
  } = props as DateProps & {
    value: string | string[] | number[] | number | undefined;
    onDateChange?: (
      dates: globalThis.Date[],
      value: string | string[] | number[] | number | undefined
    ) => void;
  };

  const mergedLabels = useMemo(() => {
    const defaults = getLocaleDefaultLabels(locale);
    return { ...defaults, ...labels };
  }, [locale, labels]);

  const inputId = useId();
  const errorId = useId();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);
  const hasError = Boolean(error);

  const minDate = useMemo(
    () => (minDateStr ? parseDate(minDateStr) : null),
    [minDateStr]
  );
  const maxDate = useMemo(
    () => (maxDateStr ? parseDate(maxDateStr) : null),
    [maxDateStr]
  );

  const normalizedValue = useMemo((): string => {
    if (value === undefined || value === null) return "";
    if (Array.isArray(value)) {
      if (granularity === "weekday") {
        return (value as number[]).join(",");
      }
      return (value as string[]).join(", ");
    }
    if (typeof value === "number") return String(value);
    return value as string;
  }, [value, granularity]);

  const internalOnDateChange = useCallback(
    (dates: globalThis.Date[], str: string) => {
      if (!onDateChange) return;
      if (granularity === "weekday") {
        const parts = str
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== "");
        const nums = parts.map(Number).filter((n) => !isNaN(n));
        if (mode === "multiple") {
          onDateChange(dates, nums);
        } else {
          onDateChange(dates, nums.length > 0 ? nums[0] : undefined);
        }
      } else if (mode === "multiple") {
        const arr = str
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        onDateChange(dates, arr);
      } else {
        onDateChange(dates, str);
      }
    },
    [mode, granularity, onDateChange]
  );

  const {
    viewYear,
    viewMonth,
    viewMode,
    yearRangeStart,
    calendarDays,
    startTime,
    endTime,
    selectedDates,
    canGoPrev,
    canGoNext,
    goToPrev,
    goToNext,
    setViewToMonths,
    setViewToYears,
    handleDayClick,
    handleDayHover,
    handleMonthHover,
    handleYearHover,
    handleMonthSelect,
    handleYearSelect,
    handleWeekdayClick,
    handleTimeChange,
    getDayStatus,
    getMonthStatus,
    getYearStatus,
    getWeekdayStatus,
    isDayDisabled,
    shouldCloseAfterSelect,
    shouldCloseAfterMonthSelect,
    shouldCloseAfterYearSelect,
  } = useCalendar({
    mode,
    granularity,
    value: normalizedValue,
    minDate,
    maxDate,
    outputFormat,
    outputType,
    locale,
    showTimePicker,
    minuteStep,
    onDateChange: internalOnDateChange,
  });

  const displayValue = useMemo(() => {
    if (!normalizedValue.trim()) return "";

    if (granularity === "weekday") {
      const indices = parseWeekdayValue(normalizedValue);
      if (!indices.length) return "";
      const names = getWeekdayNamesLong(locale);
      return indices.map((i) => names[i]).join(", ");
    }

    if (granularity === "month") {
      const dates = parseMonthValue(normalizedValue, mode);
      if (!dates.length) return "";
      const monthNames = getMonthNames(locale, "long");
      const fmt = (d: globalThis.Date) =>
        `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      if (mode === "multiple") return dates.map(fmt).join(", ");
      if (mode === "range" && dates.length === 2)
        return `${fmt(dates[0])} - ${fmt(dates[1])}`;
      return fmt(dates[0]);
    }

    if (granularity === "year") {
      const dates = parseYearValue(normalizedValue, mode);
      if (!dates.length) return "";
      const fmt = (d: globalThis.Date) => String(d.getFullYear());
      if (mode === "multiple") return dates.map(fmt).join(", ");
      if (mode === "range" && dates.length === 2)
        return `${fmt(dates[0])} - ${fmt(dates[1])}`;
      return fmt(dates[0]);
    }

    const formatPart = (part: string): string => {
      const trimmed = part.trim();
      const timePart = extractTimeFromStr(trimmed);
      const datePart = trimmed
        .replace(/T\d{2}:\d{2}.*$/, "")
        .replace(/\s+\d{2}:\d{2}$/, "")
        .trim();
      const d = parseDate(datePart, outputFormat, locale);
      if (!d) return "";
      const formatted = formatDateByFormat(d, outputFormat, locale);
      return timePart ? `${formatted} ${timePart}` : formatted;
    };

    if (mode === "multiple")
      return normalizedValue
        .split(",")
        .map((s) => formatPart(s))
        .filter(Boolean)
        .join(", ");
    if (mode === "range") {
      const parts = normalizedValue.split(" - ");
      if (parts.length === 1) return formatPart(parts[0]);
      return `${formatPart(parts[0])} - ${formatPart(parts[1])}`;
    }
    return formatPart(normalizedValue);
  }, [normalizedValue, granularity, mode, outputFormat, locale]);

  const handleClose = useCallback(() => setIsCalendarVisible(false), []);
  const { containerRef } = useClickOutside(handleClose, portalRef);

  const toggleCalendar = () => {
    if (!disabled) setIsCalendarVisible((prev) => !prev);
  };

  const handleDaySelect = useCallback(
    (date: globalThis.Date, vy: number, vm: number) => {
      const willClose = shouldCloseAfterSelect(date);
      handleDayClick(date, vy, vm);
      if (willClose) setIsCalendarVisible(false);
    },
    [handleDayClick, shouldCloseAfterSelect]
  );

  const handleMonthPickerClick = useCallback(
    (month: number) => {
      const willClose = shouldCloseAfterMonthSelect(month);
      handleMonthSelect(month);
      if (willClose) setIsCalendarVisible(false);
    },
    [handleMonthSelect, shouldCloseAfterMonthSelect]
  );

  const handleYearPickerClick = useCallback(
    (year: number) => {
      const willClose = shouldCloseAfterYearSelect(year);
      handleYearSelect(year);
      if (willClose) setIsCalendarVisible(false);
    },
    [handleYearSelect, shouldCloseAfterYearSelect]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsCalendarVisible(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCalendar();
    }
  };

  return (
    <div
      ref={containerRef}
      style={style?.root}
      className={classNames(
        styles.container,
        disabled && styles.disabled,
        className?.root
      )}
    >
      {label && (
        <label
          htmlFor={inputId}
          style={style?.label}
          className={classNames(styles.dateLabel, className?.label)}
        >
          {label} {isRequired && <span aria-hidden="true">*</span>}
        </label>
      )}
      <div
        style={style?.inputWrapper}
        className={classNames(
          styles.inputWrapper,
          hasError && styles.error,
          isCalendarVisible && styles.focused,
          className?.inputWrapper
        )}
      >
        <input
          id={inputId}
          name={name}
          readOnly
          type="text"
          value={displayValue}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={hasError || undefined}
          aria-required={isRequired || undefined}
          aria-expanded={isCalendarVisible}
          aria-haspopup="true"
          aria-describedby={hasError ? errorId : undefined}
          style={style?.input}
          className={classNames(styles.input, className?.input)}
          onClick={toggleCalendar}
          onKeyDown={handleKeyDown}
        />
        <span
          aria-hidden="true"
          style={style?.calendarIcon}
          className={classNames(styles.calendarIcon, className?.calendarIcon)}
          onClick={toggleCalendar}
        >
          <IconCalendar />
        </span>
        {hasError && (
          <div
            id={errorId}
            role="status"
            aria-live="polite"
            style={style?.errorMessage}
            className={classNames(styles.viewError, className?.errorMessage)}
          >
            <IconErrorTriangle aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
      <CalendarPortal
        ref={portalRef}
        anchorRef={containerRef}
        isVisible={isCalendarVisible}
        calendarZIndex={calendarZIndex}
      >
        <Calendar
          viewYear={viewYear}
          viewMonth={viewMonth}
          viewMode={viewMode}
          yearRangeStart={yearRangeStart}
          calendarDays={calendarDays}
          startTime={startTime}
          endTime={endTime}
          selectedDates={selectedDates}
          mode={mode}
          granularity={granularity}
          locale={locale}
          showTimePicker={showTimePicker}
          minuteStep={minuteStep}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          labels={mergedLabels}
          getDayStatus={getDayStatus}
          getMonthStatus={getMonthStatus}
          getYearStatus={getYearStatus}
          getWeekdayStatus={getWeekdayStatus}
          isDayDisabled={isDayDisabled}
          onPrev={goToPrev}
          onNext={goToNext}
          onMonthViewClick={setViewToMonths}
          onYearViewClick={setViewToYears}
          onDayClick={handleDaySelect}
          onDayHover={handleDayHover}
          onMonthClick={handleMonthPickerClick}
          onYearClick={handleYearPickerClick}
          onWeekdayClick={handleWeekdayClick}
          onTimeChange={handleTimeChange}
          onMonthHover={handleMonthHover}
          onYearHover={handleYearHover}
        />
      </CalendarPortal>
    </div>
  );
};
