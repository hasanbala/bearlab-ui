import type { TableCellProps } from "../types/table.types";

export const TableCell = (props: TableCellProps) => {
  const {
    children,
    isHeader = false,
    scope,
    className,
    style,
    "aria-sort": ariaSort,
  } = props;

  if (isHeader) {
    return (
      <th
        scope={scope ?? "col"}
        className={className}
        style={style}
        aria-sort={ariaSort}
      >
        {children}
      </th>
    );
  }

  return (
    <td className={className} style={style}>
      {children}
    </td>
  );
};
