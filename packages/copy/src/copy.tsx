import classnames from "classnames";
import { useState } from "react";
import styles from "./copy.module.scss";
import { Button, BUTTON_TYPE, ICON_TYPE } from "@bearlab/button";

export const Copy = (props: Props) => {
  const { text, className, label = "Copy", copyId, disabled } = props;
  const [isCopy, setIsCopy] = useState(false);

  const copyCode = () => {
    if (disabled) {
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopy(true);
        new Promise(() =>
          setTimeout(() => {
            setIsCopy(false);
          }, 3000)
        );
      })
      .catch(() => console.warn("error", "An error occurred"));
  };

  const handleIcon = () => {
    if (!copyId) {
      return !isCopy ? ICON_TYPE.COPY : ICON_TYPE.TICK;
    }

    return isCopy ? ICON_TYPE.TICK : ICON_TYPE.COPY;
  };

  return (
    <div
      className={classnames(
        styles.container,
        className,
        disabled && styles.disabled
      )}
    >
      <div className={styles.text}>
        {text == "" || text == null ? "-" : text}
      </div>
      {!disabled && (
        <Button
          buttonType={BUTTON_TYPE.JUST_ICON}
          label={label}
          disabled={disabled}
          iconType={{ default: handleIcon() }}
          onClick={copyCode}
        />
      )}
    </div>
  );
};

interface Props {
  text: string;
  className?: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copyId?: any;
  disabled?: boolean;
}
