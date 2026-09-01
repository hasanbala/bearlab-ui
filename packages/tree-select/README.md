# @bearlab/tree-select

> Accessible, fully customizable TreeSelect component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/tree-select)](https://www.npmjs.com/package/@bearlab/tree-select)
[![license](https://img.shields.io/npm/l/@bearlab/tree-select)](LICENSE)
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

---

## Features

- ✅ **Single & Multiple selection** — toggle via `mode` prop
- ✅ **Tree-rendered options** — hierarchical dropdown with expand/collapse
- ✅ **Checkbox cascade in multiple mode** — tri-state checkboxes with parent/child cascade and indeterminate state
- ✅ **Strict checking** — independent checkboxes without cascade via `checkStrictly`
- ✅ **Built-in search** — local filtering that auto-expands matched paths, with match highlighting
- ✅ **Tag input with overflow** — selected nodes shown as removable chips with a `+N` badge
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Portal-based dropdown** — options rendered via a portal, respecting `optionZIndex`
- ✅ **Accessible by default** — `role="combobox"` / `role="tree"`, `aria-expanded`, `aria-activedescendant`, full keyboard navigation
- ✅ **TypeScript-first** — discriminated union types for type-safe `value` / `onChange` per mode
- ✅ **Form library agnostic** — works standalone, with Formik, or React Hook Form
- ✅ **Zero `@bearlab` runtime dependencies** — fully self-contained

---

## Installation

```bash
# npm
npm install @bearlab/tree-select

# yarn
yarn add @bearlab/tree-select

# pnpm
pnpm add @bearlab/tree-select
```

> **Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0` must be installed in your project.

> **Framework support:** Works with React 18/19 and Next.js — both the App Router
> and the Pages Router. Every component ships with the `"use client"` directive
> already applied, so you can import it straight into a Server Component without
> writing a wrapper file. All DOM access is SSR-guarded.

---

## Usage

### Single select

```tsx
import { TreeSelect } from "@bearlab/tree-select";
import { useState } from "react";
import type { TreeSelectOption } from "@bearlab/tree-select";

const treeData: TreeSelectOption[] = [
  {
    value: "asia",
    label: "Asia",
    children: [
      { value: "tr", label: "Türkiye" },
      { value: "jp", label: "Japan" },
    ],
  },
  {
    value: "europe",
    label: "Europe",
    children: [{ value: "de", label: "Germany" }],
  },
];

export default function App() {
  const [value, setValue] = useState<string | number | null>(null);

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={setValue}
      label="Country"
      placeholder="Select a country"
    />
  );
}
```

### Multiple select (checkbox cascade)

In `multiple` mode each node shows a tri-state checkbox. Checking a parent cascades to its enabled descendants; the emitted `value` contains checked leaves **plus** fully-checked parents. Selected nodes are rendered as removable tags (fully-checked subtrees collapse to their highest checked ancestor).

```tsx
import { TreeSelect } from "@bearlab/tree-select";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState<(string | number)[]>([]);

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(value, node) => {
        setValue(value);
        console.log({ node });
      }}
      mode="multiple"
      label="Regions"
      defaultExpandedValues={["asia"]}
    />
  );
}
```

### With Formik

The `TreeSelect` component supports both manual state updates and standard Formik event handlers.

#### Option 1: Manual update via `setFieldValue`

Ideal when you need custom logic or are handling complex values. Do **not** pass the `name` prop in this mode.

```tsx
<TreeSelect
  treeData={treeData}
  mode="multiple"
  value={values.regions}
  onChange={(value) => setFieldValue("regions", value)}
  label="Regions"
/>
```

#### Option 2: Standard update via `handleChange`

Use this for a cleaner implementation that leverages Formik's internal change handling. The `name` prop is **required** here.

```tsx
<TreeSelect
  name="country"
  treeData={treeData}
  value={values.country}
  onChange={handleChange}
  label="Country"
  placeholder="Select Option"
