import { useCallback, useState } from "react";
import type {
  SortState,
  TableColumn,
  UseTableSort,
  UseTableSortReturn,
} from "../types/table.types";

export const useTableSort = ({
  sortState,
  defaultSortState = null,
  onSortChange,
}: UseTableSort): UseTableSortReturn => {
  const isControlled = sortState !== undefined;
  const [internalSort, setInternalSort] = useState<SortState | null>(
    defaultSortState
  );

  const activeSort = isControlled ? (sortState ?? null) : internalSort;

  const toggleSort = useCallback(
    (column: TableColumn) => {
      const isActiveColumn = activeSort?.columnKey === column.key;

      let next: SortState | null;

      if (!isActiveColumn) {
        next = {
          columnKey: column.key,
          dataIndex: column.dataIndex,
          direction: "asc",
        };
      } else if (activeSort?.direction === "asc") {
        next = {
          columnKey: column.key,
          dataIndex: column.dataIndex,
          direction: "desc",
        };
      } else {
        next = null;
      }

      if (!isControlled) {
        setInternalSort(next);
      }

      onSortChange?.(next);
    },
    [activeSort, isControlled, onSortChange]
  );

  return { sortState: activeSort, toggleSort };
};
