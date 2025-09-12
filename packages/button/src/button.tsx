import classnames from "classnames";
import { BUTTON_TYPE, BUTTON_VARIANT, HTML_TYPE, ICON_TYPE } from "./helpers";
import {
  IconAdd,
  IconArrow,
  IconArrowDown,
  IconArrowDown2,
  IconArrowRight,
  IconCopy,
  IconCross,
  IconDelete,
  IconDocument,
  IconDots,
  IconExport,
  IconFilter,
  IconLoadingSpin,
  IconMinus,
  IconPing,
  IconPlus,
  IconSearch,
  IconTick,
  IconUpdate,
  PERMISSIONS,
  type IPermissions,
} from "@bearlab/core";
import styles from "./button.module.scss";

export const Button = (props: Props) => {
  const {
    label,
    isLoading,
    className,
    iconType = { default: ICON_TYPE.NONE, custom: null },
    htmlType = HTML_TYPE.BUTTON,
    disabled,
    onClick,
    buttonType,
    variant,
    iconTextReverse,
    permission = PERMISSIONS.DEFAULT,
    allAuths = {},
  } = props;

  if (Object.keys(allAuths).length) {
    const permissionList = Array.isArray(permission)
      ? permission
      : [permission];

    const isValidPermission = permissionList.some(
      (permission) => allAuths[permission as keyof IPermissions]
    );

    if (!isValidPermission) {
      return null;
    }

    return;
  }

  const iconTypes = {
    [ICON_TYPE.ADD]: <IconAdd />,
    [ICON_TYPE.ARROW]: <IconArrow />,
    [ICON_TYPE.DELETE]: <IconDelete />,
    [ICON_TYPE.EXPORT]: <IconExport />,
    [ICON_TYPE.DOCUMENT]: <IconDocument />,
    [ICON_TYPE.UPDATE]: <IconUpdate />,
    [ICON_TYPE.SEARCH]: <IconSearch />,
    [ICON_TYPE.CLOSE]: <IconCross />,
    [ICON_TYPE.NOTIFY]: <IconPing />,
    [ICON_TYPE.ARROW_DOWN]: <IconArrowDown />,
    [ICON_TYPE.MINUS]: <IconMinus />,
    [ICON_TYPE.PLUS]: <IconPlus />,
    [ICON_TYPE.FILTER]: <IconFilter />,
    [ICON_TYPE.DOTS]: <IconDots />,
    [ICON_TYPE.ARROW_DOWN2]: <IconArrowDown2 />,
    [ICON_TYPE.ARROW_RIGHT]: <IconArrowRight />,
    [ICON_TYPE.TICK]: <IconTick />,
    [ICON_TYPE.COPY]: <IconCopy />,
    [ICON_TYPE.NONE]: <></>,
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.progress}>
          <IconLoadingSpin />
        </div>
      );
    }

    if (buttonType == BUTTON_TYPE.JUST_TEXT) {
      return <span>{label}</span>;
    }

    if (buttonType == BUTTON_TYPE.JUST_ICON) {
      return (
        <>
          {iconType.custom || iconTypes[iconType.default]}
          {label && <div className={styles.popover}>{label}</div>}
        </>
      );
    }

    return (
      <>
        <span>{label}</span>
        {iconType.custom || iconTypes[iconType.default]}
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
        className,
        buttonType == BUTTON_TYPE.JUST_ICON && styles.justIcon,
        iconType.custom && styles.customIcon,
        isLoading && styles.loadingButton,
        disabled && styles.disabledButton,
        variant && styles[variant],
        iconTextReverse && styles.iconTextReverse
      )}
    >
      {renderContent()}
    </button>
  );
};

export interface Props {
  label: string | number;
  isLoading?: boolean;
  className?: string;
  iconType?: {
    default:
      | ICON_TYPE.NONE
      | ICON_TYPE.DELETE
      | ICON_TYPE.ARROW
      | ICON_TYPE.EXPORT
      | ICON_TYPE.ADD
      | ICON_TYPE.DOCUMENT
      | ICON_TYPE.UPDATE
      | ICON_TYPE.SEARCH
      | ICON_TYPE.CLOSE
      | ICON_TYPE.NOTIFY
      | ICON_TYPE.ARROW_DOWN
      | ICON_TYPE.MINUS
      | ICON_TYPE.PLUS
      | ICON_TYPE.FILTER
      | ICON_TYPE.DOTS
      | ICON_TYPE.ARROW_DOWN2
      | ICON_TYPE.ARROW_RIGHT
      | ICON_TYPE.TICK
      | ICON_TYPE.COPY;
    custom?: null | React.ReactElement;
  };

  buttonType:
    | BUTTON_TYPE.ICON_WITH_TEXT
    | BUTTON_TYPE.JUST_ICON
    | BUTTON_TYPE.JUST_TEXT;
  disabled?: boolean;
  htmlType?: HTML_TYPE.BUTTON | HTML_TYPE.SUBMIT;
  onClick?: (_val: React.MouseEvent<HTMLButtonElement>) => void;
  iconTextReverse?: boolean;
  variant?:
    | BUTTON_VARIANT.PRIMARY
    | BUTTON_VARIANT.SECONDARY
    | BUTTON_VARIANT.TERTIARY;
  permission?: string | string[];
  allAuths?: any;
}
