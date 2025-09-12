import classnames from "classnames";
import styles from "./avatarText.module.scss";

export const AvatarText = (props: AvatarTextProps) => {
  const { name, className } = props;
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getColorClass = (name: string) => {
    const colors = [
      styles.color0,
      styles.color1,
      styles.color2,
      styles.color3,
      styles.color4,
      styles.color5,
      styles.color6,
      styles.color7,
    ];

    const index = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div
      className={classnames(styles.container, getColorClass(name), className)}
    >
      <span className={styles.label}>{initials}</span>
    </div>
  );
};

export interface AvatarTextProps {
  name: string;
  className?: string;
}
