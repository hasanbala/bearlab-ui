import type { TableBodyProps } from "../types/table.types";

export const TableBody = (props: TableBodyProps) => {
  const { children, className } = props;

  return (
    <tbody
      className={className}
      aria-live="polite"
      aria-relevant="additions removals"
    >
      {children}
    </tbody>
  );
};
