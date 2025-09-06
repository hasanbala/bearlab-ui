import classnames from "classnames";
import { JSX, useState } from "react";
import {
  EyesClose,
  EyesOpen,
  IconCopy,
  IconTick,
  SearchIcon,
} from "@bearlab/core/src";
import { ViewError } from "@bearlab/view-error/src";
import styles from "./input.module.scss";
import { useCopyByInput } from "@bearlab/hooks/src";

export const Input = (props: Props) => {
  const {
    label,
    error,
    onClick,
    afterIcon,
    isExistSearch,
    isExistPassword,
    className,
    disabled,
    type,
    value,
    isExistCopy,
    beforeIcon,
    isRequired,
    ...rest
  } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const { isCopy, handleCopy } = useCopyByInput(value, disabled);

  const renderPassord = () => {
    if (passwordVisible) {
      return (
        <EyesClose
          className={styles.eyes}
          onClick={() => setPasswordVisible(!passwordVisible)}
        />
      );
    }

    return (
      <EyesOpen
        className={styles.eyes}
        onClick={() => setPasswordVisible(!passwordVisible)}
      />
    );
  };

  const renderCopy = () => {
    if (!isCopy) {
      return <IconCopy />;
    }

    return <IconTick />;
  };

  const renderIcon = (
    icon: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  ) => {
    if (typeof icon == "string") {
      return <>{icon}</>;
    }

    const IconComponent = icon;
    return <IconComponent />;
  };

  return (
    <div
      className={classnames(
        styles.container,
        className,
        disabled && styles.disabled
      )}
    >
      {label && (
        <div className={styles.label}>
          {label} {isRequired && <span>*</span>}
        </div>
      )}
      <div className={styles.inputWrapper}>
        {beforeIcon && (
          <div className={classnames(styles.withIcon, styles.beforeIcon)}>
            {renderIcon(beforeIcon)}
          </div>
        )}
        {afterIcon && (
          <div className={classnames(styles.withIcon, styles.afterIcon)}>
            {renderIcon(afterIcon)}
          </div>
        )}
        <input
          value={value || ""}
          type={type || passwordVisible ? "text" : "password"}
          disabled={disabled}
          className={classnames(
            isExistSearch && styles.existSearchInput,
            isExistPassword && styles.existPasswordInput,
            isExistCopy && styles.existCopyInput,
            error && styles.error
          )}
          {...rest}
        />
        {isExistPassword && (
          <div className={styles.password}>{renderPassord()}</div>
        )}
        {isExistCopy && (
          <div
            onClick={handleCopy}
            className={classnames(
              styles.withIcon,
              styles.afterIcon,
              styles.copy
            )}
          >
            {renderCopy()}
          </div>
        )}
        {isExistSearch && (
          <SearchIcon className={styles.searchIcon} onClick={onClick} />
        )}
        {error && <ViewError label={error} />}
      </div>
    </div>
  );
};

type InputProps = JSX.IntrinsicElements["input"];

interface Props extends InputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  name?: string;
  value?: string | number;
  label?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  isRequired?: boolean;
  placeholder?: string;
  isExistCopy?: boolean;
  isExistSearch?: boolean;
  isExistPassword?: boolean;
  type?: "text" | "password" | "email" | "tel";
  ref?: React.Ref<HTMLInputElement> | undefined;
  beforeIcon?: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  afterIcon?: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onChange: (_val: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (_val: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement> | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>) => void;
}
