import { useEffect } from "react";
import classnames from "classnames";
import type { OTPFormProps } from "./types/otp-form.types";
import { useOtpForm } from "./hooks/use-otp-form";
import { OtpInputList } from "./components/otp-input-list";
import styles from "./styles/otp-form.module.scss";

export const OTPForm = (props: OTPFormProps) => {
  const {
    value,
    loading,
    title,
    onChange,
    isNumeric = true,
    length = 6,
    className,
    style,
    ariaLabel = "One-time password input",
  } = props;

  const { inputsRef, handleChange, handleKeyDown, handlePaste } = useOtpForm({
    value,
    onChange,
    isNumeric,
    length,
  });

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  return (
    <div
      className={classnames(styles.container, className?.root)}
      style={style?.root}
      aria-label={ariaLabel}
    >
      {title && (
        <p
          id="otp-title"
          className={classnames(styles.subHeader, className?.subHeader)}
          style={style?.subHeader}
          aria-hidden="true"
        >
          {title}
        </p>
      )}
      <OtpInputList
        value={value}
        length={length}
        disabled={loading}
        inputsRef={inputsRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
    </div>
  );
};
