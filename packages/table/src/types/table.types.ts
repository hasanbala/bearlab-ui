export interface TableClassNames {
  root?: string;
  header?: string;
  title?: string;
  tableWrapper?: string;
  tableContainer?: string;
  tableHeader?: string;
  headerCell?: string;
  tableBody?: string;
  bodyRow?: string;
  bodyCell?: string;
  paginationWrapper?: string;
  paginationControls?: string;
  pageButton?: string;
  pageButtonActive?: string;
  pageButtonInactive?: string;
  pageInfo?: string;
  pageList?: string;
  ellipsis?: string;
  pageSizeSelector?: string;
  recordInfo?: string;
}

export interface TableStyles {
  root?: React.CSSProperties;
  header?: React.CSSProperties;
  title?: React.CSSProperties;
  tableWrapper?: React.CSSProperties;
  tableContainer?: React.CSSProperties;
  tableHeader?: React.CSSProperties;
  headerCell?: React.CSSProperties;
  tableBody?: React.CSSProperties;
  bodyRow?: React.CSSProperties;
  bodyCell?: React.CSSProperties;
  paginationWrapper?: React.CSSProperties;
  paginationControls?: React.CSSProperties;
  pageButton?: React.CSSProperties;
  pageButtonActive?: React.CSSProperties;
  pageButtonInactive?: React.CSSProperties;
  pageInfo?: React.CSSProperties;
  pageList?: React.CSSProperties;
  ellipsis?: React.CSSProperties;
  pageSizeSelector?: React.CSSProperties;
  recordInfo?: React.CSSProperties;
}

export type SortDirection = "asc" | "desc" | "none";

export interface TableColumn {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any, record: Record<string, any>) => React.ReactNode;
  sorter?: (a: any, b: any) => number;
  sortDirection?: SortDirection;
  width?: string | number;
}

export interface RowSelection {
  type: "checkbox" | "radio";
  onChange?: (
    selectedRowKeys: string[],
    selectedRows: Record<string, any>[]
  ) => void;
}

export interface TablePagination {
  pageSize?: number;
  showPageNumbers?: boolean;
}

export interface TableProps {
  title?: string;
  dataSource: Record<string, any>[];
  columns: TableColumn[];
  className?: TableClassNames;
  style?: TableStyles;
  rowSelection?: RowSelection;
  pagination?: boolean | TablePagination;
  onRowClick?: (record: Record<string, any>) => void;
  disabled?: boolean;
  serverPagination?: boolean;
  totalCount?: number;
  currentPage?: number;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  pageSizePlaceholder?: string;
  maxVisiblePages?: number;
  onTableChange?: (
    setInitialPage: React.Dispatch<React.SetStateAction<number>>,
    page: number,
    pageSize: number,
    isPageSize?: boolean
  ) => void;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

export interface MainTableProps {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-rowcount"?: number;
}

export interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface TableCellProps {
  children: React.ReactNode;
  isHeader?: boolean;
  scope?: "col" | "row" | "colgroup" | "rowgroup";
  className?: string;
  style?: React.CSSProperties;
  "aria-sort"?: "ascending" | "descending" | "none" | "other";
}

export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (_val?: any) => void;
  isClickable?: boolean;
  "aria-selected"?: boolean;
  "aria-rowindex"?: number;
}

export interface UseTable {
  dataSource: Record<string, any>[];
  serverPagination?: boolean;
  rowSelection?: RowSelection;
  currentPage?: number;
}

export interface UseTableReturn {
  selectAll: boolean;
  searchValue: string;
  initialPage: number;
  selectedRowKeys: string[];
  filteredData: Record<string, any>[];
  setInitialPage: React.Dispatch<React.SetStateAction<number>>;
  handleSelectAll: (checked: boolean) => void;
  handleRowSelect: (record: Record<string, any>) => void;
}
