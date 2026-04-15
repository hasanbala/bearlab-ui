# @bearlab/otp-form

> Accessible, fully customizable OTP (One-Time Password) Form component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/otp-form)](https://www.npmjs.com/package/@bearlab/otp-form)
[![license](https://img.shields.io/npm/l/@bearlab/otp-form)](LICENSE)
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

- ✅ **Robust Input Handling** — automatic focus progression, pasting support, keyboard navigation
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Configurable Length & Type** — customize OTP length and enforce numeric-only input
- ✅ **Accessible by default** — screen reader friendly with appropriate `aria` attributes
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Flexible Layout** — easily adaptable styling via design tokens

---

## Installation

```bash
# npm
npm install @bearlab/otp-form

# yarn
yarn add @bearlab/otp-form

# pnpm
pnpm add @bearlab/otp-form
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { useState } from "react";
import { OTPForm } from "@bearlab/otp-form";

export default function App() {
  const [value, setValue] = useState<string[]>(Array(6).fill(""));

  return (
    <OTPForm
      title="Enter Verification Code"
      value={value}
      onChange={setValue}
      length={6}
      isNumeric={true}
    />
  );
}
```

---

## Props

| Prop        | Type                                                      | Default                     | Required | Description                                            |
| ----------- | --------------------------------------------------------- | --------------------------- | -------- | ------------------------------------------------------ |
| `value`     | `string[]`                                                | —                           | ✅       | The current value of the OTP input fields              |
| `onChange`  | `(value: string[]) => void`                               | —                           | ✅       | Callback triggered when the OTP value changes          |
| `title`     | `string`                                                  | —                           | ❌       | Optional heading text rendered above the inputs        |
| `loading`   | `boolean`                                                 | `false`                     | ❌       | If true, disables input fields showing a loading state |
| `isNumeric` | `boolean`                                                 | `true`                      | ❌       | If true, enforces numeric character input only         |
| `length`    | `number`                                                  | `6`                         | ❌       | The total number of input fields to render             |
| `ariaLabel` | `string`                                                  | `"One-time password input"` | ❌       | General accessible label for the container element     |
| `className` | [`OTPFormSubComponentProps`](#otpformsubcomponentprops)   | —                           | ❌       | Per-slot className overrides                           |
| `style`     | [`OTPFormSubComponentStyles`](#otpformsubcomponentstyles) | —                           | ❌       | Per-slot inline style overrides                        |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner inputs natively using `style?.input`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `OTPFormSubComponentProps`

| Slot        | Targets                                          |
| ----------- | ------------------------------------------------ |
| `root`      | Outermost container `<div>`                      |
| `subHeader` | Inner title `<p>`                                |
| `inputs`    | Wrapper element containing all individual inputs |
| `input`     | Individual native `<input>` elements             |

```tsx
<OTPForm
  value={value}
  onChange={setValue}
  className={{
    root: "my-otp-root",
    subHeader: "my-otp-title",
    input: "my-otp-input-field",
  }}
/>
```

### `OTPFormSubComponentStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<OTPForm
  value={value}
  onChange={setValue}
  title="Verify Email"
  style={{
    root: { gap: "1.5rem" },
    input: { width: "40px", height: "40px" },
  }}
/>
```

---

## Theme Management

The `OTPForm` component features robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-otp-form-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-otp-form-root-gap: 1.5rem;
  --bearlab-otp-form-input-border-radius: 8px;
  --bearlab-otp-form-input-bg: #f9f9f9;
  --bearlab-otp-form-input-focus-border: #007bff;
}
```

---

## Accessibility

This component prioritizes **best-practice** accessibility, adhering to **WCAG 2.1 AA** standards to ensure an inclusive user experience:

- **`aria-label`** — Provides an overarching accessible name for the main container, clarifying its purpose as a one-time password entry zone.
- **`aria-hidden="true"`** — The descriptive title heading is hidden from screen readers when redundant, avoiding duplicate announcements.
- **Focus Progression** — Input fields intelligently manage focus, smoothly advancing to the next field upon alphanumeric entry, and returning back upon deletion, ensuring natural keyboard navigation parity for sighted and non-sighted users.
- **Pasting Capabilities** — Integrated paste events natively hydrate contiguous input fields automatically, dramatically reducing user friction.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  OTPFormProps,
  OTPFormSubComponentProps,
  OTPFormSubComponentStyles,
  OtpInputListProps,
  OtpInputProps,
} from "@bearlab/otp-form";
```

### `OTPFormProps`

```ts
interface OTPFormProps {
  onChange: (value: string[]) => void;
  value: string[];
  loading?: boolean;
  title?: string;
  isNumeric?: boolean;
  length?: number;
  ariaLabel?: string;
  className?: OTPFormSubComponentProps;
  style?: OTPFormSubComponentStyles;
}
```

### `OTPFormSubComponentProps`

```ts
interface OTPFormSubComponentProps {
  root?: string;
  subHeader?: string;
  inputs?: string;
  input?: string;
}
```

### `OTPFormSubComponentStyles`

```ts
interface OTPFormSubComponentStyles {
  root?: React.CSSProperties;
  subHeader?: React.CSSProperties;
  inputs?: React.CSSProperties;
  input?: React.CSSProperties;
}
```

### `OtpInputListProps`

```ts
interface OtpInputListProps {
  value: string[];
  length: number;
  disabled?: boolean;
  inputsRef: React.RefObject<HTMLInputElement[]>;
  className?: OTPFormSubComponentProps;
  style?: OTPFormSubComponentStyles;
  onChange: (value: string, index: number) => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}
```

### `OtpInputProps`

```ts
interface OtpInputProps {
  index: number;
  value: string;
  disabled?: boolean;
  length: number;
  className?: string;
  style?: React.CSSProperties;
  inputRef: (el: HTMLInputElement | null) => void;
  onChange: (value: string, index: number) => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
