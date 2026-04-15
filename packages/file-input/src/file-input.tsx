import { useId } from "react";
import classnames from "classnames";
import { IconErrorTriangle } from "./assets/icons";
import styles from "./styles/file-input.module.scss";
import type { FileInputProps } from "./types/file-input.types";

export const FileInput = (props: FileInputProps) => {
  const {
    className,
    label,
    error,
    isRequired,
    onChange,
    style,
    id: externalId,
    name,
    accept,
    multiple,
    disabled,
    capture,
    helperText,
    inputRef,
  } = props;

  const generatedId = useId();
  const inputId = externalId ?? generatedId;
  const errorId = `file-input-${inputId}-error`;
  const helperTextId = `file-input-${inputId}-helper`;

  const describedByIds = [
    error ? errorId : null,
    helperText ? helperTextId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classnames(styles.container, className?.root)}
      style={style?.root}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={classnames(styles.label, className?.label)}
          style={style?.label}
        >
          {label}
          {isRequired && (
            <span aria-hidden="true" className={styles.requiredIndicator}>
              *
            </span>
          )}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          capture={capture}
          className={classnames(
            styles.input,
            error && styles.inputError,
            disabled && styles.inputDisabled,
            className?.input
          )}
          style={style?.input}
          onChange={onChange}
          aria-invalid={!!error}
          aria-required={isRequired}
          aria-describedby={describedByIds || undefined}
          aria-disabled={disabled}
        />
        {helperText && !error && (
          <p
            id={helperTextId}
            className={classnames(styles.helperText, className?.helperText)}
            style={style?.helperText}
          >
            {helperText}
          </p>
        )}
        {error && (
          <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className={classnames(styles.errorText, className?.errorText)}
            style={style?.errorText}
          >
            <IconErrorTriangle
              aria-hidden="true"
              className={styles.errorIcon}
            />
            <span>{label}</span>
          </p>
        )}
      </div>
    </div>
  );
};
