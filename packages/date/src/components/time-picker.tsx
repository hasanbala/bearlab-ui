import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { getMinuteOptions } from "../utils/date-utils";
import { TimePickerProps, TimeSelectProps } from "../types/date.types";
import styles from "../styles/date.module.scss";

const TimeSelect = (props: TimeSelectProps) => {
  const { value, options, ariaLabel, onChange } = props;

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleDown = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleDown);
    return () => document.removeEventListener("mousedown", handleDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) selectedRef.current?.scrollIntoView({ block: "nearest" });
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className={styles.timeSelectWrapper}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        className={styles.timeSelectBtn}
        onClick={() => setIsOpen((v) => !v)}
      >
        {value}
      </button>
      {isOpen && (
        <div className={styles.timeDropdown} role="listbox">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              role="option"
              aria-selected={opt === value}
              ref={opt === value ? selectedRef : undefined}
              className={classNames(styles.timeOption, {
                [styles.timeOptionSelected]: opt === value,
              })}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const TimePicker = (props: TimePickerProps) => {
  const {
    mode,
    startTime,
    endTime,
    minuteStep,
    hasEndDate,
    labels,
    onTimeChange,
  } = props;

  const [startHour = "00", startMinute = "00"] = startTime.split(":");
  const [endHour = "00", endMinute = "00"] = endTime.split(":");

  const hourOptions = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minuteOptions = getMinuteOptions(minuteStep);

  const resolvedStartMin = minuteOptions.includes(startMinute)
    ? startMinute
    : minuteOptions[0];
  const resolvedEndMin = minuteOptions.includes(endMinute)
    ? endMinute
    : minuteOptions[0];

  const isRange = mode === "range";
  const timeLabel = labels?.time ?? "Time";
  const startTimeLabel = labels?.startTime ?? "Start";
  const endTimeLabel = labels?.endTime ?? "End";

  return (
    <div className={styles.timePicker}>
      <div className={styles.timeRow}>
        <span className={styles.timeLabel}>
          {isRange ? startTimeLabel : timeLabel}
        </span>
        <div className={styles.timeInputs}>
          <TimeSelect
            value={startHour}
            options={hourOptions}
            ariaLabel="Hour"
            onChange={(h) => onTimeChange("start", `${h}:${resolvedStartMin}`)}
          />
          <span className={styles.timeSeparator}>:</span>
          <TimeSelect
            value={resolvedStartMin}
            options={minuteOptions}
            ariaLabel="Minute"
            onChange={(m) => onTimeChange("start", `${startHour}:${m}`)}
          />
        </div>
      </div>
      {isRange && hasEndDate && (
        <div className={styles.timeRow}>
          <span className={styles.timeLabel}>{endTimeLabel}</span>
          <div className={styles.timeInputs}>
            <TimeSelect
              value={endHour}
              options={hourOptions}
              ariaLabel="End hour"
              onChange={(h) => onTimeChange("end", `${h}:${resolvedEndMin}`)}
            />
            <span className={styles.timeSeparator}>:</span>
            <TimeSelect
              value={resolvedEndMin}
              options={minuteOptions}
              ariaLabel="End minute"
              onChange={(m) => onTimeChange("end", `${endHour}:${m}`)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
