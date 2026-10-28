import { IconLoadingSpin } from "../assets/icons";
import type { LoadingSpinnerProps } from "../types/button.types";
import styles from "../styles/button.module.scss";

export const LoadingSpinner = ({ label }: LoadingSpinnerProps) => (
  <div className={styles.progress} role="status" aria-label={label}>
    <IconLoadingSpin aria-hidden="true" focusable="false" />
  </div>
);
