import { useEffect, useId } from "react";
import classnames from "classnames";
import type { OTPFormProps } from "./types/otp-form.types";
import { useOtpForm } from "./hooks/use-otp-form";
import { OtpInputList } from "./components/otp-input-list";
import styles from "./styles/otp-form.module.scss";

const defaultInputLabel = (index: number, length: number) =>
  `Character ${index + 1} of ${length} digit code`;

export const OTPForm = (props: OTPFormProps) => {
  const {
    name,
    value,
    loading,
    title,
    onChange,
    isNumeric = true,
    length = 6,
    className,
    style,
    autoFocus = true,
    ariaLabel = "One-time password input",
    inputLabel = defaultInputLabel,
  } = props;

  const titleId = useId();

  const { inputsRef, handleChange, handleKeyDown, handlePaste } = useOtpForm({
    value,
    onChange,
    isNumeric,
    length,
  });

  useEffect(() => {
    if (autoFocus) inputsRef.current[0]?.focus();
  }, [autoFocus, inputsRef]);

  return (
    <div
      className={classnames(styles.container, className?.root)}
      style={style?.root}
      role="group"
      aria-label={title ? undefined : ariaLabel}
      aria-labelledby={title ? titleId : undefined}
    >
      {title && (
        <p
          id={titleId}
          className={classnames(styles.subHeader, className?.subHeader)}
          style={style?.subHeader}
        >
          {title}
        </p>
      )}
      <OtpInputList
        name={name}
        value={value}
        length={length}
        inputLabel={inputLabel}
        disabled={loading}
        className={className}
        style={style}
        inputsRef={inputsRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
    </div>
  );
};
