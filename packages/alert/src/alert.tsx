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
    role,
    children,
    headingLevel = 4,
    linkComponent,
    showLink = false,
    linkHref = "/",
    linkText = "Learn more",
    linkTarget,
    className,
    style,
  } = props;

  const titleId = useId();
  const descId = useId();

  const AlertComponent = ALERT_ICONS[variant];
  const Heading = `h${headingLevel}` as const;
  const LinkComponent = linkComponent ?? "a";
  const isUrgent = variant === "error" || variant === "warning";
  const resolvedRole = role ?? (isUrgent ? "alert" : "status");
  const isLive = resolvedRole !== "none";

  return (
    <div
      role={isLive ? resolvedRole : undefined}
      aria-live={isLive ? (isUrgent ? "assertive" : "polite") : undefined}
      aria-labelledby={titleId}
      aria-describedby={message ? descId : undefined}
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
          <Heading
            id={titleId}
            className={classnames(styles.title, className?.title)}
            style={style?.title}
          >
            {title}
          </Heading>
          {message && (
            <p
              id={descId}
              className={classnames(
                styles.description,
                className?.description
              )}
              style={style?.description}
            >
              {message}
            </p>
          )}
          {children}
          {showLink && (
            <LinkComponent
              href={linkHref}
              target={linkTarget}
              rel={linkTarget === "_blank" ? "noopener noreferrer" : undefined}
              className={classnames(styles.link, className?.link)}
              style={style?.link}
            >
              {linkText}
            </LinkComponent>
          )}
        </div>
      </div>
    </div>
  );
};
