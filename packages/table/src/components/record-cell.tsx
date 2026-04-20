import React from "react";
import type { RecordCellProps } from "../types/table.types";
import { TableCell } from "./table-cell";
import { getNestedValue } from "../utils/get-nested-value";
import classnames from "classnames";
import styles from "../styles/table.module.scss";

export const RecordCell = React.memo((props: RecordCellProps) => {
  const { record, column, cnBodyCell, style } = props;

  return (
    <TableCell
      key={`${record["key"]}-${column.key}`}
      className={classnames(styles.bodyCell, cnBodyCell)}
      style={{ width: column.width, ...style }}
    >
      {column.render
        ? column.render(getNestedValue(record, column.dataIndex), record)
        : getNestedValue(record, column.dataIndex)}
    </TableCell>
  );
});

RecordCell.displayName = "RecordCell";