/>
```

> [!IMPORTANT]
> When using `setFieldValue` (Option 1), do **not** provide the `name` prop to the component. If the `name` prop is present, the component will emit a synthetic change event which may conflict with your manual `setFieldValue` call.

---

## Props

| Prop                    | Type                                                            | Default                 | Required | Description                                                                       |
| ----------------------- | --------------------------------------------------------------- | ----------------------- | -------- | --------------------------------------------------------------------------------- |
| `treeData`              | `TreeSelectOption[]`                                            | —                       | ✅       | Hierarchical options to display (see [`TreeSelectOption`](#treeselectoption))      |
| `value`                 | `TreeSelectValue<Mode>`                                         | —                       | ✅       | Current value — depends on `mode` (see [TypeScript](#typescript))                  |
| `mode`                  | `"single" \| "multiple"`                                        | `"single"`              | ❌       | Selection mode (`multiple` renders cascade checkboxes)                            |
| `checkStrictly`         | `boolean`                                                       | `false`                 | ❌       | Disable cascade — each checkbox toggles independently (only in `multiple`)         |
| `onChange`              | see [TypeScript](#typescript)                                   | —                       | ❌       | Called when selection changes                                                     |
| `label`                 | `string`                                                        | —                       | ❌       | Field label rendered above the input                                              |
| `name`                  | `string`                                                        | —                       | ❌       | Form field name (triggers synthetic change event for Formik/RHF)                  |
| `disabled`              | `boolean`                                                       | —                       | ❌       | Disables the component                                                            |
| `error`                 | `any`                                                           | —                       | ❌       | Error message displayed below the input                                           |
| `isRequired`            | `boolean`                                                       | —                       | ❌       | Marks the field as required (appends `*` to label)                                |
| `isLoading`             | `boolean`                                                       | `false`                 | ❌       | Shows a spinning loading indicator inside the dropdown                            |
| `placeholder`           | `string`                                                        | `"Select..."`           | ❌       | Placeholder text shown when nothing is selected                                   |
| `showIcon`              | `boolean`                                                       | `false`                 | ❌       | Render each node's optional `icon`                                                |
| `showLine`              | `boolean`                                                       | `false`                 | ❌       | Draw vertical indent guide lines in the dropdown                                  |
| `highlightMatch`        | `boolean`                                                       | `true`                  | ❌       | Highlight the matching query text inside node labels                              |
| `autoExpandParent`      | `boolean`                                                       | `true`                  | ❌       | Auto-expand ancestors of matched nodes during search                             |
| `defaultExpandedValues` | `NodeValue[]`                                                   | `[]`                    | ❌       | Initially expanded node values (uncontrolled)                                     |
| `expandedValues`        | `NodeValue[]`                                                   | —                       | ❌       | Controlled set of expanded node values                                            |
| `onExpand`              | `(expandedValues: NodeValue[], node: TreeSelectOption) => void` | —                       | ❌       | Called when a node is expanded/collapsed                                          |
| `emptyText`             | `string`                                                        | `"There is no options"` | ❌       | Text shown when `treeData` is empty                                               |
| `notFoundText`          | `string`                                                        | `"No result found"`     | ❌       | Text shown when a search query yields no results                                  |
| `optionZIndex`          | `number`                                                        | `8888`                  | ❌       | Z-index for the options portal overlay                                            |
| `className`             | [`TreeSelectClassNames`](#treeselectclassnames)                 | —                       | ❌       | Per-slot className overrides                                                      |
| `style`                 | [`TreeSelectStyles`](#treeselectstyles)                         | —                       | ❌       | Per-slot inline style overrides                                                   |

---

## Slot-based Customization

The component follows the **Slot Pattern** to provide deep customization without CSS specificity issues. Inject custom styles and classnames directly into child elements via the `className` and `style` props.

### `TreeSelectClassNames`

| Slot            | Targets                          |
| --------------- | -------------------------------- |
| `root`          | Outermost container `<div>`      |
| `search`        | Inner search input/wrapper       |
| `options`       | The dropdown tree container      |
| `option`        | Individual tree option row       |
| `selectedItems` | Wrapper for chosen item tags     |
| `selectedItem`  | Individual chosen item tag/chip  |
| `checkbox`      | Checkbox indicator (multiple)    |
| `expandIcon`    | Expand/collapse chevron          |

```tsx
<TreeSelect
  //... required props
  className={{
    root: "my-tree-select-root",
    options: "my-tree-select-dropdown",
    option: "my-tree-select-item",
    selectedItem: "my-tag",
  }}
