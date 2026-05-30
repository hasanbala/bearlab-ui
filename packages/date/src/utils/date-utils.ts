import { LOCALE_LABELS } from "../constants/date-config";
import { DateMode, DateOutputFormat } from "../types/date.types";

// ─── Locale-aware name helpers ────────────────────────────────────────────────

export const getMonthNames = (
  locale: string,
  format: "long" | "short" = "long"
): string[] => {
  const fmt = new Intl.DateTimeFormat(locale, { month: format });
  return Array.from({ length: 12 }, (_, i) => {
    const name = fmt.format(new Date(2000, i, 1));
    return name.charAt(0).toUpperCase() + name.slice(1);
  });
};

/** Returns 7 weekday labels starting from Sunday (index 0). */
export const getWeekdayLabels = (locale: string): string[] => {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 2021-01-03 is a Sunday
  return Array.from({ length: 7 }, (_, i) => {
    const label = fmt.format(new Date(2021, 0, 3 + i));
    return label.charAt(0).toUpperCase() + label.slice(1);
  });
};

/** Returns 7 full weekday names starting from Sunday (index 0). */
export const getWeekdayNamesLong = (locale: string): string[] => {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "long" });
  return Array.from({ length: 7 }, (_, i) => {
    const name = fmt.format(new Date(2021, 0, 3 + i));
    return name.charAt(0).toUpperCase() + name.slice(1);
  });
};

// ─── Calendar layout helpers ──────────────────────────────────────────────────

export const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

export const getFirstDayOfMonth = (year: number, month: number): number =>
  new Date(year, month, 1).getDay();

// ─── Date formatting ──────────────────────────────────────────────────────────

export const formatDateByFormat = (
  date: Date,
  format: DateOutputFormat,
  locale: string
): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const monthShort = getMonthNames(locale, "short")[date.getMonth()];

  switch (format) {
    case "DD-MM-YYYY":
      return `${d}-${m}-${y}`;
    case "MM-DD-YYYY":
      return `${m}-${d}-${y}`;
    case "YYYY-DD-MM":
      return `${y}-${d}-${m}`;
    case "DD MMM YYYY":
      return `${d} ${monthShort} ${y}`;
    case "MMM DD YYYY":
      return `${monthShort} ${d} ${y}`;
    case "YYYY MMM DD":
      return `${y} ${monthShort} ${d}`;
    case "YYYY DD MMM":
      return `${y} ${d} ${monthShort}`;
    case "DD/MM/YYYY":
      return `${d}/${m}/${y}`;
    case "MM/DD/YYYY":
      return `${m}/${d}/${y}`;
    case "YYYY/MM/DD":
      return `${y}/${m}/${d}`;
    case "YYYY/DD/MM":
      return `${y}/${d}/${m}`;
    case "DD.MM.YYYY":
      return `${d}.${m}.${y}`;
    case "MM.DD.YYYY":
      return `${m}.${d}.${y}`;
    case "YYYY.MM.DD":
      return `${y}.${m}.${d}`;
    case "YYYY.DD.MM":
      return `${y}.${d}.${m}`;
    default:
      return `${y}-${m}-${d}`;
  }
};

/** ISO format — used internally for parsing/storage. */
export const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// ─── Date parsing ─────────────────────────────────────────────────────────────

/** Parses a date string in any supported format. For MM/DD/YYYY and MM.DD.YYYY the format hint
 *  is required to avoid ambiguity; for DD MMM YYYY and MMM DD YYYY the locale is used to
 *  resolve month abbreviations; all numeric formats are otherwise auto-detected. */
