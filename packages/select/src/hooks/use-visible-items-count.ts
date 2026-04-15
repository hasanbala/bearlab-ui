import { useLayoutEffect, useRef, useState } from "react";
import {
  ARROW_OFFSET,
  DEFAULT_ITEM_WIDTH,
  ITEMS_GAP,
  MORE_BADGE_ESTIMATED_WIDTH,
} from "../constants/select-config";
import { SelectOption } from "../types/select.types";

export const useVisibleItemsCount = <T extends SelectOption>(
  selectedItems: T[],
  containerWidth: number,
  inputWidth: number
) => {
  const selectedItemsRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(selectedItems.length);
  const itemWidthsCache = useRef<Record<string | number, number>>({});
  const [prevSelectedItems, setPrevSelectedItems] = useState(selectedItems);

  if (selectedItems !== prevSelectedItems) {
    setPrevSelectedItems(selectedItems);
    setVisibleCount(selectedItems.length);
  }

  useLayoutEffect(() => {
    if (!selectedItemsRef.current || containerWidth === 0) return;

    const itemNodes = Array.from(
      selectedItemsRef.current.querySelectorAll<HTMLElement>(
        ".bearlab-select-selected-item:not(.bearlab-select-hidden-selected-item)"
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
  }, [selectedItems, containerWidth, inputWidth]);

  return { selectedItemsRef, visibleCount };
};
