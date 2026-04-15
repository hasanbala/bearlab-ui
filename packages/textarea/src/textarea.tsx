import { useId } from "react";
import classnames from "classnames";
import { IconErrorTriangle } from "./assets/icons";
import styles from "./styles/textarea.module.scss";
import type { TextareaProps } from "./types/textarea.types";

export const Textarea = (props: TextareaProps) => {
  const { error, label, disabled, className, style, isRequired, id, ...rest } =
    props;

  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const hasStringError = error && typeof error === "string";

  return (
    <div
      className={classnames(
        styles.container,
        className?.root,
        disabled && styles.disabled
      )}
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
            <span
              className={classnames(
                styles.requiredMark,
                className?.requiredMark
              )}
              style={style?.requiredMark}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}
      <div
        className={classnames(
          styles.textareaWrapper,
          className?.textareaWrapper
        )}
        style={style?.textareaWrapper}
      >
        <textarea
          id={inputId}
          disabled={disabled}
          aria-required={isRequired}
          aria-invalid={!!error}
          aria-describedby={hasStringError ? errorId : undefined}
          className={classnames(className?.textarea, error && styles.error)}
          style={style?.textarea}
          {...rest}
        />
        {hasStringError && (
          <div
            id={errorId}
            role="alert"
            aria-live="polite"
            className={classnames(styles.viewError, className?.errorMessage)}
            style={style?.errorMessage}
          >
            <IconErrorTriangle aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
