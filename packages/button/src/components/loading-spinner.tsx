import { IconLoadingSpin } from "../assets/icons";
import styles from "../styles/button.module.scss";

export const LoadingSpinner = () => (
  <div className={styles.progress} role="status" aria-label={"loading"}>
    <IconLoadingSpin aria-hidden="true" focusable="false" />
  </div>
);
