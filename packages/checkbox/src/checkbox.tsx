import { JSX } from "react";
import classnames from "classnames";
import { IconChecked, IconDisabled, IconError2 } from "@bearlab/core";
import styles from "./checkbox.module.scss";

export const Checkbox = (props: Props) => {
  const {
    checked,
    className,
    disabled,
    label,
    error,
    isRequired,
    popover,
    ...rest
  } = props;

  return (
    <label
      className={classnames(
        styles.container,
        className,
        disabled && styles.disabled
      )}
    >
      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          {...rest}
        />
        {checked && <IconChecked className={styles.iconChecked} />}
        {disabled && <IconDisabled className={styles.iconDisabled} />}
        {error && (
          <div className={styles.viewError}>
            <IconError2 />
            <span>{label}</span>
          </div>
        )}
        {popover && <div className={styles.popover}>{label}</div>}
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
  popover?: string;
  checked: boolean;
  disabled?: boolean;
  className?: string;
  isRequired?: boolean;
  onChange: (_val: React.ChangeEvent<HTMLInputElement>) => void;
}
