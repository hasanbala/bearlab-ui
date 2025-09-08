import { JSX } from "react";
import classnames from "classnames";
import styles from "./textarea.module.scss";
import { ViewError } from "@bearlab/view-error";

export const Textarea = (props: Props) => {
  const { error, label, disabled, className, isRequired, ...rest } = props;

  return (
    <div
      className={classnames(
        styles.container,
        className,
        disabled && styles.disabled
      )}
    >
      {label && (
        <div className={styles.label}>
          {label} {isRequired && <span>*</span>}
        </div>
      )}
      <div className={styles.textareaWrapper}>
        <textarea
          disabled={disabled}
          className={classnames(error && styles.error)}
          {...rest}
        />
        {error && <ViewError label={error} />}
      </div>
    </div>
  );
};

type TextareaProps = JSX.IntrinsicElements["textarea"];

interface Props extends TextareaProps {
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  rows?: number;
  value: string;
  name?: string;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  onChange: (_val: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (_val: React.FocusEvent<HTMLTextAreaElement>) => void;
}
