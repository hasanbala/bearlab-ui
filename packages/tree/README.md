# @bearlab/tree

> Accessible, fully customizable Tree component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/tree)](https://www.npmjs.com/package/@bearlab/tree)
[![license](https://img.shields.io/npm/l/@bearlab/tree)](LICENSE)
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

- ✅ **Single & Multiple selection** — node highlight selection via `mode` prop
- ✅ **Checkbox mode** — tri-state checkboxes with parent/child cascade and indeterminate state (`checkable`)
- ✅ **Strict checking** — independent checkboxes without cascade via `checkStrictly`
- ✅ **Built-in search** — optional local filtering that auto-expands matched paths, with match highlighting
- ✅ **Controlled or uncontrolled expansion** — `expandedValues` / `defaultExpandedValues` + `onExpand`
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `role="tree"`, `aria-expanded`, `aria-checked`, `aria-activedescendant`, full keyboard navigation
- ✅ **TypeScript-first** — discriminated union types for type-safe `value` / `onChange` per mode
- ✅ **Form library agnostic** — works standalone, with Formik, or React Hook Form
- ✅ **Zero `@bearlab` runtime dependencies** — fully self-contained

---

## Installation

```bash
# npm
npm install @bearlab/tree

# yarn
yarn add @bearlab/tree

# pnpm
pnpm add @bearlab/tree
```

> **Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0` must be installed in your project.

> **Framework support:** Works with React 18/19 and Next.js — both the App Router
> and the Pages Router. Every component ships with the `"use client"` directive
> already applied, so you can import it straight into a Server Component without
> writing a wrapper file. All DOM access is SSR-guarded.

---

## Usage

### Single selection

```tsx
import { Tree } from "@bearlab/tree";
import { useState } from "react";
import type { TreeNode } from "@bearlab/tree";

const treeData: TreeNode[] = [
  {
    value: "fruits",
    label: "Fruits",
    children: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
    ],
  },
  {
    value: "vegetables",
    label: "Vegetables",
    children: [{ value: "carrot", label: "Carrot" }],
  },
];

export default function App() {
  const [value, setValue] = useState<string | number | null>(null);

  return (
    <Tree
      treeData={treeData}
      value={value}
      onChange={setValue}
      label="Categories"
      defaultExpandedValues={["fruits"]}
    />
  );
}
```

### Checkbox mode (cascade + indeterminate)

When `checkable` is set, `value` is always an array. Checking a parent cascades to its enabled descendants; a parent becomes indeterminate when only some of its children are checked. The emitted `value` contains checked leaves **plus** fully-checked parents.

```tsx
import { Tree } from "@bearlab/tree";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState<(string | number)[]>([]);

  return (
    <Tree
      treeData={treeData}
      value={value}
      onChange={(value, node, info) => {
        setValue(value);
        console.log({ node, halfChecked: info?.halfCheckedValues });
      }}
      checkable
      label="Select Categories"
    />
  );
}
```

### Multiple highlight selection with search

```tsx
<Tree
  treeData={treeData}
  value={value}
  onChange={setValue}
  mode="multiple"
  showSearch
  showLine
  searchPlaceholder="Search nodes..."
  label="Departments"
/>
```

### With Formik

The `Tree` component supports both manual state updates and standard Formik event handlers.

#### Option 1: Manual update via `setFieldValue`

Ideal when you need custom logic or are handling complex values. Do **not** pass the `name` prop in this mode.

```tsx
<Tree
  treeData={treeData}
  checkable
  value={values.categories}
  onChange={(value) => setFieldValue("categories", value)}
  label="Categories"
/>
```

#### Option 2: Standard update via `handleChange`

Use this for a cleaner implementation that leverages Formik's internal change handling. The `name` prop is **required** here.

```tsx
<Tree
  name="categories"
  treeData={treeData}
  checkable
  value={values.categories}
  onChange={handleChange}
  label="Categories"
/>
```

> [!IMPORTANT]
> When using `setFieldValue` (Option 1), do **not** provide the `name` prop to the component. If the `name` prop is present, the component will emit a synthetic change event which may conflict with your manual `setFieldValue` call.

---

## Props

| Prop                    | Type                                                    | Default              | Required | Description                                                                     |
| ----------------------- | ------------------------------------------------------- | -------------------- | -------- | ------------------------------------------------------------------------------- |
| `treeData`              | `TreeNode[]`                                            | —                    | ✅       | Hierarchical data to render (see [`TreeNode`](#treenode))                       |
| `value`                 | `TreeValue<Mode>` \| `NodeValue[]`                      | —                    | ✅       | Current value — depends on `mode` / `checkable` (see [TypeScript](#typescript)) |
| `mode`                  | `"single" \| "multiple"`                                | `"single"`           | ❌       | Highlight selection mode (ignored when `checkable`)                             |
| `checkable`             | `boolean`                                               | `false`              | ❌       | Render tri-state checkboxes; forces `value` to an array                         |
| `checkStrictly`         | `boolean`                                               | `false`              | ❌       | Disable cascade — each checkbox toggles independently (only with `checkable`)   |
| `onChange`              | see [TypeScript](#typescript)                           | —                    | ❌       | Called when selection / checked state changes                                   |
| `label`                 | `string`                                                | —                    | ❌       | Field label rendered above the tree                                             |
| `name`                  | `string`                                                | —                    | ❌       | Form field name (triggers synthetic change event for Formik/RHF)                |
| `disabled`              | `boolean`                                               | —                    | ❌       | Disables the whole tree                                                         |
| `error`                 | `any`                                                   | —                    | ❌       | Error message displayed below the tree                                          |
| `isRequired`            | `boolean`                                               | —                    | ❌       | Marks the field as required (appends `*` to label)                              |
| `showIcon`              | `boolean`                                               | `false`              | ❌       | Render each node's optional `icon`                                              |
| `showLine`              | `boolean`                                               | `false`              | ❌       | Draw vertical indent guide lines                                                |
| `showSearch`            | `boolean`                                               | `false`              | ❌       | Render a search box that filters and auto-expands matched paths                 |
| `searchPlaceholder`     | `string`                                                | `"Search..."`        | ❌       | Placeholder for the search box                                                  |
| `highlightMatch`        | `boolean`                                               | `true`               | ❌       | Highlight the matching query text inside node labels                            |
| `autoExpandParent`      | `boolean`                                               | `true`               | ❌       | Auto-expand ancestors of matched nodes during search                            |
| `defaultExpandedValues` | `NodeValue[]`                                           | `[]`                 | ❌       | Initially expanded node values (uncontrolled)                                   |
| `expandedValues`        | `NodeValue[]`                                           | —                    | ❌       | Controlled set of expanded node values                                          |
| `onExpand`              | `(expandedValues: NodeValue[], node: TreeNode) => void` | —                    | ❌       | Called when a node is expanded/collapsed                                        |
| `emptyText`             | `string`                                                | `"There is no data"` | ❌       | Text shown when `treeData` is empty                                             |
| `notFoundText`          | `string`                                                | `"No result found"`  | ❌       | Text shown when a search query yields no results                                |
| `className`             | [`TreeClassNames`](#treeclassnames)                     | —                    | ❌       | Per-slot className overrides                                                    |
| `style`                 | [`TreeStyles`](#treestyles)                             | —                    | ❌       | Per-slot inline style overrides                                                 |

---

## Slot-based Customization

The component follows the **Slot Pattern** to provide deep customization without CSS specificity issues. Inject custom styles and classnames directly into child elements via the `className` and `style` props.

### `TreeClassNames`

| Slot          | Targets                          |
| ------------- | -------------------------------- |
| `root`        | Outermost container `<div>`      |
| `search`      | Search box wrapper               |
| `tree`        | The `role="tree"` list container |
| `node`        | Individual node row              |
| `nodeContent` | Inner row content wrapper        |
| `label`       | Node label text                  |
| `checkbox`    | Checkbox indicator               |
| `expandIcon`  | Expand/collapse chevron          |

```tsx
<Tree
  //... required props
  className={{
    root: "my-tree-root",
    tree: "my-tree-list",
    node: "my-tree-node",
    label: "my-tree-label",
  }}
/>
```

### `TreeStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Tree
  //... required props
  style={{
    root: { maxWidth: "360px" },
    tree: { maxHeight: "280px" },
    node: { fontWeight: 500 },
  }}
/>
```

---

## Theme Management

The `Tree` component is fully compatible with both light and dark mode, natively responding to the **`[data-theme="dark"]`** selector applied at any ancestor element (e.g., `<html>` or `<body>`).

```html
<html data-theme="dark">
  ...
</html>
```

No additional configuration is required — the component switches color tokens automatically.

---

## Design Tokens (Customization)

Beyond slots, the component exposes a CSS custom property system for global theming. Override the defaults by redefining any `--bearlab-tree-*` variable in your own stylesheet. Variables follow the pattern `--bearlab-tree-[element]-[property]`.

```css
/* Light theme overrides */
:root,
[data-theme="light"] {
  --bearlab-tree-bg: #f9fafb;
  --bearlab-tree-border-color: #e4e7ec;
  --bearlab-tree-node-bg-hover: #e4e7ec;
  --bearlab-tree-node-selected-bg: #ecf3ff;
  --bearlab-tree-checkbox-bg-checked: #465fff;
  --bearlab-tree-highlight-color: #465fff;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-tree-bg: #0f1828;
  --bearlab-tree-border-color: #1d2939;
  --bearlab-tree-node-bg-hover: #1d2939;
  --bearlab-tree-node-selected-bg: color-mix(
    in oklab,
    #465fff 12%,
    transparent
  );
  --bearlab-tree-highlight-color: #7592ff;
}
```

**Key available tokens (representative sample):**

| Token                                | Default (light) | Description                       |
| ------------------------------------ | --------------- | --------------------------------- |
| `--bearlab-tree-bg`                  | `#f9fafb`       | Tree panel background             |
| `--bearlab-tree-border-color`        | `#e4e7ec`       | Tree panel border                 |
| `--bearlab-tree-max-height`          | `22rem`         | Max height of the tree (352px)    |
| `--bearlab-tree-label-color`         | `#1d2939`       | Label text color                  |
| `--bearlab-tree-node-height`         | `2.25rem`       | Node row height (36px)            |
| `--bearlab-tree-node-bg-hover`       | `#e4e7ec`       | Node hover background             |
| `--bearlab-tree-node-selected-bg`    | `#ecf3ff`       | Selected node background          |
| `--bearlab-tree-node-bg-active`      | `#f2f4f7`       | Keyboard-active node background   |
| `--bearlab-tree-expand-icon-color`   | `#667085`       | Expand/collapse chevron color     |
| `--bearlab-tree-line-color`          | `#e4e7ec`       | Indent guide line color           |
| `--bearlab-tree-checkbox-bg-checked` | `#465fff`       | Checkbox checked/indeterminate bg |
| `--bearlab-tree-highlight-color`     | `#465fff`       | Search match highlight color      |
| `--bearlab-tree-color-error`         | `#f00438`       | Error message text color          |
| `--bearlab-tree-opacity-disabled`    | `0.6`           | Opacity when disabled             |

---

## Accessibility

This component adheres to **WCAG 2.1 AA** standards and the ARIA tree pattern:

- **`role="tree"` / `role="treeitem"`** — Fully compliant semantic roles
- **`aria-expanded`** — Communicates open/closed state of parent nodes
- **`aria-selected`** — Selected nodes are correctly flagged in highlight modes
- **`aria-checked`** — Reflects checkbox state, including `"mixed"` for indeterminate nodes
- **`aria-level`** — Communicates each node's depth in the hierarchy
- **`aria-activedescendant`** — Announces the keyboard-focused node while native focus stays on the tree container
- **`aria-labelledby`** — Tree is connected to its label via stable `useId()` IDs
- **`aria-disabled`** — Disabled nodes are announced as non-interactive
- **Keyboard Navigation** — Full support for `ArrowUp`/`ArrowDown` (move), `ArrowRight` (expand / into child), `ArrowLeft` (collapse / to parent), `Enter`/`Space` (select or toggle checkbox), and `Escape`

---

## TypeScript

The `Tree` component is generic over **`Mode`** (`"single" | "multiple"`), which determines the shape of `value` and `onChange`.

### `TreeNode`

This is the base interface that all nodes must conform to:

```ts
export interface TreeNode {
  value: string | number; // Unique identifier for the node (unique across the whole tree)
  label: string; // Display text shown in the row
  children?: TreeNode[]; // Optional: child nodes (omit or empty array for a leaf)
  disabled?: boolean; // Optional: renders the node as non-selectable / non-cascading
  icon?: React.ReactNode; // Optional: leading icon (rendered when `showIcon`)
}
```

### Exported Types

All public types are exported from the package:

```ts
import type {
  TreeNode,
  TreeProps,
  TreeMode,
  TreeValue,
  NodeValue,
  CheckInfo,
  TreeClassNames,
  TreeStyles,
} from "@bearlab/tree";
```

### `TreeProps`

The main component prop interface is a discriminated union on `checkable`:

```ts
// checkable === false (default): highlight selection, value shape follows `mode`
interface SelectTreeProps<Mode extends TreeMode = "single"> {
  checkable?: false;
  mode?: Mode;
  value: TreeValue<Mode>;
  onChange?: (value: TreeValue<Mode>, node?: TreeNode) => void;
  // ...shared base props
}

// checkable === true: checkbox cascade, value is always an array
interface CheckableTreeProps {
  checkable: true;
  checkStrictly?: boolean;
  value: NodeValue[];
  onChange?: (value: NodeValue[], node?: TreeNode, info?: CheckInfo) => void;
  // ...shared base props
}

export type TreeProps<Mode extends TreeMode = "single"> =
  | SelectTreeProps<Mode>
  | CheckableTreeProps;
```

### `TreeValue`

Utility type that resolves the `value` type based on the selected `mode`:

```ts
type NodeValue = string | number;

type TreeValue<Mode extends TreeMode = "single"> = Mode extends "multiple"
  ? NodeValue[]
  : NodeValue | null;
```

### `CheckInfo`

Extra information passed as the third `onChange` argument in checkable mode:

```ts
interface CheckInfo {
  checked: boolean; // New checked state of the toggled node
  node: TreeNode; // The toggled node
  checkedValues: NodeValue[]; // The emitted value (checked leaves + fully-checked parents)
  halfCheckedValues: NodeValue[]; // Derived indeterminate node values
}
```

### `TreeClassNames`

```ts
interface TreeClassNames {
  root?: string;
  search?: string;
  tree?: string;
  node?: string;
  nodeContent?: string;
  label?: string;
  checkbox?: string;
  expandIcon?: string;
}
```

### `TreeStyles`

```ts
interface TreeStyles {
  root?: React.CSSProperties;
  search?: React.CSSProperties;
  tree?: React.CSSProperties;
  node?: React.CSSProperties;
  nodeContent?: React.CSSProperties;
  label?: React.CSSProperties;
  checkbox?: React.CSSProperties;
  expandIcon?: React.CSSProperties;
}
```

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
