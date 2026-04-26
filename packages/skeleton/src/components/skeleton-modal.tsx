import classnames from "classnames";
import { SkeletonLine } from "./skeleton-line";
import type { SkeletonModalProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

export const SkeletonModal = (props: SkeletonModalProps) => {
  const { animated, lines, className, style } = props;

  return (
    <div
      className={classnames(styles.modalContent, className?.content)}
      style={style?.content}
    >
      <div
        className={classnames(styles.modalHeader, className?.header)}
        style={style?.header}
      >
        <div
          className={classnames(
            styles.modalTitle,
            styles.skeleton,
            !animated && styles.static,
            className?.title,
          )}
          style={style?.title}
        />
        <div
          className={classnames(
            styles.modalClose,
            styles.skeleton,
            !animated && styles.static,
            className?.button,
          )}
          style={style?.button}
        />
      </div>
      <div
        className={classnames(styles.modalBody, className?.body)}
        style={style?.body}
      >
        {Array.from({ length: lines }, (_, index) => (
          <SkeletonLine
            key={index}
            animated={animated}
            className={className?.line}
            style={{
              width:
                index === lines - 1 ? "55%" : `${Math.random() * 25 + 65}%`,
              ...style?.line,
            }}
          />
        ))}
      </div>
      <div
        className={classnames(styles.modalFooter, className?.footer)}
        style={style?.footer}
      >
        <div
          className={classnames(
            styles.modalBtn,
            styles.skeleton,
            !animated && styles.static,
            className?.button,
          )}
          style={style?.button}
        />
        <div
          className={classnames(
            styles.modalBtn,
            styles.modalBtnPrimary,
            styles.skeleton,
            !animated && styles.static,
            className?.button,
          )}
          style={style?.button}
        />
      </div>
    </div>
  );
};
