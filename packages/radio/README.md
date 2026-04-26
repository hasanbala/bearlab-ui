# @bearlab/radio

> Accessible, fully customizable Radio and RadioGroup components for React applications.

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
- ✅ **Popover support** — show contextual tooltip text on hover/focus
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — manages `aria-invalid`, `aria-required`, and `aria-describedby` dynamically
- ✅ **Error handling** — built-in inline error messages with icon
- ✅ **Dark mode support** — responds to `[data-theme="dark"]` automatically
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
import { useState } from "react";
import { Radio } from "@bearlab/radio";

export default function App() {
  const [selected, setSelected] = useState("basic");

  return (
    <Radio
      name="plan"
      value="basic"
      label="Basic Plan"
      checked={selected === "basic"}
      onChange={(e) => setSelected(e.target.value)}
    />
  );
}
```

### Radio with Error & Popover

```tsx
<Radio
  name="plan"
  value="pro"
  label="Pro Plan"
  checked={false}
  isRequired
  error="Please select a plan to continue"
  popover="The Pro plan includes unlimited access."
  onChange={(e) => console.log(e.target.value)}
/>
```

### Radio Group

```tsx
import { useState } from "react";
import { RadioGroup } from "@bearlab/radio";

export default function App() {
  const [selected, setSelected] = useState("basic");

  const options = [
    { label: "Basic", value: "basic" },
    { label: "Pro", value: "pro" },
    { label: "Enterprise", value: "enterprise", disabled: true },
  ];

  return (
    <RadioGroup
      name="plan"
      options={options}
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      isVertical
      aria-label="Pricing plan"
    />
  );
}
```

---

## Props

### `RadioProps`

Extends native `<input>` props (excluding `onChange`, `checked`, `popover`, `className`, `style`).

| Prop         | Type                                               | Default | Required | Description                              |
| ------------ | -------------------------------------------------- | ------- | -------- | ---------------------------------------- |
| `value`      | `number \| string`                                 | —       | ✅       | Value of this radio option               |
| `onChange`   | `(e: React.ChangeEvent<HTMLInputElement>) => void` | —       | ✅       | Callback when the radio changes          |
| `checked`    | `boolean`                                          | —       | ❌       | Controls the checked state               |
| `name`       | `string`                                           | —       | ❌       | Name attribute shared across the group   |
| `label`      | `string`                                           | —       | ❌       | Descriptive label rendered next to radio |
| `error`      | `string`                                           | —       | ❌       | Validation error message                 |
| `popover`    | `string`                                           | —       | ❌       | Tooltip text shown on hover/focus        |
| `disabled`   | `boolean`                                          | —       | ❌       | Disables the radio input                 |
| `isRequired` | `boolean`                                          | —       | ❌       | Marks field as required (appends `*`)    |
| `className`  | [`RadioClassNames`](#radioclassnames)              | —       | ❌       | Per-slot className overrides             |
| `style`      | [`RadioStyles`](#radiostyles)                      | —       | ❌       | Per-slot inline style overrides          |

### `RadioGroupProps`

| Prop              | Type                                               | Default | Required | Description                                            |
| ----------------- | -------------------------------------------------- | ------- | -------- | ------------------------------------------------------ |
| `options`         | `RadioOption[]`                                    | —       | ✅       | Array of radio options to render                       |
| `value`           | `number \| string`                                 | —       | ✅       | Currently selected value                               |
| `onChange`        | `(e: React.ChangeEvent<HTMLInputElement>) => void` | —       | ✅       | Shared onChange handler                                |
| `name`            | `string`                                           | —       | ❌       | Shared name attribute for all radio inputs             |
| `disabled`        | `boolean`                                          | —       | ❌       | Disables all options in the group                      |
| `isVertical`      | `boolean`                                          | `false` | ❌       | Renders options in a vertical column when `true`       |
| `aria-label`      | `string`                                           | —       | ❌       | Accessible label for the group                         |
| `aria-labelledby` | `string`                                           | —       | ❌       | ID of an element that labels the group                 |
| `className`       | [`RadioClassNames`](#radioclassnames)              | —       | ❌       | Per-slot className overrides (passed to each Radio)    |
| `style`           | [`RadioStyles`](#radiostyles)                      | —       | ❌       | Per-slot inline style overrides (passed to each Radio) |

### `RadioOption`

| Prop       | Type               | Required | Description                   |
| ---------- | ------------------ | -------- | ----------------------------- |
| `label`    | `string`           | ✅       | Display label for the option  |
| `value`    | `number \| string` | ✅       | Value of the option           |
| `disabled` | `boolean`          | ❌       | Disables this specific option |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. Both `className` and `style` accept an object whose keys correspond to specific internal DOM elements.

### `RadioClassNames`

| Slot             | Targets                                        |
| ---------------- | ---------------------------------------------- |
| `root`           | Outermost `<label>` container                  |
| `radioWrapper`   | `<div>` wrapping the input and visual elements |
| `checkedWrapper` | Visual ring/circle `<span>`                    |
| `innerDot`       | Inner dot `<span>` shown when checked          |
| `label`          | Text label `<span>`                            |
| `error`          | Error message `<div>` (with icon)              |
| `popover`        | Tooltip popover `<div>`                        |

```tsx
<Radio
  name="plan"
  value="pro"
  label="Pro Plan"
  checked={true}
  onChange={noop}
  className={{
    root: "my-radio-root",
    checkedWrapper: "my-radio-circle",
    innerDot: "my-radio-dot",
    label: "my-radio-label",
  }}
