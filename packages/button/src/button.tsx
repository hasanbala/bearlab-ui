import { useId } from "react";
import classnames from "classnames";
import type { ButtonProps } from "./types/button.types";
import { BUTTON_ICONS } from "./constants/button-config";
import { LoadingSpinner } from "./components/loading-spinner";
import styles from "./styles/button.module.scss";

const resolveIconNode = (
  iconType: NonNullable<ButtonProps["iconType"]>,
  icon: ButtonProps["icon"]
): React.ReactNode => {
  if (icon) return icon;

  const Icon = BUTTON_ICONS[iconType];
  if (!Icon) return null;

  return <Icon aria-hidden="true" focusable="false" />;
};

export const Button = (props: ButtonProps) => {
  const {
    label,
    isLoading,
    className,
    iconType = "none",
    icon,
    htmlType = "button",
    disabled,
    onClick,
    buttonType,
    variant,
    reverseIconText,
    style,
  } = props;

  const uid = useId();
  const isDisabled = isLoading || disabled;
  const isJustIcon = buttonType === "justIcon";
  const isJustText = buttonType === "justText";
  const isBothIconText = buttonType === "iconWithText";
  const isCustomIcon = Boolean(icon);
  const popoverId = label ? `button-popover-${uid}` : undefined;

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (isJustText) return <span>{label}</span>;
    if (isJustIcon) {
      return (
        <>
          {resolveIconNode(iconType, icon)}
          {label && (
            <div
              aria-hidden="true"
              style={style?.popover}
              className={classnames(styles.popover, className?.popover)}
            >
              {label}
            </div>
          )}
        </>
      );
    }

    return (
      <>
        <span>{label}</span>
        {resolveIconNode(iconType, icon)}
      </>
    );
  };

  return (
    <button
      disabled={isLoading || disabled}
      type={htmlType}
      onClick={onClick}
      className={classnames(
        styles.container,
        isJustIcon && styles.justIcon,
        isBothIconText && styles.iconWithText,
        isCustomIcon && styles.customIcon,
        isLoading && styles.loading,
        disabled && styles.disabled,
        variant && styles[variant],
        reverseIconText && styles.reverseIconText,
        className?.root
      )}
      style={style?.root}
      aria-label={isJustIcon ? String(label) : undefined}
      aria-describedby={isJustIcon && label ? popoverId : undefined}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
    >
      {renderContent()}
    </button>
  );
};
