import React from "react";
import type { TableRecordProps, FinalColumn } from "../types/table.types";
import { TableRow } from "./table-row";
import classnames from "classnames";
import styles from "../styles/table.module.scss";
import { RecordCell } from "./record-cell";

export const TableRecord = React.memo((props: TableRecordProps) => {
  const {
    record,
    index,
    selectedRowKeys,
    onRowClick,
    disabled,
    rowSelection,
    finalColumns,
    cnBodyRow,
    cnBodyCell,
    style,
    handleRowClick,
    indexOfFirstItem,
  } = props;

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
        cnBodyRow
      )}
    >
      {finalColumns.map((column: FinalColumn | null) =>
        column ? (
          <RecordCell
            key={`${record["key"]}-${column.key}`}
            record={record}
            column={column as any}
            cnBodyCell={cnBodyCell}
            style={style}
          />
        ) : null
      )}
    </TableRow>
  );
});

TableRecord.displayName = "TableRecord";
