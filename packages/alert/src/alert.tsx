import { useId } from "react";
import classnames from "classnames";
import type { AlertProps } from "./types/alert.types";
import styles from "./styles/alert.module.scss";
import {
  IconErrorCircle,
  IconInfo,
  IconSuccess,
  IconWarning,
} from "./assets/icons";

const ALERT_ICONS = {
  success: IconSuccess,
  error: IconErrorCircle,
  warning: IconWarning,
  info: IconInfo,
} as const;

export const Alert = (props: AlertProps) => {
  const {
    variant,
    title,
    message,
    showLink = false,
    linkHref = "/",
    linkText = "Learn more",
    className,
    style,
  } = props;

  const titleId = useId();
  const descId = useId();

  const AlertComponent = ALERT_ICONS[variant];

  const getAriaLive = () => {
    if (variant === "error") return "assertive";
    return "polite";
  };

  return (
    <div
      role="alert"
      aria-live={getAriaLive()}
      aria-labelledby={titleId}
      aria-describedby={descId}
      style={style?.root}
      className={classnames(
        styles.container,
        styles[`${variant}Container`],
        className?.root
      )}
    >
      <div
        className={classnames(styles.content, className?.content)}
        style={style?.content}
      >
        <div
          className={classnames(
            styles.iconWrapper,
            styles[`${variant}Icon`],
            className?.iconWrapper
          )}
          style={style?.iconWrapper}
          aria-hidden="true"
        >
          <AlertComponent />
        </div>
        <div>
          <h4
            id={titleId}
            className={classnames(styles.title, className?.title)}
            style={style?.title}
          >
            {title}
          </h4>
          <p
            id={descId}
            className={classnames(styles.description, className?.description)}
            style={style?.description}
          >
            {message}
          </p>
          {showLink && (
            <a
              href={linkHref}
              className={classnames(styles.link, className?.link)}
              style={style?.link}
            >
              {linkText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
