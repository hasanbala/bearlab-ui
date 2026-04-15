import classnames from "classnames";
import type { SkeletonListItemProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

export const SkeletonListItem = (props: SkeletonListItemProps) => {
  const { animated } = props;

  return (
    <div className={styles.listItem}>
      <div
        className={classnames(
          styles.listAvatar,
          styles.skeleton,
          !animated && styles.static,
        )}
      />
      <div className={styles.listContent}>
        <div
          className={classnames(
            styles.listTitle,
            styles.skeleton,
            !animated && styles.static,
          )}
        />
        <div
          className={classnames(
            styles.listSubtitle,
            styles.skeleton,
            !animated && styles.static,
          )}
        />
      </div>
    </div>
  );
};
