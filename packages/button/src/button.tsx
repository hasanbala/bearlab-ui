import { forwardRef, useId } from "react";
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      href,
      label,
      isLoading,
      className,
      linkComponent,
      loadingLabel = "Loading",
      iconType = "none",
      icon,
      htmlType = "button",
      disabled,
      onClick,
      buttonType,
      variant,
      reverseIconText,
      style,
      ...rest
    } = props;

    const uid = useId();
    const isDisabled = Boolean(isLoading || disabled);
    const isJustIcon = buttonType === "justIcon";
    const isJustText = buttonType === "justText";
    const isBothIconText = buttonType === "iconWithText";
    const isCustomIcon = Boolean(icon);
    const popoverId = label ? `button-popover-${uid}` : undefined;

    const renderContent = () => {
      if (isLoading) return <LoadingSpinner label={loadingLabel} />;
      if (isJustText) return <span>{label}</span>;
      if (isJustIcon) {
        return (
          <>
            {resolveIconNode(iconType, icon)}
            {label && (
              <div
                id={popoverId}
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

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    const sharedProps = {
      onClick: handleClick,
      className: classnames(
          styles.container,
          isJustIcon && styles.justIcon,
          isBothIconText && styles.iconWithText,
          isCustomIcon && styles.customIcon,
          isLoading && styles.loading,
          disabled && styles.disabled,
          variant && styles[variant],
          reverseIconText && styles.reverseIconText,
          className?.root
      ),
      style: style?.root,
      "aria-label":
        rest["aria-label"] ?? (isJustIcon ? String(label) : undefined),
      "aria-describedby":
        rest["aria-describedby"] ??
        (isJustIcon && label ? popoverId : undefined),
      "aria-disabled": isDisabled || undefined,
      "aria-busy": isLoading || undefined,
    };

    if (href) {
      const LinkComponent = linkComponent ?? "a";
      return (
        <LinkComponent
          {...rest}
          {...sharedProps}
          ref={ref}
          href={isDisabled ? undefined : href}
          role={isDisabled ? "link" : undefined}
          tabIndex={disabled ? -1 : rest.tabIndex}
        >
          {renderContent()}
        </LinkComponent>
      );
    }

    return (
      <button
        {...rest}
        {...sharedProps}
        ref={ref}
        disabled={disabled}
        type={htmlType}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = "Button";
