import { IconBan } from "../assets/icons";
import styles from "../styles/tree.module.scss";
import { EmptyStateProps } from "../types/tree.types";

export const EmptyState = (props: EmptyStateProps) => {
  const { message } = props;

  return (
    <div className={styles.emptyState} role="status" aria-live="polite">
      {message && <span>{message}</span>}
      <IconBan aria-hidden="true" />
    </div>
  );
};
