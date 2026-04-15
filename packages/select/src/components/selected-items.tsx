import classnames from "classnames";
import { SelectedItem } from "./selected-item";
import { SelectedItemsProps, SelectOption } from "../types/select.types";
import styles from "../styles/select.module.scss";

export const SelectedItems = <T extends SelectOption>(
  props: SelectedItemsProps<T>
) => {
  const {
    style,
    disabled,
    className,
    visibleCount,
    selectedItems,
    selectedItemsRef,
    setSelectedItems,
  } = props;

  const handleRemove = (value: number | string) => {
    if (disabled) return;
    setSelectedItems(selectedItems.filter((item) => item.value !== value));
  };

  const visibleItems = selectedItems.slice(0, visibleCount);
  const hiddenCount = selectedItems.length - visibleCount;

  if (selectedItems.length === 0) return <div ref={selectedItemsRef} />;

  return (
    <div
      role="group"
      ref={selectedItemsRef}
      aria-disabled={disabled}
      style={style?.selectedItems}
      aria-label={`${selectedItems.length} selected`}
      className={classnames(
        styles.selectedItemsContainer,
        className?.selectedItems
      )}
    >
      {visibleItems.map((item) => (
        <SelectedItem
          style={style?.selectedItem}
          id={item.value}
          key={item.value}
          title={item.label}
          disabled={disabled}
          className={classnames(
            styles.selectedItem,
            className?.selectedItem,
            "bearlab-select-selected-item"
          )}
          onRemove={handleRemove}
        />
      ))}
      {hiddenCount > 0 && (
        <SelectedItem
          disabled={disabled}
          title={`+${hiddenCount}`}
          aria-label={`${hiddenCount} more selected`}
          className={classnames(
            styles.selectedItem,
            styles.hiddenSelectedItem,
            className?.selectedItem,
            "bearlab-select-hidden-selected-item"
          )}
        />
      )}
    </div>
  );
};
