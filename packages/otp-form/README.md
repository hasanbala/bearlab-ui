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

- ✅ **Robust Input Handling** — automatic focus progression, paste support, and full keyboard navigation (`ArrowLeft`, `ArrowRight`, `Backspace`)
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity issues
- ✅ **Configurable Length & Type** — customize OTP digit count and enforce numeric-only input
- ✅ **Accessible by default** — screen reader–friendly with `aria-label`, `role="group"`, and `autoComplete="one-time-code"`
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Dark mode support** — responds to `[data-theme="dark"]` out of the box

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

| Prop        | Type                                                | Default                     | Required | Description                                         |
| ----------- | --------------------------------------------------- | --------------------------- | -------- | --------------------------------------------------- |
| `value`     | `string[]`                                          | —                           | ✅       | The current value of the OTP input fields           |
| `onChange`  | `(value: string[]) => void`                         | —                           | ✅       | Callback triggered when any OTP digit changes       |
| `name`      | `string`                                            | —                           | ❌       | HTML `name` attribute forwarded to each input       |
| `title`     | `string`                                            | —                           | ❌       | Optional label rendered above the inputs            |
| `loading`   | `boolean`                                           | `false`                     | ❌       | When `true`, disables all input fields              |
| `isNumeric` | `boolean`                                           | `true`                      | ❌       | When `true`, restricts input to digits only (`0–9`) |
| `length`    | `number`                                            | `6`                         | ❌       | Number of individual input boxes to render          |
| `ariaLabel` | `string`                                            | `"One-time password input"` | ❌       | Accessible label for the outermost container        |
| `className` | [`OTPFormClassNamesProps`](#otpformclassnamesprops) | —                           | ❌       | Per-slot className overrides                        |
| `style`     | [`OTPFormStylesProps`](#otpformstylesprops)         | —                           | ❌       | Per-slot inline style overrides                     |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. You can inject custom styles and classes directly into child elements via the `className` and `style` objects.

### `OTPFormClassNamesProps`

| Slot        | Targets                                       |
| ----------- | --------------------------------------------- |
| `root`      | Outermost container `<div>`                   |
| `subHeader` | Inner title `<p>` element                     |
| `inputs`    | Flex wrapper containing all individual inputs |
| `input`     | Individual native `<input>` elements          |

```tsx
<OTPForm
  value={value}
  onChange={setValue}
  className={{
    root: "my-otp-root",
    subHeader: "my-otp-title",
    inputs: "my-otp-inputs",
    input: "my-otp-input-field",
  }}
/>
```

### `OTPFormStylesProps`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<OTPForm
  value={value}
  onChange={setValue}
  title="Verify Email"
  style={{
    root: { gap: "1.5rem" },
    inputs: { justifyContent: "flex-start" },
    input: { width: "56px", height: "56px" },
  }}
/>
```

---

## Theme Management

The `OTPForm` component has a built-in two-theme architecture. It natively responds to **`[data-theme="dark"]`** applied to any ancestor element, automatically switching colors for the sub-header text, input border, background, text, and placeholder. No extra configuration is needed.

---

## Design Tokens (Customization)

Beyond slots, the component exposes CSS custom properties for global theming. Override them in your own stylesheet using the `--bearlab-otp-form-*` namespace:

```css
/* Light / global overrides */
:root {
  --bearlab-otp-form-input-border-color: #d0d5dd;
  --bearlab-otp-form-input-border-color-focus: #7f56d9;
  --bearlab-otp-form-input-border-radius: 0.75rem;
  --bearlab-otp-form-input-height: 3rem;
  --bearlab-otp-form-inputs-gap: 0.75rem;
  --bearlab-otp-form-subHeader-color: #344054;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --bearlab-otp-form-input-border-color: #1d2939;
  --bearlab-otp-form-input-background: #111827;
  --bearlab-otp-form-input-color: rgba(255, 255, 255, 0.9);
}
```

### Available Tokens

| Token                                         | Default (light)         | Description                 |
| --------------------------------------------- | ----------------------- | --------------------------- |
| `--bearlab-otp-form-subHeader-font-size`      | `0.875rem`              | Title font size             |
| `--bearlab-otp-form-subHeader-color`          | `#344054`               | Title text color            |
| `--bearlab-otp-form-subHeader-margin-bottom`  | `0.375rem`              | Space below title           |
| `--bearlab-otp-form-inputs-gap`               | `0.5rem`                | Gap between input boxes     |
| `--bearlab-otp-form-input-height`             | `2.75rem`               | Height of each input box    |
| `--bearlab-otp-form-input-font-size`          | `1.25rem`               | Font size inside inputs     |
| `--bearlab-otp-form-input-font-weight`        | `600`                   | Font weight inside inputs   |
| `--bearlab-otp-form-input-border-radius`      | `0.5rem`                | Border radius of each input |
| `--bearlab-otp-form-input-border-width`       | `0.125rem`              | Border width                |
| `--bearlab-otp-form-input-border-color`       | `#e4e7ec`               | Default border color        |
| `--bearlab-otp-form-input-border-color-focus` | `#465fff`               | Border color on focus       |
| `--bearlab-otp-form-input-shadow`             | `0 1px 2px 0 #1018280d` | Default box shadow          |
| `--bearlab-otp-form-input-shadow-focus`       | `0 0 0 3px #465fff21`   | Focus ring shadow           |
| `--bearlab-otp-form-input-background`         | `transparent`           | Input background color      |
| `--bearlab-otp-form-input-color`              | `#1f2937`               | Input text color            |
| `--bearlab-otp-form-input-placeholder-color`  | `#98a2b3`               | Placeholder text color      |

---

## Accessibility

This component prioritizes **best-practice** accessibility, adhering to **WCAG 2.1 AA** standards:

- **`aria-label`** — The outermost container receives an accessible name (defaults to `"One-time password input"`; override via the `ariaLabel` prop).
- **`role="group"` + `aria-labelledby`** — The inputs wrapper is announced as a group, associated with the optional `title` element.
- **`aria-label` per input** — Each individual input has a descriptive label, e.g. `"Character 1 of 6 digit code"`.
- **`aria-required="true"`** — All inputs are marked as required for assistive technologies.
- **`autoComplete="one-time-code"`** — Enables native browser autofill from SMS or authenticator apps.
- **Focus Progression** — Typing a character automatically advances focus to the next input; `Backspace` on an empty field moves focus back.
- **Arrow Key Navigation** — `ArrowLeft` and `ArrowRight` move focus between inputs without clearing values.
- **Paste Support** — Pasting a multi-character string distributes it across inputs automatically.
- **Disabled state** — When `loading={true}`, all inputs are disabled and visually indicated with `opacity: 0.6` and `cursor: not-allowed`.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  OTPFormProps,
  OTPFormClassNamesProps,
  OTPFormStylesProps,
} from "@bearlab/otp-form";
```

### `OTPFormProps`

```ts
interface OTPFormProps {
  value: string[];
  onChange: (value: string[]) => void;
  name?: string;
  title?: string;
  loading?: boolean;
  isNumeric?: boolean; // default: true
  length?: number; // default: 6
  ariaLabel?: string; // default: "One-time password input"
  className?: OTPFormClassNamesProps;
  style?: OTPFormStylesProps;
}
```

### `OTPFormClassNamesProps`

```ts
interface OTPFormClassNamesProps {
  root?: string;
  subHeader?: string;
  inputs?: string;
  input?: string;
}
```

### `OTPFormStylesProps`

```ts
interface OTPFormStylesProps {
  root?: React.CSSProperties;
  subHeader?: React.CSSProperties;
  inputs?: React.CSSProperties;
  input?: React.CSSProperties;
}
```

### `OtpInputListProps`

Internal props for the inputs container. Exported for library extension purposes.

```ts
interface OtpInputListProps {
  name?: string;
  length: number;
  value: string[];
  disabled?: boolean;
  inputsRef: React.RefObject<HTMLInputElement[]>;
  className?: OTPFormClassNamesProps;
  style?: OTPFormStylesProps;
  onChange: (value: string, index: number) => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}
```

### `OtpInputProps`

Internal props for each individual input box.

```ts
interface OtpInputProps {
  name?: string;
  index: number;
  value: string;
  length: number;
  disabled?: boolean;
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
