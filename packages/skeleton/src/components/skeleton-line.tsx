import classnames from "classnames";
import type { SkeletonLineProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

export const SkeletonLine = (props: SkeletonLineProps) => {
  const { animated, style, className } = props;

  return (
    <div
      className={classnames(
        styles.line,
        styles.skeleton,
        !animated && styles.static,
        className,
      )}
      style={style}
    />
  );
};
