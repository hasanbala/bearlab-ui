import { useId } from "react";
import classnames from "classnames";
import { IconErrorTriangle } from "./assets/icons";
import { useCharacterLimit } from "./hooks/use-character-limit";
import styles from "./styles/textarea.module.scss";
import type { TextareaProps } from "./types/textarea.types";

export const Textarea = (props: TextareaProps) => {
  const {
    id,
    error,
    label,
    style,
    value,
    disabled,
    className,
    maxLength,
    isRequired,
    defaultValue,
    maxCharacter,
    onChange,
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const countId = `${inputId}-character-count`;
  const hasStringError = error && typeof error === "string";

  const { limit, characterCount, handleChange } = useCharacterLimit({
    value,
    onChange,
    defaultValue,
    maxCharacter,
  });

  const hasLimit = limit !== undefined;
  const isLimitReached = hasLimit && characterCount >= limit;
  const describedBy =
    classnames(hasStringError && errorId, hasLimit && countId) || undefined;

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
          value={value}
          disabled={disabled}
          onChange={handleChange}
          defaultValue={defaultValue}
          maxLength={limit ?? maxLength}
          aria-required={isRequired}
          aria-invalid={!!error}
          aria-describedby={describedBy}
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
        {hasLimit && (
          <div
            className={classnames(
              styles.characterCount,
              isLimitReached && styles.characterCountLimit,
              className?.characterCount
            )}
            style={style?.characterCount}
          >
            <span aria-hidden="true">
              {characterCount} / {limit}
            </span>
            <span id={countId} className={styles.srOnly}>
              {characterCount} of {limit} characters used
            </span>
            <span role="status" aria-live="polite" className={styles.srOnly}>
              {isLimitReached ? `Character limit of ${limit} reached` : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
