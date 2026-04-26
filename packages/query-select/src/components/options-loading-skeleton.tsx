import classnames from "classnames";
import styles from "../styles/query-select.module.scss";
import {
  OptionsLoadingSkeletonProps,
  SkeletonRowProps,
} from "../types/query-select.types";

const SkeletonRow = (props: SkeletonRowProps) => {
  const { showCheckbox, showImage } = props;

  return (
    <div className={styles.skeletonOptionRow} aria-hidden="true">
      <div className={styles.skeletonLabelContainer}>
        {showCheckbox && (
          <div
            className={classnames(
              styles.skeletonCheckbox,
              styles.skeletonShimmer
            )}
          />
        )}
        {showImage && (
          <div
            className={classnames(styles.skeletonImage, styles.skeletonShimmer)}
          />
        )}
        <div
          className={classnames(styles.skeletonText, styles.skeletonShimmer)}
        />
      </div>
    </div>
  );
};

export const OptionsLoadingSkeleton = (props: OptionsLoadingSkeletonProps) => {
  const { rows, showCheckbox, showImage } = props;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading options"
      className={styles.skeletonContainer}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow
          key={i}
          showCheckbox={showCheckbox}
          showImage={showImage}
        />
      ))}
    </div>
  );
};
