import { OtpInput } from "./otp-input";
import type { OtpInputListProps } from "../types/otp-form.types";
import styles from "../styles/otp-form.module.scss";
import classnames from "classnames";

export const OtpInputList = (props: OtpInputListProps) => {
  const {
    name,
    value,
    length,
    inputLabel,
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
      style={style?.inputs}
      className={classnames(styles.inputs, className?.inputs)}
    >
      {Array.from({ length }, (_, index) => (
        <OtpInput
          key={index}
          name={name}
          index={index}
          length={length}
          label={inputLabel(index, length)}
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
