import React from "react";
import classnames from "classnames";
import { IconCheck, IconClose } from "../assets/icons";
import type { ProgressInfoProps } from "../types/progress.types";
import styles from "../styles/progress.module.scss";

export const ProgressInfo = React.memo((props: ProgressInfoProps) => {
  const { displayPercent, status, type, value, format, className, style } =
    props;

  const content = (() => {
    if (format) return format(displayPercent, { value });
    if (status === "success")
      return <IconCheck aria-hidden="true" focusable="false" />;
    if (status === "exception")
      return <IconClose aria-hidden="true" focusable="false" />;
    return `${displayPercent}%`;
  })();

  return (
    <span
      style={style?.info}
      className={classnames(
        styles.info,
        type === "circle" ? styles.infoCircle : styles.infoLine,
        styles[`info_${status}`],
        className?.info
      )}
    >
      <span
        style={style?.text}
        className={classnames(styles.text, className?.text)}
      >
        {content}
      </span>
    </span>
  );
});

ProgressInfo.displayName = "ProgressInfo";
