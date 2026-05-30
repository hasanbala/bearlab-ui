import { useState, useCallback, useMemo, useEffect } from "react";
import {
  DateMode,
  DateGranularity,
  DateOutputFormat,
  CalendarViewMode,
  UseCalendarOptions,
  CalendarDay,
} from "../types/date.types";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
  isSameMonth,
  isSameYear,
  isInRange,
  isDateDisabled,
  parseValueByMode,
  parseMonthValue,
  parseYearValue,
  parseWeekdayValue,
  formatValueByMode,
  formatValueIso,
  formatMonthValueByMode,
  formatYearValueByMode,
  formatWeekdayValueByMode,
  extractTimeFromStr,
  snapMinute,
} from "../utils/date-utils";

const getInitialViewMode = (granularity: DateGranularity): CalendarViewMode => {
  if (granularity === "month") return "months";
  if (granularity === "year") return "years";
  return "days";
};

const parseInitialDates = (
  raw: string,
  granularity: DateGranularity,
  mode: DateMode,
  format?: DateOutputFormat,
  locale: string = "en-US"
): Date[] => {
  if (!raw.trim()) return [];
  if (granularity === "month") return parseMonthValue(raw, mode);
  if (granularity === "year") return parseYearValue(raw, mode);
  return parseValueByMode(raw, mode, format, locale);
};

