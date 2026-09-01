import { useCallback, useState } from "react";
import type {
  FilterState,
  UseTableFilter,
  UseTableFilterReturn,
} from "../types/table.types";

export const useTableFilter = ({
  filterState,
  defaultFilterState = {},
  onFilterChange,
}: UseTableFilter): UseTableFilterReturn => {
  const isControlled = filterState !== undefined;
  const [internalFilters, setInternalFilters] =
    useState<FilterState>(defaultFilterState);

  const activeFilters = isControlled ? (filterState ?? {}) : internalFilters;

  const commit = useCallback(
    (next: FilterState) => {
      if (!isControlled) {
        setInternalFilters(next);
      }
      onFilterChange?.(next);
    },
    [isControlled, onFilterChange]
  );

  const setFilter = useCallback(
    (columnKey: string, value: string) => {
      const trimmed = value.trim();
      const next = { ...activeFilters };

      if (trimmed) {
        next[columnKey] = trimmed;
      } else {
        delete next[columnKey];
      }

      commit(next);
    },
    [activeFilters, commit]
  );

  const clearFilter = useCallback(
    (columnKey: string) => {
      if (!(columnKey in activeFilters)) return;

      const next = { ...activeFilters };
      delete next[columnKey];
      commit(next);
    },
    [activeFilters, commit]
  );

  return { filterState: activeFilters, setFilter, clearFilter };
};
