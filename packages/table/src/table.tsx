import { useId } from "react";
import classnames from "classnames";
import { Checkbox } from "@bearlab/checkbox";
import { Radio } from "@bearlab/radio";
import { useTable } from "./hooks/use-table";
import { useMediaQuery } from "./hooks/use-media-query";
import type { TableProps } from "./types/table.types";
import { MainTable } from "./components/main-table";
import { TableHeader } from "./components/table-header";
import { TableBody } from "./components/table-body";
import { TableRow } from "./components/table-row";
import { TableCell } from "./components/table-cell";
import styles from "./styles/table.module.scss";
import { Button } from "@bearlab/button";
import { getVisiblePages } from "./utils/get-visible-pages";
import { getNestedValue } from "./utils/get-nested-value";

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
  const currentItems = serverPagination
    ? dataSource
    : filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = serverPagination
    ? Math.ceil((totalCount ?? 0) / pageSize)
    : Math.ceil(filteredData.length / pageSize);

  const dataToDisplay = pagination
    ? currentItems
    : serverPagination
      ? dataSource
      : filteredData;

  const totalRows = serverPagination ? (totalCount ?? 0) : filteredData.length;

  const onPageChange = (page: number, isPageSize?: boolean) => {
    if (onTableChange) {
      onTableChange(setInitialPage, page, pageSize, isPageSize);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) onPageChange(page, false);
  };

  const renderSelectionColumn = () => {
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
  };

  const finalColumns = rowSelection
    ? [renderSelectionColumn(), ...columns]
    : columns;

  const handleRowClick = (record: Record<string, any>) => {
    if (disabled) return;
    onRowClick?.(record);
  };

  const renderPagination = () => {
    if (!pagination || totalPages <= 1) return null;

    const visiblePages = getVisiblePages(totalPages, initialPage, maxPages);

    const pageSizeSelectOptions = pageSizeOptions.map((size) => ({
      value: size.toString(),
      label: `${size} / page`,
    }));

    return (
      <div
        id={paginationId}
        className={classnames(
          styles.paginationWrapper,
          className?.paginationWrapper
        )}
        style={style?.paginationWrapper}
      >
        <nav
          aria-label="Table pagination"
          className={classnames(
            styles.paginationControls,
            isMobile && styles.tabletControls,
            className?.paginationControls
          )}
          style={style?.paginationControls}
        >
          <Button
            label="Previous page"
            buttonType="justIcon"
            iconType={{ default: "arrow" }}
            onClick={() => goToPage(initialPage - 1)}
            disabled={disabled || initialPage === 1}
            variant="secondary"
            aria-label="Go to previous page"
            className={{
              root: classnames(
                styles.pageButton,
                styles.prevButton,
                className?.pageButton
              ),
            }}
            reverseIconText
          />
          {mobileMinimize && (
            <span
              aria-live="polite"
              aria-atomic="true"
              className={classnames(styles.pageInfo, className?.pageInfo)}
              style={style?.pageInfo}
            >
              Page {initialPage} of {totalPages}
            </span>
          )}
          {showPageNumbers && (
            <ul
              className={classnames(
                styles.pageList,
                mobileMinimize && styles.ghostPageList,
                className?.pageList
              )}
              style={style?.pageList}
              aria-hidden={mobileMinimize}
            >
              {visiblePages.map((page, idx) =>
                page === "..." ? (
                  <li key={`ellipsis-${idx}`} aria-hidden="true">
                    <span
                      className={classnames(
                        styles.ellipsis,
                        className?.ellipsis
                      )}
                      style={style?.ellipsis}
                    >
                      &hellip;
                    </span>
                  </li>
                ) : (
                  <li key={`page-${page}-${idx}`}>
                    <Button
                      buttonType="justText"
                      label={String(page)}
                      onClick={() => goToPage(page as number)}
                      disabled={disabled}
                      aria-label={`Go to page ${page}`}
                      aria-current={initialPage === page ? "page" : undefined}
                      className={{
                        root: classnames(
                          styles.pageButton,
                          initialPage === page
                            ? classnames(
                                styles.pageButtonActive,
                                className?.pageButtonActive
                              )
                            : classnames(
                                styles.pageButtonInactive,
                                className?.pageButtonInactive
                              ),
                          className?.pageButton
                        ),
                      }}
                    />
                  </li>
                )
              )}
            </ul>
          )}
          <Button
            label="Next page"
            buttonType="justIcon"
            iconType={{ default: "arrow" }}
            onClick={() => goToPage(initialPage + 1)}
            disabled={disabled || initialPage === totalPages}
            variant="secondary"
            aria-label="Go to next page"
            className={{
              root: classnames(styles.pageButton, className?.pageButton),
            }}
          />
        </nav>
        {showPageSizeSelector && (
          <select
            onChange={(e) => onPageChange(Number(e.target.value), true)}
            name="pageSize"
            value={pageSize.toString()}
            aria-label="Rows per page"
            className={classnames(
              styles.pageSizeSelector,
              className?.pageSizeSelector
            )}
          >
            {pageSizePlaceholder && (
              <option value="" disabled>
                {pageSizePlaceholder}
              </option>
            )}
            {pageSizeSelectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };

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
            {dataToDisplay.map((record, index) => {
              const isSelected = selectedRowKeys.includes(record["key"]);
              const isClickable = !!onRowClick && !disabled;

              return (
                <TableRow
                  key={record["key"] ?? index}
                  isClickable={isClickable}
                  onClick={() => handleRowClick(record)}
                  aria-selected={rowSelection ? isSelected : undefined}
                  aria-rowindex={indexOfFirstItem + index + 2}
                  className={classnames(
                    styles.bodyRow,
                    isClickable && styles.clickable,
                    className?.bodyRow
                  )}
                >
                  {finalColumns.map((column: any) => (
                    <TableCell
                      key={`${record["key"]}-${column.key}`}
                      className={classnames(
                        styles.bodyCell,
                        className?.bodyCell
                      )}
                      style={{ width: column.width, ...style?.bodyCell }}
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
              );
            })}
          </TableBody>
        </MainTable>
      </div>
      {renderPagination()}
      {totalCount != null && (
        <div
          className={classnames(styles.recordInfo, className?.recordInfo)}
          style={style?.recordInfo}
          aria-live="polite"
          aria-atomic="true"
        >
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
