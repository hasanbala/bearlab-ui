import classnames from "classnames";
import { SkeletonLine } from "./skeleton-line";
import type { SkeletonCardProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

export const SkeletonCard = (props: SkeletonCardProps) => {
  const { animated, lines } = props;

  return (
    <div className={styles.content}>
      <div
        className={classnames(
          styles.image,
          styles.skeleton,
          !animated && styles.static,
        )}
      />
      <div className={styles.cardBody}>
        <div
          className={classnames(
            styles.cardTitle,
            styles.skeleton,
            !animated && styles.static,
          )}
        />
        {Array.from({ length: lines }, (_, index) => (
          <SkeletonLine
            key={index}
            animated={animated}
            style={{
              width: `${Math.random() * 40 + 40}%`,
              ...(index === lines - 1 && { width: "70%" }),
            }}
          />
        ))}
      </div>
    </div>
  );
};
