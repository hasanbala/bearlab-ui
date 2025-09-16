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
  className,
  isDisabled,
  onNavigate,
}: Props) => {
  const handleOnClick = () => {
    if (isDisabled) {
      return;
    }

    return onNavigate();
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
  label?: string;
  className?: string;
  isDisabled?: boolean;
  onNavigate: () => void;
}
