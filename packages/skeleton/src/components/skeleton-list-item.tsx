import classnames from "classnames";
import type { SkeletonListItemProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

export const SkeletonListItem = (props: SkeletonListItemProps) => {
  const { animated, className, style } = props;

  return (
    <div
      className={classnames(styles.listItem, className?.item)}
      style={style?.item}
    >
      <div
        className={classnames(
          styles.listAvatar,
          styles.skeleton,
          !animated && styles.static,
          className?.avatar,
        )}
        style={style?.avatar}
      />
      <div
        className={classnames(styles.listContent, className?.content)}
        style={style?.content}
      >
        <div
          className={classnames(
            styles.listTitle,
            styles.skeleton,
            !animated && styles.static,
            className?.title,
          )}
          style={style?.title}
        />
        <div
          className={classnames(
            styles.listSubtitle,
            styles.skeleton,
            !animated && styles.static,
            className?.subtitle,
          )}
          style={style?.subtitle}
        />
      </div>
    </div>
  );
};
