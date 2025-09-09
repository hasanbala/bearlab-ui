import classnames from "classnames";
import styles from "./goBack.module.scss";
import {
  Button,
  BUTTON_TYPE,
  BUTTON_VARIANT,
  ICON_TYPE,
} from "@bearlab/button";

export const GoBack = ({
  label = "Go Back",
  destination,
  className,
  hasBack,
  isDisabled,
  onNavigate,
}: Props) => {
  const handleOnClick = () => {
    if (isDisabled) {
      return;
    }

    if (hasBack) {
      onNavigate(-1);
    }

    return onNavigate(destination);
  };

  return (
    <Button
      buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
      label={label}
      iconTextReverse
      iconType={{ default: ICON_TYPE.ARROW }}
      onClick={handleOnClick}
      variant={BUTTON_VARIANT.SECONDARY}
      className={classnames(
        styles.container,
        className,
        isDisabled && styles.disabled
      )}
    />
  );
};

export interface Props {
  destination: string;
  label?: string;
  className?: string;
  hasBack?: boolean;
  isDisabled?: boolean;
  onNavigate: (destination: string | number) => void;
}
