import classnames from "classnames";
import styles from "./badge.module.scss";
import { COLOR_TYPE, SIZE_TYPE, VARIANT_TYPE } from "./helpers";

export const Badge = (props: Props) => {
  const {
    variant = VARIANT_TYPE.LIGHT,
    color = COLOR_TYPE.PRIMARY,
    size = SIZE_TYPE.MEDIUM,
    startIcon,
    endIcon,
    label,
    className,
  } = props;

  const IconStart = startIcon!;
  const IconEnd = endIcon!;

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
        className
      )}
    >
      {startIcon && <IconStart className={styles.startIcon} />}
      {label}
      {endIcon && <IconEnd className={styles.endIcon} />}
    </span>
  );
};

interface Props {
  variant?: VARIANT_TYPE.LIGHT | VARIANT_TYPE.SOLID;
  size?: SIZE_TYPE.SMALL | SIZE_TYPE.MEDIUM;
  color?:
    | COLOR_TYPE.PRIMARY
    | COLOR_TYPE.SUCCESS
    | COLOR_TYPE.ERROR
    | COLOR_TYPE.WARNING
    | COLOR_TYPE.INFO
    | COLOR_TYPE.LIGHT
    | COLOR_TYPE.DARK;
  startIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string | number;
  className?: string;
}