export const parseDate = (
  str: string,
  format?: DateOutputFormat,
  locale: string = "en-US"
): Date | null => {
  const trimmed = str.trim();
  if (!trimmed) return null;

  // ── MMM formats (locale-aware) ────────────────────────────────────────────
  if (
    format === "DD MMM YYYY" ||
    format === "MMM DD YYYY" ||
    format === "YYYY MMM DD" ||
    format === "YYYY DD MMM"
  ) {
    const dateOnly = trimmed.replace(/\s+\d{2}:\d{2}$/, "");
    const parts = dateOnly.split(" ");
    if (parts.length !== 3) return null;
    const monthNames = getMonthNames(locale, "short");
    let d: number, m: number, y: number;
    if (format === "DD MMM YYYY") {
      d = Number(parts[0]);
      m =
        monthNames.findIndex(
          (n) => n.toLowerCase() === parts[1].toLowerCase()
        ) + 1;
      y = Number(parts[2]);
    } else if (format === "MMM DD YYYY") {
      m =
        monthNames.findIndex(
          (n) => n.toLowerCase() === parts[0].toLowerCase()
        ) + 1;
      d = Number(parts[1]);
      y = Number(parts[2]);
    } else if (format === "YYYY MMM DD") {
      y = Number(parts[0]);
      m =
        monthNames.findIndex(
          (n) => n.toLowerCase() === parts[1].toLowerCase()
        ) + 1;
      d = Number(parts[2]);
    } else {
      // YYYY DD MMM
      y = Number(parts[0]);
      d = Number(parts[1]);
      m =
        monthNames.findIndex(
          (n) => n.toLowerCase() === parts[2].toLowerCase()
        ) + 1;
    }
    if (isNaN(d) || isNaN(y) || m < 1 || m > 12 || d < 1 || d > 31) return null;
    const date = new Date(y, m - 1, d);
    return isNaN(date.getTime()) ? null : date;
  }

  // ── Numeric formats ───────────────────────────────────────────────────────
  // Normalize ISO "T" time separator → space, handles "1995-12-17T03:24:00[.000Z]" inputs
  const normalized = trimmed.replace(/T(\d{2}:\d{2})/, " $1");
  const datePart = normalized.split(" ")[0];
  const sep = datePart.includes("-")
    ? "-"
    : datePart.includes("/")
      ? "/"
      : datePart.includes(".")
        ? "."
        : null;

  if (sep) {
    const parts = datePart.split(sep);
    if (parts.length === 3) {
      const nums = parts.map(Number);
      if (!nums.some((n) => isNaN(n))) {
        let y: number, m: number, d: number;
        if (parts[0].length === 4) {
          if (
            format === "YYYY-DD-MM" ||
            format === "YYYY.DD.MM" ||
            format === "YYYY/DD/MM"
          ) {
            [y, d, m] = nums;
          } else {
            [y, m, d] = nums;
          }
        } else if (
          format === "MM-DD-YYYY" ||
          format === "MM/DD/YYYY" ||
          format === "MM.DD.YYYY"
        ) {
          [m, d, y] = nums;
        } else {
          [d, m, y] = nums;
        }
        if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
          const date = new Date(y, m - 1, d);
          if (!isNaN(date.getTime())) return date;
        }
      }
    }
  }

  // ── Native Date fallback ──────────────────────────────────────────────────
  // Handles new Date().toString(), long strings like "December 17, 1995 03:24:00",
  // and any other format the JS Date constructor can parse natively.
  const native = new Date(trimmed);
  if (!isNaN(native.getTime())) {
    return new Date(native.getFullYear(), native.getMonth(), native.getDate());
  }

  return null;
};

/** Extracts "HH:MM" from a datetime string regardless of separator format.
 *  Handles ISO 8601 "T" separator ("1995-12-17T03:24:00", "2020-06-15T00:00:00.000Z")
 *  and space-separated formats ("25-05-2026 14:30"). */
export const extractTimeFromStr = (str: string): string | null => {
  const trimmed = str.trim();
  // ISO 8601 with T separator
  const isoMatch = trimmed.match(/T(\d{2}):(\d{2})/);
  if (isoMatch) return `${isoMatch[1]}:${isoMatch[2]}`;
  // Space-separated "HH:MM" at end of string
  const parts = trimmed.split(" ");
  const last = parts[parts.length - 1];
  return /^\d{2}:\d{2}$/.test(last) ? last : null;
};

export const parseValueByMode = (
  value: string,
  mode: DateMode,
  format?: DateOutputFormat,
  locale: string = "en-US"
): Date[] => {
  if (!value.trim()) return [];
  if (mode === "multiple") {
    return value
      .split(",")
      .map((s) => parseDate(s.trim(), format, locale))
      .filter((d): d is Date => d !== null);
  }
  if (mode === "range") {
    return value
      .split(" - ")
      .map((s) => parseDate(s.trim(), format, locale))
      .filter((d): d is Date => d !== null);
  }
  const d = parseDate(value, format, locale);
  return d ? [d] : [];
};

export const parseMonthValue = (value: string, mode: DateMode): Date[] => {
  const parseMonth = (s: string): Date | null => {
    const parts = s.trim().split("-");
    if (parts.length !== 2) return null;
    let y: number, m: number;
    if (parts[0].length === 4) {
      [y, m] = parts.map(Number);
    } else {
      [m, y] = parts.map(Number);
    }
    if (isNaN(y) || isNaN(m) || m < 1 || m > 12) return null;
    return new Date(y, m - 1, 1);
  };
  if (!value.trim()) return [];
  if (mode === "multiple")
    return value
      .split(",")
      .map(parseMonth)
      .filter((d): d is Date => d !== null);
  if (mode === "range")
    return value
      .split(" - ")
      .map(parseMonth)
      .filter((d): d is Date => d !== null);
  const d = parseMonth(value);
  return d ? [d] : [];
};

export const parseYearValue = (value: string, mode: DateMode): Date[] => {
  const parseYear = (s: string): Date | null => {
    const y = Number(s.trim());
    return isNaN(y) ? null : new Date(y, 0, 1);
  };
  if (!value.trim()) return [];
  if (mode === "multiple")
    return value
      .split(",")
      .map(parseYear)
      .filter((d): d is Date => d !== null);
  if (mode === "range")
    return value
      .split(" - ")
      .map(parseYear)
      .filter((d): d is Date => d !== null);
  const d = parseYear(value);
  return d ? [d] : [];
};

