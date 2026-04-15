# @bearlab/select

> Accessible, fully customizable Select component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/select)](https://www.npmjs.com/package/@bearlab/select)
[![license](https://img.shields.io/npm/l/@bearlab/select)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Styling](#styling)
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

- ✅ **Single & Multiple selection** — toggle via `mode` prop
- ✅ **Search capability** — built-in search filter for large option sets
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — manages `aria-expanded`, keyboard navigation, focus management
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/select

# yarn
yarn add @bearlab/select

# pnpm
pnpm add @bearlab/select
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { Select } from "@bearlab/select";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ]);
  const [selected, setSelected] = useState([]);

  return (
    <Select
      label="Choose an option"
      mode="multiple"
      query={query}
      setQuery={setQuery}
      options={options}
      setOptions={setOptions}
      selectedItems={selected}
      setSelectedItems={setSelected}
      isLoading={false}
      debouncedValue={query}
    />
  );
}
```

---

## Props

| Prop               | Type                                    | Default      | Required | Description                                                                     |
| ------------------ | --------------------------------------- | ------------ | -------- | ------------------------------------------------------------------------------- |
| `options`          | `T[]`                                   | —            | ✅       | Array of options to display (where `T` extends [`SelectOption`](#selectoption)) |
| `query`            | `string`                                | —            | ✅       | Current search query                                                            |
| `setQuery`         | `(val: string) => void`                 | —            | ✅       | Search query setter                                                             |
| `setOptions`       | `(val: T[]) => void`                    | —            | ✅       | Options state setter                                                            |
| `selectedItems`    | `T[]`                                   | —            | ✅       | Currently selected items                                                        |
| `setSelectedItems` | `(val: T[]) => void`                    | —            | ✅       | Setter for selected items                                                       |
| `isLoading`        | `boolean`                               | —            | ✅       | Loading state indicator                                                         |
| `debouncedValue`   | `string`                                | —            | ✅       | Debounced search query value                                                    |
| `label`            | `string`                                | —            | ❌       | Field label                                                                     |
| `mode`             | `"single" \| "multiple"`                | `"multiple"` | ❌       | Selection mode                                                                  |
| `disabled`         | `boolean`                               | —            | ❌       | Disables the select                                                             |
| `error`            | `any`                                   | —            | ❌       | Error message                                                                   |
| `isRequired`       | `boolean`                               | —            | ❌       | Marks the field as required                                                     |
| `optionZIndex`     | `number`                                | `8888`       | ❌       | Z-index for the dropdown portal                                                 |
| `className`        | [`SelectClassNames`](#selectclassnames) | —            | ❌       | Per-slot className overrides                                                    |
| `style`            | [`SelectStyles`](#selectstyles)         | —            | ❌       | Per-slot inline style overrides                                                 |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner search input natively using `style?.search`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `SelectClassNames`

| Slot            | Targets                                |
| --------------- | -------------------------------------- |
| `root`          | Outermost container `<div>`            |
| `search`        | Inner search input/wrapper             |
| `options`       | The dropdown list container            |
| `option`        | Individual option item                 |
| `selectedItems` | Wrapper for chosen items               |
| `selectedItem`  | Individual chosen item (e.g. tag/chip) |

```tsx
<Select
  //... required props
  className={{
    root: "my-select-root",
    options: "my-select-dropdown",
    option: "my-select-item",
  }}
/>
```

### `SelectStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Select
  //... required props
  style={{
    root: { maxWidth: "400px" },
    search: { borderColor: "blue" },
  }}
/>
```

---

## Theme Management

The `Select` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-select-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-select-root-background: #ffffff;
  --bearlab-select-options-border: 1px solid #d1d5db;
  --bearlab-select-option-hover-bg: #f3f4f6;
  --bearlab-select-selected-color: #2563eb;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **Keyboard Navigation** — Full support for `ArrowDown`, `ArrowUp`, `Enter`, `Escape`, and `Backspace` to navigate, select, and manage the dropdown options.
- **Active Descendant Management** — Keeps track of focus dynamically via internal state (`activeIndex`) instead of hard focus moves.
- **Dynamic Context** — Manages focus appropriately for a combo box select input ensuring screen readers announce options properly as they are navigated.

---

## TypeScript

The `Select` component is generic, where **`T`** represents your option type. **`T` must extend `SelectOption`**.

### `SelectOption`

This is the base interface that all options must follow:

```ts
export interface SelectOption {
  label: string; // The text displayed in the option
  value: string | number; // The unique identifier for the option
  image?: string; // Optional: URL for an image to display next to the label
  disabled?: boolean; // Optional: Whether the specific option is disabled
}
```

### Exported Types

All types are exported from the package:

```ts
import type {
  SelectProps,
  SelectOption,
  SelectClassNames,
  SelectStyles,
  SelectMode,
} from "@bearlab/select";
```

### `SelectProps`

```ts
export interface SelectProps<T extends SelectOption> {
  error?: any;
  options: T[];
  query: string;
  label?: string;
  mode?: SelectMode;
  disabled?: boolean;
  isLoading: boolean;
  selectedItems: T[];
  emptyText?: string;
  showImage?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  style?: SelectStyles;
  notFoundText?: string;
  optionZIndex?: number;
  debouncedValue: string;
  showCheckbox?: boolean;
  highlightMatch?: boolean;
  className?: SelectClassNames;
  setOptions: (val: T[]) => void;
  setQuery: (val: string) => void;
  onChange?: (selected: T[]) => void;
  setSelectedItems: (selected: T[]) => void;
}
```

### `SelectClassNames`

```ts
interface SelectClassNames {
  search?: string;
  option?: string;
  options?: string;
  root?: string;
  selectedItem?: string;
  selectedItems?: string;
}
```

### `SelectStyles`

```ts
interface SelectStyles {
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
