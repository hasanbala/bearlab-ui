import classnames from "classnames";
import { IconErrorTriangle } from "./assets/icons";
import type { RadioProps } from "./types/radio.types";
import styles from "./styles/radio.module.scss";

export const Radio = (props: RadioProps) => {
  const {
    checked,
    onChange,
    className,
    style,
    disabled,
    label,
    name,
    error,
    value,
    isRequired,
    popover,
    ...rest
  } = props;

  const inputId = `radio-${name}-${value}`;
  const errorId = error ? `radio-error-${name}-${value}` : undefined;
  const popoverId = popover ? `radio-popover-${name}-${value}` : undefined;

  const describedBy =
    [errorId, popoverId].filter(Boolean).join(" ") || undefined;

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e);

  return (
    <label
      htmlFor={inputId}
      className={classnames(
        styles.container,
        className?.root,
        disabled && styles.disabled
      )}
      style={style?.root}
    >
      <div
        className={classnames(styles.radioWrapper, className?.radioWrapper)}
        style={style?.radioWrapper}
      >
        <input
          id={inputId}
          name={name}
          type="radio"
          value={value}
          onChange={handleRadioChange}
          disabled={disabled}
          checked={checked}
          aria-invalid={!!error}
          aria-required={isRequired}
          aria-describedby={describedBy}
          className={styles.input}
          {...rest}
        />
        <span
          aria-hidden="true"
          className={classnames(
            styles.checkedWrapper,
            checked ? styles.checked : styles.unchecked,
            disabled && styles.checkedDisabled,
            className?.checkedWrapper
          )}
          style={style?.checkedWrapper}
        >
          <span
            className={classnames(
              styles.innerDot,
              checked ? styles.visible : styles.hidden,
              className?.innerDot
            )}
            style={style?.innerDot}
          />
        </span>
        {error && (
          <div
            id={errorId}
            role="alert"
            className={classnames(styles.viewError, className?.error)}
            style={style?.error}
          >
            <IconErrorTriangle aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
        {popover && (
          <div
            id={popoverId}
            role="tooltip"
            className={classnames(styles.popover, className?.popover)}
            style={style?.popover}
          >
            {popover}
          </div>
        )}
      </div>
      {label && (
        <span
          className={classnames(styles.label, className?.label)}
          style={style?.label}
        >
          {label} {isRequired && <span aria-hidden="true">*</span>}
        </span>
      )}
    </label>
  );
};
