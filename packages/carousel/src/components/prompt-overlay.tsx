import { useState } from "react";
import styles from "../styles/carousel.module.scss";
import { IconCircleMinus, IconCirclePlus } from "../assets/icons";
import { MESSAGE_TRUNCATE } from "../constants/carousel-config";
import classnames from "classnames";
import { PromptOverlayProps } from "../types/carousel.types";

export const PromptOverlay = (props: PromptOverlayProps) => {
  const { description = "", title = "", className, style } = props;

  const [expanded, setExpanded] = useState(false);

  const needsTruncation =
    (description?.length || title?.length) > MESSAGE_TRUNCATE;

  const displayTitle =
    needsTruncation && !expanded
      ? title.slice(0, MESSAGE_TRUNCATE).trimEnd() + "…"
      : title;

  const displayDescription =
    needsTruncation && !expanded
      ? description.slice(0, MESSAGE_TRUNCATE).trimEnd() + "…"
      : description;

  return (
    <div style={style} className={classnames(styles.promptOverlay, className)}>
      <div className={styles.promptInner}>
        <div
          className={classnames(styles.promptTexts, {
            [styles.truncation]: needsTruncation,
          })}
        >
          <div className={styles.promptLabel}>{displayTitle}</div>
          <div className={styles.promptText}>{displayDescription}</div>
        </div>
        {needsTruncation && (
          <div
            className={styles.promptToggleBtn}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
          >
            <button aria-label={expanded ? "Collapse prompt" : "Expand prompt"}>
              {expanded ? <IconCircleMinus /> : <IconCirclePlus />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
