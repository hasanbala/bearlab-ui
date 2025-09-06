import { useRef } from "react";
import { Input } from "@bearlab/input/src";
import styles from "./otpForm.module.scss";

export const OTPForm = (props: Props) => {
  const {
    passValue,
    loading,
    title,
    setPassValue,
    justNumber = true,
    otpLength = 6,
  } = props;

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    const updatedOtp = [...passValue];

    if (justNumber) {
      updatedOtp[index] = value.match(/^[0-9]*$/) ? value : "";
    } else {
      updatedOtp[index] = value;
    }

    setPassValue(updatedOtp);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key == "Backspace") {
      const updatedOtp = [...passValue];

      if (!passValue[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }

      updatedOtp[index] = "";
      setPassValue(updatedOtp);
    }

    if (event.key == "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    }

    if (event.key == "ArrowRight" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pasteData = event.clipboardData.getData("text").slice(0, 6).split("");

    const updatedOtp = [...passValue];
    pasteData.forEach((char, index) => {
      if (index < updatedOtp.length) {
        if (justNumber) {
          updatedOtp[index] = char.match(/^[0-9]*$/) ? char : "";
        } else {
          updatedOtp[index] = char;
        }
      }
    });

    setPassValue(updatedOtp);

    const filledIndex = pasteData.length - 1;
    if (inputsRef.current[filledIndex]) {
      inputsRef.current[filledIndex].focus();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.subHeader}>{title}</div>
      <div className={styles.inputs}>
        {[...Array(otpLength)].map((_, index) => (
          <Input
            key={index}
            type="text"
            name={"index"}
            maxLength={1}
            disabled={loading}
            value={passValue[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e)}
            ref={(el) => {
              if (el) {
                inputsRef.current[index] = el;
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface Props {
  setPassValue: (value: string[]) => void;
  passValue: string[];
  loading?: boolean;
  title: string;
  justNumber?: boolean;
  otpLength?: number;
}
