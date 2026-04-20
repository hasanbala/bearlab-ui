import { useId } from "react";
import classnames from "classnames";
import { useCredentialInput } from "./hooks/use-credential-input";
import { Tag } from "./components/tag";
import { TagInputProps } from "./types/tag-input.types";
import { IconErrorTriangle } from "./assets/icons";
import styles from "./styles/tag-input.module.scss";

export const TagInput = (props: TagInputProps) => {
  const {
    style,
    error,
    label,
    format,
    disabled,
    maxItems,
    isRequired,
    className,
    inputValue,
    helperText,
    placeholder,
    allowDuplicates,
    formatLabel,
    value: credentialList,
    onAdd,
    onError,
    onRemove,
    validate,
    onChange,
    onInputChange,
  } = props;

  const uid = useId();
  const inputId = `credential-input-${uid}`;
  const helperTextId = `${inputId}-helper`;
  const labelId = `${inputId}-label`;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);
  const errorMessage = typeof error === "string" ? error : undefined;
  const displayHelper = errorMessage ?? helperText;
  const isMaxReached =
    maxItems !== undefined && credentialList.length >= maxItems;

  const resolvedLabel =
    format === "custom"
      ? (formatLabel ?? "item")
      : format === "email"
        ? "email address"
        : "domain";

  const {
    announcement,
    inputRef,
    listId,
    handleBlur,
    handlePaste,
    handleRemove,
    handleKeyDown,
  } = useCredentialInput({
    value: credentialList,
    inputValue,
    onChange,
    onInputChange,
    format,
    validate,
    allowDuplicates,
    maxItems,
    onAdd,
    onRemove,
    onError,
    disabled,
  });

  const renderHelperMessage = () => {
    if (!displayHelper) return null;
    if (hasError) {
      return (
        <div
          id={errorId}
          role="status"
          aria-live="polite"
          style={style?.errorMessage}
          className={classnames(styles.viewError, className?.errorMessage)}
        >
          <IconErrorTriangle aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      );
    }

    return (
      <div
        id={helperTextId}
        className={classnames(styles.helperText, className?.helperText)}
        style={style?.helperText}
        aria-live="polite"
      >
        {displayHelper}
      </div>
    );
  };

  return (
    <div
      style={style?.root}
      className={classnames(
        styles.container,
        disabled && styles.disabled,
        className?.root
      )}
    >
      {label && (
        <label
          style={style?.label}
          id={labelId}
          htmlFor={inputId}
          className={classnames(styles.tagInputLabel, className?.label)}
        >
          {label}
          {isRequired && <span aria-hidden="true"> *</span>}
        </label>
      )}
      <div
        role="group"
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={displayHelper ? helperTextId : undefined}
        aria-invalid={hasError}
        aria-disabled={disabled}
        className={classnames(
          styles.fieldWrapper,
          hasError && styles.error,
          className?.list
        )}
        style={style?.list}
        onClick={() => inputRef.current?.focus()}
      >
        <ul
          id={listId}
          role="list"
          aria-label={`${resolvedLabel} list`}
          className={styles.tagList}
        >
          {credentialList.map((item) => (
            <li key={item.id} className={styles.tagListItem}>
              <Tag
                item={item}
                onRemove={handleRemove}
                disabled={disabled}
                className={className}
                style={style}
              />
            </li>
          ))}
        </ul>
        {!isMaxReached && (
          <input
            ref={inputRef}
            id={inputId}
            name="search"
            type="text"
            role="combobox"
            aria-expanded={false}
            aria-autocomplete="none"
            aria-label={label ? undefined : `Enter ${resolvedLabel}`}
            aria-describedby={displayHelper ? helperTextId : undefined}
            aria-invalid={hasError}
            aria-required={isRequired}
            disabled={disabled}
            placeholder={
              credentialList.length === 0
                ? (placeholder ?? `Add ${resolvedLabel}…`)
                : undefined
            }
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onBlur={handleBlur}
            className={classnames(styles.input, className?.input)}
            style={style?.input}
            autoComplete="off"
            spellCheck={false}
          />
        )}
      </div>
      {renderHelperMessage()}
      {maxItems !== undefined && (
        <div
          aria-live="polite"
          className={classnames(
            styles.helperText,
            styles.helperTextCount,
            isMaxReached && styles.helperTextError
          )}
        >
          {credentialList.length} / {maxItems}
        </div>
      )}
      <span
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        className={styles.srOnly}
      >
        {announcement}
      </span>
    </div>
  );
};
