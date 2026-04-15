import classnames from "classnames";
import styles from "./styles/badge.module.scss";
import type { BadgeProps } from "./types/badge.types";

export const Badge = (props: BadgeProps) => {
  const {
    variant = "light",
    color = "primary",
    size = "medium",
    startIcon,
    endIcon,
    label,
    className,
    style,
  } = props;

  const IconStart = startIcon;
  const IconEnd = endIcon;

  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
  };

  const variants = {
    light: {
      primary: styles.lightPrimary,
      success: styles.lightSuccess,
      error: styles.lightError,
      warning: styles.lightWarning,
      info: styles.lightInfo,
      light: styles.lightLight,
      dark: styles.lightDark,
    },
    solid: {
      primary: styles.solidPrimary,
      success: styles.solidSuccess,
      error: styles.solidError,
      warning: styles.solidWarning,
      info: styles.solidInfo,
      light: styles.solidLight,
      dark: styles.solidDark,
    },
  };

  return (
    <span
      className={classnames(
        styles.container,
        sizeStyles[size],
        variants[variant][color],
        className?.root
      )}
      style={style?.root}
    >
      {IconStart && (
        <IconStart
          className={classnames(styles.startIcon, className?.startIcon)}
          style={style?.startIcon}
          aria-hidden="true"
        />
      )}
      {label}
      {IconEnd && (
        <IconEnd
          className={classnames(styles.endIcon, className?.endIcon)}
          style={style?.endIcon}
          aria-hidden="true"
        />
      )}
    </span>
  );
};
