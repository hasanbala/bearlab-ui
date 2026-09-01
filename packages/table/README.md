# @bearlab/table

> Accessible, fully customizable Table component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/table)](https://www.npmjs.com/package/@bearlab/table)
[![license](https://img.shields.io/npm/l/@bearlab/table)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Column Configuration](#column-configuration)
- [Row Selection](#row-selection)
- [Pagination](#pagination)
- [Loading State](#loading-state)
- [Sorting & Filtering (server-side)](#sorting--filtering-server-side)
- [Slot-based Customization](#slot-based-customization)
- [Internationalization (i18n)](#internationalization-i18n)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)

---

## Features

- ✅ **Client-side & server-side pagination** — configurable page size, page-size selector, and `maxVisiblePages`
- ✅ **Row selection** — `checkbox` (multi) and `radio` (single) modes with a "Select all" header checkbox
- ✅ **Server-side column sorting** — mark columns `sortable`; clicking the header cycles `asc → desc → none` and fires `onSortChange` so you can send it to your API
- ✅ **Server-side column filtering** — mark columns `filterable` to get a per-column search popover that fires `onFilterChange` for live DB filtering
- ✅ **Custom cell renderer** — `render(value, record)` per column for rich cell content
- ✅ **Loading state** — `isLoading` renders a skeleton on the first load and a spinner over the still-visible rows on every refresh
- ✅ **Empty state** — built-in empty UI with customizable title, description, and icon
- ✅ **Record info bar** — "Showing X to Y of Z entries" with a `renderTotalInfo` override
- ✅ **Responsive** — pagination controls adapt at `≤768px` (mobile) and `≤540px` (minimized)
- ✅ **Slot-based `className` & `style` API** — granular styling of every table element
- ✅ **Dark mode ready** — responds to `[data-theme="dark"]` automatically
- ✅ **Accessible by default** — `role="region"`, `aria-sort`, `aria-rowcount`, `aria-selected`
- ✅ **Internationalization** — `renderPageInfo` and `renderTotalInfo` render props for all labels
- ✅ **TypeScript-first** — fully typed columns, records, and configuration options

---

## Installation

```bash
# npm
npm install @bearlab/table

# yarn
yarn add @bearlab/table

# pnpm
pnpm add @bearlab/table
```

> **Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0` must be installed in your project.

> **Framework support:** Works with React 18/19 and Next.js — both the App Router
> and the Pages Router. Every component ships with the `"use client"` directive
> already applied, so you can import it straight into a Server Component without
> writing a wrapper file. All DOM access is SSR-guarded.
>
> `@bearlab/button`, `@bearlab/checkbox`, `@bearlab/radio`, `@bearlab/loading` and `@bearlab/skeleton` are regular dependencies and are installed for you.

---

## Usage

### Basic Table

```tsx
import { Table } from "@bearlab/table";
import type { TableColumn } from "@bearlab/table";

const columns: TableColumn[] = [
  { key: "name", title: "Name", dataIndex: "name" },
  { key: "age", title: "Age", dataIndex: "age" },
];

const data = [
  { key: "1", name: "John Doe", age: 32 },
  { key: "2", name: "Jane Smith", age: 28 },
];

export default function App() {
  return <Table columns={columns} dataSource={data} />;
}
```

### With Pagination & Row Selection

```tsx
<Table
  title="Users"
  columns={columns}
  dataSource={data}
  pagination={{ pageSize: 10, showPageNumbers: true }}
  showPageSizeSelector
  pageSizeOptions={[10, 20, 50]}
  rowSelection={{
    type: "checkbox",
    onChange: (keys, rows) => console.log(keys, rows),
  }}
  onRowClick={(record) => console.log(record)}
/>
```

### Server-side Pagination

```tsx
<Table
  columns={columns}
  dataSource={pageData}
  serverPagination
  totalCount={500}
  currentPage={page}
  pagination={{ pageSize: 20 }}
  onTableChange={(page, pageSize, isPageSize) => fetchPage(page, pageSize)}
/>
```

---

## Props

| Prop                   | Type                                                   | Default                                            | Required | Description                                                      |
| ---------------------- | ------------------------------------------------------ | -------------------------------------------------- | -------- | ---------------------------------------------------------------- |
| `dataSource`           | `Record<string, any>[]`                                | —                                                  | ✅       | Array of record objects; each must include a `key` field         |
| `columns`              | [`TableColumn[]`](#column-configuration)               | —                                                  | ✅       | Column definitions                                               |
| `title`                | `string`                                               | —                                                  | ❌       | Table title; renders an `<h3>` and sets `aria-labelledby`        |
| `aria-label`           | `string`                                               | —                                                  | ❌       | Accessible label when `title` is not provided                    |
| `aria-describedby`     | `string`                                               | —                                                  | ❌       | Links the table region to an external description element        |
| `disabled`             | `boolean`                                              | `false`                                            | ❌       | Disables row clicks, selection, and pagination                   |
| `isLoading`            | `boolean`                                              | `false`                                            | ❌       | Shows the [loading state](#loading-state) and locks interactions |
| `loadingType`          | [`LoadingType`](#loading-state)                        | `"loader-circle"`                                  | ❌       | Which built-in spinner to show while `isLoading`                 |
| `loadingIcon`          | `React.ElementType`                                    | —                                                  | ❌       | Custom spinner component; takes precedence over `loadingType`    |
| `rowSelection`         | [`RowSelection`](#row-selection)                       | —                                                  | ❌       | Row selection configuration (checkbox or radio)                  |
| `pagination`           | `boolean \| TablePagination`                           | `false`                                            | ❌       | Enables client-side pagination; pass an object to configure      |
| `serverPagination`     | `boolean`                                              | `false`                                            | ❌       | Delegates pagination to the server (`totalCount` is required)    |
| `totalCount`           | `number`                                               | —                                                  | ❌       | Total record count for server pagination and the record info bar |
| `currentPage`          | `number`                                               | `1`                                                | ❌       | Controlled current page (used with `serverPagination`)           |
| `pageSizeOptions`      | `number[]`                                             | `[10, 20, 50, 100]`                                | ❌       | Options rendered in the page-size selector                       |
| `showPageSizeSelector` | `boolean`                                              | `false`                                            | ❌       | Renders the page-size `<select>` inside the pagination bar       |
| `pageSizePlaceholder`  | `string`                                               | `"Select page size"`                               | ❌       | Placeholder label for the page-size selector                     |
| `maxVisiblePages`      | `number`                                               | `6`                                                | ❌       | Maximum page buttons shown before truncating with ellipsis       |
| `onTableChange`        | `(page, pageSize, isPageSize?) => void`                | —                                                  | ❌       | Fires when the active page or page size changes                  |
| `onRowClick`           | `(record) => void`                                     | —                                                  | ❌       | Fires when a non-disabled row is clicked                         |
| `renderPageInfo`       | `(currentPage, totalPages) => ReactNode`               | —                                                  | ❌       | Overrides the "Page X of Y" label in the pagination bar          |
| `renderTotalInfo`      | `(from, to, total) => ReactNode`                       | —                                                  | ❌       | Overrides the "Showing X to Y of Z entries" record info bar      |
| `emptyTitle`           | `string`                                               | `"No records found"`                               | ❌       | Title shown when `dataSource` is empty                           |
| `emptyDescription`     | `string`                                               | `"There are no records to display at the moment."` | ❌       | Description shown below the empty title                          |
| `sortState`            | [`SortState \| null`](#sorting--filtering-server-side) | —                                                  | ❌       | Controlled active sort. Pass `null` for no active sort           |
| `defaultSortState`     | [`SortState \| null`](#sorting--filtering-server-side) | `null`                                             | ❌       | Uncontrolled initial sort                                        |
| `onSortChange`         | `(sort: SortState \| null) => void`                    | —                                                  | ❌       | Fires whenever the active sort changes (send to your API)        |
| `filterState`          | [`FilterState`](#sorting--filtering-server-side)       | —                                                  | ❌       | Controlled active filters (`columnKey → search text`)            |
| `defaultFilterState`   | [`FilterState`](#sorting--filtering-server-side)       | `{}`                                               | ❌       | Uncontrolled initial filters                                     |
| `onFilterChange`       | `(filters: FilterState) => void`                       | —                                                  | ❌       | Fires whenever any column filter changes (send to your API)      |
| `filterApplyLabel`     | `string`                                               | `"Apply"`                                          | ❌       | Label for the filter popover apply button                        |
| `filterResetLabel`     | `string`                                               | `"Reset"`                                          | ❌       | Label for the filter popover reset button                        |
| `filterLabel`          | `(columnTitle: string) => string`                      | ``(c) => `Filter by ${c}` ``                       | ❌       | Accessible name of a column's filter trigger, popover and input  |
| `className`            | [`TableClassNames`](#slot-based-customization)         | —                                                  | ❌       | Per-slot className overrides                                     |
| `style`                | [`TableStyles`](#slot-based-customization)             | —                                                  | ❌       | Per-slot inline style overrides                                  |

---

## Column Configuration

Each entry in `columns` must conform to `TableColumn`:

| Field               | Type                                                     | Required | Description                                           |
| ------------------- | -------------------------------------------------------- | -------- | ----------------------------------------------------- |
| `key`               | `string`                                                 | ✅       | Unique column identifier                              |
| `title`             | `string`                                                 | ✅       | Column header label                                   |
| `dataIndex`         | `string`                                                 | ✅       | Key in the record object to read the cell value from  |
| `width`             | `string \| number`                                       | ❌       | Fixed column width (e.g. `"120px"` or `120`)          |
| `sortable`          | `boolean`                                                | ❌       | Makes the header a sort toggle (server-side)          |
| `filterable`        | `boolean`                                                | ❌       | Adds a per-column search filter popover (server-side) |
| `filterPlaceholder` | `string`                                                 | ❌       | Placeholder for this column's filter input            |
| `render`            | `(value: any, record: Record<string, any>) => ReactNode` | ❌       | Custom cell renderer                                  |

> **Removed in this release:** the legacy `sortDirection` and `sorter` column
> fields. `sorter` never actually reordered the rows and `sortDirection` only
> painted a static `aria-sort` — use `sortable` with `onSortChange` instead.

---

## Row Selection

Pass a `rowSelection` object to enable row selection:

```ts
interface RowSelection {
  type: "checkbox" | "radio";
  onChange?: (
    selectedRowKeys: string[],
    selectedRows: Record<string, any>[]
  ) => void;
}
```

- **`"checkbox"`** — renders a "Select all" checkbox in the header and individual checkboxes per row.
- **`"radio"`** — renders a radio button per row; only one row can be selected at a time.

> Each record object must include a `key` field (string) for selection tracking.

---

## Pagination

Pass `pagination={true}` to enable client-side pagination with defaults, or pass a `TablePagination` object for control:

```ts
interface TablePagination {
  pageSize?: number; // Default: first entry of `pageSizeOptions` (10)
  showPageNumbers?: boolean; // Default: true
}
```

Use `serverPagination` together with `totalCount`, `currentPage`, and `onTableChange` for server-driven pagination:

```tsx
<Table
  serverPagination
  totalCount={1000}
  currentPage={currentPage}
  pagination={{ pageSize: 20 }}
  onTableChange={(page, pageSize) => fetchData(page, pageSize)}
  ...
/>
```

> **No redundant requests:** clicking the page you are already on (or a prev/next
> that would land on it) is a no-op — `onTableChange` only fires when the active
> page actually changes, so a server-driven table never re-fetches the same page.

---

## Loading State

Pass `isLoading` while your data is in flight. The Table picks the right treatment
on its own, the way antd and MUI DataGrid do:

- **First load** — there are no rows to keep on screen, so the body renders a
  **skeleton**. The empty state stays hidden, so `"No records found"` never flashes
  before the first response arrives.
- **Refresh** — rows are already on screen (page change, sort, filter), so they
  stay in place under a dimmed **overlay with a spinner**. The table keeps its
  height and never jumps.

While `isLoading` is `true` the table also behaves as if it were `disabled`:
sorting, filtering, row selection, row clicks and pagination are all locked, so a
double click cannot fire a second request.

```tsx
<Table
  columns={columns}
  dataSource={rows}
  serverPagination
  totalCount={total}
  currentPage={page}
  pagination={{ pageSize: 20 }}
  isLoading={isFetching}
  onTableChange={(page) => setPage(page)}
/>
```

### Choosing the spinner

`loadingType` selects one of the built-in spinners from
[`@bearlab/loading`](https://www.npmjs.com/package/@bearlab/loading), and
`loadingIcon` swaps in a component of your own. Both are optional and independent
— omit them and the default spinner is used.

```ts
type LoadingType =
  | "circle-dashed"
  | "circle-ellipse"
  | "disc"
  | "loader"
  | "loader-badging"
  | "loader-circle" // default
  | "loader-pinwheel"
  | "shell"
  | "square-dashed";
```

```tsx
// built-in spinner
<Table isLoading={isFetching} loadingType="loader-pinwheel" ... />

// your own icon component (wins over loadingType)
import { Earth } from "lucide-react";
<Table isLoading={isFetching} loadingIcon={Earth} ... />
```

The overlay and the skeleton are themed through
[design tokens](#design-tokens-customization) — see
`--bearlab-table-loading-*`.

---

## Sorting & Filtering (server-side)

Sorting and filtering are **server-side by design**. The `Table` never reorders or
filters the rows you pass in — it only tracks the active sort/filter state and
calls `onSortChange` / `onFilterChange` so you can forward them as parameters to
your backend and re-fetch the data live from your database. This mirrors the
behaviour of antd, MUI, and Radix-based tables.

### Enabling per column

Mark columns as `sortable` and/or `filterable`:

```tsx
const columns: TableColumn[] = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    sortable: true,
    filterable: true,
  },
  { key: "email", title: "Email", dataIndex: "email", filterable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];
```

- **Sorting** — clicking a sortable header cycles `asc → desc → none`. Only one
  column is sorted at a time; sorting a new column resets the previous one.
- **Filtering** — a filter icon opens a small popover with a search input plus
  **Apply** / **Reset** buttons. `onFilterChange` fires on apply/reset.

### Uncontrolled (simplest)

The table manages its own sort/filter UI state; you just react to the callbacks:

```tsx
<Table
  columns={columns}
  dataSource={rows}
  serverPagination
  totalCount={total}
  currentPage={page}
  pagination={{ pageSize: 20 }}
  onSortChange={(sort) => {
    setPage(1); // reset to first page on sort change
    fetchData({
      page: 1,
      sortBy: sort?.dataIndex ?? null,
      sortDir: sort?.direction ?? null,
    });
  }}
  onFilterChange={(filters) => {
    setPage(1);
    fetchData({ page: 1, filters }); // e.g. { name: "jo", email: "@acme" }
  }}
/>
```

### Controlled

Pass `sortState` / `filterState` to fully own the state (e.g. to hydrate it from
the URL query string):

```tsx
const [sort, setSort] = useState<SortState | null>(null);
const [filters, setFilters] = useState<FilterState>({});

<Table
  columns={columns}
  dataSource={rows}
  sortState={sort}
  onSortChange={(next) => {
    setSort(next);
    fetchData({ sort: next, filters });
  }}
  filterState={filters}
  onFilterChange={(next) => {
    setFilters(next);
    fetchData({ sort, filters: next });
  }}
/>;
```

**Payload shapes:**

```ts
interface SortState {
  columnKey: string; // the column's `key`
  dataIndex: string; // the column's `dataIndex` (handy as the API field name)
  direction: "asc" | "desc";
}

// columnKey -> non-empty search text
type FilterState = Record<string, string>;
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to enable surgical styling of any element without CSS specificity battles.

### `TableClassNames`

| Slot                 | Targets                                        |
| -------------------- | ---------------------------------------------- |
| `root`               | Outermost container `<div role="region">`      |
| `header`             | Title wrapper `<div>`                          |
| `title`              | Title `<h3>`                                   |
| `tableWrapper`       | Horizontal-scroll wrapper `<div>`              |
| `tableContainer`     | Native `<table>` element                       |
| `tableHeader`        | Native `<thead>` element                       |
| `headerCell`         | Native `<th>` elements                         |
| `headerCellInner`    | Inner flex wrapper inside each `<th>`          |
| `sortButton`         | Sort toggle `<button>` in sortable headers     |
| `sortIcon`           | Sort direction arrow icons                     |
| `filterTrigger`      | Filter icon `<button>` in filterable headers   |
| `filterIcon`         | Filter `<svg>` icon                            |
| `filterPopover`      | Filter popover `<div role="dialog">`           |
| `filterInput`        | Filter search `<input>`                        |
| `filterActions`      | Filter popover action button row               |
| `tableBody`          | Native `<tbody>` element                       |
| `bodyRow`            | Native `<tr>` data rows                        |
| `bodyCell`           | Native `<td>` data cells                       |
| `emptyState`         | Empty state root `<div>`                       |
| `emptyIcon`          | Empty state icon wrapper                       |
| `emptyTitle`         | Empty state title element                      |
| `emptyDescription`   | Empty state description element                |
| `paginationWrapper`  | Pagination bar outer wrapper                   |
| `paginationControls` | Pagination `<nav>` wrapping page buttons       |
| `pageList`           | Pagination `<ul>` containing page number items |
| `pageButton`         | All page-change `<button>` elements            |
| `pageButtonActive`   | Active page `<button>`                         |
| `pageButtonInactive` | Inactive page `<button>` elements              |
| `pageInfo`           | "Page X of Y" label (mobile)                   |
| `ellipsis`           | Ellipsis `…` element between page groups       |
| `pageSizeSelector`   | Native `<select>` for page size                |
| `recordInfo`         | "Showing X to Y of Z entries" bar              |

```tsx
<Table
  columns={columns}
  dataSource={data}
  className={{
    root: "my-table",
    headerCell: "my-th",
    bodyRow: "my-tr",
    paginationWrapper: "my-paginator",
  }}
/>
```

### `TableStyles`

All slots accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Table
  columns={columns}
  dataSource={data}
  style={{
    headerCell: { backgroundColor: "#f4f4f4" },
    bodyCell: { fontSize: "0.875rem" },
  }}
/>
```

---

## Internationalization (i18n)

Override any hardcoded English label with render props:

```tsx
<Table
  dataSource={data}
  columns={columns}
  renderPageInfo={(current, total) => `${current}. / ${total} sayfa`}
  renderTotalInfo={(from, to, total) =>
    `${total} kayıttan ${from}–${to} gösteriliyor`
  }
  emptyTitle="Kayıt bulunamadı"
  emptyDescription="Gösterilecek veri yok."
/>
```

---

## Theme Management

The `Table` component automatically adapts when a `data-theme="dark"` attribute is present on any ancestor element.

```html
<html data-theme="dark">
  ...
</html>
```

---

## Design Tokens (Customization)

All visual defaults are scoped CSS custom properties on the component's root container. Override them with `--bearlab-table-*` variables.

```css
/* Light theme overrides */
:root,
[data-theme="light"] {
  --bearlab-table-bg: #ffffff;
  --bearlab-table-border-color: #e5e7eb;
  --bearlab-table-header-bg: #f9fafb;
  --bearlab-table-header-color: #374151;
  --bearlab-table-body-color: #111827;
  --bearlab-table-row-bg-hover: #f3f4f6;
  --bearlab-table-border-radius: 0.5rem;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-table-bg: #1f2937;
  --bearlab-table-border-color: #374151;
  --bearlab-table-header-bg: #111827;
  --bearlab-table-header-color: #d1d5db;
  --bearlab-table-body-color: #f9fafb;
  --bearlab-table-row-bg-hover: #374151;
}
```

**Key spacing & color tokens:**

| Token                                       | Default (light)            | Description                          |
| ------------------------------------------- | -------------------------- | ------------------------------------ |
| `--bearlab-table-border-radius`             | `0.5rem`                   | Outer container border radius        |
| `--bearlab-table-border-width`              | `0.0625rem`                | Border width for all dividers        |
| `--bearlab-table-font-size`                 | `0.875rem`                 | Base cell font size                  |
| `--bearlab-table-cell-padding-block`        | `0.75rem`                  | Cell vertical padding                |
| `--bearlab-table-cell-padding-inline`       | `1rem`                     | Cell horizontal padding              |
| `--bearlab-table-font-weight-header`        | `600`                      | Header cell font weight              |
| `--bearlab-table-page-button-bg-active`     | `#2563eb`                  | Active page button background        |
| `--bearlab-table-page-button-color-active`  | `#ffffff`                  | Active page button text color        |
| `--bearlab-table-page-button-border-radius` | `0.375rem`                 | Page button border radius            |
| `--bearlab-table-page-button-min-width`     | `2rem`                     | Minimum page button width            |
| `--bearlab-table-select-border-color`       | `#e4e7ec`                  | Page-size selector border            |
| `--bearlab-table-select-active-color`       | `#465fff`                  | Page-size selector focus/hover color |
| `--bearlab-table-empty-icon-fill`           | `#6b7280`                  | Empty state icon fill color          |
| `--bearlab-table-empty-title-color`         | `#1f2937`                  | Empty state title color              |
| `--bearlab-table-control-color`             | `#98a2b3`                  | Sort/filter control idle color       |
| `--bearlab-table-control-active-color`      | `#465fff`                  | Active sort arrow / active filter    |
| `--bearlab-table-control-bg-hover`          | `#f2f4f7`                  | Filter trigger hover background      |
| `--bearlab-table-filter-popover-bg`         | `#ffffff`                  | Filter popover background            |
| `--bearlab-table-filter-popover-width`      | `16rem`                    | Filter popover width                 |
| `--bearlab-table-filter-popover-z-index`    | `40`                       | Filter popover stacking context      |
| `--bearlab-table-loading-overlay-bg`        | `rgba(255, 255, 255, 0.6)` | Loading overlay scrim color          |
| `--bearlab-table-loading-overlay-z-index`   | `5`                        | Loading overlay stacking context     |
| `--bearlab-table-loading-icon-size`         | `2rem`                     | Loading spinner size                 |
| `--bearlab-table-loading-icon-color`        | `#465fff`                  | Loading spinner color                |

---

## Accessibility

The `Table` component adheres to **WCAG 2.1 AA** standards:

- **`role="region"` + `aria-labelledby` / `aria-label`** — wraps the table in a landmark region labelled by `title` or `aria-label`.
- **`aria-rowcount`** — the `<table>` exposes the total number of rows to assistive technologies.
- **`aria-sort`** — `sortable` header cells expose `"ascending"`, `"descending"`, or `"none"` based on the active `sortState`; non-sortable headers carry no `aria-sort` at all.
- **Keyboard sort & filter** — the sort toggle and filter trigger are standard `<button>` elements; the filter popover is a labelled `role="dialog"`, closes on `Escape`, and restores focus to its trigger.
- **`aria-selected`** — data rows report their selection state when `rowSelection` is active.
- **`aria-label` on selection controls** — each checkbox/radio announces the row it selects (e.g. `"Select row 1"`).
- **`aria-live="polite"` on record info bar** — "Showing X to Y" updates are announced politely on page change.
- **`aria-busy`** — the table region reports `aria-busy="true"` while `isLoading`, and the spinner itself is a polite `role="status"` live region.
- **Pagination keyboard support** — all page buttons are standard `<button>` elements, fully keyboard-navigable.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  TableProps,
  TableColumn,
  TableStyles,
  TableClassNames,
  SortState,
  FilterState,
  RowSelection,
  TablePagination,
} from "@bearlab/table";
```

### `TableColumn`

```ts
interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  filterPlaceholder?: string;
  render?: (value: any, record: Record<string, any>) => React.ReactNode;
}
```

### `SortState` & `FilterState`

```ts
interface SortState {
  columnKey: string;
  dataIndex: string;
  direction: "asc" | "desc";
}

type FilterState = Record<string, string>;
```

### `RowSelection`

```ts
interface RowSelection {
  type: "checkbox" | "radio";
  onChange?: (
    selectedRowKeys: string[],
    selectedRows: Record<string, any>[]
  ) => void;
}
```

### `TablePagination`

```ts
interface TablePagination {
  pageSize?: number;
  showPageNumbers?: boolean;
}
```

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
