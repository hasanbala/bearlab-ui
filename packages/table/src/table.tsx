import { useEffect, useState } from "react";
import {
  MainTable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./mainTable";
import { Checkbox } from "@bearlab/checkbox";
import { Radio } from "@bearlab/radio";
import { Select } from "@bearlab/select";
import {
  Button,
  BUTTON_TYPE,
  ICON_TYPE,
  BUTTON_VARIANT,
} from "@bearlab/button";
import classnames from "classnames";
import styles from "./table.module.scss";
import { useMediaQuery } from "@bearlab/hooks";

export const Table = (props: Props) => {
  const {
    title,
    dataSource,
    columns,
    className,
    // showFilter = false,
    // showSeeAll = false,
    // showSearch = false,
    // onFilterClick,
    // onSeeAllClick,
    rowSelection,
    pagination = false,
    onRowClick,
    disabled,
    serverPagination = false,
    totalCount,
    currentPage = 1,
    pageSizeOptions = [10, 20, 50, 100],
    showPageSizeSelector,
    pageSizePlaceholder = "Select page size",
    maxVisiblePages = 6,
    onTableChange,
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] =
    useState<Record<string, any>[]>(dataSource);

  const [initialPage, setInitialPage] = useState(currentPage);
  const pageSize =
    typeof pagination == "object" && pagination.pageSize
      ? pagination.pageSize
      : 5;
  const showPageNumbers =
    typeof pagination == "object" ? pagination.showPageNumbers !== false : true;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const mobileMinimize = useMediaQuery("(max-width: 540px)");
  const maxPages = isMobile ? 3 : maxVisiblePages;

  const getNestedValue = (obj: Record<string, any>, path: string): any => {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  const indexOfLastItem = initialPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = serverPagination
    ? dataSource
    : filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = serverPagination
    ? Math.ceil((totalCount || 0) / pageSize)
    : Math.ceil(filteredData.length / pageSize);

  const dataToDisplay = pagination
    ? currentItems
    : serverPagination
    ? dataSource
    : filteredData;

  useEffect(() => {
    if (searchValue.trim() == "") {
      setFilteredData(dataSource);
    } else {
      const filtered = dataSource.filter((record) => {
        return Object.values(record).some((value) => {
          const searchInValue = (val: any): boolean => {
            if (val && typeof val === "string") {
              return val.toLowerCase().includes(searchValue.toLowerCase());
            }
            if (val && typeof val === "object" && !Array.isArray(val)) {
              return Object.values(val).some(searchInValue);
            }
            return false;
          };
          return searchInValue(value);
        });
      });
      setFilteredData(filtered);
    }

    if (!serverPagination) {
      setInitialPage(1);
    }
  }, [searchValue, dataSource, serverPagination]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const dataToSelect = serverPagination ? dataSource : filteredData;
    const newSelectedRowKeys = newSelectAll
      ? dataToSelect.map((record) => record["key"])
      : [];

    setSelectedRowKeys(newSelectedRowKeys);

    if (rowSelection?.onChange) {
      const selectedRows = newSelectedRowKeys
        .map((key) => dataSource.find((record) => record["key"] == key))
        .filter(Boolean) as Record<string, any>[];

      rowSelection.onChange(newSelectedRowKeys, selectedRows);
    }
  };

  const handleRowSelect = (record: Record<string, any>) => {
    const key = record["key"];
    let newSelectedRowKeys: string[];

    if (rowSelection?.type == "radio") {
      newSelectedRowKeys = [key];
    } else {
      newSelectedRowKeys = selectedRowKeys.includes(key)
        ? selectedRowKeys.filter((k) => k !== key)
        : [...selectedRowKeys, key];
    }

    setSelectedRowKeys(newSelectedRowKeys);

    const dataToCheck = serverPagination ? dataSource : filteredData;
    setSelectAll(
      newSelectedRowKeys.length == dataToCheck.length &&
        newSelectedRowKeys.length > 0
    );

    if (rowSelection?.onChange) {
      const selectedRows = newSelectedRowKeys
        .map((k) => dataSource.find((record) => record["key"] == k))
        .filter(Boolean) as Record<string, any>[];

      rowSelection.onChange(newSelectedRowKeys, selectedRows);
    }
  };

  const onPageChange = (page: number, isPageSize?: boolean) => {
    if (onTableChange)
      onTableChange(setInitialPage, page, pageSize, isPageSize);
  };

  const renderSelectionColumn = () => {
    if (!rowSelection) {
      return null;
    }

    return {
      title:
        rowSelection.type == "checkbox" ? (
          <Checkbox
            checked={selectAll}
            onChange={handleSelectAll}
            disabled={disabled}
          />
        ) : (
          ""
        ),
      key: "selection",
      dataIndex: "",
      render: (_: any, record: Record<string, any>) => {
        const isSelected = selectedRowKeys.includes(record["key"]);

        return rowSelection.type == "checkbox" ? (
          <Checkbox
            checked={isSelected}
            onChange={() => handleRowSelect(record)}
            disabled={disabled}
          />
        ) : (
          <Radio
            name={record.key}
            value={record.key}
            checked={selectedRowKeys[0] == record.key}
            onChange={() => handleRowSelect(record)}
            disabled={disabled}
          />
        );
      },
    };
  };

  const finalColumns = rowSelection
    ? [renderSelectionColumn(), ...columns]
    : columns;

  const handleRowClick = (record: Record<string, any>) => {
    if (disabled) {
      return;
    }

    if (onRowClick) {
      onRowClick(record);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page, false);
    }
  };

  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const halfMaxPages = Math.floor(maxPages / 2);

    pages.push(1);

    let start: number;
    let end: number;

    if (currentPage <= halfMaxPages + 1) {
      start = 2;
      end = Math.min(maxPages - 1, totalPages - 1);
    } else if (currentPage >= totalPages - halfMaxPages) {
      start = Math.max(totalPages - maxPages + 2, 2);
      end = totalPages - 1;
    } else {
      start = currentPage - halfMaxPages + 1;
      end = currentPage + halfMaxPages - 1;
    }

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const renderPagination = () => {
    if (!pagination || totalPages <= 1) {
      return null;
    }

    const visiblePages = getVisiblePages();
    const pageSizeSelectOptions = pageSizeOptions?.map((size) => ({
      value: size.toString(),
      label: `${size} / page`,
    }));

    return (
      <div className={styles.paginationWrapper}>
        <div
          className={classnames(
            styles.paginationControls,
            isMobile && styles.tabletControls
          )}
        >
          <Button
            label=""
            buttonType={BUTTON_TYPE.JUST_ICON}
            iconType={{ default: ICON_TYPE.ARROW }}
            onClick={() => goToPage(initialPage - 1)}
            disabled={disabled || initialPage === 1}
            variant={BUTTON_VARIANT.SECONDARY}
            className={classnames(styles.pageButton, styles.prevButton)}
            iconTextReverse
          />
          {mobileMinimize && (
            <span className={styles.pageInfo}>
              Page {initialPage} of {totalPages}
            </span>
          )}
          {showPageNumbers && (
            <ul
              className={classnames(
                styles.pageList,
                mobileMinimize && styles.ghostPageList
              )}
            >
              {visiblePages.map((page, idx) => (
                <li key={`${page}-${idx}`}>
                  <Button
                    buttonType={BUTTON_TYPE.JUST_TEXT}
                    label={page.toString()}
                    onClick={() => goToPage(page as number)}
                    disabled={disabled}
                    className={classnames(
                      styles.pageButton,
                      initialPage === page && styles.pageButtonActive,
                      initialPage !== page && styles.pageButtonInactive
                    )}
                  />
                </li>
              ))}
            </ul>
          )}
          <Button
            label=""
            buttonType={BUTTON_TYPE.JUST_ICON}
            iconType={{ default: ICON_TYPE.ARROW }}
            onClick={() => goToPage(initialPage + 1)}
            disabled={disabled || initialPage === totalPages}
            variant={BUTTON_VARIANT.SECONDARY}
            className={styles.pageButton}
          />
        </div>
        {showPageSizeSelector && pageSize && (
          <Select
            options={pageSizeSelectOptions}
            placeholder={pageSizePlaceholder}
            onChange={(e) => onPageChange(Number(e.target.value), true)}
            name="pageSize"
            value={pageSize.toString()}
            label=""
            className={styles.pageSizeSelector}
          />
        )}
      </div>
    );
  };

  return (
    <div className={classnames(styles.container, className)}>
      {/* {(showFilter || showSeeAll || showSearch) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <div className={styles.actionsWrapper}>
            {showSearch && (
              <Input
                type="text"
                isExistSearch
                name="searchInput"
                value={searchValue}
                placeholder="Search..."
                onChange={(e) => setSearchValue(e.target.value)}
                disabled={disabled}
              />
            )}
            {showFilter && (
              <Button
                label="Filter"
                buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
                iconType={{ default: ICON_TYPE.FILTER }}
                onClick={onFilterClick || (() => console.log("basti"))}
                variant={BUTTON_VARIANT.SECONDARY}
                disabled={disabled}
              />
            )}
            {showSeeAll && (
              <Button
                label="See all"
                buttonType={BUTTON_TYPE.JUST_TEXT}
                onClick={onSeeAllClick || (() => console.log("basti"))}
                variant={BUTTON_VARIANT.SECONDARY}
                disabled={disabled}
              />
            )}
          </div>
        </div>
      )} */}

      {title && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
        </div>
      )}

      <div className={styles.tableWrapper}>
        <MainTable className={styles.tableContainer}>
          <TableHeader className={styles.tableHeader}>
            <TableRow>
              {finalColumns.map((column: any) => (
                <TableCell
                  key={column.key}
                  isHeader
                  className={styles.headerCell}
                  style={{ width: column.width }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className={styles.tableBody}>
            {dataToDisplay.map((record, index) => (
              <TableRow key={index} onClick={() => handleRowClick(record)}>
                {finalColumns.map((column: any) => (
                  <TableCell
                    key={`${record["key"]}-${column.key}`}
                    className={styles.bodyCell}
                    style={{ width: column.width }}
                  >
                    {column.render
                      ? column.render(
                          getNestedValue(record, column.dataIndex),
                          record
                        )
                      : getNestedValue(record, column.dataIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MainTable>
      </div>

      {renderPagination()}

      {totalCount && (
        <div className={styles.recordInfo}>
          Showing {(currentPage - 1) * (pageSize || 10) + 1} to{" "}
          {Math.min(
            currentPage * (pageSize || 10),
            serverPagination ? totalCount : filteredData.length
          )}{" "}
          of {serverPagination ? totalCount : filteredData.length} entries
        </div>
      )}
    </div>
  );
};

export interface Props {
  title?: string;
  dataSource: Record<string, any>[];
  columns: TableColumn[];
  className?: string;
  // showFilter?: boolean;
  // showSeeAll?: boolean;
  // showSearch?: boolean;
  // onFilterClick?: () => void;
  // onSeeAllClick?: () => void;
  rowSelection?: {
    type: "checkbox" | "radio";
    onChange?: (
      selectedRowKeys: string[],
      selectedRows: Record<string, any>[]
    ) => void;
  };
  pagination?:
    | boolean
    | {
        pageSize?: number;
        showPageNumbers?: boolean;
      };
  onRowClick?: (record: Record<string, any>) => void;
  disabled?: boolean;
  serverPagination?: boolean;
  totalCount?: number;
  currentPage?: number;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  pageSizePlaceholder?: string;
  onTableChange?: (
    setInitialPage: React.Dispatch<React.SetStateAction<number>>,
    page: number,
    pageSize: number,
    isPageSize?: boolean
  ) => void;
  maxVisiblePages?: number;
}

interface TableColumn {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: any) => React.ReactNode;
  sorter?: (a: any, b: any) => number;
  width?: string | number;
}
