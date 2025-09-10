import classnames from "classnames";
import styles from "./fileInput.module.scss";
import { IconError2 } from "@bearlab/core";

export const FileInput = (props: Props) => {
  const { className, label, error, isRequired, onChange } = props;

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
          onChange={onChange}
        />
        {error && (
          <div className={styles.viewError}>
            <IconError2 />
            <span>{label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export interface Props {
  error?: any;
  label?: string;
  className?: string;
  isRequired?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
