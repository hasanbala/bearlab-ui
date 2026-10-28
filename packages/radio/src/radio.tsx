import { useId } from "react";
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
    id,
    "aria-describedby": ariaDescribedBy,
    ...rest
  } = props;

  const uid = useId();
  const inputId = id ?? uid;
  const labelId = `${uid}-label`;
  const errorId = error ? `${uid}-error` : undefined;
  const popoverId = popover ? `${uid}-popover` : undefined;

  const describedBy =
    [ariaDescribedBy, errorId, popoverId].filter(Boolean).join(" ") ||
    undefined;

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
          {...rest}
          id={inputId}
          name={name}
          type="radio"
          value={value}
          onChange={handleRadioChange}
          disabled={disabled}
          checked={checked}
          required={isRequired}
          aria-invalid={!!error || undefined}
          aria-labelledby={label ? labelId : rest["aria-labelledby"]}
          aria-describedby={describedBy}
          className={styles.input}
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
          id={labelId}
          className={classnames(styles.radioLabel, className?.label)}
          style={style?.label}
        >
          {label} {isRequired && <span aria-hidden="true">*</span>}
        </span>
      )}
    </label>
  );
};
