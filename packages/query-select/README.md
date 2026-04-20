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
- ✅ **Single & Multiple selection** — Toggle between single and multiple selection modes
- ✅ **Flexible selection display** — Show selected items inside (`inline`) or above (`card`) the input
- ✅ **Slot-based `className` & `style` API** — Granular styling without CSS overrides
- ✅ **Accessible by default** — Keyboard navigation, screen-reader friendly
- ✅ **Rich options** — Support for images, checkboxes, and match highlighting
- ✅ **TypeScript-first** — Fully typed props and slot interfaces
- ✅ **Form library agnostic** — Works standalone, with Formik, or React Hook Form

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

### Basic (Standalone)

Manage state externally using `value` and `onChange`.

```tsx
import { useState } from "react";
import { QuerySelect, QuerySelectOption } from "@bearlab/query-select";

type Fruit = QuerySelectOption;

export default function App() {
  const [selected, setSelected] = useState<Fruit[]>([]);

  const handleSearch = async (query: string): Promise<Fruit[]> => {
    const data: Fruit[] = [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Orange", value: "orange" },
    ];
    return data.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <QuerySelect<Fruit>
      label="Select Fruits"
      mode="multiple"
      value={selected}
      onChange={setSelected}
      onSearch={handleSearch}
      placeholder="Search fruits..."
    />
  );
}
```

### Single Mode

Use `mode="single"` to allow only one selection at a time. `onChange` receives `T | null`.

```tsx
import { useState } from "react";
import { QuerySelect, QuerySelectOption } from "@bearlab/query-select";

type Currency = QuerySelectOption;

export default function SingleExample() {
  const [selected, setSelected] = useState<Currency | null>(null);

  const handleSearch = async (query: string): Promise<Currency[]> => {
    const currencies: Currency[] = [
      { label: "US Dollar", value: "USD" },
      { label: "Euro", value: "EUR" },
      { label: "British Pound", value: "GBP" },
    ];
    return currencies.filter((c) =>
      c.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <QuerySelect<Currency>
      label="Currency"
      mode="single"
      value={selected}
      onChange={setSelected}
      onSearch={handleSearch}
      placeholder="Search currency..."
    />
  );
}
```

### Selection Display Modes

Control where selected items are shown with the `selectionDisplay` prop.

```tsx
{
  /* Selected items shown above the input (default) */
}
<QuerySelect
  mode="multiple"
  selectionDisplay="card"
  value={selected}
  onChange={setSelected}
  onSearch={handleSearch}
/>;

{
  /* Selected items shown as tags inside the input */
}
<QuerySelect
  mode="multiple"
  selectionDisplay="inline"
  value={selected}
  onChange={setSelected}
  onSearch={handleSearch}
/>;
```

### With Formik

```tsx
import { useFormik } from "formik";
import { QuerySelect, QuerySelectOption } from "@bearlab/query-select";

type Currency = QuerySelectOption;

export const CreateBalanceForm = () => {
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: { currency: null as Currency | null },
    onSubmit: (values) => console.log(values),
  });

  const handleSearch = async (query: string): Promise<Currency[]> => {
    // fetch from API...
    return [];
  };

  return (
    <form onSubmit={handleSubmit}>
      <QuerySelect<Currency>
        label="Currency"
        mode="single"
        value={values.currency}
        onChange={(value) => setFieldValue("currency", value)}
        onSearch={handleSearch}
        placeholder="Search currency..."
      />
    </form>
  );
};
```

### With React Hook Form

```tsx
import { Controller, useForm } from "react-hook-form";
import { QuerySelect, QuerySelectOption } from "@bearlab/query-select";

type Tag = QuerySelectOption;
type FormValues = { tags: Tag[] };

export default function RHFExample() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { tags: [] },
  });

  const handleSearch = async (query: string): Promise<Tag[]> => {
    // fetch from API...
    return [];
  };

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="tags"
        control={control}
        render={({ field, fieldState }) => (
          <QuerySelect<Tag>
            label="Tags"
            mode="multiple"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            onSearch={handleSearch}
            placeholder="Search tags..."
          />
        )}
      />
    </form>
  );
}
```

---

## Props

