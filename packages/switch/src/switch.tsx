import classnames from "classnames";
import { JSX } from "react";
import styles from "./switch.module.scss";
import { Popover } from "@bearlab/popover";
import { ViewError } from "@bearlab/view-error";

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
  checked: boolean;
  popover?: string;
  disabled?: boolean;
  className?: string;
  isRequired?: boolean;
  onChange: (_val: React.ChangeEvent<HTMLInputElement>) => void;
}
