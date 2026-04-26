import classnames from "classnames";
import type { SkeletonFormProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

export const SkeletonForm = (props: SkeletonFormProps) => {
  const { animated, lines, className, style } = props;

  return (
    <div
      className={classnames(styles.content, className?.content)}
      style={style?.content}
    >
      <div className={styles.formFields}>
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={classnames(styles.formField, className?.item)}
            style={style?.item}
          >
            <div
              className={classnames(
                styles.formLabel,
                styles.skeleton,
                !animated && styles.static,
                className?.label,
              )}
              style={style?.label}
            />
            <div
              className={classnames(
                styles.formInput,
                styles.skeleton,
                !animated && styles.static,
                className?.input,
              )}
              style={style?.input}
            />
          </div>
        ))}
      </div>

      <div className={styles.formActions}>
        <div
          className={classnames(
            styles.formCancel,
            styles.skeleton,
            !animated && styles.static,
            className?.button,
          )}
          style={style?.button}
        />
        <div
          className={classnames(
            styles.formSubmit,
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
