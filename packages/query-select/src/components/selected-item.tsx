import classnames from "classnames";
import { IconX } from "../assets/icons";
import { QuerySelectSelectedItemProps } from "../types/query-select.types";
import styles from "../styles/query-select.module.scss";

export const SelectedItem = (props: QuerySelectSelectedItemProps) => {
  const {
    title,
    value,
    style,
    disabled,
    isRecorded,
    className,
    "aria-label": ariaLabel,
    onRemove,
  } = props as QuerySelectSelectedItemProps & { "aria-label"?: string };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value) onRemove?.(value);
  };

  return (
    <div
      className={classnames(
        styles.selectedItem,
        {
          [styles.recordedItem]: isRecorded,
        },
        className?.selectedItem
      )}
      style={style?.selectedItem}
      aria-label={ariaLabel}
    >
      <span className={styles.selectedItemTitle}>{title}</span>
      {onRemove && (
        <button
          tabIndex={0}
          type="button"
          disabled={disabled}
          aria-disabled={disabled}
          aria-label={`Remove ${title}`}
          onClick={handleRemove}
          className={styles.remove}
        >
          <IconX width={12} height={12} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
