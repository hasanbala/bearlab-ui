import classnames from "classnames";
import { Radio } from "./radio";
import type { RadioGroupProps } from "./types/radio.types";
import styles from "./styles/radio.module.scss";

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    options,
    disabled,
    name,
    className,
    style,
    value,
    onChange,
    isVertical = false,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
  } = props;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
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
    </div>
  );
};
