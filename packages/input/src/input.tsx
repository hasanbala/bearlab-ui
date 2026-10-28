import { forwardRef, useCallback, useId, useRef, useState } from "react";
import classnames from "classnames";
import {
  IconEyesClose,
  IconEyesOpen,
  IconCopy,
  IconTick,
  IconSearch,
  IconErrorTriangle,
} from "./assets/icons";
import type { InputProps, IconType, InputLabels } from "./types/input.types";
import styles from "./styles/input.module.scss";
import { useCopy } from "./hooks/use-copy";

const renderIcon = (icon: IconType) => {
  if (typeof icon === "string") return <>{icon}</>;
  const IconComponent = icon;
  return <IconComponent />;
};

const DEFAULT_LABELS: Required<InputLabels> = {
  showPassword: "Show password",
  hidePassword: "Hide password",
  copy: "Copy to clipboard",
  copied: "Copied",
  search: "Search",
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    id,
    name,
    label,
    error,
    value,
    style,
    disabled,
    afterIcon,
    className,
    beforeIcon,
    isRequired,
    isExistCopy,
    labels,
    type = "text",
    onSearch,
    "aria-describedby": ariaDescribedBy,
    ...rest
  } = props;

  const generatedId = useId();
  const errorId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { isCopy, handleCopy } = useCopy(
    () => inputRef.current?.value,
    disabled
  );
  const text = { ...DEFAULT_LABELS, ...labels };
  const hasError = Boolean(error);
  const hasPassword = type === "password";
  const inputType = hasPassword
    ? passwordVisible
      ? "text"
      : "password"
    : type;
  const describedBy =
    [ariaDescribedBy, hasError ? errorId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const togglePassword = () => setPasswordVisible((prev) => !prev);

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
          htmlFor={inputId}
          style={style?.label}
          className={classnames(styles.inputLabel, className?.label)}
        >
          {label} {isRequired && <span aria-hidden="true"> *</span>}
        </label>
      )}
      <div
        style={style?.inputWrapper}
        className={classnames(
          styles.inputWrapper,
          hasError && styles.error,
          className?.inputWrapper
        )}
      >
        {beforeIcon && (
          <div
            aria-hidden="true"
            style={style?.beforeIcon}
            className={classnames(
              styles.iconWrapper,
              styles.beforeIcon,
              className?.beforeIcon
            )}
          >
            {renderIcon(beforeIcon)}
          </div>
        )}
        {afterIcon && (
          <div
            aria-hidden="true"
            className={classnames(
              styles.iconWrapper,
              styles.afterIcon,
              className?.afterIcon
            )}
            style={style?.afterIcon}
          >
            {renderIcon(afterIcon)}
          </div>
        )}
        {hasPassword && (
          <button
            type="button"
            aria-label={passwordVisible ? text.hidePassword : text.showPassword}
            onClick={togglePassword}
            className={classnames(
              styles.passwordToggle,
              isExistCopy && styles.passwordToggleWithCopy,
              className?.passwordToggle
            )}
            style={style?.passwordToggle}
          >
            {passwordVisible ? (
              <IconEyesClose aria-hidden="true" />
            ) : (
              <IconEyesOpen aria-hidden="true" />
            )}
          </button>
        )}
        {isExistCopy && (
          <button
            type="button"
            aria-label={isCopy ? text.copied : text.copy}
            onClick={handleCopy}
            disabled={disabled}
            className={classnames(
              styles.iconWrapper,
              styles.afterIcon,
              styles.copyButton,
              className?.copyButton
            )}
            style={style?.copyButton}
          >
            {isCopy ? (
              <IconTick aria-hidden="true" />
            ) : (
              <IconCopy aria-hidden="true" />
            )}
          </button>
        )}
        {onSearch && (
          <button
            type="button"
            aria-label={text.search}
            onClick={onSearch}
            className={classnames(styles.searchButton, className?.searchButton)}
            style={style?.searchButton}
          >
            <IconSearch aria-hidden="true" />
          </button>
        )}
        <input
          {...rest}
          ref={setRefs}
          name={name}
          id={inputId}
          value={value}
          type={inputType}
          disabled={disabled}
          required={isRequired || rest.required}
          aria-invalid={hasError || rest["aria-invalid"] || undefined}
          aria-describedby={describedBy}
          className={classnames(
            styles.input,
            onSearch && styles.inputWithSearch,
            hasPassword && !isExistCopy && styles.inputWithPassword,
            isExistCopy && !hasPassword && styles.inputWithCopy,
            isExistCopy && hasPassword && styles.inputWithCopyAndPassword,
            className?.input
          )}
          style={style?.input}
        />
        {hasError && (
          <div
            id={errorId}
            role="status"
            aria-live="polite"
            style={style?.errorMessage}
            className={classnames(styles.viewError, className?.errorMessage)}
          >
            <IconErrorTriangle aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
});

Input.displayName = "Input";