| Prop               | Type                                                   | Default                         | Required | Description                                                                |
| ------------------ | ------------------------------------------------------ | ------------------------------- | -------- | -------------------------------------------------------------------------- |
| `onSearch`         | `(query: string) => Promise<T[]>`                      | —                               | ✅       | Async function called after debounce to fetch matching options             |
| `mode`             | `"single" \| "multiple"`                               | `"multiple"`                    | ❌       | Whether one or multiple items can be selected                              |
| `value`            | `T \| null` (single) or `T[]` (multiple)               | —                               | ❌       | Currently selected value(s)                                                |
| `onChange`         | `(value: T \| null) => void` or `(value: T[]) => void` | —                               | ❌       | Callback fired when selection changes                                      |
| `selectionDisplay` | `"card" \| "inline"`                                   | `"card"`                        | ❌       | Where to display selected items: above input (`card`) or inside (`inline`) |
| `label`            | `string`                                               | —                               | ❌       | Label text for the field                                                   |
| `error`            | `any`                                                  | —                               | ❌       | Error message or state to display below the input                          |
| `disabled`         | `boolean`                                              | `false`                         | ❌       | Disables the entire component                                              |
| `isRequired`       | `boolean`                                              | `false`                         | ❌       | Marks the field as required (shows asterisk)                               |
| `minLength`        | `number`                                               | `3`                             | ❌       | Minimum characters before triggering search                                |
| `delayTime`        | `number`                                               | `500`                           | ❌       | Debounce delay in milliseconds                                             |
| `placeholder`      | `string`                                               | `"Enter at least 3 characters"` | ❌       | Input placeholder text                                                     |
| `noSelectionText`  | `string`                                               | `"There is no selected choice"` | ❌       | Text shown in card when nothing is selected                                |
| `notFoundText`     | `string`                                               | `"No result found"`             | ❌       | Text shown when search yields no results                                   |
| `emptyText`        | `string`                                               | `"There is no options"`         | ❌       | Text shown before user starts typing                                       |
| `showImage`        | `boolean`                                              | `true`                          | ❌       | Show option images when provided                                           |
| `showCheckbox`     | `boolean`                                              | `true`                          | ❌       | Show checkboxes next to options                                            |
| `highlightMatch`   | `boolean`                                              | `true`                          | ❌       | Highlight the matching query inside option labels                          |
| `optionZIndex`     | `number`                                               | `8888`                          | ❌       | z-index of the options dropdown portal                                     |
| `className`        | [`QuerySelectClassNames`](#queryselectclassnames)      | —                               | ❌       | Per-slot className overrides                                               |
| `style`            | [`QuerySelectStyles`](#queryselectstyles)              | —                               | ❌       | Per-slot inline style overrides                                            |

---

## Slot-based Customization

The component follows the **Slot Pattern** for deep customization without CSS specificity issues. Inject custom styles and classnames directly into child elements via the `className` and `style` objects.

### `QuerySelectClassNames`

| Slot                   | Targets                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `root`                 | Outermost container `<div>`                                |
| `search`               | The search input wrapper element                           |
| `option`               | Individual option item in the dropdown                     |
| `options`              | The listbox container rendering all options                |
| `selectionCardWrapper` | The card container wrapping all selected items (card mode) |
| `selectionCardItem`    | An individual selected item (card mode)                    |
| `selectionInlineItems` | The inline wrapper for selected tags (inline mode)         |
| `selectionInlineItem`  | An individual selected tag (inline mode)                   |

```tsx
<QuerySelect
  {...props}
  className={{
    root: "my-custom-root",
    search: "my-custom-input",
    options: "my-dropdown-menu",
    option: "my-option-item",
    selectionCardWrapper: "my-selected-card",
    selectionInlineItems: "my-inline-tags",
  }}
/>
```

### `QuerySelectStyles`

All slots accept inline `React.CSSProperties` via the `style` prop:

```tsx
<QuerySelect
  {...props}
  style={{
    root: { maxWidth: "400px" },
    search: { backgroundColor: "#f5f5f5" },
    options: { maxHeight: "200px" },
    selectionCardWrapper: { border: "1px solid red" },
  }}
/>
```

---

## Theme Management

The `QuerySelect` component is fully compatible with both light and dark mode, natively responding to **`[data-theme="dark"]`** selectors applied at the root or document level.

```html
<html data-theme="dark">
  ...
</html>
```

---

## Design Tokens (Customization)

Override the component's appearance globally using CSS custom properties with the `--bearlab-query-select-[element]-[property]` format:

```css
:root,
[data-theme="light"] {
  --bearlab-query-select-search-bg: #ffffff;
  --bearlab-query-select-search-border-color: #e5e7eb;
  --bearlab-query-select-selected-item-bg: #ede9fe;
  --bearlab-query-select-selected-item-color: #6d28d9;
  --bearlab-query-select-option-bg-hover: #f3f4f6;
}

[data-theme="dark"] {
  --bearlab-query-select-search-bg: #0f1828;
  --bearlab-query-select-search-border-color: #1d2939;
  --bearlab-query-select-selected-item-bg: color-mix(
    in oklab,
    #465fff 12%,
    transparent
  );
  --bearlab-query-select-selected-item-color: #7592ff;
}
```

---

## Accessibility

This component adheres to **WCAG 2.1 AA** standards:

- **Keyboard Navigation** — Full support for `ArrowDown`, `ArrowUp`, `Enter`, `Escape`, and `Backspace`
- **`role="combobox"` / `role="listbox"` / `role="option"`** — Fully compliant semantic roles
- **`aria-expanded` & `aria-controls`** — Dynamic dropdown state communication
- **`aria-activedescendant`** — Screen readers announce the focused option while native focus stays on the input
- **`aria-labelledby`** — Input connected to its label via stable `useId()` IDs
- **Focus Management** — Portal-based dropdown with safe click-outside via `useClickOutside`

---

## TypeScript

All types are exported from the package:

```ts
import type {
  SelectMode,
  SelectionDisplay,
  QuerySelectProps,
  SingleQuerySelectProps,
  MultipleQuerySelectProps,
  QuerySelectOption,
  QuerySelectClassNames,
  QuerySelectStyles,
  QuerySelectSelectionCardItemsProps,
  QuerySelectSelectionCardItemProps,
  QuerySelectSelectionInlineItemsProps,
  QuerySelectSelectionInlineItemProps,
} from "@bearlab/query-select";
```

### `QuerySelectOption`

Every object returned by `onSearch` or passed to `value` must conform to this interface:

```ts
export interface QuerySelectOption {
  value: string | number; // Unique identifier
  label: string; // Display text
  image?: string; // Optional image/avatar URL
  disabled?: boolean; // Disable this specific option
}
```

### `QuerySelectClassNames`

```ts
export interface QuerySelectClassNames {
  root?: string;
  search?: string;
  option?: string;
  options?: string;
  selectionCardWrapper?: string;
  selectionCardItem?: string;
  selectionInlineItems?: string;
  selectionInlineItem?: string;
}
```

### `QuerySelectStyles`

```ts
export interface QuerySelectStyles {
  root?: React.CSSProperties;
  search?: React.CSSProperties;
  option?: React.CSSProperties;
  options?: React.CSSProperties;
  selectionCardWrapper?: React.CSSProperties;
  selectionCardItem?: React.CSSProperties;
  selectionInlineItems?: React.CSSProperties;
  selectionInlineItem?: React.CSSProperties;
}
```

### `QuerySelectSelectionCardItemsProps`

```ts
export interface QuerySelectSelectionCardItemsProps<T extends QuerySelectOption> {
  disabled?: boolean;
  selectedItems: T[];
  noSelectionText?: string;
  style?: QuerySelectStyles;
  className?: QuerySelectClassNames;
  onRemoveSelect: (val: T[]) => void;
}
```

### `QuerySelectSelectionCardItemProps`

```ts
export interface QuerySelectSelectionCardItemProps {
  title: string;
  disabled?: boolean;
  value?: string | number;
  style?: React.CSSProperties;
  className?: string;
  onRemove?: (item: string | number) => void;
}
```

### `QuerySelectSelectionInlineItemsProps`

```ts
export interface QuerySelectSelectionInlineItemsProps<T extends QuerySelectOption> {
  disabled?: boolean;
  selectedItems: T[];
  style?: QuerySelectStyles;
  visibleCount: number;
  className?: QuerySelectClassNames;
  setSelectedItems: (val: T[]) => void;
}
```

### `QuerySelectSelectionInlineItemProps`

```ts
export interface QuerySelectSelectionInlineItemProps {
  title: string;
  disabled?: boolean;
  value?: string | number;
  style?: React.CSSProperties;
  className?: string;
  onRemove?: (item: string | number) => void;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
