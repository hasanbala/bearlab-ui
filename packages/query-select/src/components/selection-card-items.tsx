import { useCallback } from "react";
import {
  QuerySelectSelectionCardItemsProps,
  QuerySelectOption,
} from "../types/query-select.types";
import styles from "../styles/query-select.module.scss";
import classnames from "classnames";
import { SelectionCardItem } from "./selection-card-item";

export const SelectionCardItems = <T extends QuerySelectOption>(
  props: QuerySelectSelectionCardItemsProps<T>
) => {
  const {
    style,
    labels,
    disabled,
    className,
    isRemovable,
    selectedItems,
    noSelectionText,
    onRemoveSelect,
  } = props;

  const handleRemove = useCallback(
    (value: string | number) => {
      if (disabled) return;
      onRemoveSelect(selectedItems.filter((item) => item.value !== value));
    },
    [disabled, selectedItems, onRemoveSelect]
  );

  return (
    <div
      role="group"
      aria-disabled={disabled}
      style={style?.selectionCardWrapper}
      aria-label={labels.selected(selectedItems.length)}
      className={classnames(
        styles.selectionCardWrapper,
        className?.selectionCardWrapper
      )}
    >
      {selectedItems.length < 1 ? (
        <div>{noSelectionText}</div>
      ) : (
        selectedItems.map((item) => (
          <SelectionCardItem
            key={item.value}
            title={item.label}
            value={item.value}
            removeLabel={labels.remove(item.label)}
            style={style?.selectionCardItem}
            disabled={disabled}
            className={className?.selectionCardItem}
            onRemove={isRemovable ? handleRemove : undefined}
          />
        ))
      )}
    </div>
  );
};
