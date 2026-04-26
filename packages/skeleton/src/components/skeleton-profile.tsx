import classnames from "classnames";
import { SkeletonLine } from "./skeleton-line";
import type { SkeletonProfileProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

const PROFILE_STAT_COUNT = 3;

export const SkeletonProfile = (props: SkeletonProfileProps) => {
  const { animated, lines, className, style } = props;

  return (
    <div
      className={classnames(styles.content, className?.content)}
      style={style?.content}
    >
      <div
        className={classnames(styles.profileHeader, className?.header)}
        style={style?.header}
      >
        <div
          className={classnames(
            styles.profileAvatar,
            styles.skeleton,
            !animated && styles.static,
            className?.avatar,
          )}
          style={style?.avatar}
        />
        <div
          className={classnames(
            styles.profileName,
            styles.skeleton,
            !animated && styles.static,
            className?.title,
          )}
          style={style?.title}
        />
        <div
          className={classnames(
            styles.profileHandle,
            styles.skeleton,
            !animated && styles.static,
            className?.subtitle,
          )}
          style={style?.subtitle}
        />
      </div>

      <div
        className={classnames(styles.profileBio, className?.body)}
        style={style?.body}
      >
        {Array.from({ length: lines }, (_, index) => (
          <SkeletonLine
            key={index}
            animated={animated}
            className={className?.line}
            style={{
              width:
                index === lines - 1 ? "45%" : `${Math.random() * 20 + 70}%`,
              ...style?.line,
            }}
          />
        ))}
      </div>

      <div
        className={classnames(styles.profileStats, className?.footer)}
        style={style?.footer}
      >
        {Array.from({ length: PROFILE_STAT_COUNT }, (_, index) => (
          <div
            key={index}
            className={classnames(styles.profileStat, className?.item)}
            style={style?.item}
          >
            <div
              className={classnames(
                styles.profileStatValue,
                styles.skeleton,
                !animated && styles.static,
                className?.title,
              )}
              style={style?.title}
            />
            <div
              className={classnames(
                styles.profileStatLabel,
                styles.skeleton,
                !animated && styles.static,
                className?.subtitle,
              )}
              style={style?.subtitle}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
