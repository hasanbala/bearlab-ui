import React from "react";
import type { TableCellProps } from "../types/table.types";

export const TableCell = React.memo((props: TableCellProps) => {
  const {
    children,
    isHeader = false,
    scope,
    className,
    style,
    "aria-sort": ariaSort,
    colSpan,
    rowSpan,
  } = props;

  if (isHeader) {
    return (
      <th
        scope={scope ?? "col"}
        className={className}
        style={style}
        aria-sort={ariaSort}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {children}
      </th>
    );
  }

  return (
    <td
      className={className}
      style={style}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  );
});

TableCell.displayName = "TableCell";
