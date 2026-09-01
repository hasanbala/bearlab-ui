import { IconX } from "../assets/icons";
import { SelectedItemProps } from "../types/tree-select.types";
import styles from "../styles/tree-select.module.scss";

export const SelectedItem = (props: SelectedItemProps) => {
  const {
    value,
    title,
    style,
    disabled,
    className,
    "aria-label": ariaLabel,
    "data-bearlab-tree-select-item": itemMarker,
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
    <div
      style={style}
      className={className}
      aria-label={ariaLabel}
      data-bearlab-tree-select-item={itemMarker}
    >
      <span className={styles.selectedItemTitle}>{title}</span>
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
