import { useId } from "react";
import classnames from "classnames";
import { IconErrorTriangle } from "./assets/icons";
import type { SwitchProps } from "./types/switch.types";
import styles from "./styles/switch.module.scss";

export const Switch = (props: SwitchProps) => {
  const {
    checked,
    disabled,
    label,
    name,
    error,
    isRequired,
    popover,
    className,
    style,
    id,
    "aria-describedby": ariaDescribedBy,
    ...rest
  } = props;

  const uid = useId();
  const inputId = id ?? uid;
  const labelId = `${uid}-label`;
  const errorId = `${uid}-error`;
  const popoverId = `${uid}-popover`;

  const describedBy =
    [ariaDescribedBy, error && errorId, popover && popoverId]
      .filter(Boolean)
      .join(" ") || undefined;

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
        className={classnames(styles.switchWrapper, className?.switchWrapper)}
        style={style?.switchWrapper}
      >
        <input
          {...rest}
          id={inputId}
          name={name}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          required={isRequired}
          aria-labelledby={label ? labelId : rest["aria-labelledby"]}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
        />
        <span
          aria-hidden="true"
          className={classnames(
            styles.slider,
            checked ? styles.checked : styles.unchecked,
            disabled && styles.sliderDisabled,
            className?.slider
          )}
          style={style?.slider}
        >
          <span
            className={classnames(
              styles.toggle,
              checked ? styles.toggleActive : styles.toggleInactive,
              className?.toggle
            )}
            style={style?.toggle}
          />
        </span>
        {error && (
          <div
            id={errorId}
            role="alert"
            aria-live="polite"
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
          className={classnames(styles.switchLabel, className?.label)}
          style={style?.label}
        >
          {label}
          {isRequired && <span aria-hidden="true"> *</span>}
        </span>
      )}
    </label>
  );
};
