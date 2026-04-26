# @bearlab/input

> Accessible, fully customizable Input component for React applications with built-in password toggle, copy-to-clipboard, and search features.

[![npm version](https://img.shields.io/npm/v/@bearlab/input)](https://www.npmjs.com/package/@bearlab/input)
[![license](https://img.shields.io/npm/l/@bearlab/input)](LICENSE)
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

- ✅ **Built-in functionalities** — Native support for `password` visibility toggle, `copy` to clipboard, and `search` button.
- ✅ **Pre/Post icons** — Easy integration of inline icons via `beforeIcon` and `afterIcon`.
- ✅ **Slot-based `className` & `style` API** — Granular styling without CSS specificity issues.
- ✅ **Accessible by default** — `aria-invalid`, `aria-required`, `aria-describedby`, label linkage (`htmlFor`), and `role="status"` on errors.
- ✅ **Dark mode support** — Natively responds to `[data-theme="dark"]` applied at any ancestor level.
- ✅ **TypeScript-first** — Fully typed props and slot interfaces.

---

## Installation

```bash
# npm
npm install @bearlab/input

# yarn
yarn add @bearlab/input

# pnpm
pnpm add @bearlab/input
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Basic Input

```tsx
import { Input } from "@bearlab/input";

export default function App() {
  return (
    <Input label="Email Address" placeholder="Enter your email" isRequired />
  );
}
```

### Password Input with Toggle

Pass `type="password"` to enable the built-in eye icon toggle. The toggle button shows/hides the password automatically.

```tsx
import { useState } from "react";
import { Input } from "@bearlab/input";

export default function App() {
  const [password, setPassword] = useState("");

  return (
    <Input
      label="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      isRequired
    />
  );
}
```

### Input with Copy to Clipboard

```tsx
import { useState } from "react";
import { Input } from "@bearlab/input";

export default function App() {
  const [token, setToken] = useState("my-api-token-xyz");

  return (
    <Input
      label="API Token"
      value={token}
      onChange={(e) => setToken(e.target.value)}
      isExistCopy
    />
  );
}
```

### Input with Search Button

```tsx
import { Input } from "@bearlab/input";

export default function App() {
  const handleSearch = () => {
    console.log("Search triggered");
  };

  return (
    <Input label="Search" placeholder="Search..." onSearch={handleSearch} />
  );
}
```

### Input with Before / After Icons

`IconType` accepts either a string (emoji, text) or an SVG component.

```tsx
import { Input } from "@bearlab/input";
import { IconMail } from "./icons";

export default function App() {
  return (
    <Input label="Email" beforeIcon={IconMail} placeholder="Enter email" />
  );
}
```

### Input with Error State

```tsx
import { Input } from "@bearlab/input";

export default function App() {
  return <Input label="Username" value="" error="This field is required." />;
}
```

---

## Props

| Prop          | Type                                  | Default  | Required | Description                                                         |
| ------------- | ------------------------------------- | -------- | -------- | ------------------------------------------------------------------- |
| `label`       | `string`                              | —        | ❌       | Label text for the input                                            |
| `name`        | `string`                              | —        | ❌       | Form field name                                                     |
| `error`       | `string`                              | —        | ❌       | Error message displayed below the input                             |
| `type`        | `React.InputHTMLAttributes["type"]`   | `"text"` | ❌       | Input type. Use `"password"` to enable the built-in toggle button   |
| `value`       | `string \| number \| ...`             | —        | ❌       | Controlled value for the input                                      |
| `disabled`    | `boolean`                             | `false`  | ❌       | Disables the input and all interactive buttons                      |
| `beforeIcon`  | `IconType`                            | —        | ❌       | Icon rendered before the input field (left slot)                    |
| `afterIcon`   | `IconType`                            | —        | ❌       | Icon rendered after the input field (right slot)                    |
| `isExistCopy` | `boolean`                             | `false`  | ❌       | Renders a copy-to-clipboard button inside the input                 |
| `isRequired`  | `boolean`                             | `false`  | ❌       | Marks the input as required (adds `*` to label and `aria-required`) |
| `onSearch`    | `() => void`                          | —        | ❌       | Renders a search button and fires this callback on click            |
| `className`   | [`InputClassNames`](#inputclassnames) | —        | ❌       | Per-slot className overrides                                        |
| `style`       | [`InputStyles`](#inputstyles)         | —        | ❌       | Per-slot inline style overrides                                     |

> Supports all native `React.InputHTMLAttributes<HTMLInputElement>` attributes (except `className` and `style`, which are replaced by the slot-based API).

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. Inject custom styles and classes directly into child elements via the `className` and `style` objects.

### `InputClassNames`

| Slot             | Targets                              |
| ---------------- | ------------------------------------ |
| `root`           | Outermost container `<div>`          |
| `label`          | Label `<label>`                      |
| `inputWrapper`   | Wrapper `<div>` around the `<input>` |
| `input`          | The actual `<input>` element         |
| `beforeIcon`     | Wrapper `<div>` for the `beforeIcon` |
| `afterIcon`      | Wrapper `<div>` for the `afterIcon`  |
| `passwordToggle` | The password toggle `<button>`       |
| `copyButton`     | The copy-to-clipboard `<button>`     |
| `searchButton`   | The search `<button>`                |
| `errorMessage`   | The error message container `<div>`  |

```tsx
<Input
  label="Username"
  className={{
    root: "my-input-root",
    input: "my-custom-input",
    label: "my-label-class",
    errorMessage: "my-error-class",
  }}
/>
```

### `InputStyles`

All slots accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Input
  label="Search"
  onSearch={() => {}}
  style={{
    inputWrapper: { borderRadius: "12px" },
    input: { fontSize: "16px" },
    label: { fontWeight: 700 },
  }}
/>
```

---

## Theme Management

The `Input` component features a built-in theme architecture. It natively responds to the **`[data-theme="dark"]`** attribute applied at any ancestor element (e.g., `<html>` or `<body>`).

In dark mode, the following tokens are automatically adjusted:

- Border color → `#1d2939`
- Text color → `rgba(255, 255, 255, 0.9)`
- Placeholder color → `rgba(255, 255, 255, 0.3)`
- Background → `#111827`
- Label color → `#98a2b3`
- Icon color → `#98a2b3`

You can still override any individual token for dark mode using your own CSS.

---

## Design Tokens (Customization)

Beyond slots, the component uses CSS custom properties (variables) scoped to the `.container` element. Override them in your own stylesheet to globally restyle the component.

```css
/* Layout & Sizing */
:root {
  --bearlab-input-height: 2.75rem; /* 44px */
  --bearlab-input-border-radius: 0.5rem; /* 8px */
  --bearlab-input-border-width: 0.125rem; /* 2px */
  --bearlab-input-padding-x: 1rem; /* 16px */
  --bearlab-input-padding-y: 0.625rem; /* 10px */
  --bearlab-input-font-size: 0.875rem; /* 14px */
}

/* Colors */
:root {
  --bearlab-input-border-color: #e4e7ec;
  --bearlab-input-border-color-focus: #465fff;
  --bearlab-input-color: #1f2937;
  --bearlab-input-placeholder-color: #98a2b3;
  --bearlab-input-background: transparent;
  --bearlab-input-label-color: #344054;
  --bearlab-input-color-error: #f00438;
  --bearlab-input-shadow-color-error: #ffa4a4;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --bearlab-input-border-color: #1d2939;
  --bearlab-input-color: rgba(255, 255, 255, 0.9);
  --bearlab-input-background: #111827;
}
```

---

## Accessibility

This component adheres to **WCAG 2.1 AA** standards:

- **Semantic Labeling** (`htmlFor` + `useId()`) — The `<label>` is correctly associated with the `<input>` via a stable generated ID. Screen readers announce the label on focus.
- **`aria-invalid`** — Automatically set to `true` when the `error` prop is present, alerting assistive technologies to the invalid state.
- **`aria-describedby`** — Dynamically links the error message container ID to the input field so screen readers can announce the error text.
- **`aria-required`** — Set when `isRequired` is `true`; signals to assistive technologies that the field must be filled before submission.
- **`role="status"` + `aria-live="polite"`** — The error message container uses a live region so errors are announced non-intrusively as they appear.
- **`aria-hidden="true"`** — Applied to decorative icons (`beforeIcon`, `afterIcon`) and the required asterisk to prevent redundant announcements.
- **Password toggle** — Includes a dynamic `aria-label` (`"Show password"` / `"Hide password"`) so screen reader users always know the current action.
- **Copy button** — Includes a dynamic `aria-label` (`"Copy to clipboard"` / `"Copied"`) reflecting the current clipboard state.

---

## TypeScript

All types are exported from the package:

```ts
import type { InputProps, InputClassNames, InputStyles } from "@bearlab/input";
```

### `InputProps`

```ts
interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "style" | "name"
> {
  name?: string;
  label?: string;
  error?: string;
  beforeIcon?: IconType;
  afterIcon?: IconType;
  isExistCopy?: boolean;
  isRequired?: boolean;
  onSearch?: () => void;
  className?: InputClassNames;
  style?: InputStyles;
}
```

> **Note:** `type="password"` activates the built-in password toggle button. `onSearch` activates the search button. `isExistCopy` activates the copy-to-clipboard button.

### `IconType`

```ts
type IconType = string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
```

### `InputClassNames`

```ts
interface InputClassNames {
  root?: string;
  label?: string;
  inputWrapper?: string;
  input?: string;
  beforeIcon?: string;
  afterIcon?: string;
  passwordToggle?: string;
  copyButton?: string;
  searchButton?: string;
  errorMessage?: string;
}
```

### `InputStyles`

```ts
interface InputStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  inputWrapper?: React.CSSProperties;
  input?: React.CSSProperties;
  beforeIcon?: React.CSSProperties;
  afterIcon?: React.CSSProperties;
  passwordToggle?: React.CSSProperties;
  copyButton?: React.CSSProperties;
  searchButton?: React.CSSProperties;
  errorMessage?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
