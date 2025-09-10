import { ReactNode } from "react";
import classnames from "classnames";
import styles from "./mainTable.module.scss";

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (_val?: any) => void;
}

interface TableCellProps {
  children: ReactNode;
  isHeader?: boolean;
  className?: string;
}

const MainTable = ({ children, className }: TableProps) => (
  <table className={classnames(styles.container, className)}>{children}</table>
);

const TableHeader = ({ children, className }: TableHeaderProps) => (
  <thead className={className}>{children}</thead>
);

const TableBody = ({ children, className }: TableBodyProps) => (
  <tbody className={className}>{children}</tbody>
);

const TableRow = ({ children, className, onClick }: TableRowProps) => (
  <tr className={className} onClick={onClick}>
    {children}
  </tr>
);

const TableCell = ({
  children,
  isHeader = false,
  className,
}: TableCellProps) => {
  const CellTag = isHeader ? "th" : "td";
  return <CellTag className={` ${className}`}>{children}</CellTag>;
};

export { MainTable, TableHeader, TableBody, TableRow, TableCell };
