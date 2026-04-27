import { useId } from "react";
import classnames from "classnames";
import { IconChecked, IconDisabled, IconErrorTriangle } from "./assets/icons";
import type { CheckboxProps } from "./types/checkbox.types";
import styles from "./styles/checkbox.module.scss";

export const Checkbox = (props: CheckboxProps) => {
  const {
    checked,
    className,
    style,
    disabled,
    label,
    error,
    isRequired,
    popover,
    id: userId,
    onChange,
    ...rest
  } = props;

  const generatedId = useId();
  const id = userId || generatedId;
  const errorId = `${id}-error`;
  const popoverId = `${id}-popover`;

  const describedBy =
    [error && errorId, popover && popoverId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <label
      className={classnames(
        styles.container,
        className?.root,
        disabled && styles.disabled
      )}
      style={style?.root}
    >
      <div
        className={classnames(
          styles.checkboxWrapper,
          className?.checkboxWrapper
        )}
        style={style?.checkboxWrapper}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          required={isRequired}
          aria-checked={checked}
          aria-disabled={disabled}
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : undefined}
          aria-required={isRequired ? "true" : undefined}
          {...rest}
        />
        {checked && (
          <IconChecked
            className={classnames(styles.iconChecked, className?.iconChecked)}
            style={style?.iconChecked}
            aria-hidden="true"
            focusable="false"
          />
        )}
        {disabled && (
          <IconDisabled
            className={classnames(styles.iconDisabled, className?.iconDisabled)}
            style={style?.iconDisabled}
            aria-hidden="true"
            focusable="false"
          />
        )}
        {popover && (
          <div
            id={popoverId}
            role="tooltip"
            style={style?.popover}
            className={classnames(styles.popover, className?.popover)}
          >
            {popover}
          </div>
        )}
      </div>
      {label && (
        <span
          style={style?.label}
          className={classnames(styles.checkboxLabel, className?.label)}
        >
          {label}{" "}
          {isRequired && (
            <span aria-label="required field" aria-hidden="true">
              *
            </span>
          )}
        </span>
      )}
      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          style={style?.viewError}
          className={classnames(styles.viewError, className?.viewError)}
        >
          <IconErrorTriangle aria-hidden="true" focusable="false" />
          <span>{error}</span>
        </div>
      )}
    </label>
  );
};