/>
```

### `RadioStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Radio
  name="plan"
  value="pro"
  label="Pro Plan"
  checked={true}
  onChange={noop}
  style={{
    root: { gap: "1rem" },
    checkedWrapper: { borderColor: "#465fff" },
    innerDot: { backgroundColor: "#fff" },
  }}
/>
```

---

## Theme Management

The `Radio` and `RadioGroup` components feature a robust theme architecture. They natively respond to **`[data-theme="dark"]`** selectors applied at any ancestor level, automatically switching color tokens for dark mode. No additional configuration or JavaScript is required.

---

## Design Tokens (Customization)

Beyond slots, the component leverages scoped CSS variables for a global design token system. You can override the default appearance by redefining these variables in your own stylesheet. All tokens follow the `--bearlab-radio-*` naming convention.

```css
/* Override examples — only set what you need */
:root {
  /* Sizing */
  --bearlab-radio-size: 1.25rem; /* radio circle diameter */
  --bearlab-radio-dot-size: 0.5rem; /* inner dot diameter */
  --bearlab-radio-gap: 0.75rem; /* gap between circle and label */

  /* Colors — checked state */
  --bearlab-radio-bg-checked: #465fff;
  --bearlab-radio-border-color-checked: #465fff;
  --bearlab-radio-dot-color: #fff;

  /* Colors — unchecked state */
  --bearlab-radio-bg-unchecked: transparent;
  --bearlab-radio-border-color-unchecked: #d1d5db;

  /* Colors — disabled state */
  --bearlab-radio-bg-disabled: #f3f4f6;
  --bearlab-radio-border-color-disabled: #e5e7eb;
  --bearlab-radio-opacity-disabled: 0.6;

  /* Label */
  --bearlab-radio-label-color: #344054;
  --bearlab-radio-label-font-size: 0.875rem;
  --bearlab-radio-label-font-weight: 600;
  --bearlab-radio-required-color: #f04438;

  /* Error */
  --bearlab-radio-color-error: #f00438;

  /* Popover */
  --bearlab-radio-popover-bg: #fff;
  --bearlab-radio-popover-color: #344054;
  --bearlab-radio-popover-border-radius: 0.5rem;

  /* RadioGroup */
  --bearlab-radio-group-gap: 0.625rem;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards:

- **Semantic HTML** — Uses native `<input type="radio">` wrapped inside a `<label>` for implicit label association.
- **`aria-invalid`** — Automatically set to `true` when an `error` prop is provided.
- **`aria-required`** — Set via the `isRequired` prop for programmatic validation compatibility.
- **`aria-describedby`** — Dynamically links the input to rendered error messages and popover tooltips.
- **`role="alert"`** — Applied to the error container for immediate announcement by screen readers.
- **`role="tooltip"`** — Applied to the popover container for contextual information.
- **`role="group"`** — Applied to the `RadioGroup` container for proper grouping semantics.
- **`aria-label` / `aria-labelledby`** — Supported on `RadioGroup` for named group identification.
- **`aria-hidden="true"`** — Applied to decorative indicator elements to avoid redundant announcements.
- **Focus visibility** — `focus-visible` outline on the visual indicator ensures keyboard accessibility.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  RadioProps,
  RadioGroupProps,
  RadioClassNames,
  RadioStyles,
} from "@bearlab/radio";
```

### `RadioProps`

```ts
interface RadioProps extends NativeInputProps {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  name?: string;
  label?: string;
  error?: string;
  popover?: string;
  disabled?: boolean;
  isRequired?: boolean;
  className?: RadioClassNames;
  style?: RadioStyles;
}
```

### `RadioGroupProps`

```ts
interface RadioGroupProps {
  options: RadioOption[];
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  isVertical?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: RadioClassNames;
  style?: RadioStyles;
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
