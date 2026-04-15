import { useState, useId } from "react";
import classnames from "classnames";
import {
  IconEyesClose,
  IconEyesOpen,
  IconCopy,
  IconTick,
  IconSearch,
  IconErrorTriangle,
} from "./assets/icons";
import type { InputProps, IconType } from "./types/input.types";
import styles from "./styles/input.module.scss";
import { useCopy } from "./hooks/use-copy";

const renderIcon = (icon: IconType) => {
  if (typeof icon === "string") return <>{icon}</>;
  const IconComponent = icon;
  return <IconComponent />;
};

export const Input = (props: InputProps) => {
  const {
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
    isExistSearch,
    type = "text",
    isExistPassword,
    onClick,
    onSearch,
    ...rest
  } = props;

  const inputId = useId();
  const errorId = useId();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { isCopy, handleCopy } = useCopy(value, disabled);
  const hasError = Boolean(error);
  const inputType =
    type !== "password" || passwordVisible ? "text" : "password";

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
          className={classnames(styles.label, className?.label)}
        >
          {label} {isRequired && <span aria-hidden="true"> *</span>}
        </label>
      )}
      <div
        style={style?.inputWrapper}
        className={classnames(
          styles.inputWrapper,
          hasError && styles.inputWrapperError,
          className?.inputWrapper
        )}
      >
        <input
          id={inputId}
          value={value ?? ""}
          type={inputType}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={classnames(
            styles.input,
            isExistSearch && styles.inputWithSearch,
            isExistPassword && !isExistCopy && styles.inputWithPassword,
            isExistCopy && !isExistPassword && styles.inputWithCopy,
            isExistCopy && isExistPassword && styles.inputWithCopyAndPassword,
            hasError && styles.inputError,
            className?.input
          )}
          style={style?.input}
          {...rest}
        />
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
        {isExistPassword && (
          <button
            type="button"
            aria-label={passwordVisible ? "Hide password" : "Show password"}
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
            aria-label={isCopy ? "Copied" : "Copy to clipboard"}
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
        {isExistSearch && (
          <button
            type="button"
            aria-label="Search"
            onClick={onSearch}
            className={classnames(styles.searchButton, className?.searchButton)}
            style={style?.searchButton}
          >
            <IconSearch aria-hidden="true" />
          </button>
        )}
        {hasError && (
          <div
            id={errorId}
            role="alert"
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
};
