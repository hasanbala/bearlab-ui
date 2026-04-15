import type { TableHeaderProps } from "../types/table.types";

export const TableHeader = (props: TableHeaderProps) => {
  const { children, className } = props;

  return <thead className={className}>{children}</thead>;
};
