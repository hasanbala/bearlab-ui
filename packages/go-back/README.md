# @bearlab/go-back

> Accessible, fully customizable Go Back navigation component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/go-back)](https://www.npmjs.com/package/@bearlab/go-back)
[![license](https://img.shields.io/npm/l/@bearlab/go-back)](LICENSE)
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
- ✅ **Accessible by default** — built-in `aria-disabled` and `aria-label` attributes
- ✅ **Themeable** — light and dark mode out-of-the-box support
- ✅ **TypeScript-first** — fully typed props and interfaces

---

## Installation

```bash
# npm
npm install @bearlab/go-back

# yarn
yarn add @bearlab/go-back

# pnpm
pnpm add @bearlab/go-back
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { GoBack } from "@bearlab/go-back";

export default function App() {
  const handleNavigate = () => {
    console.log("Navigating back...");
  };

  return <GoBack label="Return to previous page" onNavigate={handleNavigate} />;
}
```

---

## Props

| Prop         | Type                                    | Default     | Required | Description                                         |
| ------------ | --------------------------------------- | ----------- | -------- | --------------------------------------------------- |
| `onNavigate` | `() => void`                            | —           | ✅       | Callback function fired when the button is clicked  |
| `label`      | `string`                                | `"Go Back"` | ❌       | Accessible text label for the navigation button     |
| `isDisabled` | `boolean`                               | `false`     | ❌       | Disables the button and sets `aria-disabled="true"` |
| `className`  | [`GoBackClassNames`](#gobackclassnames) | —           | ❌       | Per-slot className overrides                        |
| `style`      | [`GoBackStyles`](#gobackstyles)         | —           | ❌       | Per-slot inline style overrides                     |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.root`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `GoBackClassNames`

| Slot   | Targets                        |
| ------ | ------------------------------ |
| `root` | Outermost container `<button>` |

```tsx
<GoBack
  onNavigate={() => {}}
  className={{
    root: "my-go-back-root",
  }}
/>
```

### `GoBackStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<GoBack
  onNavigate={() => {}}
  style={{
    root: { marginTop: "1rem" },
  }}
/>
```

---

## Theme Management

The `GoBack` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-go-back-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-go-back-root-color: #1a1a1a;
  --bearlab-go-back-root-background: transparent;
  --bearlab-go-back-root-border-color: #e5e5e5;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **Keyboard Navigation** — Natively focusable using tabs due to its underlying `<button>` architecture.
- **`aria-label`** — Built-in `aria-label` using the `label` prop ensuring screen readers announce the semantic meaning of the icon button properly.
- **`aria-disabled`** — Ensures structural accessibility, properly conveying interactive states when `isDisabled` is set to `true`.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  GoBackProps,
  GoBackClassNames,
  GoBackStyles,
} from "@bearlab/go-back";
```

### `GoBackClassNames`

```ts
interface GoBackClassNames {
  root?: string;
}
```

### `GoBackStyles`

```ts
interface GoBackStyles {
  root?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
