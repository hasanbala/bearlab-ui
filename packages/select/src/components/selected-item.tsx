import { IconX } from "../assets/icons";
import { SelectedItemProps } from "../types/select.types";
import styles from "../styles/select.module.scss";

export const SelectedItem = (props: SelectedItemProps) => {
  const {
    id,
    title,
    style,
    disabled,
    className,
    onRemove,
    "aria-label": ariaLabel,
  } = props as SelectedItemProps & { "aria-label"?: string };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id !== undefined) onRemove?.(id);
  };

  const handleRemoveKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (id !== undefined) onRemove?.(id);
    }
  };

  return (
    <div style={style} className={className} aria-label={ariaLabel}>
      <span className={styles.selectedItemTitle}>{title}</span>
      {onRemove && id !== undefined && (
        <button
          tabIndex={0}
          type="button"
          disabled={disabled}
          onClick={handleRemove}
          aria-disabled={disabled}
          aria-label={`Remove ${title}`}
          onKeyDown={handleRemoveKeyDown}
          className={styles.remove}
        >
          <IconX width={12} height={12} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
