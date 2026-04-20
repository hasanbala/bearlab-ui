import { forwardRef, ForwardedRef, useCallback } from "react";
import classnames from "classnames";
import {
  QuerySelectSelectionInlineItemsProps,
  QuerySelectOption,
} from "../types/query-select.types";
import styles from "../styles/query-select.module.scss";
import { SelectionInlineItem } from "./selection-inline-item";

export const SelectionInlineItems = forwardRef(
  <T extends QuerySelectOption>(
    props: QuerySelectSelectionInlineItemsProps<T>,
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

    if (selectedItems.length === 0) return <div ref={ref} />;

    return (
      <div
        role="group"
        ref={ref}
        aria-disabled={disabled}
        style={style?.selectionInlineItems}
        aria-label={`${selectedItems.length} selected`}
        className={classnames(
          styles.selectionInlineWrapper,
          className?.selectionInlineItems
        )}
      >
        {visibleItems.map((item) => (
          <SelectionInlineItem
            style={style?.selectionInlineItem}
            value={item.value}
            key={item.value}
            title={item.label}
            disabled={disabled}
            className={classnames(
              styles.selectionInlineItem,
              className?.selectionInlineItem,
              "bearlab-query-select-selection-inline-item"
            )}
            onRemove={handleRemove}
          />
        ))}
        {hiddenCount > 0 && (
          <SelectionInlineItem
            style={style?.selectionInlineItem}
            disabled={disabled}
            title={`+${hiddenCount}`}
            aria-label={`${hiddenCount} more selected`}
            className={classnames(
              styles.selectionInlineItem,
              styles.hiddenSelectionInlineItem,
              className?.selectionInlineItem,
              "bearlab-query-select-selection-inline-hidden-item"
            )}
          />
        )}
      </div>
    );
  }
) as <T extends QuerySelectOption>(
  props: QuerySelectSelectionInlineItemsProps<T> & {
    ref?: ForwardedRef<HTMLDivElement>;
  }
) => React.ReactElement;
