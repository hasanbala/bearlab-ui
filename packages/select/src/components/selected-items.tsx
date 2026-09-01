import { forwardRef, ForwardedRef, useCallback } from "react";
import classnames from "classnames";
import { SelectedItem } from "./selected-item";
import { SelectedItemsProps, SelectOption } from "../types/select.types";
import styles from "../styles/select.module.scss";

export const SelectedItems = forwardRef(
  <T extends SelectOption>(
    props: SelectedItemsProps<T>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const {
      style,
      disabled,
      className,
      visibleCount,
      selectedItems,
      setSelectedItems,
    } = props;

    const handleRemove = useCallback(
      (value: number | string) => {
        if (disabled) return;
        setSelectedItems(selectedItems.filter((item) => item.value !== value));
      },
      [disabled, selectedItems, setSelectedItems]
    );

    const visibleItems = selectedItems.slice(0, visibleCount);
    const hiddenCount = selectedItems.length - visibleCount;

    if (selectedItems.length == 0) return <div ref={ref} />;

    return (
      <div
        role="group"
        ref={ref}
        aria-disabled={disabled}
        style={style?.selectedItems}
        aria-label={`${selectedItems.length} selected`}
        className={classnames(
          styles.selectedItemsWrapper,
          className?.selectedItems
        )}
      >
        {visibleItems.map((item) => (
          <SelectedItem
            style={style?.selectedItem}
            value={item.value}
            key={item.value}
            title={item.label}
            disabled={disabled}
            data-bearlab-select-item="visible"
            className={classnames(styles.selectedItem, className?.selectedItem)}
            onRemove={handleRemove}
          />
        ))}
        {hiddenCount > 0 && (
          <SelectedItem
            style={style?.selectedItem}
            disabled={disabled}
            title={`+${hiddenCount}`}
            aria-label={`${hiddenCount} more selected`}
            data-bearlab-select-item="overflow"
            className={classnames(
              styles.selectedItem,
              styles.hiddenSelectedItem,
              className?.selectedItem
            )}
          />
        )}
      </div>
    );
  }
) as <T extends SelectOption>(
  props: SelectedItemsProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => React.ReactElement;
