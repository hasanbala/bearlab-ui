import { useCallback, useEffect, useId, useState } from "react";
import classnames from "classnames";
import { Button } from "@bearlab/button";
import styles from "./styles/copy.module.scss";
import type { CopyProps } from "./types/copy.types";

export const Copy = (props: CopyProps) => {
  const { text, className, label = "Copy", disabled, style } = props;

  const [isCopy, setIsCopy] = useState(false);
  const generatedId = useId();
  const textId = `copy-text-${generatedId}`;

  useEffect(() => {
    if (!isCopy) return;
    const timer = setTimeout(() => setIsCopy(false), 3000);
    return () => clearTimeout(timer);
  }, [isCopy]);

  const copyCode = useCallback(() => {
    navigator.clipboard
      .writeText(text)
      .then(() => setIsCopy(true))
      .catch(() => console.warn("Clipboard write failed"));
  }, [text]);

  const displayText = text === "" || text == null ? "-" : text;
  const iconType = isCopy ? "tick" : "copy";
  const announceLabel = isCopy ? "Copied!" : label;

  return (
    <div
      role="group"
      aria-label={label}
      style={style?.root}
      className={classnames(
        styles.container,
        disabled && styles.disabled,
        className?.root
      )}
    >
      <div
        id={textId}
        style={style?.text}
        aria-label={displayText === "-" ? "Empty" : displayText}
        className={classnames(styles.text, className?.text)}
        title={typeof displayText === "string" ? displayText : undefined}
      >
        {displayText}
      </div>
      {!disabled && (
        <Button
          buttonType="justIcon"
          label={announceLabel}
          disabled={disabled}
          iconType={{ default: iconType }}
          aria-pressed={isCopy}
          aria-controls={textId}
          onClick={copyCode}
          aria-label={
            isCopy ? "Copied to clipboard" : `${label}: ${displayText}`
          }
        />
      )}
    </div>
  );
};
