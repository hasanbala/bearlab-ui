# @bearlab/checkbox

> Accessible, fully customizable Checkbox component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/checkbox)](https://www.npmjs.com/package/@bearlab/checkbox)
[![license](https://img.shields.io/npm/l/@bearlab/checkbox)](LICENSE)
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

- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `aria-checked`, `aria-invalid`, `aria-describedby`, `aria-required`, `aria-disabled`
- ✅ **Built-in error & popover support** — contextual feedback via `role="alert"` and `role="tooltip"`
- ✅ **Auto-generated IDs** — stable `id` linkage via `useId()` with optional override
- ✅ **Required field indicator** — asterisk (`*`) appended to label with correct ARIA semantics
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Theme ready** — full light/dark mode compatibility via `[data-theme]`

---

## Installation

```bash
# npm
npm install @bearlab/checkbox

# yarn
yarn add @bearlab/checkbox

# pnpm
pnpm add @bearlab/checkbox
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Basic

```tsx
import { useState } from "react";
import { Checkbox } from "@bearlab/checkbox";

export default function App() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      label="Accept terms and conditions"
    />
  );
}
```

### With error and popover

```tsx
<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Enable notifications"
  isRequired
  error="You must accept the terms."
  popover="You will receive email notifications about important updates."
/>
```

### Disabled state

```tsx
<Checkbox
  checked={false}
  onChange={() => {}}
  label="Disabled option"
  disabled
/>
```

---

## Props

| Prop         | Type                                               | Default   | Required | Description                                                                |
| ------------ | -------------------------------------------------- | --------- | -------- | -------------------------------------------------------------------------- |
| `checked`    | `boolean`                                          | —         | ✅       | Whether the checkbox is checked                                            |
| `onChange`   | `(e: React.ChangeEvent<HTMLInputElement>) => void` | —         | ✅       | Event handler called when the checked state changes                        |
| `label`      | `string`                                           | —         | ❌       | Text label paired directly with the checkbox                               |
| `error`      | `any`                                              | —         | ❌       | Error message rendered below the checkbox (`role="alert"`)                 |
| `isRequired` | `boolean`                                          | `false`   | ❌       | Marks the field as required and appends an asterisk if label exists        |
| `disabled`   | `boolean`                                          | `false`   | ❌       | Disables interaction and renders the disabled icon                         |
| `popover`    | `string \| React.ReactNode`                        | —         | ❌       | Tooltip content displayed on hover/focus (`role="tooltip"`)                |
| `id`         | `string`                                           | `useId()` | ❌       | Custom ID for the input; auto-generated if omitted                         |
| `name`       | `string`                                           | —         | ❌       | Form field name forwarded to the native `<input>`                          |
| `className`  | [`CheckboxClassNames`](#checkboxclassnames)        | —         | ❌       | Per-slot className overrides                                               |
| `style`      | [`CheckboxStyles`](#checkboxstyles)                | —         | ❌       | Per-slot inline style overrides                                            |
| `...rest`    | `React.InputHTMLAttributes<HTMLInputElement>`      | —         | ❌       | Any standard HTML input attribute (except `popover`, `className`, `style`) |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. You can inject classes and inline styles into specific DOM elements via the `className` and `style` objects.

### `CheckboxClassNames`

| Slot              | Targets                                      |
| ----------------- | -------------------------------------------- |
| `root`            | Outermost `<label>` container                |
| `checkboxWrapper` | Inner structural `<div>` wrapping the input  |
| `iconChecked`     | Checked state icon SVG                       |
| `iconDisabled`    | Disabled state icon SVG                      |
| `viewError`       | Error message container `<div role="alert">` |
| `popover`         | Popover tooltip `<div role="tooltip">`       |
| `label`           | Label text `<label>` element                 |

```tsx
<Checkbox
  checked={true}
  onChange={() => {}}
  label="Custom Option"
  className={{
    root: "custom-checkbox-root",
    checkboxWrapper: "custom-checkbox-wrapper",
    label: "custom-checkbox-label",
  }}
/>
```

### `CheckboxStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Checkbox
  checked={false}
  onChange={() => {}}
  label="Styled Option"
  style={{
    root: { marginBottom: "1rem" },
    label: { fontWeight: "bold" },
  }}
/>
```

---

## Theme Management

The `Checkbox` component is fully compatible with light and dark mode contexts, natively responding to `[data-theme="dark"]` applied at the root or any ancestor element.

The following tokens change in dark mode automatically:

| Token                                       | Light default | Dark default |
| ------------------------------------------- | ------------- | ------------ |
| `--bearlab-checkbox-color`                  | `#374151`     | `#e5e7eb`    |
| `--bearlab-checkbox-label-color`            | `#344054`     | `#98a2b3`    |
| `--bearlab-checkbox-border-color-unchecked` | `#d1d5db`     | `#374151`    |
| `--bearlab-checkbox-bg-disabled`            | `#f3f4f6`     | `#374151`    |

---

## Design Tokens (Customization)

Beyond slots, the component uses scoped CSS custom properties (`--bearlab-checkbox-*`) for global design token overrides. All tokens follow the `--bearlab-checkbox-[element]-[property]` naming convention.

Override them at any ancestor scope (`:root`, a theme wrapper, or a specific parent):

```css
:root {
  /* Sizing */
  --bearlab-checkbox-size: 1.25rem; /* 20px — checkbox box size */
  --bearlab-checkbox-border-radius: 0.25rem; /* 4px */
  --bearlab-checkbox-gap: 0.75rem; /* 12px — gap between box and label */

  /* Colors (light) */
  --bearlab-checkbox-bg-checked: #465fff;
  --bearlab-checkbox-border-color-checked: #465fff;
  --bearlab-checkbox-border-color-unchecked: #d1d5db;
  --bearlab-checkbox-check-color: #ffffff;
  --bearlab-checkbox-color-error: #f00438;
  --bearlab-checkbox-color-focus: #465fff;

  /* Label */
  --bearlab-checkbox-label-font-size: 0.875rem;
  --bearlab-checkbox-label-font-weight: 600;
  --bearlab-checkbox-label-color: #344054;

  /* Popover */
  --bearlab-checkbox-popover-bg: #ffffff;
  --bearlab-checkbox-popover-font-size: 0.8125rem;
  --bearlab-checkbox-popover-border-radius: 0.5rem;
}
```

---

## Accessibility

This component is built to **WCAG 2.1 AA** standards:

- **`type="checkbox"`** — native `<input>` ensures built-in keyboard navigation and browser semantics.
- **`aria-checked`** — reflects the checked state for assistive technologies.
- **`aria-invalid`** — set to `"true"` when an `error` prop is present.
- **`aria-required`** — set to `"true"` when `isRequired` is true.
- **`aria-disabled`** — reflects the disabled state explicitly.
- **`aria-describedby`** — links the input to both its error (`role="alert"`) and popover (`role="tooltip"`) using stable IDs from `useId()`.
- **`role="alert"` + `aria-live="polite"` + `aria-atomic="true"`** — error message is announced by screen readers when it appears.
- **`aria-hidden="true"` / `focusable="false"`** — decorative SVG icons (`IconChecked`, `IconDisabled`, `IconErrorTriangle`) are hidden from the accessibility tree.
- **`<label htmlFor={id}>`** — correct programmatic association; clicking the label toggles the checkbox.
- **Focus ring** — `focus-visible` outline applied to the checkbox wrapper for keyboard-only users.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  CheckboxProps,
  CheckboxClassNames,
  CheckboxStyles,
} from "@bearlab/checkbox";
```

### `CheckboxClassNames`

```ts
interface CheckboxClassNames {
  root?: string;
  checkboxWrapper?: string;
  iconChecked?: string;
  iconDisabled?: string;
  viewError?: string;
  popover?: string;
  label?: string;
}
```

### `CheckboxStyles`

```ts
interface CheckboxStyles {
  root?: React.CSSProperties;
  checkboxWrapper?: React.CSSProperties;
  iconChecked?: React.CSSProperties;
  iconDisabled?: React.CSSProperties;
  viewError?: React.CSSProperties;
  popover?: React.CSSProperties;
  label?: React.CSSProperties;
}
```

### `CheckboxProps`

```ts
interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "popover" | "className" | "style"
> {
  error?: any;
  name?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  style?: CheckboxStyles;
  className?: CheckboxClassNames;
  popover?: string | React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
