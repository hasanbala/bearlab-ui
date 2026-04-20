import { useId, useMemo, useCallback } from "react";
import classnames from "classnames";
import { Checkbox } from "@bearlab/checkbox";
import { Radio } from "@bearlab/radio";
import { useTable } from "./hooks/use-table";
import { useMediaQuery } from "./hooks/use-media-query";
import type {
  TableProps,
  FinalColumn,
  SelectionColumn,
} from "./types/table.types";
import { MainTable } from "./components/main-table";
import { TableHeader } from "./components/table-header";
import { TableBody } from "./components/table-body";
import { TableRow } from "./components/table-row";
import { TableCell } from "./components/table-cell";
import { TableEmpty } from "./components/table-empty";
import { TablePagination } from "./components/table-pagination";
import styles from "./styles/table.module.scss";
import { TableRecord } from "./components/table-record";

export const Table = (props: TableProps) => {
  const {
    title,
    dataSource,
    columns,
    className,
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
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    emptyTitle = "No records found",
    emptyDescription = "There are no records to display at the moment.",
    renderPageInfo,
    renderTotalInfo,
    style,
  } = props;

  const tableId = useId();
  const titleId = useId();
  const paginationId = useId();

  const {
    selectedRowKeys,
    selectAll,
    filteredData,
    initialPage,
    setInitialPage,
    handleSelectAll,
    handleRowSelect,
  } = useTable({ dataSource, serverPagination, rowSelection, currentPage });

  const pageSize =
    typeof pagination === "object" && pagination.pageSize
      ? pagination.pageSize
      : 5;

  const showPageNumbers =
    typeof pagination === "object"
      ? pagination.showPageNumbers !== false
      : true;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const mobileMinimize = useMediaQuery("(max-width: 540px)");
  const maxPages = isMobile ? 3 : maxVisiblePages;

  const indexOfLastItem = initialPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  const currentItems = useMemo(
    () =>
      serverPagination
        ? dataSource
        : filteredData.slice(indexOfFirstItem, indexOfLastItem),
    [
      serverPagination,
      dataSource,
      filteredData,
      indexOfFirstItem,
      indexOfLastItem,
    ]
  );

  const totalPages = useMemo(
    () =>
      serverPagination
        ? Math.ceil((totalCount ?? 0) / pageSize)
        : Math.ceil(filteredData.length / pageSize),
    [serverPagination, totalCount, pageSize, filteredData.length]
  );

  const dataToDisplay = useMemo(
    () =>
      pagination ? currentItems : serverPagination ? dataSource : filteredData,
    [pagination, currentItems, serverPagination, dataSource, filteredData]
  );

  const totalRows = serverPagination ? (totalCount ?? 0) : filteredData.length;

  const onPageChange = useCallback(
    (page: number, isPageSize?: boolean) => {
      setInitialPage(page);
      onTableChange?.(page, pageSize, isPageSize);
    },
    [onTableChange, setInitialPage, pageSize]
  );

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) onPageChange(page, false);
    },
    [totalPages, onPageChange]
  );

  const selectionColumn = useMemo((): SelectionColumn | null => {
    if (!rowSelection) return null;

    return {
      title:
        rowSelection.type === "checkbox" ? (
          <Checkbox
            checked={selectAll}
            onChange={(e) =>
              handleSelectAll(
                (e.target as unknown as { checked: boolean }).checked
              )
            }
            disabled={disabled}
            aria-label="Select all rows"
          />
        ) : null,
      key: "selection",
      dataIndex: "",
      render: (_: any, record: Record<string, any>) => {
        const isSelected = selectedRowKeys.includes(record["key"]);

        return rowSelection.type === "checkbox" ? (
          <Checkbox
            checked={isSelected}
            onChange={() => handleRowSelect(record)}
            disabled={disabled}
            aria-label={`Select row ${record["key"]}`}
          />
        ) : (
          <Radio
            name={`${tableId}-row-selection`}
            value={record.key}
            checked={selectedRowKeys[0] === record.key}
            onChange={() => handleRowSelect(record)}
            disabled={disabled}
            aria-label={`Select row ${record["key"]}`}
          />
        );
      },
    };
  }, [
    rowSelection,
    selectAll,
    selectedRowKeys,
    disabled,
    tableId,
    handleSelectAll,
    handleRowSelect,
  ]);

  const finalColumns = useMemo(
    (): (FinalColumn | null)[] =>
      selectionColumn ? [selectionColumn, ...columns] : columns,
    [selectionColumn, columns]
  );

  const handleRowClick = useCallback(
    (record: Record<string, any>) => {
      if (disabled) return;
      onRowClick?.(record);
    },
    [disabled, onRowClick]
  );

  return (
    <div
      id={tableId}
      className={classnames(styles.container, className?.root)}
      style={style?.root}
      role="region"
      aria-labelledby={title ? titleId : undefined}
      aria-label={!title ? ariaLabel : undefined}
      aria-describedby={ariaDescribedBy}
    >
      {title && (
        <div
          className={classnames(styles.header, className?.header)}
          style={style?.header}
        >
          <h3
            id={titleId}
            className={classnames(styles.title, className?.title)}
            style={style?.title}
          >
            {title}
          </h3>
        </div>
      )}
      <div
        className={classnames(styles.tableWrapper, className?.tableWrapper)}
        style={style?.tableWrapper}
      >
        <MainTable
          className={classnames(
            styles.tableContainer,
            className?.tableContainer
          )}
          aria-labelledby={title ? titleId : undefined}
          aria-label={!title ? ariaLabel : undefined}
          aria-rowcount={totalRows}
        >
          <TableHeader
            className={classnames(styles.tableHeader, className?.tableHeader)}
          >
            <TableRow>
              {finalColumns.map((column: any) => (
                <TableCell
                  key={column.key}
                  isHeader
                  scope="col"
                  aria-sort={
                    column.sortDirection === "asc"
                      ? "ascending"
                      : column.sortDirection === "desc"
                        ? "descending"
                        : column.sorter
                          ? "none"
                          : undefined
                  }
                  className={classnames(
                    styles.headerCell,
                    className?.headerCell
                  )}
                  style={{ width: column.width, ...style?.headerCell }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody
            className={classnames(styles.tableBody, className?.tableBody)}
          >
            {dataToDisplay.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={finalColumns.length}
                  className={classnames(styles.bodyCell, className?.bodyCell)}
                  style={{ padding: 0 }}
                >
                  <TableEmpty
                    title={emptyTitle}
                    description={emptyDescription}
                    className={{
                      root: className?.emptyState,
                      icon: className?.emptyIcon,
                      title: className?.emptyTitle,
                      description: className?.emptyDescription,
                    }}
                    style={{
                      root: style?.emptyState,
                      icon: style?.emptyIcon,
                      title: style?.emptyTitle,
                      description: style?.emptyDescription,
                    }}
                  />
                </TableCell>
              </TableRow>
            ) : (
              dataToDisplay.map((record, index) => (
                <TableRecord
                  key={record["key"] ?? index}
                  record={record}
                  index={index}
                  selectedRowKeys={selectedRowKeys}
                  onRowClick={onRowClick}
                  disabled={disabled}
                  rowSelection={rowSelection}
                  finalColumns={finalColumns}
                  cnBodyRow={className?.bodyRow}
                  cnBodyCell={className?.bodyCell}
                  style={style?.bodyCell}
                  handleRowClick={handleRowClick}
                  indexOfFirstItem={indexOfFirstItem}
                />
              ))
            )}
          </TableBody>
        </MainTable>
      </div>
      {pagination && totalPages > 1 && (
        <TablePagination
          paginationId={paginationId}
          totalPages={totalPages}
          initialPage={initialPage}
          maxPages={maxPages}
          isMobile={isMobile}
          mobileMinimize={mobileMinimize}
          disabled={disabled}
          showPageNumbers={showPageNumbers}
          showPageSizeSelector={showPageSizeSelector}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          pageSizePlaceholder={pageSizePlaceholder}
          goToPage={goToPage}
          onPageChange={onPageChange}
          renderPageInfo={renderPageInfo}
          className={className}
          style={style}
        />
      )}
      {totalCount != null && (
        <div
          className={classnames(styles.recordInfo, className?.recordInfo)}
          style={style?.recordInfo}
          aria-live="polite"
          aria-atomic="true"
        >
          {renderTotalInfo ? (
            renderTotalInfo(
              (currentPage - 1) * (pageSize || 10) + 1,
              Math.min(
                currentPage * (pageSize || 10),
                serverPagination ? (totalCount ?? 0) : filteredData.length
              ),
              totalRows
            )
          ) : (
            <>
              Showing {(currentPage - 1) * (pageSize || 10) + 1} to{" "}
              {Math.min(
                currentPage * (pageSize || 10),
                serverPagination ? (totalCount ?? 0) : filteredData.length
              )}{" "}
              of {totalRows} entries
            </>
          )}
        </div>
      )}
    </div>
  );
};
