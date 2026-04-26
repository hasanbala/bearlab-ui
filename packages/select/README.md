# @bearlab/select

> Accessible, fully customizable Select component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/select)](https://www.npmjs.com/package/@bearlab/select)
[![license](https://img.shields.io/npm/l/@bearlab/select)](LICENSE)
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

- ✅ **Single & Multiple selection** — toggle via `mode` prop
- ✅ **Built-in search** — local filtering with optional match highlighting
- ✅ **Flexible value** — accepts primitive value or array of primitives, plus `null`
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Portal-based dropdown** — options rendered via a portal, respecting `optionZIndex`
- ✅ **Accessible by default** — `role="combobox"`, `aria-expanded`, `aria-activedescendant`, full keyboard navigation
- ✅ **TypeScript-first** — discriminated union types for type-safe `onChange` per mode
- ✅ **Form library agnostic** — works standalone, with Formik, or React Hook Form

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

### Single select

```tsx
import { Select } from "@bearlab/select";
import { useState } from "react";

const options = [
  { label: "California", value: "CA" },
  { label: "New York", value: "NY" },
  { label: "Texas", value: "TX" },
];

export default function App() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      label="Select State"
    />
  );
}
```

### Multiple select with images and checkboxes

```tsx
import { Select } from "@bearlab/select";
import { useState } from "react";

const options = [
  {
    label: "Rick Sanchez",
    value: 1,
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  {
    label: "Morty Smith",
    value: 2,
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
];

export default function App() {
  const [value, setValue] = useState<number[]>([]);

  return (
    <Select
      options={options}
      value={value}
      onChange={(value, option) => {
        setValue(value);
        console.log({ option });
      }}
      mode="multiple"
      label="Select Characters"
      showCheckbox
      showImage
    />
  );
}
```

### With Formik

The `Select` component supports both manual state updates and standard Formik event handlers.

#### Option 1: Manual update via `setFieldValue`

Ideal when you need custom logic or are handling complex values. Do **not** pass the `name` prop in this mode.

```tsx
<Select
  options={optionsRegion}
  placeholder="Select State"
  onChange={(value) => setFieldValue("region", value)}
  value={values.region}
  label="Region"
/>
```

#### Option 2: Standard update via `handleChange`

Use this for a cleaner implementation that leverages Formik's internal change handling. The `name` prop is **required** here.

```tsx
<Select
  name="currency"
  options={optionsCurrency}
  value={values.currency}
  onChange={handleChange}
  label="Currency"
  placeholder="Select Option"
  mode="multiple"
/>
```

> [!IMPORTANT]
> When using `setFieldValue` (Option 1), do **not** provide the `name` prop to the component. If the `name` prop is present, the component will emit a synthetic change event which may conflict with your manual `setFieldValue` call.

---

## Props

| Prop             | Type                                    | Default                 | Required | Description                                                                      |
| ---------------- | --------------------------------------- | ----------------------- | -------- | -------------------------------------------------------------------------------- |
| `options`        | `T[]`                                   | —                       | ✅       | Array of options to display (where `T` extends [`SelectOption`](#selectoption))  |
| `value`          | `SelectValue<T, Mode>`                  | —                       | ✅       | Current value — primitive or array of primitives (see [TypeScript](#typescript)) |
| `mode`           | `"single" \| "multiple"`                | `"single"`              | ❌       | Selection mode                                                                   |
| `onChange`       | see [TypeScript](#typescript)           | —                       | ❌       | Called when selection changes                                                    |
| `label`          | `string`                                | —                       | ❌       | Field label rendered above the input                                             |
| `name`           | `string`                                | —                       | ❌       | Form field name (triggers synthetic change event for Formik/RHF)                 |
| `disabled`       | `boolean`                               | —                       | ❌       | Disables the select                                                              |
| `error`          | `any`                                   | —                       | ❌       | Error message displayed below the input                                          |
| `isRequired`     | `boolean`                               | —                       | ❌       | Marks the field as required (appends `*` to label)                               |
| `isLoading`      | `boolean`                               | `false`                 | ❌       | Shows a spinning loading indicator inside the dropdown                           |
| `placeholder`    | `string`                                | `"Select..."`           | ❌       | Placeholder text shown when nothing is selected                                  |
| `emptyText`      | `string`                                | `"There is no options"` | ❌       | Text shown when the `options` array is empty                                     |
| `notFoundText`   | `string`                                | `"No result found"`     | ❌       | Text shown when search query yields no results                                   |
| `showImage`      | `boolean`                               | `false`                 | ❌       | Show option avatars/images (requires `image` on the option)                      |
| `showCheckbox`   | `boolean`                               | `false`                 | ❌       | Show a checkbox indicator on each option row                                     |
| `highlightMatch` | `boolean`                               | `true`                  | ❌       | Highlight the matching query text inside option labels                           |
| `optionZIndex`   | `number`                                | `8888`                  | ❌       | Z-index for the options portal overlay                                           |
| `className`      | [`SelectClassNames`](#selectclassnames) | —                       | ❌       | Per-slot className overrides                                                     |
| `style`          | [`SelectStyles`](#selectstyles)         | —                       | ❌       | Per-slot inline style overrides                                                  |

---

## Slot-based Customization

The component follows the **Slot Pattern** to provide deep customization without CSS specificity issues. Inject custom styles and classnames directly into child elements via the `className` and `style` props.

### `SelectClassNames`

| Slot            | Targets                         |
| --------------- | ------------------------------- |
| `root`          | Outermost container `<div>`     |
| `search`        | Inner search input/wrapper      |
| `options`       | The dropdown list container     |
| `option`        | Individual option item          |
| `selectedItems` | Wrapper for chosen item tags    |
| `selectedItem`  | Individual chosen item tag/chip |

```tsx
<Select
  //... required props
  className={{
    root: "my-select-root",
    options: "my-select-dropdown",
    option: "my-select-item",
    selectedItem: "my-tag",
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
    search: { borderColor: "#465fff" },
    options: { maxHeight: "200px" },
  }}
/>
```

---

## Theme Management

The `Select` component is fully compatible with both light and dark mode, natively responding to the **`[data-theme="dark"]`** selector applied at any ancestor element (e.g., `<html>` or `<body>`).

```html
<html data-theme="dark">
  ...
</html>
```

No additional configuration is required — the component switches color tokens automatically.

---

## Design Tokens (Customization)

Beyond slots, the component exposes a CSS custom property system for global theming. Override the defaults by redefining any `--bearlab-select-*` variable in your own stylesheet. Variables follow the pattern `--bearlab-select-[element]-[property]`.

```css
/* Light theme overrides */
:root,
[data-theme="light"] {
  --bearlab-select-search-bg: #ffffff;
  --bearlab-select-search-border-color: #e4e7ec;
  --bearlab-select-search-border-color-focus: #465fff;
  --bearlab-select-selected-item-bg: #ecf3ff;
  --bearlab-select-selected-item-color: #465fff;
  --bearlab-select-option-bg-hover: #e4e7ec;
  --bearlab-select-option-selected-bg: #ecf3ff;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-select-search-bg: #0f1828;
  --bearlab-select-search-border-color: #1d2939;
  --bearlab-select-search-border-color-focus: #7592ff;
  --bearlab-select-selected-item-bg: color-mix(
    in oklab,
    #465fff 12%,
    transparent
  );
  --bearlab-select-selected-item-color: #7592ff;
  --bearlab-select-option-bg-hover: #1d2939;
}
```

**Key available tokens (representative sample):**

| Token                                        | Default (light) | Description                       |
| -------------------------------------------- | --------------- | --------------------------------- |
| `--bearlab-select-search-bg`                 | `#fff`          | Search input background           |
| `--bearlab-select-search-border-color`       | `#e4e7ec`       | Search input border               |
| `--bearlab-select-search-border-color-focus` | `#465fff`       | Border color on focus             |
| `--bearlab-select-search-height`             | `2.75rem`       | Height of the search input (44px) |
| `--bearlab-select-search-border-radius`      | `0.5rem`        | Border radius of the input (8px)  |
| `--bearlab-select-label-color`               | `#1d2939`       | Label text color                  |
| `--bearlab-select-label-font-size`           | `0.875rem`      | Label font size (14px)            |
| `--bearlab-select-selected-item-bg`          | `#ecf3ff`       | Selected tag background           |
| `--bearlab-select-selected-item-color`       | `#465fff`       | Selected tag text color           |
| `--bearlab-select-options-bg`                | `#f9fafb`       | Dropdown background               |
| `--bearlab-select-options-border-color`      | `#e4e7ec`       | Dropdown border color             |
| `--bearlab-select-options-max-height`        | `18.75rem`      | Max height of dropdown (300px)    |
| `--bearlab-select-option-bg-hover`           | `#e4e7ec`       | Option hover background           |
| `--bearlab-select-option-selected-bg`        | `#ecf3ff`       | Selected option background        |
| `--bearlab-select-option-height`             | `2.875rem`      | Option row height (46px)          |
| `--bearlab-select-checkbox-check-color`      | `#465fff`       | Checkbox checkmark color          |
| `--bearlab-select-color-error`               | `#f00438`       | Error message text color          |
| `--bearlab-select-opacity-disabled`          | `0.6`           | Opacity when disabled             |

---

## Accessibility

This component adheres to **WCAG 2.1 AA** standards and the ARIA combobox pattern:

- **`role="combobox"` / `role="listbox"` / `role="option"`** — Fully compliant semantic roles
- **`aria-expanded`** — Communicates open/closed dropdown state to assistive technologies
- **`aria-controls`** — Links the input to its associated listbox
- **`aria-activedescendant`** — Announces the keyboard-focused option while native focus stays on the input
- **`aria-labelledby`** — Input is connected to its label via stable `useId()` IDs
- **`aria-selected`** — Selected options are correctly flagged
- **`aria-disabled`** — Disabled options are announced as non-interactive
- **Keyboard Navigation** — Full support for `ArrowDown`, `ArrowUp`, `Enter`, `Escape`, and `Backspace` to navigate, select, and manage options
- **Click Outside** — Dropdown closes correctly when clicking outside the component

---

## TypeScript

The `Select` component is fully generic, where **`T`** represents your option type and **`T` must extend `SelectOption`**.

### `SelectOption`

This is the base interface that all options must conform to:

```ts
export interface SelectOption {
  label: string; // Display text shown in the option list
  value: string | number; // Unique identifier for the option
  image?: string; // Optional: URL for an image/avatar next to the label
  disabled?: boolean; // Optional: renders the option as non-selectable
}
```

### Exported Types

All public types are exported from the package:

```ts
import type {
  SelectOption,
  SelectProps,
  SelectClassNames,
  SelectStyles,
} from "@bearlab/select";
```

### `SelectProps`

The main component prop interface. Handles both single and multiple modes via generics:

```ts
export interface SelectProps<
  T extends SelectOption,
  Mode extends SelectMode = "single",
> extends BaseSelectProps<T> {
  mode?: Mode;
  value: SelectValue<T, Mode>;
  onChange?: (value: SelectValue<T, Mode>, option?: T) => void;
}
```

### `SelectValue`

Utility type that resolves the `value` type based on the selected `mode`:

```ts
type SelectValue<
  T extends SelectOption,
  Mode extends SelectMode = "single",
> = Mode extends "multiple" ? T["value"][] : T["value"] | null;
```

### `SelectClassNames`

```ts
interface SelectClassNames {
  root?: string;
  search?: string;
  option?: string;
  options?: string;
  selectedItem?: string;
  selectedItems?: string;
}
```

### `SelectStyles`

```ts
interface SelectStyles {
  root?: React.CSSProperties;
  search?: React.CSSProperties;
  option?: React.CSSProperties;
  options?: React.CSSProperties;
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
