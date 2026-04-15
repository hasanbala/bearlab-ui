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
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Rich Functionality** — Sorting, client/server-side pagination, row selection (checkbox & radio)
- ✅ **Slot-based `className` & `style` API** — Granular styling of table cells, rows, and wrappers without CSS overrides
- ✅ **Accessible by default** — Built-in `aria-sort`, `aria-describedby`, `aria-label`, and fully navigable pagination
- ✅ **Responsive Design** — Adjusts naturally to mobile viewports with specialized table controls
- ✅ **TypeScript-first** — Fully typed columns, records, and configuration options
- ✅ **Zero layout opinion** — Bring your own layout/wrapper

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

```tsx
import { Table } from "@bearlab/table";
import type { TableColumn } from "@bearlab/table";

const columns: TableColumn[] = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Age", dataIndex: "age", key: "age" },
];

const data = [
  { key: "1", name: "John Doe", age: 32 },
  { key: "2", name: "Jane Smith", age: 28 },
];

export default function App() {
  return (
    <Table
      title="Users"
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      rowSelection={{
        type: "checkbox",
        onChange: (selectedRowKeys) => console.log(selectedRowKeys),
      }}
    />
  );
}
```

---

## Props

| Prop                   | Type                                        | Default              | Required | Description                                                                 |
| ---------------------- | ------------------------------------------- | -------------------- | -------- | --------------------------------------------------------------------------- |
| `dataSource`           | `Record<string, any>[]`                     | —                    | ✅       | Array of objects representing the table records                             |
| `columns`              | [`TableColumn[]`](#tablecolumn)             | —                    | ✅       | Array of configuration objects for the table columns                        |
| `title`                | `string`                                    | —                    | ❌       | Table title heading text                                                    |
| `rowSelection`         | [`RowSelection`](#rowselection)             | —                    | ❌       | Row selection configuration                                                 |
| `pagination`           | `boolean \| TablePagination`                | `false`              | ❌       | Enables or customizes client-side pagination                                |
| `serverPagination`     | `boolean`                                   | `false`              | ❌       | If true, delegates pagination logic to the server (`totalCount` required)   |
| `totalCount`           | `number`                                    | —                    | ❌       | Total number of available records (used with `serverPagination`)            |
| `currentPage`          | `number`                                    | `1`                  | ❌       | The current active page index                                               |
| `pageSizeOptions`      | `number[]`                                  | `[10, 20, 50, 100]`  | ❌       | Allowed page sizes for the size selector                                    |
| `showPageSizeSelector` | `boolean`                                   | `false`              | ❌       | Whether to render the page size dropdown                                    |
| `pageSizePlaceholder`  | `string`                                    | `"Select page size"` | ❌       | Label/Placeholder for the page size selector                                |
| `maxVisiblePages`      | `number`                                    | `6`                  | ❌       | Max number of page indicators to show before truncating                     |
| `onTableChange`        | `(setPage, page, size, isPageSize) => void` | —                    | ❌       | Callback fired when pagination changes                                      |
| `onRowClick`           | `(record: Record<string, any>) => void`     | —                    | ❌       | Callback fired when a non-disabled row is clicked                           |
| `disabled`             | `boolean`                                   | `false`              | ❌       | Disables interactivity within the table (selection, pagination, row clicks) |
| `className`            | [`TableClassNames`](#tableclassnames)       | —                    | ❌       | Per-slot className overrides                                                |
| `style`                | [`TableStyles`](#tablestyles)               | —                    | ❌       | Per-slot inline style overrides                                             |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into specific child elements of the table utilizing the `className` and `style` objects.

For example, you can alter the pagination container by modifying `className?.paginationWrapper` or specifically target headers using `style?.headerCell`.

### `TableClassNames`

| Slot                 | Targets                                                  |
| -------------------- | -------------------------------------------------------- |
| `root`               | Outermost container `<div>`                              |
| `header`             | Header wrapper `<div>`                                   |
| `title`              | Table title `<h3>`                                       |
| `tableWrapper`       | Wrapper `<div>` for horizontal overflow handling         |
| `tableContainer`     | Native `<table>` component                               |
| `tableHeader`        | Native `<thead>` component                               |
| `headerCell`         | Native `<th>` cell component                             |
| `tableBody`          | Native `<tbody>` component                               |
| `bodyRow`            | Native `<tr>` data row component                         |
| `bodyCell`           | Native `<td>` data cell component                        |
| `paginationWrapper`  | Wrapper for all pagination controls and selectors        |
| `paginationControls` | Nav wrapper `<nav>` for page buttons                     |
| `pageButton`         | Page-change `<button>` components                        |
| `pageButtonActive`   | Added to the currently active page `<button>`            |
| `pageButtonInactive` | Added to non-active page `<button>`s                     |
| `pageInfo`           | Mobile-only page info indicator                          |
| `pageList`           | Paginator `<ul>` container                               |
| `ellipsis`           | Pagination truncation `...` icon                         |
| `pageSizeSelector`   | Used to wrap the page-size selector component            |
| `recordInfo`         | Bottom indicator text for currently total rows presented |

```tsx
<Table
  columns={columns}
  dataSource={data}
  className={{
    root: "my-table",
    headerCell: "my-th-cell",
    bodyRow: "my-tr-hover-effect",
    paginationWrapper: "my-paginator",
  }}
/>
```

### `TableStyles`

All slots also accept inline `React.CSSProperties` natively via the `style` prop:

```tsx
<Table
  columns={columns}
  dataSource={data}
  style={{
    tableContainer: { borderCollapse: "separate", borderSpacing: "10px" },
    headerCell: { backgroundColor: "#f4f4f4" },
  }}
/>
```

---

## Theme Management

The `Table` component is fully fully compatible with dark mode contexts, relying on native implementations. It natively aligns with standard design tokens by responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can globally overwrite tokens by redefining these CSS variables locally or globally. Using the `--bearlab-table-[element]-[property]` format gives you flexible aesthetic control overriding the initial configuration.

```css
:root,
[data-theme="light"] {
  --bearlab-table-container-bg: #ffffff;
  --bearlab-table-header-bg: #f9f9f9;
  --bearlab-table-header-color: #333333;
  --bearlab-table-border-color: #e5e5e5;
  --bearlab-table-row-hover-bg: #f0f0f0;
  --bearlab-table-cell-padding: 12px 16px;
  --bearlab-table-border-radius: 8px;
}

[data-theme="dark"] {
  --bearlab-table-container-bg: #1e1e1e;
  --bearlab-table-header-bg: #2a2a2a;
  --bearlab-table-header-color: #e0e0e0;
  --bearlab-table-border-color: #444444;
  --bearlab-table-row-hover-bg: #333333;
}
```

---

## Accessibility

The Data Table component adheres to broad **WCAG 2.1 AA** standards natively without overhead, featuring:

- **`role="region"` & `aria-labelledby`**: Ensures screen readers can reliably parse the data boundaries contextualized by `title` usage or `"aria-label"` passing over native overrides.
- **Native Table semantics (`aria-rowcount`, `aria-rowindex`)**: The grid logic establishes exact tracking numbers, keeping visually unseen values clear to assistive listeners.
- **`aria-sort` Support**: `headerCell` components dynamically expose stateful sort logic values (`"ascending"`, `"descending"`, `"none"`) via column configuration flags.
- **`aria-selected` Selection logic**: Dynamically flags rows checked within custom `rowSelection`.
- **Keyboard operation details**: All selectors (`pageSizeSelector`) and iterators via page boundaries are navigable utilizing `tab`, and properly hide inaccessible variations through semantic `aria-hidden` attributes. Provide intuitive navigation between nested focus targets.

---

## TypeScript

All core and optional interface types properly infer schema exports directly out.

```ts
import type {
  TableProps,
  TableColumn,
  RowSelection,
  TableClassNames,
  TableStyles,
} from "@bearlab/table";
```

### `TableColumn`

```ts
interface TableColumn {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any, record: Record<string, any>) => React.ReactNode;
  sorter?: (a: any, b: any) => number;
  sortDirection?: "asc" | "desc" | "none";
  width?: string | number;
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

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
