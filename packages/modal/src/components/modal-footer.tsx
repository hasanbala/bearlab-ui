import classnames from "classnames";
import { Button } from "@bearlab/button";
import type { ModalFooterProps } from "../types/modal.types";
import styles from "../styles/modal.module.scss";

export const ModalFooter = ({
  alertType,
  className,
  isLoading,
  isDisabled,
  confirmLabel = "Save",
  cancelLabel = "Cancel",
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  type = "default",
}: ModalFooterProps) => {
  if (isLoading) return null;

  if (type === "alert") {
    return (
      <div className={styles.alertFooter}>
        <Button
          label={confirmLabel}
          buttonType={"justText"}
          onClick={handleConfirm ?? handleCancel}
          className={{ root: classnames(alertType && styles[alertType]) }}
        />
      </div>
    );
  }

  return (
    <div
      className={classnames(
        styles.footer,
        type === "fullscreen" && styles.fullscreenFooter,
        className
      )}
    >
      <Button
        buttonType={"justText"}
        label={cancelLabel}
        onClick={handleCancel}
        variant={"secondary"}
      />
      <Button
        buttonType={"justText"}
        label={confirmLabel}
        onClick={handleConfirm}
        variant={"primary"}
        disabled={isDisabled}
      />
    </div>
  );
};
