import { useLayoutEffect, useRef, useState } from "react";
import {
  ARROW_OFFSET,
  DEFAULT_ITEM_WIDTH,
  ITEMS_GAP,
  MORE_BADGE_ESTIMATED_WIDTH,
} from "../constants/select-config";
import { QuerySelectOption } from "../types/query-select.types";

export const useVisibleItemsCount = <T extends QuerySelectOption>(
  selectedItems: T[],
  containerWidth: number,
  inputWidth: number,
  isSelectionCard: boolean
) => {
  const selectedItemsRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(selectedItems.length);
  const itemWidthsCache = useRef<Record<string | number, number>>({});
  const [prevSelectedItems, setPrevSelectedItems] = useState(selectedItems);

  if (!isSelectionCard && selectedItems !== prevSelectedItems) {
    setPrevSelectedItems(selectedItems);
    setVisibleCount(selectedItems.length);
  }

  useLayoutEffect(() => {
    if (isSelectionCard || !selectedItemsRef.current || containerWidth === 0)
      return;

    const itemNodes = Array.from(
      selectedItemsRef.current.querySelectorAll<HTMLElement>(
        ".bearlab-query-select-selection-inline-item:not(.bearlab-query-select-selection-inline-hidden-item)"
      )
    );

    itemNodes.forEach((node, index) => {
      const item = selectedItems[index];
      if (item) {
        itemWidthsCache.current[item.value] = node.offsetWidth;
      }
    });

    const maxWidth = containerWidth - (ARROW_OFFSET + inputWidth);

    let currentTotalWidth = 0;
    let newVisibleCount = selectedItems.length;

    for (let i = 0; i < selectedItems.length; i++) {
      const item = selectedItems[i];

      const itemWidth =
        itemWidthsCache.current[item.value] || DEFAULT_ITEM_WIDTH;
      const nextWidth = currentTotalWidth + itemWidth + ITEMS_GAP;

      const requiredSpace =
        nextWidth +
        (i < selectedItems.length - 1 ? MORE_BADGE_ESTIMATED_WIDTH : 0);

      if (requiredSpace > maxWidth) {
        newVisibleCount = Math.max(0, i);
        break;
      }

      currentTotalWidth = nextWidth;
    }
    setVisibleCount((prev) =>
      prev !== newVisibleCount ? newVisibleCount : prev
    );
  }, [selectedItems, containerWidth, inputWidth, isSelectionCard]);

  return { selectedItemsRef, visibleCount };
};
