# @bearlab/input

> Accessible, fully customizable Input component for React applications with built-in password, search, and copy features.

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

- ✅ **Built-in functionalities** — Native support for `password` toggle, `copy` to clipboard, and `search` features.
- ✅ **Pre/Post icons** — Easy integration of inline icons via `beforeIcon` and `afterIcon`.
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides.
- ✅ **Accessible by default** — `aria-invalid`, `aria-describedby`, label linkage (`htmlFor`), and `role="alert"` on errors.
- ✅ **TypeScript-first** — fully typed props and slot interfaces.

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

```tsx
import { Input } from "@bearlab/input";

export default function App() {
  return (
    <Input label="Email Address" placeholder="Enter your email" isRequired />
  );
}
```

### Password Input with Toggle

```tsx
import { Input } from "@bearlab/input";
import { useState } from "react";

export default function App() {
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Input
      label="Password"
      type="password"
      value={password}
      onChange={handleChange}
      placeholder="Enter your password"
      isExistPassword={true}
      isRequired
    />
  );
}
```

---

## Props

| Prop              | Type                                  | Default | Required | Description                                                         |
| ----------------- | ------------------------------------- | ------- | -------- | ------------------------------------------------------------------- |
| `label`           | `string`                              | —       | ❌       | Label text for the input                                            |
| `error`           | `string`                              | —       | ❌       | Error message displayed below the input                             |
| `beforeIcon`      | `IconType`                            | —       | ❌       | Icon rendered before the input text                                 |
| `afterIcon`       | `IconType`                            | —       | ❌       | Icon rendered after the input text                                  |
| `isExistSearch`   | `boolean`                             | `false` | ❌       | Renders a search button inside the input                            |
| `isExistPassword` | `boolean`                             | `false` | ❌       | Enables password visibility toggle                                  |
| `isExistCopy`     | `boolean`                             | `false` | ❌       | Enables copy-to-clipboard functionality                             |
| `isRequired`      | `boolean`                             | `false` | ❌       | Marks the input as required (adds `*` to label and `aria-required`) |
| `onSearch`        | `() => void`                          | —       | ❌       | Callback fired when the search button is clicked                    |
| `className`       | [`InputClassNames`](#inputclassnames) | —       | ❌       | Per-slot className overrides                                        |
| `style`           | [`InputStyles`](#inputstyles)         | —       | ❌       | Per-slot inline style overrides                                     |

_Note: Supports all native `React.InputHTMLAttributes<HTMLInputElement>` attributes (except native `className` and `style`)._

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the wrapper utilizing `className?.inputWrapper` or style the actual input element natively using `style?.input`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `InputClassNames`

| Slot             | Targets                                      |
| ---------------- | -------------------------------------------- |
| `root`           | Outermost container `<div>`                  |
| `label`          | Label `<label>`                              |
| `inputWrapper`   | Wrapper around the `<input>` element `<div>` |
| `input`          | The actual `<input>` element                 |
| `beforeIcon`     | Wrapper for the `beforeIcon`                 |
| `afterIcon`      | Wrapper for the `afterIcon`                  |
| `passwordToggle` | The password toggle `<button>`               |
| `copyButton`     | The copy `<button>`                          |
| `searchButton`   | The search `<button>`                        |
| `errorMessage`   | The error message container `<div>`          |

```tsx
<Input
  label="Username"
  className={{
    root: "my-input-root",
    input: "my-custom-input",
    label: "my-label-class",
  }}
/>
```

### `InputStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Input
  label="Search"
  isExistSearch
  style={{
    inputWrapper: { borderRadius: "12px", border: "1px solid #ccc" },
    input: { padding: "10px" },
  }}
/>
```

---

## Theme Management

The `Input` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-input-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-input-border-radius: 8px;
  --bearlab-input-padding: 0.5rem 1rem;
  --bearlab-input-background-color: #ffffff;
  --bearlab-input-border-color: #e5e5e5;
  --bearlab-input-text-color: #1a1a1a;
  --bearlab-input-placeholder-color: #9ca3af;
  --bearlab-input-error-color: #ef4444;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **Semantic Labeling** (`htmlFor` & `useId()`) — The `<label>` is implicitly connected to the `<input>` element logic. Screen readers will naturally announce the label text on input focus.
- **`aria-invalid`** — Automatically applied when the `error` prop is present to explicitly alert screen readers of invalid input states.
- **`aria-describedby`** — Dynamically attaches the `id` of the error message container to the input field, allowing screen readers to dictate the error explicitly when navigating.
- **`aria-required`** — Corresponds with the `isRequired` prop for informative assistive support.
- **`role="alert"`** — The error message container utilizes the alert role so errors are immediately announced dynamically as they occur.
- **`aria-hidden="true"`** — Best-practice usage on decorative icons (`beforeIcon`, `afterIcon`) and visual symbols like the `isRequired` asterisk to prevent redundant screen reader verbosity. Toggles have adequate hidden symbols but retain active `aria-label` values.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  InputProps,
  InputClassNames,
  InputStyles,
  IconType,
} from "@bearlab/input";
```

### `InputProps`

```ts
interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "style"> {
  label?: string;
  error?: string;
  beforeIcon?: IconType;
  afterIcon?: IconType;
  isExistSearch?: boolean;
  isExistPassword?: boolean;
  isExistCopy?: boolean;
  isRequired?: boolean;
  onSearch?: () => void;
  className?: InputClassNames;
  style?: InputStyles;
}
```

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
