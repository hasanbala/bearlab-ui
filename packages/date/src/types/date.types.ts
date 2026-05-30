export type DateMode = "single" | "multiple" | "range";
export type DateGranularity = "day" | "month" | "year" | "weekday";
export type DateOutputType = "formatted" | "iso";
export type DateOutputFormat =
  | "YYYY-MM-DD"
  | "DD-MM-YYYY"
  | "MM-DD-YYYY"
  | "YYYY-DD-MM"
  | "DD MMM YYYY"
  | "MMM DD YYYY"
  | "YYYY MMM DD"
  | "YYYY DD MMM"
  | "DD/MM/YYYY"
  | "MM/DD/YYYY"
  | "YYYY/MM/DD"
  | "YYYY/DD/MM"
  | "DD.MM.YYYY"
  | "MM.DD.YYYY"
  | "YYYY.MM.DD"
  | "YYYY.DD.MM";

export type CalendarViewMode = "days" | "months" | "years";

export interface DayStatus {
  isSelected: boolean;
  isInSelectedRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isHoverRange: boolean;
}

export interface MonthStatus {
  isSelected: boolean;
  isInSelectedRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isDisabled: boolean;
  isHoverRange: boolean;
  isCurrentMonth: boolean;
}

export interface YearStatus {
  isSelected: boolean;
  isInSelectedRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isDisabled: boolean;
  isHoverRange: boolean;
  isCurrentYear: boolean;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

export interface DateLabels {
  time?: string;
  startTime?: string;
  endTime?: string;
  previous?: string;
  next?: string;
  selectMonth?: string;
  selectYear?: string;
}

export interface DateClassNames {
  root?: string;
  label?: string;
  inputWrapper?: string;
  input?: string;
  calendarIcon?: string;
  errorMessage?: string;
}

export interface DateStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  inputWrapper?: React.CSSProperties;
  input?: React.CSSProperties;
  calendarIcon?: React.CSSProperties;
  errorMessage?: React.CSSProperties;
}

interface DateBaseProps {
  name?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  locale?: string;
  outputFormat?: DateOutputFormat;
  outputType?: DateOutputType;
  showTimePicker?: boolean;
  minuteStep?: number;
  labels?: DateLabels;
  style?: DateStyles;
  className?: DateClassNames;
  calendarZIndex?: number;
}

export interface DatePropsWeekdaySingle extends DateBaseProps {
  granularity: "weekday";
  mode?: "single";
  value: number | undefined;
  onDateChange?: (dates: Date[], value: number | undefined) => void;
}

export interface DatePropsWeekdayMultiple extends DateBaseProps {
  granularity: "weekday";
  mode: "multiple";
  value: number[];
  onDateChange?: (dates: Date[], value: number[]) => void;
}

export interface DatePropsMultiple extends DateBaseProps {
  granularity?: "day" | "month" | "year";
  mode: "multiple";
  value: string[];
  onDateChange?: (dates: Date[], value: string[]) => void;
}

export interface DatePropsDefault extends DateBaseProps {
  granularity?: "day" | "month" | "year";
  mode?: "single" | "range";
  value: string;
  onDateChange?: (dates: Date[], value: string) => void;
}

export type DateProps =
  | DatePropsWeekdaySingle
  | DatePropsWeekdayMultiple
  | DatePropsMultiple
  | DatePropsDefault;

export interface UseCalendarOptions {
  mode: DateMode;
  granularity: DateGranularity;
  value: string;
  minDate: Date | null;
  maxDate: Date | null;
  outputFormat: DateOutputFormat;
  outputType: DateOutputType;
  locale: string;
  showTimePicker: boolean;
  minuteStep: number;
  onDateChange?: (dates: Date[], currentDateString: string) => void;
}

export interface CalendarHeaderProps {
  viewYear: number;
  viewMonth: number;
  viewMode: CalendarViewMode;
  yearRangeStart: number;
  locale: string;
  canGoPrev: boolean;
  canGoNext: boolean;
  labels?: DateLabels;
  onPrev: () => void;
  onNext: () => void;
  onMonthClick: () => void;
  onYearClick: () => void;
}

export interface CalendarGridProps {
  calendarDays: CalendarDay[];
  viewYear: number;
  viewMonth: number;
  locale: string;
  getDayStatus: (date: Date) => DayStatus;
  isDayDisabled: (date: Date) => boolean;
  onDayClick: (date: Date, viewYear: number, viewMonth: number) => void;
  onDayHover: (date: Date | null) => void;
}

export interface MonthPickerProps {
  locale: string;
  getMonthStatus: (month: number) => MonthStatus;
  onMonthClick: (month: number) => void;
  onMonthHover?: (month: number | null) => void;
}

export interface YearPickerProps {
  yearRangeStart: number;
  getYearStatus: (year: number) => YearStatus;
  onYearClick: (year: number) => void;
  onYearHover?: (year: number | null) => void;
}

export interface WeekdayPickerProps {
  locale: string;
  getWeekdayStatus: (weekday: number) => { isSelected: boolean };
  onWeekdayClick: (weekday: number) => void;
}

export interface TimePickerProps {
  mode: DateMode;
  startTime: string;
  endTime: string;
  minuteStep: number;
  hasEndDate: boolean;
  labels?: DateLabels;
  onTimeChange: (type: "start" | "end", time: string) => void;
}

export interface CalendarProps {
  viewYear: number;
  viewMonth: number;
  viewMode: CalendarViewMode;
  yearRangeStart: number;
  calendarDays: CalendarDay[];
  startTime: string;
  endTime: string;
  selectedDates: Date[];
  mode: DateMode;
  granularity: DateGranularity;
  locale: string;
  showTimePicker: boolean;
  minuteStep: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  labels?: DateLabels;
  getDayStatus: (date: Date) => DayStatus;
  getMonthStatus: (month: number) => MonthStatus;
  getYearStatus: (year: number) => YearStatus;
  getWeekdayStatus: (weekday: number) => { isSelected: boolean };
  isDayDisabled: (date: Date) => boolean;
  onPrev: () => void;
  onNext: () => void;
  onMonthViewClick: () => void;
  onYearViewClick: () => void;
  onDayClick: (date: Date, viewYear: number, viewMonth: number) => void;
  onDayHover: (date: Date | null) => void;
  onMonthClick: (month: number) => void;
  onYearClick: (year: number) => void;
  onWeekdayClick: (weekday: number) => void;
  onTimeChange: (type: "start" | "end", time: string) => void;
  onMonthHover?: (month: number | null) => void;
  onYearHover?: (year: number | null) => void;
}

export interface CalendarPortalProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  calendarZIndex: number;
  children: React.ReactNode;
}

export interface TimeSelectProps {
  value: string;
  options: string[];
  ariaLabel: string;
  onChange: (val: string) => void;
}

export interface DateComponent {
  (props: DatePropsWeekdaySingle): React.ReactElement;
  (props: DatePropsWeekdayMultiple): React.ReactElement;
  (props: DatePropsMultiple): React.ReactElement;
  (props: DatePropsDefault): React.ReactElement;
}
