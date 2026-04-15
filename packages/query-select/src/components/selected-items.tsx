import { SelectedItem } from "./selected-item";
import {
  QuerySelectSelectedItemsProps,
  QuerySelectOption,
} from "../types/query-select.types";
import styles from "../styles/query-select.module.scss";
import classnames from "classnames";

export const SelectedItems = <T extends QuerySelectOption>(
  props: QuerySelectSelectedItemsProps<T>
) => {
  const {
    style,
    disabled,
    className,
    selectedItems,
    noSelectionText,
    persistedItems,
    setSelectedItems,
    onPersistedItemsChange,
  } = props;

  const handleRemove = (value: string | number) => {
    if (disabled) return;

    setSelectedItems(selectedItems.filter((item) => item.value !== value));
    if (persistedItems && onPersistedItemsChange) {
      const newRecordedItems = persistedItems.filter(
        (recorded) => recorded.value !== value
      );
      onPersistedItemsChange(newRecordedItems);
    }
  };

  const renderContent = () => {
    if (selectedItems.length < 1) return <div>{noSelectionText}</div>;

    return selectedItems?.map((item) => {
      const isRecorded =
        persistedItems &&
        persistedItems.some(
          (recordedItem) => recordedItem.value === item.value
        );

      return (
        <SelectedItem
          key={item.value}
          title={item.label}
          value={item.value}
          style={style}
          disabled={disabled}
          className={className}
          isRecorded={isRecorded}
          onRemove={handleRemove}
        />
      );
    });
  };

  return (
    <div
      role="group"
      aria-disabled={disabled}
      style={style?.selectedItems}
      aria-label={`${selectedItems.length} selected`}
      className={classnames(
        styles.selectedItemsContainer,
        className?.selectedItems
      )}
    >
      {renderContent()}
    </div>
  );
};
