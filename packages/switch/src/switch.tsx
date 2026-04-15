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
    ...rest
  } = props;

  const errorId = name ? `${name}-error` : undefined;
  const popoverId = name ? `${name}-popover` : undefined;

  const describedBy =
    [error && errorId, popover && popoverId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <label
      htmlFor={name}
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
          id={name}
          name={name}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          aria-checked={checked}
          aria-required={isRequired}
          aria-disabled={disabled}
          aria-describedby={describedBy}
          {...rest}
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
          className={classnames(styles.label, className?.label)}
          style={style?.label}
        >
          {label}
          {isRequired && <span aria-hidden="true"> *</span>}
        </span>
      )}
    </label>
  );
};
