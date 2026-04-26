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

- ✅ **Asynchronous search** — built-in debouncing (`delayTime`) and loading skeleton states
- ✅ **Minimum character threshold** — prevents unnecessary API calls via `minLength`
- ✅ **Single & Multiple selection** — toggle between modes via `mode` prop
- ✅ **Dual selection display** — show selected items inside the input (`inline`) or above it in a card (`card`) via `selectionLayout`
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Portal-based dropdown** — respects stacking context via `optionZIndex`
- ✅ **Accessible by default** — `role="combobox"`, `aria-expanded`, `aria-activedescendant`, full keyboard navigation
- ✅ **Rich options** — support for images, checkboxes, and match highlighting
- ✅ **TypeScript-first** — fully typed generics for type-safe `onChange` per mode
- ✅ **Form library agnostic** — works standalone, with Formik, or React Hook Form

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

### Basic (Single, card layout)

```tsx
import { useState } from "react";
import { QuerySelect } from "@bearlab/query-select";

export default function App() {
  const [value, setValue] = useState<number | null>(null);

  const handleSearch = async (query: string) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?name=${query}`
    );
    const data = await response.json();
    return data.results.map((char: any) => ({
      label: char.name,
      value: char.id,
      image: char.image,
    }));
  };

  return (
    <QuerySelect
      selectionLayout="card"
      value={value}
      onChange={setValue}
      onSearch={handleSearch}
      label="Select Character"
    />
  );
}
```

### Multiple Mode with Inline Display

```tsx
import { useState } from "react";
import { QuerySelect } from "@bearlab/query-select";

