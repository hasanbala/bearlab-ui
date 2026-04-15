# @bearlab/radio

> Accessible, fully customizable Radio component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/radio)](https://www.npmjs.com/package/@bearlab/radio)
[![license](https://img.shields.io/npm/l/@bearlab/radio)](LICENSE)
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

- ✅ **Controlled behavior** — native `checked` and `onChange` capability
- ✅ **Built-in `RadioGroup`** — easily manage sets of radio buttons with unified control
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — manages `aria-invalid`, `aria-required`, and `aria-describedby` dynamically
- ✅ **Information & error handling** — supports inline error messages and popover elements
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/radio

# yarn
yarn add @bearlab/radio

# pnpm
pnpm add @bearlab/radio
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Basic Radio

```tsx
import { Radio } from "@bearlab/radio";

export default function App() {
  return (
    <Radio
      name="subscription"
      value="premium"
      label="Premium Plan"
      onChange={(e) => console.log(e.target.value)}
    />
  );
}
```

### Radio Group

```tsx
import { RadioGroup } from "@bearlab/radio";

export default function App() {
  const options = [
    { label: "Basic", value: "basic" },
    { label: "Pro", value: "pro" },
    { label: "Enterprise", value: "enterprise", disabled: true },
  ];

  return (
    <RadioGroup
      name="plan"
      options={options}
      value="basic"
      onChange={(e) => console.log(e.target.value)}
      isVertical
    />
  );
}
```

---

## Props

### `RadioProps`

Extends native input props (excluding `onChange`, `checked`, `popover`, `className`, `style`).

| Prop         | Type                                               | Default | Required | Description                     |
| ------------ | -------------------------------------------------- | ------- | -------- | ------------------------------- |
| `value`      | `number \| string`                                 | —       | ✅       | Component value                 |
| `onChange`   | `(e: React.ChangeEvent<HTMLInputElement>) => void` | —       | ✅       | Callback when input changes     |
| `checked`    | `boolean`                                          | —       | ❌       | Controls checked state          |
| `name`       | `string`                                           | —       | ❌       | Name of the input               |
| `label`      | `string`                                           | —       | ❌       | Descriptive label next to radio |
| `error`      | `string`                                           | —       | ❌       | Validation error message        |
| `popover`    | `React.ReactNode`                                  | —       | ❌       | Informational popover element   |
| `disabled`   | `boolean`                                          | —       | ❌       | Disables the input              |
| `isRequired` | `boolean`                                          | —       | ❌       | Marks field as required         |
| `className`  | [`RadioClassNames`](#radioclassnames)              | —       | ❌       | Per-slot className overrides    |
| `style`      | [`RadioStyles`](#radiostyles)                      | —       | ❌       | Per-slot inline style overrides |

### `RadioGroupProps`

| Prop              | Type                                               | Default | Required | Description                                |
| ----------------- | -------------------------------------------------- | ------- | -------- | ------------------------------------------ |
| `options`         | `RadioOption[]`                                    | —       | ✅       | Array of options to render                 |
| `value`           | `number \| string`                                 | —       | ✅       | Currently selected value                   |
| `onChange`        | `(e: React.ChangeEvent<HTMLInputElement>) => void` | —       | ✅       | Global onChange handler                    |
| `name`            | `string`                                           | —       | ❌       | Global name for the radio group            |
| `disabled`        | `boolean`                                          | —       | ❌       | Disables all options                       |
| `isVertical`      | `boolean`                                          | —       | ❌       | Renders options vertically when true       |
| `aria-label`      | `string`                                           | —       | ❌       | Label for screen readers                   |
| `aria-labelledby` | `string`                                           | —       | ❌       | Element id pointing to a descriptive label |
| `className`       | [`RadioClassNames`](#radioclassnames)              | —       | ❌       | Per-slot className overrides inherited     |
| `style`           | [`RadioStyles`](#radiostyles)                      | —       | ❌       | Per-slot inline style overrides inherited  |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root label utilizing `className?.root` or style the inner indicator natively using `style?.innerDot`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `RadioClassNames`

| Slot             | Targets                              |
| ---------------- | ------------------------------------ |
| `root`           | Outermost `<label>` container        |
| `radioWrapper`   | Wrapper around the input and visuals |
| `checkedWrapper` | Visual indicator border span         |
| `innerDot`       | Inner dot that appears when checked  |
| `label`          | The text label `<span>`              |
| `error`          | The error message `<div>`            |
| `popover`        | The popover tooltip `<div>`          |

```tsx
<Radio
  label="Custom Option"
  value="custom"
  onChange={noop}
  className={{
    root: "my-radio-root",
    innerDot: "my-radio-dot",
    label: "my-radio-label",
  }}
/>
```

### `RadioStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Radio
  label="Styled Option"
  value="styled"
  onChange={noop}
  style={{
    root: { cursor: "pointer" },
    checkedWrapper: { borderColor: "blue" },
  }}
/>
```

---

## Theme Management

The `Radio` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-radio-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-radio-size: 20px;
  --bearlab-radio-border-color: #d1d5db;
  --bearlab-radio-checked-color: #2563eb;
  --bearlab-radio-label-color: #374151;
  --bearlab-radio-error-color: #ef4444;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes and HTML affordances, it guarantees an inclusive experience:

- **Semantic HTML** — Uses native `<input type="radio">` wrapped inside a `<label>` to implicitly associate labels without relying purely on IDs.
- **`aria-invalid`** — Automatically applied when the `error` prop is passed, communicating validation failure.
- **`aria-required`** — Configured via the `isRequired` prop instead of native HTML5 required, providing better programmatic validation control.
- **`aria-describedby`** — Dynamically attaches any rendered error messages or tooltip popovers to the input to ensure context is announced on focus.
- **`role="alert"` & `role="tooltip"`** — Present on the error container and popovers for distinct situational context announcements.
- **`aria-hidden="true"`** — Best-practice usage on decorative indicator elements to prevent redundant or confusing screen reader announcements.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  RadioProps,
  RadioGroupProps,
  RadioOption,
  RadioClassNames,
  RadioStyles,
} from "@bearlab/radio";
```

### `RadioProps`

```ts
interface RadioProps extends NativeInputProps {
  error?: string;
  name?: string;
  label?: string;
  popover?: string;
  checked?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  value: number | string;
  style?: RadioStyles;
  className?: RadioClassNames;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
```

### `RadioGroupProps`

```ts
interface RadioGroupProps {
  options: RadioOption[];
  disabled?: boolean;
  name?: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isVertical?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  style?: RadioStyles;
  className?: RadioClassNames;
}
```

### `RadioOption`

```ts
interface RadioOption {
  label: string;
  value: number | string;
  disabled?: boolean;
}
```

### `RadioClassNames`

```ts
interface RadioClassNames {
  root?: string;
  radioWrapper?: string;
  checkedWrapper?: string;
  innerDot?: string;
  label?: string;
  error?: string;
  popover?: string;
}
```

### `RadioStyles`

```ts
interface RadioStyles {
  root?: React.CSSProperties;
  radioWrapper?: React.CSSProperties;
  checkedWrapper?: React.CSSProperties;
  innerDot?: React.CSSProperties;
  label?: React.CSSProperties;
  error?: React.CSSProperties;
  popover?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
