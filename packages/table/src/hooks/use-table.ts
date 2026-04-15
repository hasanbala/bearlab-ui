import { useState, useEffect } from "react";
import type { UseTable, UseTableReturn } from "../types/table.types";
import { resolveRows } from "../utils/resolve-rows";
import { searchInValue } from "../utils/search-in-value";

export const useTable = ({
  dataSource,
  serverPagination,
  rowSelection,
  currentPage = 1,
}: UseTable): UseTableReturn => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchValue] = useState("");
  const [filteredData, setFilteredData] = useState(dataSource);
  const [initialPage, setInitialPage] = useState(currentPage);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredData(dataSource);
    } else {
      const searchLower = searchValue.toLowerCase();
      const filtered = dataSource.filter((record) =>
        Object.values(record).some((value) => searchInValue(value, searchLower))
      );
      setFilteredData(filtered);
    }

    if (!serverPagination) {
      setInitialPage(1);
    }
  }, [searchValue, dataSource, serverPagination]);

  const handleSelectAll = (checked: boolean) => {
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
  };

  const handleRowSelect = (record: Record<string, any>) => {
    const key = record["key"];
    const newSelectedRowKeys =
      rowSelection?.type === "radio"
        ? [key]
        : selectedRowKeys.includes(key)
          ? selectedRowKeys.filter((k) => k !== key)
          : [...selectedRowKeys, key];

    setSelectedRowKeys(newSelectedRowKeys);

    const dataToCheck = serverPagination ? dataSource : filteredData;
    setSelectAll(
      newSelectedRowKeys.length === dataToCheck.length &&
        newSelectedRowKeys.length > 0
    );

    if (rowSelection?.onChange) {
      const selectedRows = resolveRows(newSelectedRowKeys, dataSource);
      rowSelection.onChange(newSelectedRowKeys, selectedRows);
    }
  };

  return {
    selectedRowKeys,
    selectAll,
    searchValue,
    filteredData,
    initialPage,
    setInitialPage,
    handleSelectAll,
    handleRowSelect,
  };
};
