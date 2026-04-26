# @bearlab/switch

> Accessible, fully customizable Switch (Toggle) component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/switch)](https://www.npmjs.com/package/@bearlab/switch)
[![license](https://img.shields.io/npm/l/@bearlab/switch)](LICENSE)
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

- ✅ **Controlled component** — driven by `checked` and `onChange` props
- ✅ **Popover support** — show contextual tooltip text on hover
- ✅ **Built-in error state** — inline error messages with icon
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `role="switch"`, `aria-checked`, `aria-required`, `aria-disabled`, and more
- ✅ **Dark mode support** — responds to `[data-theme="dark"]` automatically
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/switch

# yarn
yarn add @bearlab/switch

# pnpm
pnpm add @bearlab/switch
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Basic Usage

```tsx
import { useState } from "react";
import { Switch } from "@bearlab/switch";

export default function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      name="notifications"
      label="Enable notifications"
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
    />
  );
}
```

### With Error & Popover

```tsx
<Switch
  name="marketing"
  label="Marketing emails"
  checked={false}
  isRequired
  error="You must accept to continue"
  popover="Receive product updates and promotional content."
  onChange={(e) => console.log(e.target.checked)}
/>
```

### Disabled State

```tsx
<Switch
  name="feature-flag"
  label="Beta features"
  checked={true}
  disabled
  onChange={() => {}}
/>
```

---

## Props

The `Switch` component extends standard native `<input>` properties (excluding `popover`, `className`, `style`).

| Prop         | Type                                               | Default | Required | Description                                        |
| ------------ | -------------------------------------------------- | ------- | -------- | -------------------------------------------------- |
| `checked`    | `boolean`                                          | —       | ✅       | Controlled checked state of the switch             |
| `onChange`   | `(e: React.ChangeEvent<HTMLInputElement>) => void` | —       | ✅       | Callback fired when the switch is toggled          |
| `name`       | `string`                                           | —       | ❌       | Name attribute used for `id` and error/popover IDs |
| `label`      | `string`                                           | —       | ❌       | Descriptive label rendered alongside the switch    |
| `error`      | `string`                                           | —       | ❌       | Error message displayed below the switch           |
| `popover`    | `string`                                           | —       | ❌       | Tooltip text shown on hover                        |
| `disabled`   | `boolean`                                          | —       | ❌       | Disables the switch interaction                    |
| `isRequired` | `boolean`                                          | —       | ❌       | Marks the switch as required; appends `*` to label |
| `className`  | [`SwitchClassNames`](#switchclassnames)            | —       | ❌       | Per-slot className overrides                       |
| `style`      | [`SwitchStyles`](#switchstyles)                    | —       | ❌       | Per-slot inline style overrides                    |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. Both `className` and `style` accept an object whose keys correspond to specific internal DOM elements.

### `SwitchClassNames`

| Slot            | Targets                                             |
| --------------- | --------------------------------------------------- |
| `root`          | Outermost `<label>` container                       |
| `switchWrapper` | `<div>` wrapping the input, slider, error, popover  |
| `slider`        | Background track `<span>` (checked/unchecked color) |
| `toggle`        | Thumb/circle indicator `<span>`                     |
| `label`         | Text label `<span>`                                 |
| `error`         | Error message `<div>` (with icon)                   |
| `popover`       | Tooltip popover `<div>`                             |

```tsx
<Switch
  name="notifications"
  label="Custom Switch"
  checked={true}
  onChange={() => {}}
  className={{
    root: "custom-switch-root",
    slider: "custom-slider-bg",
    toggle: "custom-toggle-thumb",
    label: "custom-label",
  }}
/>
```

### `SwitchStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Switch
  name="notifications"
  checked={true}
  onChange={() => {}}
  style={{
    slider: { backgroundColor: "#465fff" },
    toggle: { width: "1.25rem", height: "1.25rem" },
    label: { fontWeight: 700 },
  }}
/>
```

---

## Theme Management

The `Switch` component features a robust theme architecture. It natively responds to **`[data-theme="dark"]`** selectors applied at any ancestor level, automatically switching color tokens for dark mode. No additional configuration or JavaScript is required.

---

## Design Tokens (Customization)

Beyond slots, the component leverages scoped CSS variables for a global design token system. You can override the default appearance by redefining these variables in your own stylesheet. All tokens follow the `--bearlab-switch-*` naming convention.

```css
/* Override examples — only set what you need */
:root {
  /* Sizing */
  --bearlab-switch-width: 2.5rem; /* track width */
  --bearlab-switch-height: 1.25rem; /* track height */
  --bearlab-switch-toggle-size: 1rem; /* thumb diameter */
  --bearlab-switch-border-radius: 999px; /* pill shape */

  /* Colors — checked state */
  --bearlab-switch-bg-checked: #465fff;
  --bearlab-switch-border-color-checked: #465fff;

  /* Colors — unchecked state */
  --bearlab-switch-bg-unchecked: #d1d5db;
  --bearlab-switch-border-color-unchecked: #d1d5db;

  /* Toggle thumb */
  --bearlab-switch-toggle-color: #ffffff;

  /* Label */
  --bearlab-switch-label-color: #344054;
  --bearlab-switch-label-font-size: 0.875rem;
  --bearlab-switch-label-font-weight: 600;
  --bearlab-switch-label-required-color: #f04438;

  /* Error */
  --bearlab-switch-color-error: #f00438;

  /* Popover */
  --bearlab-switch-popover-bg: #ffffff;
  --bearlab-switch-popover-color: #344054;
  --bearlab-switch-popover-border-radius: 0.5rem;

  /* Disabled */
  --bearlab-switch-opacity-disabled: 0.6;

  /* Animation */
  --bearlab-switch-transition: all 0.2s ease;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards:

- **`role="switch"`** — Explicitly defines the element as a toggle switch, distinct from a generic checkbox.
- **`aria-checked`** — Accurately reflects the `checked` boolean state to screen readers.
- **`aria-required`** — Set via the `isRequired` prop; communicates that the field must be interacted with.
- **`aria-disabled`** — Communicates the disabled state to assistive technology when `disabled` is set.
- **`aria-describedby`** — Dynamically links the input to its rendered `error` and `popover` element IDs for additional context.
- **`role="alert"` + `aria-live="polite"`** — Applied to the error container for immediate, polite announcements on validation failure.
- **`role="tooltip"`** — Applied to the popover container for contextual tooltip semantics.
- **`aria-hidden="true"`** — Applied to visual-only elements (slider, toggle, required asterisk, error icon) to prevent redundant screen reader announcements.
- **Native `<input type="checkbox">`** — Provides built-in keyboard interaction (Space to toggle) without custom key handlers.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  SwitchProps,
  SwitchClassNames,
  SwitchStyles,
} from "@bearlab/switch";
```

### `SwitchProps`

```ts
interface SwitchProps extends NativeInputProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  error?: string;
  popover?: string;
  disabled?: boolean;
  isRequired?: boolean;
  className?: SwitchClassNames;
  style?: SwitchStyles;
}
```

### `SwitchClassNames`

```ts
interface SwitchClassNames {
  root?: string;
  switchWrapper?: string;
  slider?: string;
  toggle?: string;
  label?: string;
  error?: string;
  popover?: string;
}
```

### `SwitchStyles`

```ts
interface SwitchStyles {
  root?: React.CSSProperties;
  switchWrapper?: React.CSSProperties;
  slider?: React.CSSProperties;
  toggle?: React.CSSProperties;
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
