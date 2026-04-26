export type FinalColumn = SelectionColumn | TableColumn;
export type SortDirection = "asc" | "desc" | "none";

export interface TableClassNames {
  root?: string;
  header?: string;
  title?: string;
  bodyRow?: string;
  bodyCell?: string;
  pageInfo?: string;
  pageList?: string;
  ellipsis?: string;
  emptyIcon?: string;
  tableBody?: string;
  emptyTitle?: string;
  headerCell?: string;
  recordInfo?: string;
  emptyState?: string;
  pageButton?: string;
  tableHeader?: string;
  tableWrapper?: string;
  tableContainer?: string;
  pageButtonActive?: string;
  pageSizeSelector?: string;
  emptyDescription?: string;
  paginationWrapper?: string;
  paginationControls?: string;
  pageButtonInactive?: string;
}

export interface TableStyles {
  root?: React.CSSProperties;
  title?: React.CSSProperties;
  header?: React.CSSProperties;
  bodyRow?: React.CSSProperties;
  bodyCell?: React.CSSProperties;
  pageInfo?: React.CSSProperties;
  pageList?: React.CSSProperties;
  ellipsis?: React.CSSProperties;
  emptyIcon?: React.CSSProperties;
  tableBody?: React.CSSProperties;
  headerCell?: React.CSSProperties;
  recordInfo?: React.CSSProperties;
  emptyState?: React.CSSProperties;
  emptyTitle?: React.CSSProperties;
  pageButton?: React.CSSProperties;
  tableHeader?: React.CSSProperties;
  tableWrapper?: React.CSSProperties;
  tableContainer?: React.CSSProperties;
  emptyDescription?: React.CSSProperties;
  pageButtonActive?: React.CSSProperties;
  pageSizeSelector?: React.CSSProperties;
  paginationWrapper?: React.CSSProperties;
  paginationControls?: React.CSSProperties;
  pageButtonInactive?: React.CSSProperties;
}

export interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: string | number;
  sortDirection?: SortDirection;
  sorter?: (a: any, b: any) => number;
  render?: (value: any, record: Record<string, any>) => React.ReactNode;
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

export interface SelectionColumn {
  key: string;
  dataIndex: string;
  title: React.ReactNode | null;
  render: (_: any, record: Record<string, any>) => React.ReactNode;
}

export interface TableProps {
  title?: string;
  disabled?: boolean;
  totalCount?: number;
  style?: TableStyles;
  emptyTitle?: string;
  currentPage?: number;
  "aria-label"?: string;
  columns: TableColumn[];
  maxVisiblePages?: number;
  emptyDescription?: string;
  pageSizeOptions?: number[];
  serverPagination?: boolean;
  rowSelection?: RowSelection;
  className?: TableClassNames;
  "aria-describedby"?: string;
  pageSizePlaceholder?: string;
  showPageSizeSelector?: boolean;
  dataSource: Record<string, any>[];
  pagination?: boolean | TablePagination;
  renderTotalInfo?: (
    from: number,
    to: number,
    total: number
  ) => React.ReactNode;
  onTableChange?: (
    page: number,
    pageSize: number,
    isPageSize?: boolean
  ) => void;
  onRowClick?: (record: Record<string, any>) => void;
  renderPageInfo?: (currentPage: number, totalPages: number) => React.ReactNode;
}

export interface MainTableProps {
  className?: string;
  "aria-label"?: string;
  "aria-rowcount"?: number;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}

export interface TableBodyProps {
  className?: string;
  children: React.ReactNode;
}

export interface TableCellProps {
  colSpan?: number;
  rowSpan?: number;
  isHeader?: boolean;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  scope?: "col" | "row" | "colgroup" | "rowgroup";
  "aria-sort"?: "ascending" | "descending" | "none" | "other";
}

export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface TableRowProps {
  className?: string;
  isClickable?: boolean;
  "aria-rowindex"?: number;
  children: React.ReactNode;
  "aria-selected"?: boolean;
  onClick?: (_val?: any) => void;
}

export interface UseTable {
  currentPage?: number;
  serverPagination?: boolean;
  rowSelection?: RowSelection;
  dataSource: Record<string, any>[];
}

export interface UseTableReturn {
  selectAll: boolean;
  initialPage: number;
  selectedRowKeys: string[];
  filteredData: Record<string, any>[];
  handleSelectAll: (checked: boolean) => void;
  setInitialPage: React.Dispatch<React.SetStateAction<number>>;
  handleRowSelect: (record: Record<string, any>) => void;
}

export interface TableEmptyProps {
  title?: string;
  description?: string;
  className?: {
    root?: string;
    icon?: string;
    title?: string;
    content?: string;
    description?: string;
  };
  style?: {
    root?: React.CSSProperties;
    icon?: React.CSSProperties;
    title?: React.CSSProperties;
    content?: React.CSSProperties;
    description?: React.CSSProperties;
  };
}

export interface PaginationNumberProps {
  idx: number;
  disabled?: boolean;
  initialPage: number;
  page: number | string;
  className?: TableClassNames;
  goToPage: (page: number) => void;
}

export interface TableRecordProps {
  index: number;
  disabled?: boolean;
  cnBodyRow?: string;
  cnBodyCell?: string;
  indexOfFirstItem: number;
  selectedRowKeys: string[];
  record: Record<string, any>;
  rowSelection?: RowSelection;
  style?: React.CSSProperties;
  finalColumns: (FinalColumn | null)[];
  onRowClick?: (record: Record<string, any>) => void;
  handleRowClick: (record: Record<string, any>) => void;
}

export interface RecordCellProps {
  column: TableColumn;
  cnBodyCell?: string;
  record: Record<string, any>;
  style?: React.CSSProperties;
}

export interface TablePaginationComponentProps {
  maxPages: number;
  pageSize: number;
  isMobile: boolean;
  disabled?: boolean;
  totalPages: number;
  initialPage: number;
  style?: TableStyles;
  paginationId: string;
  mobileMinimize: boolean;
  showPageNumbers: boolean;
  pageSizeOptions: number[];
  className?: TableClassNames;
  pageSizePlaceholder?: string;
  showPageSizeSelector?: boolean;
  goToPage: (page: number) => void;
  onPageChange: (page: number, isPageSize?: boolean) => void;
  renderPageInfo?: (currentPage: number, totalPages: number) => React.ReactNode;
}