export const useCalendar = ({
  mode,
  granularity,
  value,
  minDate,
  maxDate,
  outputFormat,
  outputType,
  locale,
  showTimePicker,
  minuteStep,
  onDateChange,
}: UseCalendarOptions) => {
  const raw0 = value;

  const [selectedDates, setSelectedDates] = useState<Date[]>(() =>
    parseInitialDates(raw0, granularity, mode, outputFormat, locale)
  );
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>(() =>
    granularity === "weekday" ? parseWeekdayValue(raw0) : []
  );
  const [viewMode, setViewMode] = useState<CalendarViewMode>(() =>
    getInitialViewMode(granularity)
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [hoverMonth, setHoverMonth] = useState<number | null>(null);
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const initTime = (raw: string): string => {
    const t = extractTimeFromStr(raw);
    if (!t) return "00:00";
    const [h, m] = t.split(":").map(Number);
    return `${String(h).padStart(2, "0")}:${snapMinute(m, minuteStep)}`;
  };
  const [startTime, setStartTime] = useState(() => initTime(raw0));
  const [endTime, setEndTime] = useState(() => {
    if (mode === "range") {
      const parts = raw0.split(" - ");
      return parts.length === 2 ? initTime(parts[1]) : "00:00";
    }
    return "00:00";
  });

  const initView = useMemo(() => {
    const dates = parseInitialDates(
      raw0,
      granularity,
      mode,
      outputFormat,
      locale
    );
    if (dates.length > 0)
      return { year: dates[0].getFullYear(), month: dates[0].getMonth() };
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [viewYear, setViewYear] = useState(initView.year);
  const [viewMonth, setViewMonth] = useState(initView.month);
  const [yearRangeStart, setYearRangeStart] = useState(() => {
    const y = initView.year;
    return y - (y % 12);
  });

  useEffect(() => {
    if (granularity === "weekday") {
      setSelectedWeekdays(parseWeekdayValue(value));
      return;
    }
    const dates = parseInitialDates(
      value,
      granularity,
      mode,
      outputFormat,
      locale
    );
    setSelectedDates(dates);
    if (dates.length > 0) {
      setViewYear(dates[0].getFullYear());
      setViewMonth(dates[0].getMonth());
    }
    // Always sync time from the incoming value so showTimePicker works correctly
    // even when the prop is added after initial render.
    setStartTime(initTime(value));
    if (mode === "range") {
      const parts = value.split(" - ");
      if (parts.length === 2) setEndTime(initTime(parts[1]));
    }
  }, [value, mode, granularity, showTimePicker]); // eslint-disable-line react-hooks/exhaustive-deps

  const goToPrev = useCallback(() => {
    if (viewMode === "days") {
      setViewMonth((prev) => {
        if (prev === 0) {
          setViewYear((y) => y - 1);
          return 11;
        }
        return prev - 1;
      });
    } else if (viewMode === "months") {
      setViewYear((y) => y - 1);
    } else {
      setYearRangeStart((s) => s - 12);
    }
  }, [viewMode]);

  const goToNext = useCallback(() => {
    if (viewMode === "days") {
      setViewMonth((prev) => {
        if (prev === 11) {
          setViewYear((y) => y + 1);
          return 0;
        }
        return prev + 1;
      });
    } else if (viewMode === "months") {
      setViewYear((y) => y + 1);
    } else {
      setYearRangeStart((s) => s + 12);
    }
  }, [viewMode]);

  const canGoPrev = useMemo(() => {
    if (!minDate) return true;
    if (viewMode === "days") {
      const lastDayOfPrevMonth = new Date(viewYear, viewMonth, 0);
      return (
        lastDayOfPrevMonth >=
        new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
      );
    }
    if (viewMode === "months") return viewYear - 1 >= minDate.getFullYear();
    return yearRangeStart - 1 >= minDate.getFullYear();
  }, [minDate, viewMode, viewYear, viewMonth, yearRangeStart]);

  const canGoNext = useMemo(() => {
    if (!maxDate) return true;
    if (viewMode === "days") {
      const firstDayOfNextMonth = new Date(viewYear, viewMonth + 1, 1);
      return (
        firstDayOfNextMonth <=
        new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
      );
    }
    if (viewMode === "months") return viewYear + 1 <= maxDate.getFullYear();
    return yearRangeStart + 12 <= maxDate.getFullYear();
  }, [maxDate, viewMode, viewYear, viewMonth, yearRangeStart]);

  const setViewToMonths = useCallback(() => setViewMode("months"), []);
  const setViewToYears = useCallback(() => {
    setYearRangeStart(viewYear - (viewYear % 12));
    setViewMode("years");
  }, [viewYear]);
  const setViewToDays = useCallback(() => setViewMode("days"), []);

  const isDayDisabled = useCallback(
    (date: Date) => isDateDisabled(date, minDate, maxDate),
    [minDate, maxDate]
  );

  const buildCallbackStr = useCallback(
    (dates: Date[], weekdays: number[], st: string, et: string): string => {
      if (granularity === "weekday") return formatWeekdayValueByMode(weekdays);
      if (granularity === "month") return formatMonthValueByMode(dates, mode);
      if (granularity === "year") return formatYearValueByMode(dates, mode);
      if (outputType === "iso") {
        return formatValueIso(
          dates,
          mode,
          showTimePicker ? st : undefined,
          showTimePicker && mode === "range" ? et : undefined
        );
      }
      return formatValueByMode(
        dates,
        mode,
        outputFormat,
        locale,
        showTimePicker ? st : undefined,
        showTimePicker && mode === "range" ? et : undefined
      );
    },
    [granularity, mode, outputFormat, outputType, locale, showTimePicker]
  );

  const handleDayClick = useCallback(
    (date: Date, currentViewYear: number, currentViewMonth: number) => {
      if (isDateDisabled(date, minDate, maxDate)) return;

      let newDates: Date[];
      if (mode === "single") {
        newDates = [date];
      } else if (mode === "multiple") {
        const exists = selectedDates.some((d) => isSameDay(d, date));
        newDates = exists
          ? selectedDates.filter((d) => !isSameDay(d, date))
          : [...selectedDates, date].sort((a, b) => a.getTime() - b.getTime());
      } else {
        if (selectedDates.length === 0 || selectedDates.length === 2) {
          newDates = [date];
        } else {
          const [start] = selectedDates;
          if (isSameDay(date, start)) newDates = [];
          else if (date < start) newDates = [date, start];
          else newDates = [start, date];
        }
      }
      setSelectedDates(newDates);

      if (
        date.getFullYear() !== currentViewYear ||
        date.getMonth() !== currentViewMonth
      ) {
        setViewYear(date.getFullYear());
        setViewMonth(date.getMonth());
      }

      onDateChange?.(
        newDates,
        buildCallbackStr(newDates, selectedWeekdays, startTime, endTime)
      );
    },
    [
      mode,
      selectedDates,
      minDate,
      maxDate,
      buildCallbackStr,
      selectedWeekdays,
      startTime,
      endTime,
      onDateChange,
    ]
  );

  const handleMonthSelect = useCallback(
    (month: number) => {
      if (granularity !== "month") {
        setViewMonth(month);
        setViewMode("days");
        return;
      }
      const date = new Date(viewYear, month, 1);
      let newDates: Date[];
      if (mode === "single") {
        newDates = [date];
      } else if (mode === "multiple") {
        const exists = selectedDates.some((d) => isSameMonth(d, date));
        newDates = exists
          ? selectedDates.filter((d) => !isSameMonth(d, date))
          : [...selectedDates, date].sort((a, b) => a.getTime() - b.getTime());
      } else {
        if (selectedDates.length === 0 || selectedDates.length === 2) {
          newDates = [date];
        } else {
          const [start] = selectedDates;
          if (isSameMonth(date, start)) newDates = [];
          else if (date < start) newDates = [date, start];
          else newDates = [start, date];
        }
      }
      setSelectedDates(newDates);
      onDateChange?.(
        newDates,
        buildCallbackStr(newDates, selectedWeekdays, startTime, endTime)
      );
    },
    [
      granularity,
      viewYear,
      mode,
      selectedDates,
      buildCallbackStr,
      selectedWeekdays,
      startTime,
      endTime,
      onDateChange,
    ]
  );

  const handleYearSelect = useCallback(
    (year: number) => {
      if (granularity !== "year") {
        setViewYear(year);
        setViewMode("months");
        return;
      }
      const date = new Date(year, 0, 1);
      let newDates: Date[];
      if (mode === "single") {
        newDates = [date];
      } else if (mode === "multiple") {
        const exists = selectedDates.some((d) => isSameYear(d, date));
        newDates = exists
          ? selectedDates.filter((d) => !isSameYear(d, date))
          : [...selectedDates, date].sort((a, b) => a.getTime() - b.getTime());
      } else {
        if (selectedDates.length === 0 || selectedDates.length === 2) {
          newDates = [date];
        } else {
          const [start] = selectedDates;
          if (isSameYear(date, start)) newDates = [];
          else if (date < start) newDates = [date, start];
          else newDates = [start, date];
        }
      }
      setSelectedDates(newDates);
      onDateChange?.(
        newDates,
        buildCallbackStr(newDates, selectedWeekdays, startTime, endTime)
      );
    },
    [
      granularity,
      mode,
      selectedDates,
      buildCallbackStr,
      selectedWeekdays,
      startTime,
      endTime,
      onDateChange,
    ]
  );

  const handleWeekdayClick = useCallback(
    (weekday: number) => {
      let newWeekdays: number[];
      if (mode === "single") {
        newWeekdays = selectedWeekdays[0] === weekday ? [] : [weekday];
      } else {
        const exists = selectedWeekdays.includes(weekday);
        newWeekdays = exists
          ? selectedWeekdays.filter((w) => w !== weekday)
          : [...selectedWeekdays, weekday].sort((a, b) => a - b);
      }
      setSelectedWeekdays(newWeekdays);
      onDateChange?.(
        [],
        buildCallbackStr(selectedDates, newWeekdays, startTime, endTime)
      );
    },
    [
      mode,
      selectedWeekdays,
      selectedDates,
      buildCallbackStr,
      startTime,
      endTime,
      onDateChange,
    ]
  );

  const handleDayHover = useCallback(
    (date: Date | null) => {
      if (mode === "range") setHoverDate(date);
    },
    [mode]
  );

  const handleMonthHover = useCallback(
    (month: number | null) => {
      if (mode === "range" && granularity === "month") setHoverMonth(month);
    },
    [mode, granularity]
  );

  const handleYearHover = useCallback(
    (year: number | null) => {
      if (mode === "range" && granularity === "year") setHoverYear(year);
    },
    [mode, granularity]
  );

  const handleTimeChange = useCallback(
    (type: "start" | "end", time: string) => {
      const newStart = type === "start" ? time : startTime;
      const newEnd = type === "end" ? time : endTime;
      if (type === "start") setStartTime(time);
      else setEndTime(time);

      if (selectedDates.length > 0) {
        onDateChange?.(
          selectedDates,
          buildCallbackStr(selectedDates, selectedWeekdays, newStart, newEnd)
        );
      }
    },
    [
      startTime,
      endTime,
      selectedDates,
      selectedWeekdays,
      buildCallbackStr,
      onDateChange,
    ]
  );

  const shouldCloseAfterSelect = useCallback(
    (date: Date): boolean => {
      if (showTimePicker) return false;
      if (mode === "single") return true;
      if (
        mode === "range" &&
        selectedDates.length === 1 &&
        !isSameDay(date, selectedDates[0])
      )
        return true;
      return false;
    },
    [mode, selectedDates, showTimePicker]
  );

  const shouldCloseAfterMonthSelect = useCallback(
    (month: number): boolean => {
      if (granularity !== "month") return false;
      if (mode === "single") return true;
      if (mode === "range") {
        const date = new Date(viewYear, month, 1);
        if (selectedDates.length === 1 && !isSameMonth(date, selectedDates[0]))
          return true;
      }
      return false;
    },
    [granularity, mode, selectedDates, viewYear]
  );

  const shouldCloseAfterYearSelect = useCallback(
    (year: number): boolean => {
      if (granularity !== "year") return false;
      if (mode === "single") return true;
      if (mode === "range") {
        const date = new Date(year, 0, 1);
        if (selectedDates.length === 1 && !isSameYear(date, selectedDates[0]))
          return true;
      }
      return false;
    },
    [granularity, mode, selectedDates]
  );

  const getDayStatus = useCallback(
    (date: Date) => {
      const isSelected = selectedDates.some((d) => isSameDay(d, date));
      let isInSelectedRange = false,
        isRangeStart = false,
        isRangeEnd = false,
        isHoverRange = false;

      if (mode === "range") {
        if (selectedDates.length === 2) {
          const [start, end] = selectedDates;
          isRangeStart = isSameDay(date, start);
          isRangeEnd = isSameDay(date, end);
          isInSelectedRange = isInRange(date, start, end);
        } else if (selectedDates.length === 1 && hoverDate) {
          const [start] = selectedDates;
          isHoverRange =
            isInRange(date, start, hoverDate) && !isSameDay(date, start);
        }
      }
      return {
        isSelected,
        isInSelectedRange,
        isRangeStart,
        isRangeEnd,
        isHoverRange,
      };
    },
    [mode, selectedDates, hoverDate]
  );

  const getMonthStatus = useCallback(
    (month: number) => {
      const date = new Date(viewYear, month, 1);
      const isSelected = selectedDates.some((d) => isSameMonth(d, date));
      let isInSelectedRange = false,
        isRangeStart = false,
        isRangeEnd = false,
        isHoverRange = false;

      if (mode === "range" && selectedDates.length === 2) {
        const [s, e] = selectedDates;
        isRangeStart = isSameMonth(date, s);
        isRangeEnd = isSameMonth(date, e);
        const startNorm = new Date(s.getFullYear(), s.getMonth(), 1);
        const endNorm = new Date(e.getFullYear(), e.getMonth(), 1);
        isInSelectedRange =
          date >= new Date(Math.min(startNorm.getTime(), endNorm.getTime())) &&
          date <= new Date(Math.max(startNorm.getTime(), endNorm.getTime()));
      } else if (
        mode === "range" &&
        selectedDates.length === 1 &&
        hoverMonth !== null
      ) {
        const [s] = selectedDates;
        const sFlat = s.getFullYear() * 12 + s.getMonth();
        const hFlat = viewYear * 12 + hoverMonth;
        const cFlat = viewYear * 12 + month;
        isHoverRange =
          cFlat >= Math.min(sFlat, hFlat) &&
          cFlat <= Math.max(sFlat, hFlat) &&
          !(s.getFullYear() === viewYear && s.getMonth() === month);
      }

      const isDisabled =
        (!!minDate &&
          date < new Date(minDate.getFullYear(), minDate.getMonth(), 1)) ||
        (!!maxDate &&
          date > new Date(maxDate.getFullYear(), maxDate.getMonth(), 1));

      const now = new Date();
      const isCurrentMonth =
        viewYear === now.getFullYear() && month === now.getMonth();

      return {
        isSelected,
        isInSelectedRange,
        isRangeStart,
        isRangeEnd,
        isDisabled,
        isHoverRange,
        isCurrentMonth,
      };
    },
    [viewYear, selectedDates, mode, minDate, maxDate, hoverMonth]
  );

  const getYearStatus = useCallback(
    (year: number) => {
      const date = new Date(year, 0, 1);
      const isSelected = selectedDates.some((d) => isSameYear(d, date));
      let isInSelectedRange = false,
        isRangeStart = false,
        isRangeEnd = false,
        isHoverRange = false;

      if (mode === "range" && selectedDates.length === 2) {
        const [s, e] = selectedDates;
        isRangeStart = isSameYear(date, s);
        isRangeEnd = isSameYear(date, e);
        isInSelectedRange =
          year >= Math.min(s.getFullYear(), e.getFullYear()) &&
          year <= Math.max(s.getFullYear(), e.getFullYear());
      } else if (
        mode === "range" &&
        selectedDates.length === 1 &&
        hoverYear !== null
      ) {
        const [s] = selectedDates;
        const sYear = s.getFullYear();
        isHoverRange =
          year >= Math.min(sYear, hoverYear) &&
          year <= Math.max(sYear, hoverYear) &&
          year !== sYear;
      }

      const isDisabled =
        (!!minDate && year < minDate.getFullYear()) ||
        (!!maxDate && year > maxDate.getFullYear());

      const isCurrentYear = year === new Date().getFullYear();

      return {
        isSelected,
        isInSelectedRange,
        isRangeStart,
        isRangeEnd,
        isDisabled,
        isHoverRange,
        isCurrentYear,
      };
    },
    [selectedDates, mode, minDate, maxDate, hoverYear]
  );

  const getWeekdayStatus = useCallback(
    (weekday: number) => ({ isSelected: selectedWeekdays.includes(weekday) }),
    [selectedWeekdays]
  );

  const calendarDays = useMemo<CalendarDay[]>(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const prevMonthYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const daysInPrev = getDaysInMonth(prevMonthYear, prevMonth);
    const nextMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;

    const days: CalendarDay[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(prevMonthYear, prevMonth, daysInPrev - i),
        isCurrentMonth: false,
      });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        date: new Date(viewYear, viewMonth, d),
        isCurrentMonth: true,
      });
    }
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push({
        date: new Date(nextMonthYear, nextMonth, d),
        isCurrentMonth: false,
      });
    }
    return days;
  }, [viewYear, viewMonth]);

  return {
    viewYear,
    viewMonth,
    viewMode,
    yearRangeStart,
    calendarDays,
    startTime,
    endTime,
    canGoPrev,
    canGoNext,
    selectedDates,
    selectedWeekdays,
    goToPrev,
    goToNext,
    setViewToMonths,
    setViewToYears,
    setViewToDays,
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
  };
};
