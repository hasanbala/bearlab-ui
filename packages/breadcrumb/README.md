# @bearlab/breadcrumb

> Accessible, fully customizable Breadcrumb component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/breadcrumb)](https://www.npmjs.com/package/@bearlab/breadcrumb)
[![license](https://img.shields.io/npm/l/@bearlab/breadcrumb)](LICENSE)
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
- ✅ **Accessible by default** — `<nav aria-label="breadcrumb">`, `aria-current="page"`
- ✅ **Configurable separators** — supports `arrow`, `slash`, and `dot`
- ✅ **Custom Link mapping** — use with `next/link`, `react-router-dom`, or native `<a>`
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Zero layout opinion** — bring your own layout/wrapper

---

## Installation

```bash
# npm
npm install @bearlab/breadcrumb

# yarn
yarn add @bearlab/breadcrumb

# pnpm
pnpm add @bearlab/breadcrumb
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { Breadcrumb } from "@bearlab/breadcrumb";

export default function App() {
  return (
    <Breadcrumb
      currentPageTitle="Products"
      fromPageTitle="Home"
      fromPageUrl="/"
      showHomeIcon={true}
      separateType="slash"
    />
  );
}
```

---

## Props

| Prop               | Type                                            | Default       | Required | Description                                        |
| ------------------ | ----------------------------------------------- | ------------- | -------- | -------------------------------------------------- |
| `currentPageTitle` | `string`                                        | —             | ✅       | The title of the current page                      |
| `fromPageTitle`    | `string`                                        | `"Home Page"` | ❌       | The text displayed for the back/home link          |
| `fromPageUrl`      | `string`                                        | `"/"`         | ❌       | The URL for the back/home link                     |
| `showHomeIcon`     | `boolean`                                       | `false`       | ❌       | Whether to render a home icon beside the link text |
| `separateType`     | `SeparateType` (`"arrow" \| "slash" \| "dot"`)  | `"arrow"`     | ❌       | The visual separator between breadcrumb items      |
| `renderLink`       | `(props: RenderLinkProps) => React.ReactNode`   | Native `<a>`  | ❌       | Custom render function for the link element        |
| `className`        | [`BreadcrumbClassNames`](#breadcrumbclassnames) | —             | ❌       | Per-slot className overrides                       |
| `style`            | [`BreadcrumbStyles`](#breadcrumbstyles)         | —             | ❌       | Per-slot inline style overrides                    |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner navigation container using `style?.nav`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `BreadcrumbClassNames`

| Slot       | Targets                             |
| ---------- | ----------------------------------- |
| `root`     | Outermost container `<div>`         |
| `title`    | Heading `<h2>`                      |
| `nav`      | Navigation container `<nav>`        |
| `fromLink` | Back/home link element (e.g. `<a>`) |
| `current`  | Current page text `<span>`          |

```tsx
<Breadcrumb
  currentPageTitle="Products"
  className={{
    root: "my-breadcrumb-root",
    title: "my-breadcrumb-title",
    nav: "my-breadcrumb-nav",
  }}
/>
```

### `BreadcrumbStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Breadcrumb
  currentPageTitle="Products"
  style={{
    root: { padding: "1rem" },
    current: { fontWeight: "bold", color: "blue" },
  }}
/>
```

---

## Theme Management

The `Breadcrumb` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-breadcrumb-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-breadcrumb-root-gap: 16px;
  --bearlab-breadcrumb-title-color: #1a1a1a;
  --bearlab-breadcrumb-link-color: #0056b3;
  --bearlab-breadcrumb-link-hover-color: #003d82;
  --bearlab-breadcrumb-separator-color: #6c757d;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`<nav aria-label="breadcrumb">`** — Ensures screen readers properly identify the navigation landmark.
- **`aria-current="page"`** — Communicates to assistive technologies that the last item represents the current page.
- **`aria-hidden="true"`** — Best-practice usage on decorative icons and separators to prevent redundant or confusing screen reader announcements.
- **Semantic List `<ol>`/`<li>`** — Structures the breadcrumb trail as an ordered list naturally communicating the hierarchy.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  BreadcrumbProps,
  BreadcrumbClassNames,
  BreadcrumbStyles,
  SeparateType,
  RenderLinkProps,
} from "@bearlab/breadcrumb";
```

### `BreadcrumbProps`

```ts
interface BreadcrumbProps {
  currentPageTitle: string;
  fromPageTitle?: string;
  fromPageUrl?: string;
  showHomeIcon?: boolean;
  separateType?: SeparateType;
  className?: BreadcrumbClassNames;
  style?: BreadcrumbStyles;
  renderLink?: (props: RenderLinkProps) => React.ReactNode;
}
```

### `RenderLinkProps`

```ts
interface RenderLinkProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
```

### `SeparateType`

```ts
type SeparateType = "arrow" | "slash" | "dot";
```

### `BreadcrumbClassNames`

```ts
interface BreadcrumbClassNames {
  root?: string;
  title?: string;
  nav?: string;
  fromLink?: string;
  current?: string;
}
```

### `BreadcrumbStyles`

```ts
interface BreadcrumbStyles {
  root?: React.CSSProperties;
  title?: React.CSSProperties;
  nav?: React.CSSProperties;
  fromLink?: React.CSSProperties;
  current?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