/>
```

### `TreeSelectStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<TreeSelect
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

The `TreeSelect` component is fully compatible with both light and dark mode, natively responding to the **`[data-theme="dark"]`** selector applied at any ancestor element (e.g., `<html>` or `<body>`).

```html
<html data-theme="dark">
  ...
</html>
```

No additional configuration is required — the component switches color tokens automatically.

---

## Design Tokens (Customization)

Beyond slots, the component exposes a CSS custom property system for global theming. Override the defaults by redefining any `--bearlab-tree-select-*` variable in your own stylesheet. Variables follow the pattern `--bearlab-tree-select-[element]-[property]`.

```css
/* Light theme overrides */
:root,
[data-theme="light"] {
  --bearlab-tree-select-search-bg: #ffffff;
  --bearlab-tree-select-search-border-color: #e4e7ec;
  --bearlab-tree-select-search-border-color-focus: #465fff;
  --bearlab-tree-select-selected-item-bg: #ecf3ff;
  --bearlab-tree-select-selected-item-color: #465fff;
  --bearlab-tree-select-option-bg-hover: #e4e7ec;
  --bearlab-tree-select-checkbox-bg-checked: #465fff;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-tree-select-search-bg: #0f1828;
  --bearlab-tree-select-search-border-color: #1d2939;
  --bearlab-tree-select-search-border-color-focus: #7592ff;
  --bearlab-tree-select-selected-item-bg: color-mix(
    in oklab,
    #465fff 12%,
    transparent
  );
  --bearlab-tree-select-selected-item-color: #7592ff;
  --bearlab-tree-select-option-bg-hover: #1d2939;
}
```

**Key available tokens (representative sample):**

| Token                                             | Default (light) | Description                       |
| ------------------------------------------------- | --------------- | --------------------------------- |
| `--bearlab-tree-select-search-bg`                 | `#fff`          | Search input background           |
| `--bearlab-tree-select-search-border-color`       | `#e4e7ec`       | Search input border               |
| `--bearlab-tree-select-search-border-color-focus` | `#465fff`       | Border color on focus             |
| `--bearlab-tree-select-search-height`             | `2.75rem`       | Height of the search input (44px) |
| `--bearlab-tree-select-label-color`               | `#1d2939`       | Label text color                  |
| `--bearlab-tree-select-selected-item-bg`          | `#ecf3ff`       | Selected tag background           |
| `--bearlab-tree-select-selected-item-color`       | `#465fff`       | Selected tag text color           |
| `--bearlab-tree-select-options-bg`                | `#f9fafb`       | Dropdown background               |
| `--bearlab-tree-select-options-border-color`      | `#e4e7ec`       | Dropdown border color             |
| `--bearlab-tree-select-options-max-height`        | `18.75rem`      | Max height of dropdown (300px)    |
| `--bearlab-tree-select-option-bg-hover`           | `#e4e7ec`       | Option hover background           |
| `--bearlab-tree-select-option-height`             | `2.5rem`        | Option row height (40px)          |
| `--bearlab-tree-select-expand-icon-color`         | `#667085`       | Expand/collapse chevron color     |
| `--bearlab-tree-select-checkbox-bg-checked`       | `#465fff`       | Checkbox checked/indeterminate bg |
| `--bearlab-tree-select-option-highlight-color`    | `#465fff`       | Search match highlight color      |
| `--bearlab-tree-select-color-error`               | `#f00438`       | Error message text color          |
| `--bearlab-tree-select-opacity-disabled`          | `0.6`           | Opacity when disabled             |

