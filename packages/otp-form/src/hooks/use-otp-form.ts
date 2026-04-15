import { useRef } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import type { UseOtpForm, UseOtpFormReturn } from "../types/otp-form.types";

export const useOtpForm = ({
  value,
  onChange,
  isNumeric,
  length,
}: UseOtpForm): UseOtpFormReturn => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (val: string, index: number) => {
    const updatedOtp = [...value];

    if (isNumeric) {
      updatedOtp[index] = val.match(/^[0-9]*$/) ? val : "";
    } else {
      updatedOtp[index] = val;
    }

    onChange(updatedOtp);

    if (val && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      const updatedOtp = [...value];

      if (!value[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }

      updatedOtp[index] = "";
      onChange(updatedOtp);
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    }

    if (event.key === "ArrowRight" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pasteData = event.clipboardData
      .getData("text")
      .slice(0, length)
      .split("");

    const updatedOtp = [...value];
    pasteData.forEach((char, index) => {
      if (index < updatedOtp.length) {
        if (isNumeric) {
          updatedOtp[index] = char.match(/^[0-9]*$/) ? char : "";
        } else {
          updatedOtp[index] = char;
        }
      }
    });

    onChange(updatedOtp);

    const filledIndex = pasteData.length - 1;
    if (inputsRef.current[filledIndex]) {
      inputsRef.current[filledIndex].focus();
    }
  };

  return { inputsRef, handleChange, handleKeyDown, handlePaste };
};
