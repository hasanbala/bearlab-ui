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
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)

---

## Features

- ✅ **Slot-based `className` & `style` API** — Granular styling without CSS specificity issues.
- ✅ **Accessible by default** — `role="status"`, `aria-live="polite"`, and a visually-hidden screen reader text.
- ✅ **9 built-in spinner types** — Pick a ready-made spinner with the `type` prop.
- ✅ **Replaceable Icon** — Provide any `React.ElementType` (SVG component) as the spinner via the `icon` prop.
- ✅ **TypeScript-first** — Fully typed props and slot interfaces.

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

> **Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0` must be installed in your project.

> **Framework support:** Works with React 18/19 and Next.js — both the App Router
> and the Pages Router. Every component ships with the `"use client"` directive
> already applied, so you can import it straight into a Server Component without
> writing a wrapper file. All DOM access is SSR-guarded.

---

## Usage

### Basic Usage

```tsx
import { Loading } from "@bearlab/loading";

export default function App() {
  return (
    <div style={{ position: "relative", height: "200px" }}>
      <Loading />
    </div>
  );
}
```

> **Important:** The `Loading` component is positioned absolutely and centered within its nearest `position: relative` ancestor using `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`. Always wrap it in a container with `position: relative`.

### Built-in Types

Choose one of the bundled spinner icons with the `type` prop:

```tsx
import { Loading } from "@bearlab/loading";

export default function App() {
  return (
    <div style={{ position: "relative", height: "200px" }}>
      <Loading type="loader-pinwheel" />
    </div>
  );
}
```

Available values: `"circle-dashed"`, `"circle-ellipse"`, `"disc"`, `"loader"`, `"loader-badging"`, `"loader-circle"` (default), `"loader-pinwheel"`, `"shell"`, `"square-dashed"`.

### Custom Icon

Replace the default spinner with any SVG component. When `icon` is provided it takes precedence over `type`:

```tsx
import { Loading } from "@bearlab/loading";
import { MySpinnerIcon } from "./icons";

export default function App() {
  return (
    <div style={{ position: "relative", height: "200px" }}>
      <Loading icon={MySpinnerIcon} />
    </div>
  );
}
```

### Custom Size via CSS Variable

```tsx
import { Loading } from "@bearlab/loading";

export default function App() {
  return (
    <div style={{ position: "relative", height: "200px" }}>
      <Loading
        style={{
          root: {
            "--bearlab-loading-container-width": "3rem",
            "--bearlab-loading-container-height": "3rem",
          } as React.CSSProperties,
        }}
      />
    </div>
  );
}
```

---

## Props

| Prop        | Type                                      | Default           | Required | Description                                                       |
| ----------- | ----------------------------------------- | ----------------- | -------- | ----------------------------------------------------------------- |
| `type`      | [`LoadingType`](#loadingtype)             | `"loader-circle"` | ❌       | One of the built-in spinner icons. Ignored when `icon` is provided |
| `icon`      | `React.ElementType`                       | —                 | ❌       | Custom SVG icon component to use as the spinner                   |
| `className` | [`LoadingClassNames`](#loadingclassnames) | —                 | ❌       | Per-slot className overrides                                      |
| `style`     | [`LoadingStyles`](#loadingstyles)         | —                 | ❌       | Per-slot inline style overrides                                   |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. Inject custom styles and classes directly into child elements via the `className` and `style` objects.

### `LoadingClassNames`

| Slot   | Targets                                      |
| ------ | -------------------------------------------- |
| `root` | Outermost container `<div>` (the positioner) |
| `icon` | The SVG spinner element (`IconComponent`)    |

```tsx
<Loading
  className={{
    root: "my-loading-root",
    icon: "my-loading-icon",
  }}
/>
```

### `LoadingStyles`

All slots accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Loading
  style={{
    root: { width: "3rem", height: "3rem" },
    icon: { color: "blue" },
  }}
/>
```

---

## Design Tokens (Customization)

The component uses CSS custom properties scoped to its container. Override them in your stylesheet to globally restyle the component.

```css
:root {
  --bearlab-loading-container-width: 1.5rem; /* 24px — spinner width  */
  --bearlab-loading-container-height: 1.5rem; /* 24px — spinner height */
  --bearlab-loading-animation-duration: 1s; /* spin duration */
  --bearlab-loading-icon-z-index: 10003; /* stacking order */
}
```

> **Note:** The `Loading` component does not have a dedicated dark mode variant. Use the slot API or CSS variables to apply custom colors for dark contexts.

---

## Accessibility

This component adheres to **WCAG 2.1 AA** standards:

- **`role="status"`** — Semantically identifies the element as a live status region.
- **`aria-live="polite"`** — Notifies screen readers when the spinner is present without aggressively interrupting the user.
- **Visually-hidden text** — A `.srOnly` `<span>` with the text `"Loading..."` is always rendered inside the container, ensuring screen readers announce the loading state even though the text is invisible.
- **`aria-hidden="true"` & `focusable="false"`** — Applied to the SVG icon to prevent redundant announcements and avoid trapping focus inside the decorative element.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  LoadingProps,
  LoadingType,
  LoadingClassNames,
  LoadingStyles,
} from "@bearlab/loading";
```

### `LoadingProps`

```ts
interface LoadingProps {
  type?: LoadingType;
  icon?: React.ElementType;
  className?: LoadingClassNames;
  style?: LoadingStyles;
}
```

### `LoadingType`

```ts
type LoadingType =
  | "circle-dashed"
  | "circle-ellipse"
  | "disc"
  | "loader"
  | "loader-badging"
  | "loader-circle"
  | "loader-pinwheel"
  | "shell"
  | "square-dashed";
```

### `LoadingClassNames`

```ts
interface LoadingClassNames {
  root?: string;
  icon?: string;
}
```

### `LoadingStyles`

```ts
interface LoadingStyles {
  root?: React.CSSProperties;
  icon?: React.CSSProperties;
}
```

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
