# @bearlab/query-select

> Accessible, asynchronous and fully customizable Query Select component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/query-select)](https://www.npmjs.com/package/@bearlab/query-select)
[![license](https://img.shields.io/npm/l/@bearlab/query-select)](LICENSE)
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

- ✅ **Asynchronous search** — Built-in debouncing and async loading states
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — Keyboard navigation, screen-reader friendly
- ✅ **Rich options** — Support for images, checkboxes, and match highlighting
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/query-select

# yarn
yarn add @bearlab/query-select

# pnpm
pnpm add @bearlab/query-select
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Basic Usage

This example shows a simple implementation where you manage search results and selected items.

```tsx
import { useState } from "react";
import { QuerySelect, QuerySelectOption } from "@bearlab/query-select";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<QuerySelectOption[]>([]);

  const handleSearch = async (searchTerm: string) => {
    // Return mock data for demonstration
    const mockData = [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Orange", value: "orange" }
    ];
    
    return mockData.filter(item => 
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <QuerySelect
      label="Select Fruits"
      query={query}
      setQuery={setQuery}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      onSearch={handleSearch}
    />
  );
}
```

### Advanced Usage (with persisting/recorded items)

You can use `persistedItems` to distinguish between newly selected items and items that were already present (e.g., loaded from a database).

```tsx
import { useState } from "react";
import { QuerySelect, QuerySelectOption } from "@bearlab/query-select";

export default function AdvancedApp() {
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<QuerySelectOption[]>([
    { label: "Existing User", value: "user-1", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1" }
  ]);
  const [recordedItems, setRecordedItems] = useState<QuerySelectOption[]>([
    { label: "Existing User", value: "user-1" }
  ]);

  const handleSearch = async (searchTerm: string) => {
    // Return items with images/icons
    return [
      { 
        label: "John Doe", 
        value: "john", 
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
      },
      { 
        label: "Jane Smith", 
        value: "jane", 
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" 
      }
    ].filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  return (
    <QuerySelect
      label="Assign Users"
      query={query}
      setQuery={setQuery}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      persistedItems={recordedItems}
      onPersistedItemsChange={setRecordedItems}
      onSearch={handleSearch}
      placeholder="Search users..."
    />
  );
}
```

---

## Props

| Prop | Type | Default | Required | Description |
| ---- | ---- | ------- | -------- | ----------- |
| `query` | `string` | — | ✅ | Current value of the search input |
| `selectedItems` | `T[]` | — | ✅ | Array of currently selected items |
| `setQuery` | `(value: string) => void` | — | ✅ | Callback to update the query state |
| `setSelectedItems` | `(selected: T[]) => void` | — | ✅ | Callback to update the selected items |
| `onSearch` | `(query: string) => Promise<T[]>`| — | ✅ | Async function to fetch options. `T` must extend `QuerySelectOption` (contains `label`, `value`, and optional `image` for icons/images). |
| `persistedItems` | `T[]` | — | ❌ | Array of items that are already persisted or "recorded" in your system. |
| `onPersistedItemsChange`| `(recorded: T[]) => void` | — | ❌ | Callback to update the recorded items state when an item is removed. |
| `label` | `string` | — | ❌ | Label text for the select input |
| `error` | `any` | — | ❌ | Error message or state to display |
| `disabled` | `boolean` | `false` | ❌ | Disables the entire select component |
| `delayTime` | `number` | `500` | ❌ | Debounce delay time in milliseconds |
| `showImage` | `boolean` | `true` | ❌ | Whether to show images/icons next to options if provided |
| `showCheckbox` | `boolean` | `true` | ❌ | Whether to show checkboxes next to options |
| `isRequired` | `boolean` | `false` | ❌ | Marks the select field as required |
| `highlightMatch` | `boolean` | `true` | ❌ | Highlights the matching search term in option labels |
| `minLength` | `number`| `3` | ❌ | Minimum character length before triggering search |
| `className` | [`QuerySelectClassNames`](#queryselectclassnames) | — | ❌ | Per-slot className overrides |
| `style` | [`QuerySelectStyles`](#queryselectstyles) | — | ❌ | Per-slot inline style overrides |

*(Check TypeScript definitions for the full list of props such as `notFoundText`, `emptyText`, etc.)*

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.search`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `QuerySelectClassNames`

| Slot | Targets |
| ---- | ------- |
| `root` | Outermost container `<div>` |
| `search` | The search input field element |
| `option` | Individual option item in the dropdown |
| `options` | The listbox container rendering all options |
| `selectedItem` | Individual selected tag/item |
| `selectedItems`| Container for all selected items |

```tsx
<QuerySelect
  {...props}
  className={{
    root: "my-custom-root",
    search: "my-custom-input",
    options: "my-dropdown-menu",
    option: "my-option-item",
  }}
/>
```

### `QuerySelectStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<QuerySelect
  {...props}
  style={{
    root: { maxWidth: "400px" },
    search: { backgroundColor: "#f5f5f5" },
    options: { maxHeight: "200px" }
  }}
/>
```

---

## Theme Management

The `QuerySelect` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-query-select-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-query-select-root-border-color: #e5e7eb;
  --bearlab-query-select-search-bg: #ffffff;
  --bearlab-query-select-option-hover-bg: #f3f4f6;
  --bearlab-query-select-selected-item-bg: #ede9fe;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **Keyboard Navigation** — Full support for `ArrowDown`, `ArrowUp`, `Enter`, `Escape`, and `Backspace` to navigate options and manage selections without a mouse.
- **`role="combobox"` / `role="listbox"` / `role="option"`** — Fully compliant semantic roles for autocomplete functionality.
- **`aria-expanded` & `aria-controls`** — Dynamically indicates whether the dropdown menu is visible and controls its relationship with the input.
- **`aria-activedescendant`** — Handles internal focus for active dropdown options (`activeOptionId`), allowing screen readers to seamlessly announce focused items while native focus stays on the input.
- **`aria-labelledby`** — Connects the select container to its specific label using dynamically generated, stable IDs (`useId()`).
- **Focus Management** — Utilizes a customized Portal implementation (`OptionsPortal`) to render the dropdown list properly and safely manage click outside boundaries via `useClickOutside` hook.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  QuerySelectProps,
  QuerySelectOption,
  QuerySelectClassNames,
  QuerySelectStyles,
} from "@bearlab/query-select";
```

### `QuerySelectOption`

Every option returned by `onSearch` or passed to `selectedItems` must conform to this interface:

```ts
export interface QuerySelectOption {
  value: string | number; // The unique identifier for the option
  label: string;          // The display text for the option
  image?: string;         // Optional URL for an image or icon to display alongside the label
  disabled?: boolean;      // Whether this specific option is disabled
}
```

### `QuerySelectClassNames`

```ts
export interface QuerySelectClassNames {
  search?: string;
  option?: string;
  options?: string;
  root?: string;
  selectedItem?: string;
  selectedItems?: string;
}
```

### `QuerySelectStyles`

```ts
export interface QuerySelectStyles {
  search?: React.CSSProperties;
  option?: React.CSSProperties;
  options?: React.CSSProperties;
  root?: React.CSSProperties;
  selectedItem?: React.CSSProperties;
  selectedItems?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
