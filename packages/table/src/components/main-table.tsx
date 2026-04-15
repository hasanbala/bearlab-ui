import classnames from "classnames";
import styles from "../styles/table.module.scss";
import type { MainTableProps } from "../types/table.types";

export const MainTable = (props: MainTableProps) => {
  const {
    children,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-rowcount": ariaRowCount,
  } = props;

  return (
    <table
      className={classnames(styles.mainTableContainer, className)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-rowcount={ariaRowCount}
    >
      {children}
    </table>
  );
};
