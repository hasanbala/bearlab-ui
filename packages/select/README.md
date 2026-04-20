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
- ✅ **Optional search** — opt-in via `searchable` prop, with local or async filtering
- ✅ **Flexible value** — accepts `T`, `T[]`, `string`, `number`, or `null`
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — manages `aria-expanded`, keyboard navigation, focus management
- ✅ **TypeScript-first** — discriminated union types for type-safe `onChange` per mode

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

### Simple single select (default)

```tsx
import { Select } from "@bearlab/select";
import { useState } from "react";

const currencies = [
  { label: "USD", value: "usd" },
  { label: "EUR", value: "eur" },
  { label: "TRY", value: "try" },
];

export default function App() {
  const [currency, setCurrency] = useState<string | null>(null);

  return (
    <Select
      options={currencies}
      value={currency}
      onChange={(item) => setCurrency(item?.value ?? null)}
      label="Currency"
      placeholder="Select currency"
    />
  );
}
```

### Single select with search

```tsx
<Select
  options={currencies}
  value={currency}
  onChange={(item) => setCurrency(item?.value ?? null)}
  searchable
  label="Currency"
/>
```

### Multiple select

```tsx
import { Select, SelectOption } from "@bearlab/select";
import { useState } from "react";

const tags = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
];

export default function App() {
  const [selected, setSelected] = useState<SelectOption[]>([]);

  return (
    <Select
      options={tags}
      value={selected}
      onChange={setSelected}
      mode="multiple"
      label="Tags"
    />
  );
}
```

### Multiple select with async search

```tsx
<Select
  options={searchResults}
  value={selectedUsers}
  onChange={setSelectedUsers}
  mode="multiple"
  searchable
  onSearch={handleSearch}
  isLoading={isSearching}
  label="Users"
/>
```

### With Formik

```tsx
import { useFormik } from "formik";

const { values, setFieldValue } = useFormik({ ... });

<Select
  options={currencies}
  value={values.currency}
  onChange={(item) => setFieldValue("currency", item?.value ?? "")}
  label="Currency"
  placeholder="Select currency"
/>
```

---

## Props

| Prop             | Type                                    | Default                      | Required | Description                                                                     |
| ---------------- | --------------------------------------- | ---------------------------- | -------- | ------------------------------------------------------------------------------- |
| `options`        | `T[]`                                   | —                            | ✅       | Array of options to display (where `T` extends [`SelectOption`](#selectoption)) |
| `value`          | `T \| T[] \| string \| number \| null`  | —                            | ❌       | Current value — primitives are resolved against `options` automatically         |
| `onChange`       | see [TypeScript](#selectprops)          | —                            | ❌       | Called when selection changes                                                   |
| `mode`           | `"single" \| "multiple"`                | `"single"`                   | ❌       | Selection mode                                                                  |
| `searchable`     | `boolean`                               | single→`false`, multi→`true` | ❌       | Enables the search input                                                        |
| `onSearch`       | `(query: string) => void`               | —                            | ❌       | Async search callback — when provided, local filtering is disabled              |
| `isLoading`      | `boolean`                               | `false`                      | ❌       | Shows loading indicator during async search                                     |
| `label`          | `string`                                | —                            | ❌       | Field label                                                                     |
| `name`           | `string`                                | —                            | ❌       | Form field name                                                                 |
| `disabled`       | `boolean`                               | —                            | ❌       | Disables the select                                                             |
| `error`          | `any`                                   | —                            | ❌       | Error message                                                                   |
| `isRequired`     | `boolean`                               | —                            | ❌       | Marks the field as required                                                     |
| `placeholder`    | `string`                                | `"Select..."`                | ❌       | Placeholder text                                                                |
| `emptyText`      | `string`                                | `"There is no options"`      | ❌       | Text when options array is empty                                                |
| `notFoundText`   | `string`                                | `"No result found"`          | ❌       | Text when search yields no results                                              |
| `showImage`      | `boolean`                               | `true`                       | ❌       | Show option images                                                              |
| `showCheckbox`   | `boolean`                               | single→`false`, multi→`true` | ❌       | Show selection checkboxes                                                       |
| `highlightMatch` | `boolean`                               | matches `searchable`         | ❌       | Highlight matching text in options                                              |
| `optionZIndex`   | `number`                                | `8888`                       | ❌       | Z-index for the dropdown portal                                                 |
| `className`      | [`SelectClassNames`](#selectclassnames) | —                            | ❌       | Per-slot className overrides                                                    |
| `style`          | [`SelectStyles`](#selectstyles)         | —                            | ❌       | Per-slot inline style overrides                                                 |

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
  SingleSelectProps,
  MultipleSelectProps,
  SelectValue,
  SingleValue,
  MultipleValue,
} from "@bearlab/select";
```

### `SelectProps`

The props use a **discriminated union** on the `mode` prop for type-safe `onChange` signatures:

```ts
// Single mode (default)
interface SingleSelectProps<T extends SelectOption> {
  mode?: "single";
  value?: T | string | number | null;
  onChange?: (value: T | null) => void;
  // ...base props
}

// Multiple mode
interface MultipleSelectProps<T extends SelectOption> {
  mode: "multiple";
  value?: T[] | string[] | number[];
  onChange?: (value: T[]) => void;
  // ...base props
}

type SelectProps<T> = SingleSelectProps<T> | MultipleSelectProps<T>;
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