export default function App() {
  const [value, setValue] = useState<number[]>([]);

  const handleSearch = async (query: string) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?name=${query}`
    );
    const data = await response.json();
    return data.results.map((char: any) => ({
      label: char.name,
      value: char.id,
      image: char.image,
    }));
  };

  return (
    <QuerySelect
      mode="multiple"
      selectionLayout="inline"
      value={value}
      onChange={(value, option) => {
        setValue(value);
        console.log({ option });
      }}
      onSearch={handleSearch}
      label="Select Characters"
    />
  );
}
```

### With Formik

The `QuerySelect` component supports both manual state updates and standard Formik event handlers.

#### Option 1: Manual update via `setFieldValue`

Ideal when you need custom logic. Do **not** pass the `name` prop in this mode.

```tsx
<QuerySelect
  onSearch={handleSearch}
  placeholder="Search State"
  onChange={(value) => setFieldValue("region", value)}
  value={values.region}
  label="Region"
/>
```

#### Option 2: Standard update via `handleChange`

The `name` prop is **required** here — the component emits a synthetic change event compatible with Formik's `handleChange`.

```tsx
<QuerySelect
  name="currency"
  onSearch={handleSearch}
  value={values.currency}
  onChange={handleChange}
  label="Currency"
  placeholder="Search Currency"
  mode="multiple"
/>
```

> [!IMPORTANT]
> When using `setFieldValue` (Option 1), do **not** provide the `name` prop. If `name` is present, the component will emit a synthetic change event which may conflict with your manual `setFieldValue` call.

### With React Hook Form

```tsx
import { Controller, useForm } from "react-hook-form";
import { QuerySelect, QuerySelectOption } from "@bearlab/query-select";

type Tag = QuerySelectOption;
type FormValues = { tags: Tag["value"][] };

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
          <QuerySelect<Tag, "multiple">
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

| Prop              | Type                                              | Default                         | Required | Description                                                                   |
| ----------------- | ------------------------------------------------- | ------------------------------- | -------- | ----------------------------------------------------------------------------- |
| `onSearch`        | `(query: string) => Promise<T[]>`                 | —                               | ✅       | Async function called after debounce to fetch matching options                |
| `value`           | `QuerySelectValue<T, Mode>`                       | —                               | ✅       | Currently selected value(s) — primitive or array of primitives                |
| `mode`            | `"single" \| "multiple"`                          | `"single"`                      | ❌       | Whether one or multiple items can be selected                                 |
| `onChange`        | see [TypeScript](#typescript)                     | —                               | ❌       | Callback fired when selection changes                                         |
| `selectionLayout` | `"card" \| "inline"`                              | `"inline"`                      | ❌       | Where to display selected items: above input (`card`) or inside it (`inline`) |
| `label`           | `string`                                          | —                               | ❌       | Label text rendered above the input                                           |
| `name`            | `string`                                          | —                               | ❌       | Form field name (triggers synthetic change event for Formik/RHF)              |
| `error`           | `any`                                             | —                               | ❌       | Error message displayed below the input                                       |
| `disabled`        | `boolean`                                         | —                               | ❌       | Disables the entire component                                                 |
| `isRequired`      | `boolean`                                         | —                               | ❌       | Marks the field as required (appends `*` to label)                            |
| `minLength`       | `number`                                          | `3`                             | ❌       | Minimum characters required before triggering `onSearch`                      |
| `delayTime`       | `number`                                          | `500`                           | ❌       | Debounce delay in milliseconds before `onSearch` is called                    |
| `placeholder`     | `string`                                          | `"Enter at least 3 characters"` | ❌       | Input placeholder text                                                        |
| `noSelectionText` | `string`                                          | `"There is no selected choice"` | ❌       | Text shown in the card area when nothing is selected (`card` layout only)     |
| `notFoundText`    | `string`                                          | `"No result found"`             | ❌       | Text shown in dropdown when search returns empty results                      |
| `emptyText`       | `string`                                          | `"There is no options"`         | ❌       | Text shown in dropdown before the user starts typing                          |
| `showImage`       | `boolean`                                         | `true`                          | ❌       | Show option avatars/images (requires `image` on the option)                   |
| `showCheckbox`    | `boolean`                                         | `true`                          | ❌       | Show a checkbox indicator on each option row                                  |
| `highlightMatch`  | `boolean`                                         | `true`                          | ❌       | Highlight the matching query text inside option labels                        |
| `optionZIndex`    | `number`                                          | `8888`                          | ❌       | Z-index for the options portal overlay                                        |
| `className`       | [`QuerySelectClassNames`](#queryselectclassnames) | —                               | ❌       | Per-slot className overrides                                                  |
| `style`           | [`QuerySelectStyles`](#queryselectstyles)         | —                               | ❌       | Per-slot inline style overrides                                               |

---

## Slot-based Customization

The component follows the **Slot Pattern** for deep customization without CSS specificity issues. Inject custom styles and classnames directly into child elements via the `className` and `style` props.

### `QuerySelectClassNames`

| Slot                   | Targets                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `root`                 | Outermost container `<div>`                                    |
| `search`               | The search input wrapper element                               |
| `option`               | Individual option item in the dropdown                         |
| `options`              | The listbox container rendering all options                    |
| `selectionCardWrapper` | The card container wrapping all selected items (`card` layout) |
| `selectionCardItems`   | Inner container for selected item chips (`card` layout)        |
| `selectionCardItem`    | An individual selected item chip (`card` layout)               |
| `selectionInlineItems` | The inline wrapper for selected tags (`inline` layout)         |
| `selectionInlineItem`  | An individual selected tag (`inline` layout)                   |

```tsx
<QuerySelect
  {...props}
  className={{
    root: "my-custom-root",
    search: "my-custom-input",
    options: "my-dropdown-menu",
    option: "my-option-item",
    selectionCardWrapper: "my-card-wrapper",
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
    selectionCardWrapper: { border: "1px solid #e4e7ec" },
  }}
/>
```

---

## Theme Management

The `QuerySelect` component is fully compatible with both light and dark mode, natively responding to the **`[data-theme="dark"]`** selector applied at any ancestor element.

```html
<html data-theme="dark">
  ...
</html>
```

No additional configuration is required — the component switches all color tokens automatically.

---

## Design Tokens (Customization)

Override the component's appearance globally using CSS custom properties. Variables follow the pattern `--bearlab-query-select-[element]-[property]`.

```css
/* Light theme overrides */
:root,
[data-theme="light"] {
  --bearlab-query-select-search-bg: #ffffff;
  --bearlab-query-select-search-border-color: #e4e7ec;
  --bearlab-query-select-search-border-color-focus: #465fff;
  --bearlab-query-select-selected-item-bg: #ecf3ff;
  --bearlab-query-select-selected-item-color: #465fff;
  --bearlab-query-select-option-bg-hover: #e4e7ec;
  --bearlab-query-select-option-selected-bg: #ecf3ff;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-query-select-search-bg: #0f1828;
  --bearlab-query-select-search-border-color: #1d2939;
  --bearlab-query-select-search-border-color-focus: #7592ff;
  --bearlab-query-select-selected-item-bg: color-mix(
    in oklab,
    #465fff 12%,
    transparent
  );
  --bearlab-query-select-selected-item-color: #7592ff;
  --bearlab-query-select-option-bg-hover: #1d2939;
}
```

**Key available tokens (representative sample):**

| Token                                                          | Default (light) | Description                        |
| -------------------------------------------------------------- | --------------- | ---------------------------------- |
| `--bearlab-query-select-search-bg`                             | `#fff`          | Search input background            |
| `--bearlab-query-select-search-border-color`                   | `#e4e7ec`       | Search input border                |
| `--bearlab-query-select-search-border-color-focus`             | `#465fff`       | Border color on focus              |
| `--bearlab-query-select-search-height`                         | `2.75rem`       | Height of the search input (44px)  |
| `--bearlab-query-select-search-border-radius`                  | `0.5rem`        | Border radius of the input (8px)   |
| `--bearlab-query-select-label-color`                           | `#1d2939`       | Label text color                   |
| `--bearlab-query-select-label-font-size`                       | `0.875rem`      | Label font size (14px)             |
| `--bearlab-query-select-selected-item-bg`                      | `#ecf3ff`       | Selected tag/chip background       |
| `--bearlab-query-select-selected-item-color`                   | `#465fff`       | Selected tag/chip text color       |
| `--bearlab-query-select-options-bg`                            | `#f9fafb`       | Dropdown background                |
| `--bearlab-query-select-options-border-color`                  | `#e4e7ec`       | Dropdown border color              |
| `--bearlab-query-select-options-max-height`                    | `18.75rem`      | Max height of dropdown (300px)     |
| `--bearlab-query-select-option-bg-hover`                       | `#e4e7ec`       | Option hover background            |
| `--bearlab-query-select-option-selected-bg`                    | `#ecf3ff`       | Selected option background         |
| `--bearlab-query-select-option-height`                         | `2.875rem`      | Option row height (46px)           |
| `--bearlab-query-select-checkbox-check-color`                  | `#465fff`       | Checkbox checkmark color           |
| `--bearlab-query-select-selection-card-container-border-color` | `#e4e7ec`       | Card wrapper border color          |
| `--bearlab-query-select-selection-card-container-max-height`   | `12.5rem`       | Max height of card wrapper (200px) |
| `--bearlab-query-select-skeleton-bg`                           | `#e4e7ec`       | Loading skeleton background        |
| `--bearlab-query-select-color-error`                           | `#f00438`       | Error message text color           |
| `--bearlab-query-select-opacity-disabled`                      | `0.6`           | Opacity when disabled              |

---

## Accessibility

This component adheres to **WCAG 2.1 AA** standards and the ARIA combobox pattern:

- **`role="combobox"` / `role="listbox"` / `role="option"`** — Fully compliant semantic roles
- **`aria-expanded`** — Communicates open/closed dropdown state to assistive technologies
- **`aria-controls`** — Links the input to its associated listbox
- **`aria-activedescendant`** — Screen readers announce the keyboard-focused option while native focus stays on the input
- **`aria-labelledby`** — Input is connected to its label via stable `useId()` IDs
- **`aria-selected`** — Selected options are correctly flagged
- **`aria-disabled`** — Disabled options are announced as non-interactive
- **Keyboard Navigation** — Full support for `ArrowDown`, `ArrowUp`, `Enter`, `Escape`, and `Backspace`
- **Loading State** — Animated skeleton rows are shown while `onSearch` resolves, keeping the UI responsive
- **Click Outside** — Dropdown closes correctly when clicking outside the component

---

## TypeScript

The `QuerySelect` component is fully generic, where **`T`** represents your option type and **`T` must extend `QuerySelectOption`**.

### Exported Types

All public types are exported from the package:

```ts
import type {
  QuerySelectProps,
  QuerySelectClassNames,
  QuerySelectStyles,
  QuerySelectOption,
} from "@bearlab/query-select";
```

### `QuerySelectOption`

Every object returned by `onSearch` must conform to this interface:

```ts
export interface QuerySelectOption {
  value: string | number; // Unique identifier
  label: string; // Display text shown in the option list
  image?: string; // Optional: URL for an image/avatar next to the label
  disabled?: boolean; // Optional: renders the option as non-selectable
}
```

### `QuerySelectProps`

The main component prop interface — handles both single and multiple modes via generics:

```ts
export interface QuerySelectProps<
  T extends QuerySelectOption,
  Mode extends QuerySelectMode = "single",
> extends BaseQuerySelectProps<T> {
  mode?: Mode;
  value: QuerySelectValue<T, Mode>;
  onChange?: (value: QuerySelectValue<T, Mode>, option?: T) => void;
}
```

### `QuerySelectValue`

Utility type that resolves the `value` type based on the selected `mode`:

```ts
type QuerySelectValue<
  T extends QuerySelectOption,
  Mode extends QuerySelectMode = "single",
> = Mode extends "multiple" ? T["value"][] : T["value"] | null;
```

### `QuerySelectClassNames`

```ts
export interface QuerySelectClassNames {
  root?: string;
  search?: string;
  option?: string;
  options?: string;
  selectionCardWrapper?: string;
  selectionCardItems?: string;
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
  selectionCardItems?: React.CSSProperties;
  selectionCardItem?: React.CSSProperties;
  selectionInlineItems?: React.CSSProperties;
  selectionInlineItem?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
