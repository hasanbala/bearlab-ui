import classNames from "classnames";
import { getWeekdayLabels, getWeekdayNamesLong } from "../utils/date-utils";
import styles from "../styles/date.module.scss";
import { WeekdayPickerProps } from "../types/date.types";

export const WeekdayPicker = (props: WeekdayPickerProps) => {
  const { locale, getWeekdayStatus, onWeekdayClick } = props;

  const shortLabels = getWeekdayLabels(locale);
  const longNames = getWeekdayNamesLong(locale);

  return (
    <div className={styles.weekdayPickerGrid}>
      {shortLabels.map((label, index) => {
        const { isSelected } = getWeekdayStatus(index);

        return (
          <button
            key={index}
            type="button"
            aria-label={longNames[index]}
            aria-pressed={isSelected}
            onClick={() => onWeekdayClick(index)}
            className={classNames(styles.weekdayCell, {
              [styles.weekdayCellSelected]: isSelected,
            })}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
