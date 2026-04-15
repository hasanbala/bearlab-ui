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
- ✅ **Accessible by default** — `aria-checked`, `aria-invalid`, `aria-describedby`
- ✅ **Built-in error & popover support** — easily provide contextual feedback
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Theme Ready** — full compatibility with light/dark contexts

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

```tsx
import { useState } from "react";
import { Checkbox } from "@bearlab/checkbox";

export default function App() {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <>
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="Accept terms and conditions"
      />
      <Checkbox
        checked={checked2}
        onChange={(e) => setChecked2(e.target.checked)}
        label="Enable notifications"
        popover="You will receive email notifications about important updates"
      />
    </>
  );
}
```

---

## Props

| Prop         | Type                                               | Default | Required | Description                                                         |
| ------------ | -------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------- |
| `checked`    | `boolean`                                          | —       | ✅       | Whether the checkbox is checked                                     |
| `onChange`   | `(e: React.ChangeEvent<HTMLInputElement>) => void` | —       | ✅       | Event handler called when the checked state changes                 |
| `label`      | `string`                                           | —       | ❌       | Text label paired directly with the checkbox                        |
| `error`      | `any`                                              | —       | ❌       | Error message rendered below the checkbox                           |
| `isRequired` | `boolean`                                          | `false` | ❌       | Marks the field as required and appends an asterisk if label exists |
| `disabled`   | `boolean`                                          | `false` | ❌       | Disables interaction with the checkbox                              |
| `popover`    | `string \| React.ReactNode`                        | —       | ❌       | Tooltip or contextual info displayed alongside the checkbox         |
| `className`  | [`CheckboxClassNames`](#checkboxclassnames)        | —       | ❌       | Per-slot className overrides                                        |
| `style`      | [`CheckboxStyles`](#checkboxstyles)                | —       | ❌       | Per-slot inline style overrides                                     |
| `...rest`    | `InputProps`                                       | —       | ❌       | Any standard HTML input props                                       |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.checkboxWrapper`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `CheckboxClassNames`

| Slot              | Targets                           |
| ----------------- | --------------------------------- |
| `root`            | Outermost container `<label>`     |
| `checkboxWrapper` | Inner structural wrapper `<div>`  |
| `iconChecked`     | Checked icon SVG                  |
| `iconDisabled`    | Disabled icon SVG                 |
| `viewError`       | Error message container `<div>`   |
| `popover`         | Popover tooltip container `<div>` |
| `label`           | Label text wrapper `<label>`      |

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

The `Checkbox` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-checkbox-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-checkbox-root-padding: 0.5rem;
  --bearlab-checkbox-wrapper-border-radius: 4px;
  --bearlab-checkbox-label-color: #1a1a1a;
  --bearlab-checkbox-icon-color: #ffffff;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`type="checkbox"`** — Uses semantic native inputs inside structural wrappers for built-in keyboard navigation.
- **`aria-checked`** — Mirrors the `checked` state to explicitly broadcast internal representation limits.
- **`aria-invalid`, `aria-required`, `aria-disabled`** — Dynamically updates according to state to assure screen-reader synchronization.
- **`aria-describedby`** — Semantically links the `input` to its specific error message and popover descriptions using dynamically generated, stable IDs (`useId()`).
- **`aria-hidden="true"`, `focusable="false"`** — Best-practice usage on cosmetic SVGs (`IconChecked`, `IconDisabled`, `IconErrorTriangle`) to prevent redundant or confusing screen reader announcements.
- **`<label htmlFor={id}>`** — Correct programmatic association of label tags, expanding the interactive click target.

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
interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "popover" | "className" | "style"
  > {
  error?: any;
  name?: string;
  label?: string;
  popover?: string | React.ReactNode;
  checked: boolean;
  disabled?: boolean;
  className?: CheckboxClassNames;
  style?: CheckboxStyles;
  isRequired?: boolean;
  onChange: (val: React.ChangeEvent<HTMLInputElement>) => void;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
