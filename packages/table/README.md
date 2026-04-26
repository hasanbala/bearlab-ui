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
- [Slot-based Customization](#slot-based-customization)
- [Internationalization (i18n)](#internationalization-i18n)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Client-side & server-side pagination** — configurable page size, page-size selector, and `maxVisiblePages`
- ✅ **Row selection** — `checkbox` (multi) and `radio` (single) modes with a "Select all" header checkbox
- ✅ **Column sorting** — expose `sortDirection` per column and an optional `sorter` comparator function
- ✅ **Custom cell renderer** — `render(value, record)` per column for rich cell content
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

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

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

| Prop                   | Type                                           | Default                                            | Required | Description                                                      |
| ---------------------- | ---------------------------------------------- | -------------------------------------------------- | -------- | ---------------------------------------------------------------- |
| `dataSource`           | `Record<string, any>[]`                        | —                                                  | ✅       | Array of record objects; each must include a `key` field         |
| `columns`              | [`TableColumn[]`](#column-configuration)       | —                                                  | ✅       | Column definitions                                               |
| `title`                | `string`                                       | —                                                  | ❌       | Table title; renders an `<h3>` and sets `aria-labelledby`        |
| `aria-label`           | `string`                                       | —                                                  | ❌       | Accessible label when `title` is not provided                    |
| `aria-describedby`     | `string`                                       | —                                                  | ❌       | Links the table region to an external description element        |
| `disabled`             | `boolean`                                      | `false`                                            | ❌       | Disables row clicks, selection, and pagination                   |
| `rowSelection`         | [`RowSelection`](#row-selection)               | —                                                  | ❌       | Row selection configuration (checkbox or radio)                  |
| `pagination`           | `boolean \| TablePagination`                   | `false`                                            | ❌       | Enables client-side pagination; pass an object to configure      |
| `serverPagination`     | `boolean`                                      | `false`                                            | ❌       | Delegates pagination to the server (`totalCount` is required)    |
| `totalCount`           | `number`                                       | —                                                  | ❌       | Total record count for server pagination and the record info bar |
| `currentPage`          | `number`                                       | `1`                                                | ❌       | Controlled current page (used with `serverPagination`)           |
| `pageSizeOptions`      | `number[]`                                     | `[10, 20, 50, 100]`                                | ❌       | Options rendered in the page-size selector                       |
| `showPageSizeSelector` | `boolean`                                      | `false`                                            | ❌       | Renders the page-size `<select>` inside the pagination bar       |
| `pageSizePlaceholder`  | `string`                                       | `"Select page size"`                               | ❌       | Placeholder label for the page-size selector                     |
| `maxVisiblePages`      | `number`                                       | `6`                                                | ❌       | Maximum page buttons shown before truncating with ellipsis       |
| `onTableChange`        | `(page, pageSize, isPageSize?) => void`        | —                                                  | ❌       | Fires when the active page or page size changes                  |
| `onRowClick`           | `(record) => void`                             | —                                                  | ❌       | Fires when a non-disabled row is clicked                         |
| `renderPageInfo`       | `(currentPage, totalPages) => ReactNode`       | —                                                  | ❌       | Overrides the "Page X of Y" label in the pagination bar          |
| `renderTotalInfo`      | `(from, to, total) => ReactNode`               | —                                                  | ❌       | Overrides the "Showing X to Y of Z entries" record info bar      |
| `emptyTitle`           | `string`                                       | `"No records found"`                               | ❌       | Title shown when `dataSource` is empty                           |
| `emptyDescription`     | `string`                                       | `"There are no records to display at the moment."` | ❌       | Description shown below the empty title                          |
| `className`            | [`TableClassNames`](#slot-based-customization) | —                                                  | ❌       | Per-slot className overrides                                     |
| `style`                | [`TableStyles`](#slot-based-customization)     | —                                                  | ❌       | Per-slot inline style overrides                                  |

---

## Column Configuration

Each entry in `columns` must conform to `TableColumn`:

| Field           | Type                                                     | Required | Description                                          |
| --------------- | -------------------------------------------------------- | -------- | ---------------------------------------------------- |
| `key`           | `string`                                                 | ✅       | Unique column identifier                             |
| `title`         | `string`                                                 | ✅       | Column header label                                  |
| `dataIndex`     | `string`                                                 | ✅       | Key in the record object to read the cell value from |
| `width`         | `string \| number`                                       | ❌       | Fixed column width (e.g. `"120px"` or `120`)         |
| `sortDirection` | `"asc" \| "desc" \| "none"`                              | ❌       | Exposes `aria-sort` on the header cell               |
| `sorter`        | `(a: any, b: any) => number`                             | ❌       | Comparator used for client-side sorting              |
| `render`        | `(value: any, record: Record<string, any>) => ReactNode` | ❌       | Custom cell renderer                                 |

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
  pageSize?: number; // Default: 5
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

| Token                                       | Default (light) | Description                          |
| ------------------------------------------- | --------------- | ------------------------------------ |
| `--bearlab-table-border-radius`             | `0.5rem`        | Outer container border radius        |
| `--bearlab-table-border-width`              | `0.0625rem`     | Border width for all dividers        |
| `--bearlab-table-font-size`                 | `0.875rem`      | Base cell font size                  |
| `--bearlab-table-cell-padding-block`        | `0.75rem`       | Cell vertical padding                |
| `--bearlab-table-cell-padding-inline`       | `1rem`          | Cell horizontal padding              |
| `--bearlab-table-font-weight-header`        | `600`           | Header cell font weight              |
| `--bearlab-table-page-button-bg-active`     | `#2563eb`       | Active page button background        |
| `--bearlab-table-page-button-color-active`  | `#ffffff`       | Active page button text color        |
| `--bearlab-table-page-button-border-radius` | `0.375rem`      | Page button border radius            |
| `--bearlab-table-page-button-min-width`     | `2rem`          | Minimum page button width            |
| `--bearlab-table-select-border-color`       | `#e4e7ec`       | Page-size selector border            |
| `--bearlab-table-select-active-color`       | `#465fff`       | Page-size selector focus/hover color |
| `--bearlab-table-empty-icon-fill`           | `#6b7280`       | Empty state icon fill color          |
| `--bearlab-table-empty-title-color`         | `#1f2937`       | Empty state title color              |

---

## Accessibility

The `Table` component adheres to **WCAG 2.1 AA** standards:

- **`role="region"` + `aria-labelledby` / `aria-label`** — wraps the table in a landmark region labelled by `title` or `aria-label`.
- **`aria-rowcount`** — the `<table>` exposes the total number of rows to assistive technologies.
- **`aria-sort`** — header cells expose `"ascending"`, `"descending"`, or `"none"` based on `sortDirection`.
- **`aria-selected`** — data rows report their selection state when `rowSelection` is active.
- **`aria-label` on selection controls** — each checkbox/radio announces the row it selects (e.g. `"Select row 1"`).
- **`aria-live="polite"` on record info bar** — "Showing X to Y" updates are announced politely on page change.
- **Pagination keyboard support** — all page buttons are standard `<button>` elements, fully keyboard-navigable.

---

## TypeScript

All types are exported from the package:

```ts
import type { TableProps, TableStyles, TableClassNames } from "@bearlab/table";
```

### `TableColumn`

```ts
interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: string | number;
  sortDirection?: "asc" | "desc" | "none";
  sorter?: (a: any, b: any) => number;
  render?: (value: any, record: Record<string, any>) => React.ReactNode;
}
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

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
