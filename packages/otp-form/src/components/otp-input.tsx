import type { ChangeEvent } from "react";
import type { OtpInputProps } from "../types/otp-form.types";

export const OtpInput = (props: OtpInputProps) => {
  const {
    name,
    index,
    style,
    value,
    disabled,
    className,
    label,
    inputRef,
    onChange,
    onPaste,
    onKeyDown,
  } = props;

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      name={name}
      autoComplete={index === 0 ? "one-time-code" : "off"}
      maxLength={index === 0 ? length : 1}
      disabled={disabled}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value, index)
      }
      onKeyDown={(e) => onKeyDown(e, index)}
      onPaste={onPaste}
      className={className}
      style={style}
      aria-label={label}
      aria-required="true"
    />
  );
};
