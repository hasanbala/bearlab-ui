import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { UseTable, UseTableReturn } from "../types/table.types";

export const useTable = ({
  dataSource,
  serverPagination,
  rowSelection,
  currentPage = 1,
  pagination,
  pageSize,
}: UseTable): UseTableReturn => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [initialPage, setInitialPage] = useState(currentPage);

  const selectedRowsRef = useRef(new Map<string, Record<string, any>>());

  const filteredData = useMemo(() => dataSource, [dataSource]);

  useEffect(() => {
    setInitialPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!serverPagination) {
      setInitialPage(1);
    }
  }, [dataSource, serverPagination]);

  const indexOfLastItem = initialPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  const visibleRows = useMemo(() => {
    if (serverPagination) return dataSource;
    if (!pagination) return filteredData;

    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [
    serverPagination,
    dataSource,
    pagination,
    filteredData,
    indexOfFirstItem,
    indexOfLastItem,
  ]);

  const visibleRowKeys = useMemo(
    () => visibleRows.map((record) => record["key"]),
    [visibleRows]
  );

  const selectedOnPage = useMemo(
    () => visibleRowKeys.filter((key) => selectedRowKeys.includes(key)).length,
    [visibleRowKeys, selectedRowKeys]
  );

  const selectAll =
    visibleRowKeys.length > 0 && selectedOnPage === visibleRowKeys.length;

  const isIndeterminate = selectedOnPage > 0 && !selectAll;

  const emitChange = useCallback(
    (keys: string[]) => {
      if (!rowSelection?.onChange) return;

      const selectedRows = keys
        .map((key) => selectedRowsRef.current.get(key))
        .filter(Boolean) as Record<string, any>[];

      rowSelection.onChange(keys, selectedRows);
    },
    [rowSelection]
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const selectedRows = selectedRowsRef.current;
      let newSelectedRowKeys: string[];

      if (checked) {
        visibleRows.forEach((record) =>
          selectedRows.set(record["key"], record)
        );

        newSelectedRowKeys = [
          ...selectedRowKeys,
          ...visibleRowKeys.filter((key) => !selectedRowKeys.includes(key)),
        ];
      } else {
        visibleRowKeys.forEach((key) => selectedRows.delete(key));

        newSelectedRowKeys = selectedRowKeys.filter(
          (key) => !visibleRowKeys.includes(key)
        );
      }

      setSelectedRowKeys(newSelectedRowKeys);
      emitChange(newSelectedRowKeys);
    },
    [visibleRows, visibleRowKeys, selectedRowKeys, emitChange]
  );

  const handleRowSelect = useCallback(
    (record: Record<string, any>) => {
      const key = record["key"];
      const selectedRows = selectedRowsRef.current;
      let newSelectedRowKeys: string[];

      if (rowSelection?.type === "radio") {
        selectedRows.clear();
        selectedRows.set(key, record);
        newSelectedRowKeys = [key];
      } else if (selectedRowKeys.includes(key)) {
        selectedRows.delete(key);
        newSelectedRowKeys = selectedRowKeys.filter((k) => k !== key);
      } else {
        selectedRows.set(key, record);
        newSelectedRowKeys = [...selectedRowKeys, key];
      }

      setSelectedRowKeys(newSelectedRowKeys);
      emitChange(newSelectedRowKeys);
    },
    [rowSelection, selectedRowKeys, emitChange]
  );

  return {
    selectedRowKeys,
    selectAll,
    isIndeterminate,
    filteredData,
    visibleRows,
    initialPage,
    indexOfFirstItem,
    setInitialPage,
    handleSelectAll,
    handleRowSelect,
  };
};
