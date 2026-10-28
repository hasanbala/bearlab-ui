import { useId } from "react";
import classnames from "classnames";
import { Radio } from "./radio";
import { IconErrorTriangle } from "./assets/icons";
import type { RadioGroupProps } from "./types/radio.types";
import styles from "./styles/radio.module.scss";

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    options,
    disabled,
    name,
    error,
    isRequired,
    className,
    style,
    value,
    onBlur,
    onChange,
    isVertical = false,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
  } = props;

  const errorId = useId();

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    onBlur?.(e);
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-required={isRequired || undefined}
      aria-invalid={!!error || undefined}
      aria-describedby={error ? errorId : undefined}
      onBlur={handleBlur}
      className={classnames(
        styles.radioGroup,
        isVertical && styles.vertical,
        className?.root
      )}
      style={style?.root}
    >
      {options.map((option) => (
        <Radio
          name={name}
          key={option.value}
          label={option.label}
          value={option.value}
          checked={value === option.value}
          disabled={option.disabled ?? disabled}
          onChange={onChange}
        />
      ))}
      {error && (
        <div
          id={errorId}
          role="alert"
          className={classnames(styles.groupError, className?.error)}
          style={style?.error}
        >
          <IconErrorTriangle aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
