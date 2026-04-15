# @bearlab/loading

> Accessible, fully customizable Loading spinner component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/loading)](https://www.npmjs.com/package/@bearlab/loading)
[![license](https://img.shields.io/npm/l/@bearlab/loading)](LICENSE)
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
- ✅ **Accessible by default** — `role="status"`, `aria-live`, screen reader text
- ✅ **Customizable Icon** — fully replace the default spinner with an SVG
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Zero layout opinion** — perfectly adapts to any parent container

---

## Installation

```bash
# npm
npm install @bearlab/loading

# yarn
yarn add @bearlab/loading

# pnpm
pnpm add @bearlab/loading
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { Loading } from "@bearlab/loading";

export default function App() {
  return (
    <div className="container">
      <Loading />
    </div>
  );
}
```

---

## Props

| Prop        | Type                                  | Default       | Required | Description                                     |
| ----------- | ------------------------------------- | ------------- | -------- | ----------------------------------------------- |
| `icon`      | `React.ElementType`                   | `IconLoading` | ❌       | Custom SVG icon component to act as the spinner |
| `className` | [`ClassNamesProps`](#classnamesprops) | —             | ❌       | Per-slot className overrides                    |
| `style`     | [`StylesProps`](#stylesprops)         | —             | ❌       | Per-slot inline style overrides                 |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner icon natively using `style?.icon`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `ClassNamesProps`

| Slot   | Targets                           |
| ------ | --------------------------------- |
| `root` | Outermost container `<div>`       |
| `icon` | The SVG spinner (`IconComponent`) |

```tsx
<Loading
  className={{
    root: "my-loading-root",
    icon: "my-loading-icon",
  }}
/>
```

### `StylesProps`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Loading
  style={{
    root: { display: "flex", justifyContent: "center" },
    icon: { color: "blue", width: "24px" },
  }}
/>
```

---

## Theme Management

The `Loading` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-loading-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-loading-root-display: flex;
  --bearlab-loading-icon-color: #1a1a1a;
  --bearlab-loading-icon-size: 2rem;
}

[data-theme="dark"] {
  --bearlab-loading-icon-color: #f1f1f1;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`role="status"`** — Semantically identifies the element as a status indicator.
- **`aria-live="polite"`** — Adjusts context gracefully, notifying screen readers when the loading state changes without aggressively interrupting the user.
- **Screen Reader Only Text** — Contains a visually hidden `.srOnly` `<span>` with the text `"Loading..."` for robust screen reader interpretation.
- **`aria-hidden="true"` & `focusable="false"`** — Best-practice usage on the SVG icon to prevent redundant or confusing screen reader announcements and avoid trapping focus.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  LoadingProps,
  ClassNamesProps,
  StylesProps,
} from "@bearlab/loading";
```

### LoadingProps

```ts
interface LoadingProps {
  className?: ClassNamesProps;
  style?: StylesProps;
  icon?: ElementType;
}
```

### ClassNamesProps

```ts
interface ClassNamesProps {
  root?: string;
  icon?: string;
}
```

### StylesProps

```ts
interface StylesProps {
  root?: React.CSSProperties;
  icon?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
