import classnames from "classnames";
import type { AvatarIconProps } from "./types/avatar.types";
import styles from "./styles/avatar-icon.module.scss";

export const AvatarIcon = (props: AvatarIconProps) => {
  const {
    src,
    alt = "avatar",
    size = "medium",
    status = "none",
    className,
    style,
  } = props;

  return (
    <div
      className={classnames(styles.container, styles[size], className?.root)}
      style={style?.root}
    >
      <img
        src={src}
        alt={alt}
        className={className?.image}
        style={style?.image}
      />
      {status !== "none" && (
        <span
          className={classnames(
            styles.status,
            styles[size],
            styles[status],
            className?.status
          )}
          style={style?.status}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
