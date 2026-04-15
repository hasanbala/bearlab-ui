import { useId } from "react";
import classnames from "classnames";
import type { ButtonProps } from "./types/button.types";
import styles from "./styles/button.module.scss";
import {
  IconAdd,
  IconArrow,
  IconArrowDown,
  IconArrowDown2,
  IconCross,
  IconDelete,
  IconExport,
  IconPing,
  IconSearch,
  IconUpdate,
  IconArrowRight,
  IconCopy,
  IconDocument,
  IconDots,
  IconFilter,
  IconMinus,
  IconPlus,
  IconTick,
  IconLoadingSpin,
} from "./assets/icons";

const BUTTON_ICONS = {
  add: IconAdd,
  arrow: IconArrow,
  delete: IconDelete,
  export: IconExport,
  document: IconDocument,
  update: IconUpdate,
  search: IconSearch,
  close: IconCross,
  notify: IconPing,
  arrow_down: IconArrowDown,
  minus: IconMinus,
  plus: IconPlus,
  filter: IconFilter,
  dots: IconDots,
  arrow_down2: IconArrowDown2,
  arrow_right: IconArrowRight,
  tick: IconTick,
  copy: IconCopy,
  none: null,
} as const;

const DEFAULT_ICON_TYPE: ButtonProps["iconType"] = {
  default: "none",
  custom: null,
};

const resolveIconNode = (
  iconType: NonNullable<ButtonProps["iconType"]>
): React.ReactNode => {
  if (iconType.custom) return iconType.custom;

  const Icon = BUTTON_ICONS[iconType.default];
  if (!Icon) return null;

  return <Icon aria-hidden="true" focusable="false" />;
};

const LoadingSpinner = () => (
  <div className={styles.progress} role="status" aria-label={"loading"}>
    <IconLoadingSpin aria-hidden="true" focusable="false" />
  </div>
);

export const Button = (props: ButtonProps) => {
  const {
    label,
    isLoading,
    className,
    iconType = DEFAULT_ICON_TYPE,
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
  const isCustomIcon = Boolean(iconType?.custom);
  const popoverId = label ? `button-popover-${uid}` : undefined;

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (isJustText) return <span>{label}</span>;
    if (isJustIcon) {
      return (
        <>
          {resolveIconNode(iconType)}
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
        {resolveIconNode(iconType)}
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
        isLoading && styles.loadingButton,
        disabled && styles.disabledButton,
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
