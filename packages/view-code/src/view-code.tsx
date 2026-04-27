import { useState, useRef } from "react";
import classnames from "classnames";
import { IconCheck, IconCopy, IconTerminal } from "./assets/icons";
import { LANG_LABELS } from "./constants/view-code-config";
import { ViewCodeProps } from "./types/view-code.types";
import { highlight } from "./utils/view-code-utils";
import styles from "./styles/view-code.module.scss";

export const ViewCode = (props: ViewCodeProps) => {
  const {
    code,
    style,
    filename,
    className,
    showLineNumbers = true,
    language = "javascript",
    copyText = "Copy",
    copiedText = "Copied",
    theme = "dark",
  } = props;

  const [copied, setCopied] = useState<boolean>(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = code.trim().split("\n");
  const langLabel =
    LANG_LABELS[language.toLowerCase()] ?? language.toUpperCase();
  const highlighted = highlight(code.trim(), language);
  const highlightedLines = highlighted.split("\n");

  return (
    <div
      className={classnames(styles.container, className?.container)}
      style={style?.container}
      data-theme={theme}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.langBadge}>
            <IconTerminal />
            {langLabel}
          </span>
          {filename && <span className={styles.filename}>{filename}</span>}
        </div>
        <button
          className={classnames(styles.copyBtn, {
            [styles.copied]: copied,
          })}
          onClick={handleCopy}
          title={copyText}
          aria-label={copyText}
        >
          {copied ? (
            <>
              <IconCheck />
              <span>{copiedText}</span>
            </>
          ) : (
            <>
              <IconCopy />
              <span>{copyText}</span>
            </>
          )}
        </button>
      </div>
      <div
        style={style?.codeArea}
        className={classnames(styles.codeArea, className?.codeArea)}
      >
        {showLineNumbers && (
          <div className={styles.lineNumbers} aria-hidden="true">
            {lines.map((_, i) => (
              <span key={i} className={styles.lineNumber}>
                {i + 1}
              </span>
            ))}
          </div>
        )}
        <pre className={styles.pre} ref={codeRef}>
          <code
            className={styles.code}
            dangerouslySetInnerHTML={{
              __html: highlightedLines.join("\n"),
            }}
          />
        </pre>
      </div>
    </div>
  );
};
