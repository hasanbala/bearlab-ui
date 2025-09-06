import { JSX } from "react";
import classnames from "classnames";
import { ViewError } from "@bearlab/view-error/src";
import { Popover } from "@bearlab/popover/src";
import { IconChecked, IconDisabled } from "@bearlab/core/src";
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
        {error && <ViewError label={error} />}
        {popover && <Popover className={styles.popover} label={popover} />}
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

interface Props extends InputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
