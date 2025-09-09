import classNames from "classnames";
import { ViewError } from "@bearlab/view-error";
import { IconArrowDown } from "@bearlab/core";
import styles from "./select.module.scss";
import { JSX } from "react";

export const Select = (props: Props) => {
  const {
    label,
    error,
    className,
    disabled,
    value,
    options,
    placeholder = "Select an option",
    isRequired,
    ...rest
  } = props;

  return (
    <div
      className={classNames(
        styles.container,
        className,
        disabled && styles.disabled
      )}
    >
      {label && (
        <div className={styles.label}>
          {label} {isRequired && <span>*</span>}
        </div>
      )}
      <div className={styles.selectWrapper}>
        <select
          className={classNames(
            styles.select,
            value ? styles.activeSelected : styles.passiveSelected,
            error && styles.error
          )}
          value={value}
          disabled={disabled}
          {...rest}
        >
          <option value="" disabled className={styles.firstOption}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={styles.otherOptions}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.chevronIcon}>
          <IconArrowDown />
        </span>
        {error && <ViewError label={error} />}
      </div>
    </div>
  );
};

type InputProps = JSX.IntrinsicElements["select"];

export interface Props extends InputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  name: string;
  value: string;
  label: string;
  options: Option[];
  className?: string;
  disabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface Option {
  value: string;
  label: string;
}
