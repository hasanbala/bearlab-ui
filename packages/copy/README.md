# @bearlab/copy

> Accessible, fully customizable Copy component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/copy)](https://www.npmjs.com/package/@bearlab/copy)
[![license](https://img.shields.io/npm/l/@bearlab/copy)](LICENSE)
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

- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `role="group"`, `aria-label`, `aria-controls`, `aria-pressed`
- ✅ **Clipboard integration** — seamless copy-to-clipboard with visual feedback
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Zero layout opinion** — bring your own layout/wrapper

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

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project. `@bearlab/button` is also required as a dependency.

---

## Usage

```tsx
import { Copy } from "@bearlab/copy";

export default function App() {
  return <Copy text="npm install @bearlab/copy" label="Install command" />;
}
```

---

## Props

| Prop        | Type                                | Default  | Required | Description                                |
| ----------- | ----------------------------------- | -------- | -------- | ------------------------------------------ |
| `text`      | `string`                            | —        | ✅       | The content to be copied to the clipboard  |
| `label`     | `string`                            | `"Copy"` | ❌       | Basic label, modifies ARIA announcements   |
| `disabled`  | `boolean`                           | `false`  | ❌       | Disables the copy functionality and button |
| `className` | [`CopyClassNames`](#copyclassnames) | —        | ❌       | Per-slot className overrides               |
| `style`     | [`CopyStyles`](#copystyles)         | —        | ❌       | Per-slot inline style overrides            |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner text natively using `style?.text`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `CopyClassNames`

| Slot   | Targets                     |
| ------ | --------------------------- |
| `root` | Outermost container `<div>` |
| `text` | Text element `<div>`        |

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
    root: { borderRadius: "8px", border: "1px solid #eaeaea" },
    text: { fontFamily: "monospace", color: "#333" },
  }}
/>
```

---

## Theme Management

The `Copy` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-copy-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-copy-root-border-radius: 8px;
  --bearlab-copy-root-background: #ffffff;
  --bearlab-copy-text-color: #1a1a1a;
  --bearlab-copy-text-font-size: 0.875rem;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`role="group"` & `aria-label`** — Provides context to the copy component cluster, acting as an interactive block.
- **`aria-controls`** — Semantically links the copy button to the target text area dynamically using stable IDs (`useId()`).
- **`aria-pressed`** — Indicates the active state when text is copied, alerting the screen reader to the state change.
- **Dynamic `aria-label`** — The button updates its label to `"Copied to clipboard"` upon a successful copy action, granting clear auditory feedback to users.

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
