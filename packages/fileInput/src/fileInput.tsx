import classnames from "classnames";
import { JSX } from "react";
import styles from "./fileInput.module.scss";
import { ViewError } from "@bearlab/view-error/src";

export const FileInput = (props: Props) => {
  const { className, label, error, isRequired, ...rest } = props;

  return (
    <div className={classnames(styles.container, className)}>
      {label && (
        <div className={styles.label}>
          {label} {isRequired && <span>*</span>}
        </div>
      )}
      <div className={styles.inputWrapper}>
        <input
          type="file"
          className={classnames(error && styles.error)}
          {...rest}
        />
        {error && <ViewError label={error} />}
      </div>
    </div>
  );
};

type InputProps = JSX.IntrinsicElements["input"];

interface Props extends InputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  label?: string;
  className?: string;
  isRequired?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
