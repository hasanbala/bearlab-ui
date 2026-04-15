import { OtpInput } from "./otp-input";
import type { OtpInputListProps } from "../types/otp-form.types";
import styles from "../styles/otp-form.module.scss";
import classnames from "classnames";

export const OtpInputList = (props: OtpInputListProps) => {
  const {
    value,
    length,
    disabled,
    inputsRef,
    className,
    style,
    onChange,
    onKeyDown,
    onPaste,
  } = props;

  return (
    <div
      role="group"
      style={style?.inputs}
      aria-labelledby="otp-title"
      className={classnames(styles.inputs, className?.inputs)}
    >
      {Array.from({ length }, (_, index) => (
        <OtpInput
          key={index}
          index={index}
          length={length}
          value={value[index] ?? ""}
          disabled={disabled}
          inputRef={(el) => {
            if (el) inputsRef.current[index] = el;
          }}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          className={className?.input}
          style={style?.input}
        />
      ))}
    </div>
  );
};
