import classnames from "classnames";
import styles from "./styles/go-back.module.scss";
import { Button } from "@bearlab/button";
import type { GoBackProps } from "./types/go-back.types";

export const GoBack = (props: GoBackProps) => {
  const { label = "Go Back", className, isDisabled, onNavigate, style } = props;

  const handleOnClick = () => {
    if (isDisabled) return;
    return onNavigate();
  };

  return (
    <Button
      buttonType="iconWithText"
      label={label}
      reverseIconText
      iconType={{ default: "arrow" }}
      onClick={handleOnClick}
      variant="secondary"
      aria-disabled={isDisabled}
      aria-label={label}
      className={{
        root: classnames(
          styles.container,
          className?.root,
          isDisabled && styles.disabled
        ),
      }}
      style={{ root: style?.root }}
    />
  );
};
