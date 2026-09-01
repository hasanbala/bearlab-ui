import classnames from "classnames";
import { IconChecked, IconMinus } from "../assets/icons";
import styles from "../styles/tree.module.scss";
import { TreeCheckboxProps } from "../types/tree.types";

export const TreeCheckbox = (props: TreeCheckboxProps) => {
  const { checked, indeterminate, disabled, className, style } = props;

  return (
    <span
      aria-hidden="true"
      style={style}
      className={classnames(
        styles.checkbox,
        {
          [styles.checked]: checked,
          [styles.indeterminate]: !checked && indeterminate,
          [styles.checkboxDisabled]: disabled,
        },
        className
      )}
    >
      {checked && <IconChecked className={styles.checkboxIcon} />}
      {!checked && indeterminate && (
        <IconMinus className={styles.checkboxIcon} />
      )}
    </span>
  );
};
