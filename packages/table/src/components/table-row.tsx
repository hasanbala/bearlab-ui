import React from "react";
import type { TableRowProps } from "../types/table.types";
import type { KeyboardEvent } from "react";

export const TableRow = React.memo((props: TableRowProps) => {
  const {
    children,
    className,
    onClick,
    isClickable,
    "aria-selected": ariaSelected,
    "aria-rowindex": ariaRowIndex,
  } = props;

  const handleKeyDown = (e: KeyboardEvent<HTMLTableRowElement>) => {
    if (isClickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <tr
      className={className}
      onClick={onClick}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-selected={ariaSelected}
      aria-rowindex={ariaRowIndex}
      role={isClickable ? "button" : undefined}
    >
      {children}
    </tr>
  );
});

TableRow.displayName = "TableRow";
