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
  emptyState?: string;
  emptyIcon?: string;
  emptyTitle?: string;
  emptyDescription?: string;
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
  emptyState?: React.CSSProperties;
  emptyIcon?: React.CSSProperties;
  emptyTitle?: React.CSSProperties;
  emptyDescription?: React.CSSProperties;
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

export interface SelectionColumn {
  title: React.ReactNode | null;
  key: string;
  dataIndex: string;
  render: (_: any, record: Record<string, any>) => React.ReactNode;
}

export type FinalColumn = SelectionColumn | TableColumn;

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
    page: number,
    pageSize: number,
    isPageSize?: boolean
  ) => void;
  "aria-label"?: string;
  "aria-describedby"?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  renderPageInfo?: (currentPage: number, totalPages: number) => React.ReactNode;
  renderTotalInfo?: (
    from: number,
    to: number,
    total: number
  ) => React.ReactNode;
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
  colSpan?: number;
  rowSpan?: number;
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
  initialPage: number;
  selectedRowKeys: string[];
  filteredData: Record<string, any>[];
  setInitialPage: React.Dispatch<React.SetStateAction<number>>;
  handleSelectAll: (checked: boolean) => void;
  handleRowSelect: (record: Record<string, any>) => void;
}

export interface TableEmptyProps {
  title?: string;
  description?: string;
  className?: {
    root?: string;
    content?: string;
    title?: string;
    description?: string;
    icon?: string;
  };
  style?: {
    root?: React.CSSProperties;
    content?: React.CSSProperties;
    title?: React.CSSProperties;
    description?: React.CSSProperties;
    icon?: React.CSSProperties;
  };
}

export interface PaginationNumberProps {
  className?: TableClassNames;
  page: number | string;
  idx: number;
  initialPage: number;
  goToPage: (page: number) => void;
  disabled?: boolean;
}

export interface TableRecordProps {
  record: Record<string, any>;
  index: number;
  selectedRowKeys: string[];
  onRowClick?: (record: Record<string, any>) => void;
  disabled?: boolean;
  rowSelection?: RowSelection;
  finalColumns: (FinalColumn | null)[];
  cnBodyRow?: string;
  cnBodyCell?: string;
  style?: React.CSSProperties;
  handleRowClick: (record: Record<string, any>) => void;
  indexOfFirstItem: number;
}

export interface RecordCellProps {
  record: Record<string, any>;
  column: TableColumn;
  cnBodyCell?: string;
  style?: React.CSSProperties;
}

export interface TablePaginationComponentProps {
  paginationId: string;
  totalPages: number;
  initialPage: number;
  maxPages: number;
  isMobile: boolean;
  mobileMinimize: boolean;
  disabled?: boolean;
  showPageNumbers: boolean;
  showPageSizeSelector?: boolean;
  pageSize: number;
  pageSizeOptions: number[];
  pageSizePlaceholder?: string;
  goToPage: (page: number) => void;
  onPageChange: (page: number, isPageSize?: boolean) => void;
  renderPageInfo?: (currentPage: number, totalPages: number) => React.ReactNode;
  className?: TableClassNames;
  style?: TableStyles;
}