export const parseWeekdayValue = (value: string): number[] => {
  if (!value.trim()) return [];
  return value
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n) && n >= 0 && n <= 6);
};

// ─── Value formatting ─────────────────────────────────────────────────────────

export const formatValueByMode = (
  dates: Date[],
  mode: DateMode,
  format: DateOutputFormat = "YYYY-MM-DD",
  locale: string = "en-US",
  startTime?: string,
  endTime?: string
): string => {
  if (dates.length === 0) return "";
  const fmt = (d: Date) => formatDateByFormat(d, format, locale);

  if (mode === "multiple") {
    return dates
      .map((d) => (startTime ? `${fmt(d)} ${startTime}` : fmt(d)))
      .join(", ");
  }
  if (mode === "range") {
    if (dates.length === 1) {
      return startTime ? `${fmt(dates[0])} ${startTime}` : fmt(dates[0]);
    }
    const s = startTime ? `${fmt(dates[0])} ${startTime}` : fmt(dates[0]);
    const e = endTime ? `${fmt(dates[1])} ${endTime}` : fmt(dates[1]);
    return `${s} - ${e}`;
  }
  return startTime ? `${fmt(dates[0])} ${startTime}` : fmt(dates[0]);
};

/** Formats dates as ISO 8601 strings ("YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:00"). */
export const formatValueIso = (
  dates: Date[],
  mode: DateMode,
  startTime?: string,
  endTime?: string
): string => {
  if (dates.length === 0) return "";
  const fmt = (d: Date, time?: string): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const base = `${y}-${m}-${day}`;
    return time ? `${base}T${time}:00` : base;
  };
  if (mode === "multiple")
    return dates.map((d) => fmt(d, startTime)).join(", ");
  if (mode === "range") {
    if (dates.length === 1) return fmt(dates[0], startTime);
    return `${fmt(dates[0], startTime)} - ${fmt(dates[1], endTime)}`;
  }
  return fmt(dates[0], startTime);
};

export const formatMonthValueByMode = (
  dates: Date[],
  mode: DateMode
): string => {
  if (dates.length === 0) return "";
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  if (mode === "multiple") return dates.map(fmt).join(", ");
  if (mode === "range") {
    if (dates.length === 1) return fmt(dates[0]);
    return `${fmt(dates[0])} - ${fmt(dates[1])}`;
  }
  return fmt(dates[0]);
};

export const formatYearValueByMode = (
  dates: Date[],
  mode: DateMode
): string => {
  if (dates.length === 0) return "";
  const fmt = (d: Date) => String(d.getFullYear());
  if (mode === "multiple") return dates.map(fmt).join(", ");
  if (mode === "range") {
    if (dates.length === 1) return fmt(dates[0]);
    return `${fmt(dates[0])} - ${fmt(dates[1])}`;
  }
  return fmt(dates[0]);
};

export const formatWeekdayValueByMode = (weekdays: number[]): string =>
  weekdays.join(",");

// ─── Date comparisons ─────────────────────────────────────────────────────────

export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export const isSameYear = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear();

export const isInRange = (date: Date, start: Date, end: Date): boolean => {
  const t = date.getTime();
  return (
    t >= Math.min(start.getTime(), end.getTime()) &&
    t <= Math.max(start.getTime(), end.getTime())
  );
};

export const isToday = (date: Date): boolean => isSameDay(date, new Date());

/** Returns true if `date` is outside the allowed min/max range. */
export const isDateDisabled = (
  date: Date,
  minDate: Date | null,
  maxDate: Date | null
): boolean => {
  if (minDate) {
    const min = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate()
    );
    if (date.getTime() < min.getTime()) return true;
  }
  if (maxDate) {
    const max = new Date(
      maxDate.getFullYear(),
      maxDate.getMonth(),
      maxDate.getDate()
    );
    if (date.getTime() > max.getTime()) return true;
  }
  return false;
};

// ─── Locale-aware default labels ──────────────────────────────────────────────

export const getLocaleDefaultLabels = (
  locale: string
): { time: string; startTime: string; endTime: string } => {
  const base = locale.split("-")[0].toLowerCase();
  return (
    LOCALE_LABELS[locale] ??
    LOCALE_LABELS[base] ?? { time: "Time", startTime: "Start", endTime: "End" }
  );
};

// ─── Time helpers ─────────────────────────────────────────────────────────────

/** Generates minute options for a given step (e.g. step=5 → ["00","05","10",...,"55"]). */
export const getMinuteOptions = (step: number): string[] => {
  const opts: string[] = [];
  for (let i = 0; i < 60; i += Math.max(1, step)) {
    opts.push(String(i).padStart(2, "0"));
  }
  return opts;
};

/** Snaps a minute value to the nearest valid step. */
export const snapMinute = (minute: number, step: number): string => {
  const s = Math.max(1, step);
  const snapped = (Math.round(minute / s) * s) % 60;
  return String(snapped).padStart(2, "0");
};
