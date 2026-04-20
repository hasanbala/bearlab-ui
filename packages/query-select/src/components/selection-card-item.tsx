import classnames from "classnames";
import { IconX } from "../assets/icons";
import { QuerySelectSelectionCardItemProps } from "../types/query-select.types";
import styles from "../styles/query-select.module.scss";

export const SelectionCardItem = (props: QuerySelectSelectionCardItemProps) => {
  const { title, value, style, disabled, className, onRemove } = props;

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
    <div
      className={classnames(styles.selectionCardItem, className)}
      style={style}
    >
      <span className={styles.selectionCardItemTitle}>{title}</span>
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
