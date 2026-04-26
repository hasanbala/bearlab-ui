# @bearlab/copy

> Accessible, fully customizable Copy-to-Clipboard component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/copy)](https://www.npmjs.com/package/@bearlab/copy)
[![license](https://img.shields.io/npm/l/@bearlab/copy)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Behavior](#behavior)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `role="group"`, `aria-label`, `aria-controls`, `aria-pressed`
- ✅ **Clipboard integration** — uses `navigator.clipboard.writeText` with auto-reset after 3 seconds
- ✅ **Visual copy feedback** — icon toggles from `copy` → `tick` on success
- ✅ **Empty state handling** — displays `"-"` when `text` is empty or `null`
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Theme ready** — light/dark mode support via `[data-theme]`

---

## Installation

```bash
# npm
npm install @bearlab/copy

# yarn
yarn add @bearlab/copy

# pnpm
pnpm add @bearlab/copy
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed.  
> **Internal dependency:** `@bearlab/button` is used internally for the copy trigger button.

---

## Usage

### Basic

```tsx
import { Copy } from "@bearlab/copy";

export default function App() {
  return <Copy text="npm install @bearlab/copy" />;
}
```

### With custom label

```tsx
<Copy text="npm install @bearlab/copy" label="Install command" />
```

### Disabled

```tsx
<Copy text="secret-token" disabled />
```

---

## Props

| Prop        | Type                                | Default  | Required | Description                                                |
| ----------- | ----------------------------------- | -------- | -------- | ---------------------------------------------------------- |
| `text`      | `string`                            | —        | ✅       | The string to copy to clipboard when the button is clicked |
| `label`     | `string`                            | `"Copy"` | ❌       | Label for the copy button; used in ARIA announcements      |
| `disabled`  | `boolean`                           | `false`  | ❌       | Hides the copy button and disables the component           |
| `className` | [`CopyClassNames`](#copyclassnames) | —        | ❌       | Per-slot className overrides                               |
| `style`     | [`CopyStyles`](#copystyles)         | —        | ❌       | Per-slot inline style overrides                            |

---

## Behavior

- When the copy button is clicked, `navigator.clipboard.writeText(text)` is called.
- On success, the icon changes from `copy` to `tick` and the button `aria-label` updates to `"Copied to clipboard"`.
- The copied state resets automatically after **3 seconds**.
- If `text` is an empty string or `null`/`undefined`, the text display area shows `"-"`.
- When `disabled` is true, the copy button is not rendered at all; the text area retains its styling with reduced opacity (`cursor: not-allowed`).

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. You can inject classes and inline styles into specific DOM elements via the `className` and `style` objects.

### `CopyClassNames`

| Slot   | Targets                        |
| ------ | ------------------------------ |
| `root` | Outermost `<div role="group">` |
| `text` | Text display `<div>` element   |

```tsx
<Copy
  text="https://bearlab-ui.com"
  className={{
    root: "my-copy-root",
    text: "my-copy-text",
  }}
/>
```

### `CopyStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Copy
  text="C0D3-1234"
  style={{
    root: { borderRadius: "8px" },
    text: { fontFamily: "monospace", color: "#333" },
  }}
/>
```

---

## Theme Management

The `Copy` component is fully compatible with light and dark mode contexts, natively responding to `[data-theme="dark"]` applied at the root or any ancestor element.

The following tokens change automatically in dark mode:

| Token                              | Light default | Dark default            |
| ---------------------------------- | ------------- | ----------------------- |
| `--bearlab-copy-text-color`        | `#1f2937`     | `rgba(255,255,255,0.9)` |
| `--bearlab-copy-text-bg`           | `#ffffff`     | `#111827`               |
| `--bearlab-copy-text-border-color` | `#d1d5db`     | `#374151`               |

---

## Design Tokens (Customization)

Beyond slots, the component uses scoped CSS custom properties (`--bearlab-copy-*`) for global design token overrides. All tokens follow the `--bearlab-copy-[element]-[property]` naming convention.

Override them at any ancestor scope:

```css
:root {
  /* Layout */
  --bearlab-copy-container-gap: 0.125rem; /* gap between text and button */
  --bearlab-copy-text-height: 2.75rem; /* 44px */
  --bearlab-copy-text-border-radius: 0.5rem; /* 8px */
  --bearlab-copy-text-padding-x: 0.75rem; /* 12px */

  /* Typography */
  --bearlab-copy-text-font-size: 0.875rem; /* 14px */

  /* Colors */
  --bearlab-copy-text-color: #1f2937;
  --bearlab-copy-text-bg: #ffffff;
  --bearlab-copy-text-border-color: #d1d5db;

  /* States */
  --bearlab-copy-opacity-disabled: 0.6;
}
```

---

## Accessibility

This component is built to **WCAG 2.1 AA** standards:

- **`role="group"` + `aria-label`** — wraps the text and button as a labeled interactive cluster.
- **`aria-controls`** — the copy button references the text display element via a stable ID from `useId()`.
- **`aria-pressed`** — reflects the copied state (`true` immediately after copy, resets after 3 s).
- **Dynamic `aria-label`** — button label updates to `"Copied to clipboard"` on success for screen reader feedback.
- **`title` attribute** — the text `<div>` uses `title` for overflow tooltip in browsers.
- **`aria-label` on text `<div>`** — provides the value (or `"Empty"`) to assistive technologies even when visually truncated.

---

## TypeScript

All types are exported from the package:

```ts
import type { CopyProps, CopyClassNames, CopyStyles } from "@bearlab/copy";
```

### `CopyProps`

```ts
interface CopyProps {
  text: string;
  label?: string;
  disabled?: boolean;
  className?: CopyClassNames;
  style?: CopyStyles;
}
```

### `CopyClassNames`

```ts
interface CopyClassNames {
  root?: string;
  text?: string;
}
```

### `CopyStyles`

```ts
interface CopyStyles {
  root?: React.CSSProperties;
  text?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
