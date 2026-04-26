import classnames from "classnames";
import { ModalSkeletonProps } from "../types/modal.types";
import styles from "../styles/modal.module.scss";

export const ModalSkeleton = (props: ModalSkeletonProps) => {
  const { animated = true, lines } = props;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.modalBody}>
          {Array.from({ length: lines }, (_, index) => (
            <div
              key={index}
              className={classnames(
                styles.line,
                styles.skeleton,
                !animated && styles.static
              )}
              style={{
                width:
                  index === lines - 1 ? "55%" : `${Math.random() * 25 + 65}%`,
              }}
            />
          ))}
        </div>
        <div className={styles.modalFooter}>
          <div
            className={classnames(
              styles.modalBtn,
              styles.skeleton,
              !animated && styles.static
            )}
          />
          <div
            className={classnames(
              styles.modalBtn,
              styles.modalBtnPrimary,
              styles.skeleton,
              !animated && styles.static
            )}
          />
        </div>
      </div>
    </div>
  );
};
