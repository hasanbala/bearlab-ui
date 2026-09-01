import classnames from "classnames";
import type {
  TableColumn,
  TableHeaderCellProps,
} from "../types/table.types";
import { TableCell } from "./table-cell";
import { ColumnFilter } from "./column-filter";
import { IconArrowUp, IconArrowDown } from "../assets/icons";
import styles from "../styles/table.module.scss";

export const TableHeaderCell = (props: TableHeaderCellProps) => {
  const {
    column,
    disabled,
    sortState,
    filterState,
    className,
    style,
    filterApplyLabel,
    filterResetLabel,
    filterLabel,
    toggleSort,
    setFilter,
    clearFilter,
  } = props;

  const tableColumn = column as TableColumn;
  const isSelectionColumn = column.key === "selection";

  const sortable = !isSelectionColumn && tableColumn.sortable === true;
  const filterable = !isSelectionColumn && tableColumn.filterable === true;

  const isSortedColumn = sortState?.columnKey === column.key;
  const direction = isSortedColumn ? sortState?.direction : undefined;

  const ariaSort: "ascending" | "descending" | "none" | undefined = sortable
    ? direction === "asc"
      ? "ascending"
      : direction === "desc"
        ? "descending"
        : "none"
    : undefined;

  const sortLabel =
    direction === "asc"
      ? "ascending, activate to sort descending"
      : direction === "desc"
        ? "descending, activate to clear sort"
        : "not sorted, activate to sort ascending";

  return (
    <TableCell
      isHeader
      scope="col"
      aria-sort={ariaSort}
      className={classnames(styles.headerCell, className?.headerCell)}
      style={{ width: tableColumn.width, ...style?.headerCell }}
    >
      <span
        className={classnames(
          styles.headerCellInner,
          className?.headerCellInner
        )}
        style={style?.headerCellInner}
      >
        {sortable ? (
          <button
            type="button"
            disabled={disabled}
            onClick={() => toggleSort(tableColumn)}
            aria-label={`${tableColumn.title}: ${sortLabel}`}
            className={classnames(styles.sortButton, className?.sortButton)}
            style={style?.sortButton}
          >
            <span className={styles.headerCellTitle}>{column.title}</span>
            <span className={styles.sortIndicator} aria-hidden="true">
              <IconArrowUp
                focusable="false"
                className={classnames(
                  styles.sortIcon,
                  direction === "asc" && styles.sortIconActive,
                  className?.sortIcon
                )}
                style={style?.sortIcon}
              />
              <IconArrowDown
                focusable="false"
                className={classnames(
                  styles.sortIcon,
                  direction === "desc" && styles.sortIconActive,
                  className?.sortIcon
                )}
                style={style?.sortIcon}
              />
            </span>
          </button>
        ) : (
          <span className={styles.headerCellTitle}>{column.title}</span>
        )}

        {filterable && (
          <ColumnFilter
            columnKey={column.key}
            label={filterLabel(tableColumn.title)}
            disabled={disabled}
            placeholder={tableColumn.filterPlaceholder}
            value={filterState[column.key] ?? ""}
            applyLabel={filterApplyLabel}
            resetLabel={filterResetLabel}
            className={className}
            style={style}
            onApply={(value) => setFilter(column.key, value)}
            onReset={() => clearFilter(column.key)}
          />
        )}
      </span>
    </TableCell>
  );
};
