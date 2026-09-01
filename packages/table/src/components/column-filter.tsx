import { useEffect, useId, useRef, useState } from "react";
import classnames from "classnames";
import { Button } from "@bearlab/button";
import type { ColumnFilterProps } from "../types/table.types";
import { useClickOutside } from "../hooks/use-click-outside";
import { IconFilter } from "../assets/icons";
import styles from "../styles/table.module.scss";

export const ColumnFilter = (props: ColumnFilterProps) => {
  const {
    columnKey,
    label,
    disabled,
    placeholder = "Filter...",
    value,
    applyLabel,
    resetLabel,
    className,
    style,
    onApply,
    onReset,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [wasOpen, setWasOpen] = useState(isOpen);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) setDraft(value);
  }

  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useId().replace(/:/g, "");
  const popoverId = `table-filter-${columnKey}-${uid}`;
  const triggerClass = `table-filter-trigger-${columnKey}-${uid}`;

  const isActive = value.trim().length > 0;

  const close = () => setIsOpen(false);

  useClickOutside(popoverRef, close, {
    excludeSelector: `.${triggerClass}`,
    enabled: isOpen,
  });

  useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      close();
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`.${triggerClass}`)?.focus();
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, triggerClass]);

  const handleApply = () => {
    onApply(draft);
    close();
  };

  const handleReset = () => {
    setDraft("");
    onReset();
    close();
  };

  return (
    <span className={styles.filterRoot}>
      <button
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? popoverId : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
        className={classnames(
          styles.filterTrigger,
          isActive && styles.filterTriggerActive,
          triggerClass,
          className?.filterTrigger
        )}
        style={style?.filterTrigger}
      >
        <IconFilter
          aria-hidden="true"
          focusable="false"
          className={classnames(styles.filterIcon, className?.filterIcon)}
        />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          id={popoverId}
          role="dialog"
          aria-label={label}
          className={classnames(styles.filterPopover, className?.filterPopover)}
          style={style?.filterPopover}
        >
          <input
            ref={inputRef}
            type="text"
            value={draft}
            aria-label={label}
            placeholder={placeholder}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleApply();
              }
            }}
            className={classnames(styles.filterInput, className?.filterInput)}
            style={style?.filterInput}
          />
          <div
            className={classnames(
              styles.filterActions,
              className?.filterActions
            )}
            style={style?.filterActions}
          >
            <Button
              buttonType="justText"
              variant="light-light"
              label={resetLabel}
              onClick={handleReset}
            />
            <Button
              buttonType="justText"
              variant="primary"
              label={applyLabel}
              onClick={handleApply}
            />
          </div>
        </div>
      )}
    </span>
  );
};
