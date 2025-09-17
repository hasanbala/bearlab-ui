import classnames from "classnames";
import { JSX } from "react";
import styles from "./switch.module.scss";
import { IconErrorTriangle } from "@bearlab/core";

export const Switch = (props: Props) => {
  const {
    checked,
    className,
    disabled,
    label,
    name,
    error,
    isRequired,
    popover,
    ...rest
  } = props;

  return (
    <label
      htmlFor={name}
      className={classnames(
        styles.container,
        className,
        disabled && styles.disabled
      )}
    >
      <div className={styles.switchWrapper}>
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          {...rest}
        />
        <span
          className={classnames(
            styles.slider,
            checked ? styles.checked : styles.unchecked,
            disabled && styles.sliderDisabled
          )}
        >
          <span
            className={classnames(
              styles.toggle,
              checked ? styles.toggleActive : styles.toggleInactive
            )}
          />
        </span>
        {error && (
          <div className={styles.viewError}>
            <IconErrorTriangle />
            <span>{label}</span>
          </div>
        )}
        {popover && <div className={styles.popover}>{popover}</div>}
      </div>
      {label && (
        <div className={styles.label}>
          {label} {isRequired && <span>*</span>}
        </div>
      )}
    </label>
  );
};

type InputProps = Omit<JSX.IntrinsicElements["input"], "popover">;

export interface Props extends InputProps {
  error?: any;
  name?: string;
  label?: string;
  checked: boolean;
  popover?: string;
  disabled?: boolean;
  className?: string;
  isRequired?: boolean;
  onChange: (_val: React.ChangeEvent<HTMLInputElement>) => void;
}
