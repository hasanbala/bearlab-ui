import classnames from "classnames";
import styles from "./avatarIcon.module.scss";

export const AvatarIcon = (props: AvatarIconProps) => {
  const { src, size = "medium", status = "none" } = props;

  return (
    <div className={classnames(styles.container, styles[size])}>
      <img src={src} alt="avatar" />
      {status !== "none" && (
        <span
          className={classnames(styles.status, styles[size], styles[status])}
        />
      )}
    </div>
  );
};

export interface AvatarIconProps {
  src: string;
  alt?: string;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
  status?: "online" | "offline" | "busy" | "none";
}
