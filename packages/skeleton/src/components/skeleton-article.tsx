import classnames from "classnames";
import { SkeletonLine } from "./skeleton-line";
import type { SkeletonArticleProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

export const SkeletonArticle = (props: SkeletonArticleProps) => {
  const { animated, lines } = props;

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div
          className={classnames(
            styles.avatar,
            styles.skeleton,
            !animated && styles.static,
          )}
        />
        <div className={styles.headerInfo}>
          <div
            className={classnames(
              styles.title,
              styles.skeleton,
              !animated && styles.static,
            )}
          />
          <div
            className={classnames(
              styles.subtitle,
              styles.skeleton,
              !animated && styles.static,
            )}
          />
        </div>
      </div>
      <div className={styles.body}>
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
