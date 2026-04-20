import { IconX } from "../assets/icons";
import { SelectedItemProps } from "../types/select.types";
import styles from "../styles/select.module.scss";

export const SelectedItem = (props: SelectedItemProps) => {
  const {
    value,
    title,
    style,
    disabled,
    className,
    "aria-label": ariaLabel,
    onRemove,
  } = props as SelectedItemProps & { "aria-label"?: string };

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
