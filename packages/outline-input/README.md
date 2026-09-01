# @bearlab/outline-input

> Accessible, fully customizable floating-label Input component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/outline-input)](https://www.npmjs.com/package/@bearlab/outline-input)
[![license](https://img.shields.io/npm/l/@bearlab/outline-input)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Icons, Password, Copy & Search](#icons-password-copy--search)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)

---

## Features

- ✅ **Floating label** — the `label` doubles as the placeholder and lifts to the field's top-left on focus or when filled
- ✅ **Taller field** — a more spacious outline style than the standard input
- ✅ **Password toggle** — show/hide for `type="password"`
- ✅ **Copy to clipboard** — built-in copy button with success feedback
- ✅ **Search action** — optional trailing search button via `onSearch`
- ✅ **Leading & trailing icons** — string or SVG component icons
- ✅ **Inline error** — accessible error message with `aria-describedby`
- ✅ **Slot-based `className` & `style` API** — granular styling of every element
- ✅ **Dark mode ready** — responds to `[data-theme="dark"]` automatically
- ✅ **TypeScript-first** — fully typed props

---

## Installation

```bash
# npm
npm install @bearlab/outline-input

# yarn
yarn add @bearlab/outline-input

# pnpm
pnpm add @bearlab/outline-input
```

> **Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0` must be installed in your project.

> **Framework support:** Works with React 18/19 and Next.js — both the App Router
> and the Pages Router. Every component ships with the `"use client"` directive
> already applied, so you can import it straight into a Server Component without
> writing a wrapper file. All DOM access is SSR-guarded.

---

## Usage

### Basic

```tsx
import { OutlineInput } from "@bearlab/outline-input";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <OutlineInput
      name="email"
      label="Email address"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Password with copy

```tsx
<OutlineInput
  type="password"
  label="Password"
  value={value}
  isExistCopy
  isRequired
  onChange={(e) => setValue(e.target.value)}
/>
```

### With error

```tsx
<OutlineInput
  label="Username"
  value={value}
  error="This username is already taken"
  onChange={(e) => setValue(e.target.value)}
/>
```

> The `label` is the floating placeholder — there is no separate top label, and the native `placeholder` prop is not used.

---

## Props

`OutlineInputProps` extends the native `<input>` attributes (minus `className`, `style`, `name`, and `placeholder`).

| Prop          | Type                                                  | Default  | Required | Description                                             |
| ------------- | ----------------------------------------------------- | -------- | -------- | ------------------------------------------------------- |
| `label`       | `string`                                              | —        | ❌       | Floating label / placeholder text                       |
| `name`        | `string`                                              | —        | ❌       | Input name                                              |
| `value`       | `string \| number`                                    | —        | ❌       | Controlled value                                        |
| `type`        | `string`                                              | `"text"` | ❌       | Input type (`"password"` enables the visibility toggle) |
| `error`       | `string`                                              | —        | ❌       | Inline error message                                    |
| `isRequired`  | `boolean`                                             | `false`  | ❌       | Marks the field required (asterisk + `aria-required`)   |
| `isExistCopy` | `boolean`                                             | `false`  | ❌       | Shows a copy-to-clipboard button                        |
| `beforeIcon`  | `string \| ComponentType<SVGProps>`                   | —        | ❌       | Leading icon                                            |
| `afterIcon`   | `string \| ComponentType<SVGProps>`                   | —        | ❌       | Trailing icon                                           |
| `onSearch`    | `() => void`                                          | —        | ❌       | Shows a trailing search button and handles its click    |
| `className`   | [`OutlineInputClassNames`](#slot-based-customization) | —        | ❌       | Per-slot className overrides                            |
| `style`       | [`OutlineInputStyles`](#slot-based-customization)     | —        | ❌       | Per-slot inline style overrides                         |

---

## Icons, Password, Copy & Search

```tsx
import { OutlineInput } from "@bearlab/outline-input";
import { MailIcon } from "./icons";

<OutlineInput label="Email" beforeIcon={MailIcon} />
<OutlineInput label="Search" onSearch={() => runSearch()} />
<OutlineInput label="API key" isExistCopy value={key} />
<OutlineInput label="Password" type="password" />
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to enable surgical styling of any element.

### `OutlineInputClassNames`

| Slot             | Targets                           |
| ---------------- | --------------------------------- |
| `root`           | Outer container `<div>`           |
| `inputWrapper`   | Relative wrapper around the input |
| `input`          | The `<input>` element             |
| `label`          | Floating label                    |
| `beforeIcon`     | Leading icon wrapper              |
| `afterIcon`      | Trailing icon wrapper             |
| `passwordToggle` | Password visibility button        |
| `copyButton`     | Copy button                       |
| `searchButton`   | Search button                     |
| `errorMessage`   | Error message row                 |

### `OutlineInputStyles`

Every slot also accepts inline `React.CSSProperties` via the `style` prop with the same keys.

---

## Theme Management

The component automatically adapts when a `data-theme="dark"` attribute is present
on any ancestor element.

```html
<html data-theme="dark">
  ...
</html>
```

---

## Design Tokens (Customization)

All visual defaults are scoped CSS custom properties on the component root.
Override them with `--bearlab-outline-input-*` variables.

```css
[data-theme="light"] {
  --bearlab-outline-input-height: 3.5rem;
  --bearlab-outline-input-border-color-focus: #465fff;
  --bearlab-outline-input-label-bg: #ffffff;
}
```

**Key tokens:**

| Token                                             | Default (light) | Description                           |
| ------------------------------------------------- | --------------- | ------------------------------------- |
| `--bearlab-outline-input-height`                  | `3.5rem`        | Field height                          |
| `--bearlab-outline-input-border-radius`           | `0.5rem`        | Border radius                         |
| `--bearlab-outline-input-border-color-focus`      | `#465fff`       | Focus border color                    |
| `--bearlab-outline-input-label-font-size`         | `1rem`          | Idle (placeholder) label size         |
| `--bearlab-outline-input-label-font-size-floated` | `0.75rem`       | Floated label size                    |
| `--bearlab-outline-input-label-bg`                | `#ffffff`       | Notch background behind floated label |
| `--bearlab-outline-input-color-error`             | `#f00438`       | Error color                           |

> **Note:** `--bearlab-outline-input-label-bg` must match the background behind the
> field so the floated label's "notch" cleanly cuts the border.

---

## Accessibility

- The `<input>` is associated with its floating `<label>` via `htmlFor` / `id`.
- Error messages use `role="status"` + `aria-live="polite"` and are linked through `aria-describedby`.
- `aria-invalid` and `aria-required` reflect the `error` and `isRequired` props.
- Password, copy, and search controls are real `<button>`s with descriptive `aria-label`s; icons are `aria-hidden="true"`.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  OutlineInputProps,
  OutlineInputClassNames,
  OutlineInputStyles,
} from "@bearlab/outline-input";
```

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
