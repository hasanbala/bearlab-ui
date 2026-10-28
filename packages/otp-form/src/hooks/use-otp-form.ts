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

  const sanitize = (char: string) =>
    isNumeric ? (/^[0-9]$/.test(char) ? char : "") : char;

  const focusInput = (index: number) => {
    const clamped = Math.min(Math.max(index, 0), length - 1);
    inputsRef.current[clamped]?.focus();
  };

  const fillFrom = (startIndex: number, chars: string[]) => {
    const updatedOtp = [...value];
    let lastIndex = startIndex;
    chars.slice(0, length - startIndex).forEach((char, offset) => {
      lastIndex = startIndex + offset;
      updatedOtp[lastIndex] = sanitize(char);
    });
    onChange(updatedOtp);
    focusInput(lastIndex + 1 < length ? lastIndex + 1 : lastIndex);
  };

  const handleChange = (val: string, index: number) => {
    if (val.length > 1) {
      const previous = value[index] ?? "";
      if (val.length === 2 && previous && val.includes(previous)) {
        const next = val[0] === previous ? val[1] : val[0];
        fillFrom(index, [next]);
        return;
      }
      fillFrom(index, val.split(""));
      return;
    }

    const updatedOtp = [...value];
    updatedOtp[index] = sanitize(val);
    onChange(updatedOtp);

    if (updatedOtp[index] && index < length - 1) focusInput(index + 1);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      const updatedOtp = [...value];

      if (!value[index] && index > 0) {
        focusInput(index - 1);
      }

      updatedOtp[index] = "";
      onChange(updatedOtp);
    }

    if (event.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    }

    if (event.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").trim().split("");
    fillFrom(0, pasteData);
  };

  return { inputsRef, handleChange, handleKeyDown, handlePaste };
};
