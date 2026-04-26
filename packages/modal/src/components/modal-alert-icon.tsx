import classnames from "classnames";
import {
  IconAlertBackground,
  IconError,
  IconInfo,
  IconSuccess,
  IconWarning,
} from "../assets/icons";
import type { ModalAlertIconProps, ModalAlertType } from "../types/modal.types";
import styles from "../styles/modal.module.scss";

const ALERT_ICON_MAP: Record<ModalAlertType, React.JSX.Element> = {
  success: <IconSuccess />,
  info: <IconInfo />,
  warning: <IconWarning />,
  error: <IconError />,
};

export const ModalAlertIcon = (props: ModalAlertIconProps) => {
  const { alertType, type } = props;

  if (type !== "alert") return null;

  return (
    <div className={styles.alertWrapper} aria-hidden="true">
      <IconAlertBackground
        className={classnames(styles.alertBackground, styles[alertType])}
      />
      <span className={styles.alertIcon}>{ALERT_ICON_MAP[alertType]}</span>
    </div>
  );
};
