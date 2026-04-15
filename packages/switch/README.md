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

---

## Features

- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `role="switch"`, `aria-checked`, `aria-required`, and more
- ✅ **Built-in Error & Popover states** — rich contextual information out of the box
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

---

## Props

The `Switch` component extends standard native `<input>` properties (excluding custom slotted ones).

| Prop         | Type                                          | Default | Required | Description                                            |
| ------------ | --------------------------------------------- | ------- | -------- | ------------------------------------------------------ |
| `checked`    | `boolean`                                     | —       | ✅       | Current state of the switch                            |
| `onChange`   | `(e: React.ChangeEvent<HTMLInputElement>) => void` | — | ✅       | Callback fired when state changes                      |
| `name`       | `string`                                      | —       | ❌       | The name attribute of the input                        |
| `label`      | `string`                                      | —       | ❌       | Descriptive label rendered alongside the switch        |
| `error`      | `string`                                      | —       | ❌       | Error message displayed below the switch               |
| `popover`    | `string`                                      | —       | ❌       | Tooltip/popover text triggered by the switch           |
| `disabled`   | `boolean`                                     | —       | ❌       | Disables the switch interaction                        |
| `isRequired` | `boolean`                                     | —       | ❌       | Marks the switch as required and appends `*` to label  |
| `className`  | [`SwitchClassNames`](#switchclassnames)       | —       | ❌       | Per-slot className overrides                           |
| `style`      | [`SwitchStyles`](#switchstyles)               | —       | ❌       | Per-slot inline style overrides                        |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.slider`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `SwitchClassNames`

| Slot            | Targets                               |
| --------------- | ------------------------------------- |
| `root`          | Outermost container `<label>`         |
| `switchWrapper` | Inner container `<div>` around switch |
| `slider`        | Background slider `<span>`            |
| `toggle`        | Thumb/toggle indicator `<span>`       |
| `label`         | Label text `<span>`                   |
| `error`         | Error text container `<div>`          |
| `popover`       | Popover container `<div>`             |

```tsx
<Switch
  checked={true}
  onChange={() => {}}
  label="Custom Switch"
  className={{
    root: "custom-switch-root",
    slider: "custom-slider-bg",
    toggle: "custom-toggle-thumb",
  }}
/>
```

### `SwitchStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Switch
  checked={true}
  onChange={() => {}}
  style={{
    slider: { backgroundColor: "#007bff" },
    toggle: { borderRadius: "4px" },
  }}
/>
```

---

## Theme Management

The `Switch` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-switch-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-switch-slider-bg-unchecked: #e2e8f0;
  --bearlab-switch-slider-bg-checked: #3b82f6;
  --bearlab-switch-toggle-bg: #ffffff;
  --bearlab-switch-toggle-size: 20px;
  --bearlab-switch-label-color: #1e293b;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`role="switch"`** — Explicitly defines the element as a switch (not just a generic checkbox).
- **`aria-checked`** — Accurately reflects the `checked` boolean state to screen readers.
- **`aria-describedby`** — Semantically links the input to its dynamically generated `error` and `popover` IDs for additional context.
- **`aria-required` & `aria-disabled`** — Communicates constraint states naturally to assistive technology.
- **`aria-hidden="true"`** — Applied to visual-only elements (like the slider, toggle, and required asterisk) and icons to minimize redundant screen reader clutter.

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
