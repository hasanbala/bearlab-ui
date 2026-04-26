import classnames from "classnames";
import { SkeletonLine } from "./skeleton-line";
import type { SkeletonCardProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

export const SkeletonCard = (props: SkeletonCardProps) => {
  const { animated, lines, className, style } = props;

  return (
    <div
      className={classnames(styles.content, className?.content)}
      style={style?.content}
    >
      <div
        className={classnames(
          styles.image,
          styles.skeleton,
          !animated && styles.static,
          className?.image,
        )}
        style={style?.image}
      />
      <div
        className={classnames(styles.cardBody, className?.body)}
        style={style?.body}
      >
        <div
          className={classnames(
            styles.cardTitle,
            styles.skeleton,
            !animated && styles.static,
            className?.title,
          )}
          style={style?.title}
        />
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
