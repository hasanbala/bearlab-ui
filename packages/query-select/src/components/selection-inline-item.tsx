import { IconX } from "../assets/icons";
import { QuerySelectSelectionInlineItemProps } from "../types/query-select.types";
import styles from "../styles/query-select.module.scss";

export const SelectionInlineItem = (
  props: QuerySelectSelectionInlineItemProps & { "aria-label"?: string }
) => {
  const {
    value,
    title,
    style,
    disabled,
    className,
    "aria-label": ariaLabel,
    onRemove,
  } = props;

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value !== undefined) onRemove?.(value);
  };

  const handleRemoveKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (value !== undefined) onRemove?.(value);
    }
  };

  return (
    <div style={style} className={className} aria-label={ariaLabel}>
      <span className={styles.selectionInlineItemTitle}>{title}</span>
      {onRemove && value !== undefined && (
        <button
          tabIndex={0}
          type="button"
          disabled={disabled}
          aria-disabled={disabled}
          aria-label={`Remove ${title}`}
          className={styles.remove}
          onClick={handleRemove}
          onKeyDown={handleRemoveKeyDown}
        >
          <IconX width={12} height={12} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
