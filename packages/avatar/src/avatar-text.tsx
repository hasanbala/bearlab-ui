import classnames from "classnames";
import { AVATAR_TEXT_COLORS } from "./constants/avatar-config";
import type { AvatarTextProps } from "./types/avatar.types";
import styles from "./styles/avatar-text.module.scss";

export const AvatarText = (props: AvatarTextProps) => {
  const { name, className, style } = props;

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getColorClass = (name: string) => {
    const index = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return AVATAR_TEXT_COLORS[index % AVATAR_TEXT_COLORS.length];
  };

  return (
    <div
      className={classnames(
        styles.container,
        styles[getColorClass(name)],
        className?.root
      )}
      style={style?.root}
      aria-label={name}
      role="img"
    >
      <span
        className={classnames(styles.avatarLabel, className?.label)}
        style={style?.label}
        aria-hidden="true"
      >
        {initials}
      </span>
    </div>
  );
};
