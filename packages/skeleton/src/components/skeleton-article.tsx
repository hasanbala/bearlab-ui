import classnames from "classnames";
import { SkeletonLine } from "./skeleton-line";
import type { SkeletonArticleProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

export const SkeletonArticle = (props: SkeletonArticleProps) => {
  const { animated, lines, className, style } = props;

  return (
    <div
      className={classnames(styles.content, className?.content)}
      style={style?.content}
    >
      <div
        className={classnames(styles.header, className?.header)}
        style={style?.header}
      >
        <div
          className={classnames(
            styles.avatar,
            styles.skeleton,
            !animated && styles.static,
            className?.avatar,
          )}
          style={style?.avatar}
        />
        <div className={styles.headerInfo}>
          <div
            className={classnames(
              styles.title,
              styles.skeleton,
              !animated && styles.static,
              className?.title,
            )}
            style={style?.title}
          />
          <div
            className={classnames(
              styles.subtitle,
              styles.skeleton,
              !animated && styles.static,
              className?.subtitle,
            )}
            style={style?.subtitle}
          />
        </div>
      </div>
      <div
        className={classnames(styles.body, className?.body)}
        style={style?.body}
      >
        {Array.from({ length: lines }, (_, index) => (
          <SkeletonLine
            key={index}
            animated={animated}
            className={className?.line}
            style={{
              width: `${Math.random() * 40 + 40}%`,
              ...(index === lines - 1 && { width: "70%" }),
              ...style?.line,
            }}
          />
        ))}
      </div>
    </div>
  );
};