---

## Accessibility

This component adheres to **WCAG 2.1 AA** standards, combining the ARIA combobox and tree patterns:

- **`role="combobox"` / `role="tree"` / `role="treeitem"`** — Fully compliant semantic roles
- **`aria-expanded`** — Communicates open/closed dropdown state and node expansion to assistive technologies
- **`aria-controls`** — Links the input to its associated tree
- **`aria-activedescendant`** — Announces the keyboard-focused node while native focus stays on the input
- **`aria-labelledby`** — Input is connected to its label via stable `useId()` IDs
- **`aria-selected` / `aria-checked`** — Selected/checked nodes are correctly flagged (`"mixed"` for indeterminate)
- **`aria-level`** — Communicates each node's depth in the hierarchy
- **`aria-disabled`** — Disabled nodes are announced as non-interactive
- **Keyboard Navigation** — Full support for `ArrowDown`/`ArrowUp` (move), `ArrowRight` (expand / into child), `ArrowLeft` (collapse / to parent), `Enter` (select or toggle), `Escape` (close), and `Backspace` (remove last tag)
- **Click Outside** — Dropdown closes correctly when clicking outside the component

---

## TypeScript

The `TreeSelect` component is generic over **`Mode`** (`"single" | "multiple"`), which determines the shape of `value` and `onChange`.

### `TreeSelectOption`

This is the base interface that all options must conform to:

```ts
export interface TreeSelectOption {
  value: string | number; // Unique identifier for the node (unique across the whole tree)
  label: string; // Display text shown in the row
  children?: TreeSelectOption[]; // Optional: child nodes (omit or empty array for a leaf)
  disabled?: boolean; // Optional: renders the node as non-selectable / non-cascading
  icon?: React.ReactNode; // Optional: leading icon (rendered when `showIcon`)
}
```

### Exported Types

All public types are exported from the package:

```ts
import type {
  TreeSelectOption,
  TreeSelectProps,
  TreeSelectMode,
  TreeSelectValue,
  NodeValue,
  TreeSelectClassNames,
  TreeSelectStyles,
} from "@bearlab/tree-select";
```

### `TreeSelectProps`

The main component prop interface. Handles both single and multiple modes via generics:

```ts
export interface TreeSelectProps<Mode extends TreeSelectMode = "single"> {
  treeData: TreeSelectOption[];
  mode?: Mode;
  value: TreeSelectValue<Mode>;
  onChange?: (value: TreeSelectValue<Mode>, node?: TreeSelectOption) => void;
  // ...shared props (see Props table)
}
```

### `TreeSelectValue`

Utility type that resolves the `value` type based on the selected `mode`:

```ts
type NodeValue = string | number;

type TreeSelectValue<Mode extends TreeSelectMode = "single"> =
  Mode extends "multiple" ? NodeValue[] : NodeValue | null;
```

### `TreeSelectClassNames`

```ts
interface TreeSelectClassNames {
  root?: string;
  search?: string;
  options?: string;
  option?: string;
  selectedItem?: string;
  selectedItems?: string;
  checkbox?: string;
  expandIcon?: string;
}
```

### `TreeSelectStyles`

```ts
interface TreeSelectStyles {
  root?: React.CSSProperties;
  search?: React.CSSProperties;
  options?: React.CSSProperties;
  option?: React.CSSProperties;
  selectedItem?: React.CSSProperties;
  selectedItems?: React.CSSProperties;
  checkbox?: React.CSSProperties;
  expandIcon?: React.CSSProperties;
}
```

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
