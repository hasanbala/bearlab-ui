import classnames from "classnames";
import styles from "./badge.module.scss";
import {
  COLOR_TYPE,
  ColorType,
  SIZE_TYPE,
  SizeType,
  VARIANT_TYPE,
  VariantType,
} from "./helpers";

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

export interface Props {
  variant?: VariantType;
  size?: SizeType;
  color?: ColorType;
  startIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string | number;
  className?: string;
}
