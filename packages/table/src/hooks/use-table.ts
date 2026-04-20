import { useState, useMemo, useCallback, useEffect } from "react";
import type { UseTable, UseTableReturn } from "../types/table.types";
import { resolveRows } from "../utils/resolve-rows";

export const useTable = ({
  dataSource,
  serverPagination,
  rowSelection,
  currentPage = 1,
}: UseTable): UseTableReturn => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [initialPage, setInitialPage] = useState(currentPage);

  const filteredData = useMemo(() => dataSource, [dataSource]);

  useEffect(() => {
    setInitialPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!serverPagination) {
      setInitialPage(1);
    }
  }, [dataSource, serverPagination]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectAll(checked);

      const dataToSelect = serverPagination ? dataSource : filteredData;
      const newSelectedRowKeys = checked
        ? dataToSelect.map((record) => record["key"])
        : [];

      setSelectedRowKeys(newSelectedRowKeys);

      if (rowSelection?.onChange) {
        const selectedRows = resolveRows(newSelectedRowKeys, dataSource);
        rowSelection.onChange(newSelectedRowKeys, selectedRows);
      }
    },
    [serverPagination, dataSource, filteredData, rowSelection]
  );

  const handleRowSelect = useCallback(
    (record: Record<string, any>) => {
      const key = record["key"];

      setSelectedRowKeys((prev) => {
        const newSelectedRowKeys =
          rowSelection?.type === "radio"
            ? [key]
            : prev.includes(key)
              ? prev.filter((k) => k !== key)
              : [...prev, key];

        const dataToCheck = serverPagination ? dataSource : filteredData;
        setSelectAll(
          newSelectedRowKeys.length === dataToCheck.length &&
            newSelectedRowKeys.length > 0
        );

        if (rowSelection?.onChange) {
          const selectedRows = resolveRows(newSelectedRowKeys, dataSource);
          rowSelection.onChange(newSelectedRowKeys, selectedRows);
        }

        return newSelectedRowKeys;
      });
    },
    [rowSelection, serverPagination, dataSource, filteredData]
  );

  return {
    selectedRowKeys,
    selectAll,
    filteredData,
    initialPage,
    setInitialPage,
    handleSelectAll,
    handleRowSelect,
  };
};
