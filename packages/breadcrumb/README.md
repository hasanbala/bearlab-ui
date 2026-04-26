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

- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity issues
- ✅ **Accessible by default** — `<nav aria-label="breadcrumb">`, `aria-current="page"`, semantic `<ol>`/`<li>`
- ✅ **Three separator types** — `"arrow"` (default), `"slash"`, and `"dot"`
- ✅ **Optional home icon** — display a home icon alongside the from-page link
- ✅ **Custom Link adapter** — use with `next/link`, `react-router-dom Link`, or native `<a>`
- ✅ **Dark Mode** — automatic adaptation via `[data-theme="dark"]` selector
- ✅ **TypeScript-first** — fully typed props and slot interfaces

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

### Basic

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

### With a custom link adapter (e.g. Next.js)

```tsx
import Link from "next/link";
import { Breadcrumb } from "@bearlab/breadcrumb";
import type { DefaultLinkProps } from "@bearlab/breadcrumb";

export default function App() {
  return (
    <Breadcrumb
      currentPageTitle="Dashboard"
      fromPageTitle="Home"
      fromPageUrl="/"
      renderLink={({ href, className, style, children }: DefaultLinkProps) => (
        <Link href={href} className={className} style={style}>
          {children}
        </Link>
      )}
    />
  );
}
```

---

## Props

| Prop               | Type                                            | Default       | Required | Description                                                                     |
| ------------------ | ----------------------------------------------- | ------------- | -------- | ------------------------------------------------------------------------------- |
| `currentPageTitle` | `string`                                        | —             | ✅       | The title of the current page (shown as `<h2>` and as the last breadcrumb item) |
| `fromPageTitle`    | `string`                                        | `"Home Page"` | ❌       | The text displayed for the back/home link                                       |
| `fromPageUrl`      | `string`                                        | `"/"`         | ❌       | The URL for the back/home link                                                  |
| `showHomeIcon`     | `boolean`                                       | `false`       | ❌       | Whether to render a home icon beside the link text                              |
| `separateType`     | `SeparateType` (`"arrow" \| "slash" \| "dot"`)  | `"arrow"`     | ❌       | The visual separator between breadcrumb items                                   |
| `renderLink`       | `(props: DefaultLinkProps) => React.ReactNode`  | Native `<a>`  | ❌       | Custom render function for the link element                                     |
| `className`        | [`BreadcrumbClassNames`](#breadcrumbclassnames) | —             | ❌       | Per-slot className overrides                                                    |
| `style`            | [`BreadcrumbStyles`](#breadcrumbstyles)         | —             | ❌       | Per-slot inline style overrides                                                 |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner navigation container using `style?.nav`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `BreadcrumbClassNames`

| Slot       | Targets                             |
| ---------- | ----------------------------------- |
| `root`     | Outermost container `<div>`         |
| `title`    | Page heading `<h2>`                 |
| `nav`      | Navigation landmark `<nav>`         |
| `fromLink` | Back/home link element (e.g. `<a>`) |
| `current`  | Current page text `<span>`          |

```tsx
<Breadcrumb
  currentPageTitle="Products"
  className={{
    root: "my-breadcrumb-root",
    title: "my-breadcrumb-title",
    nav: "my-breadcrumb-nav",
    fromLink: "my-breadcrumb-link",
    current: "my-breadcrumb-current",
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
    current: { fontWeight: "bold", color: "#1d2939" },
    fromLink: { textDecoration: "underline" },
  }}
/>
```

---

## Theme Management

The `Breadcrumb` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="dark"]`** selectors applied at the root or document level.

Dark mode tokens use `color-mix(in oklab, ...)` for smooth adaptive color values — no manual configuration required.

---

## Design Tokens (Customization)

Beyond slots, the component leverages scoped CSS variables for a global design token system. CSS variables are declared inside the `.container` class scope and fall back to `--bearlab-breadcrumb-*` public tokens you can override.

```css
:root {
  /* Layout */
  --bearlab-breadcrumb-container-gap: 0.75rem; /* space between title and nav */
  --bearlab-breadcrumb-container-margin-bottom: 1.5rem;
  --bearlab-breadcrumb-list-gap: 0.375rem; /* space between breadcrumb items */
  --bearlab-breadcrumb-link-icon-margin: 0.25rem; /* margin between home icon and text */

  /* Typography */
  --bearlab-breadcrumb-title-font-size: 1.25rem;
  --bearlab-breadcrumb-title-font-weight: 600;
  --bearlab-breadcrumb-list-font-size: 0.875rem;

  /* Colors */
  --bearlab-breadcrumb-title-color: #1d2939;
  --bearlab-breadcrumb-current-color: #1d2939;
  --bearlab-breadcrumb-list-color: #6b7280;
  --bearlab-breadcrumb-link-color-hover: #465fff;
  --bearlab-breadcrumb-separator-color: #98a2b3;

  /* Dot separator */
  --bearlab-breadcrumb-dot-size: 0.25rem;
  --bearlab-breadcrumb-dot-color: #98a2b3;
}
```

> All tokens follow the `--bearlab-breadcrumb-[element]-[property]` naming convention. The full list of available tokens mirrors the CSS variable declarations in `breadcrumb.module.scss`.

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`<nav aria-label="breadcrumb">`** — Ensures screen readers properly identify the navigation landmark.
- **`aria-current="page"`** — Communicates to assistive technologies that the last breadcrumb item represents the current page.
- **`aria-hidden="true"`** — Applied to decorative icons and separator elements to prevent redundant screen reader announcements.
- **Semantic List `<ol>`/`<li>`** — Structures the breadcrumb trail as an ordered list, naturally communicating hierarchy to assistive technologies.
- **`:focus-visible` outline** — Keyboard users receive a visible focus ring on the link element.

---

## TypeScript

The following types are exported from the package:

```ts
import type {
  BreadcrumbProps,
  BreadcrumbClassNames,
  BreadcrumbStyles,
} from "@bearlab/breadcrumb";
```

### `BreadcrumbProps`

```ts
interface BreadcrumbProps {
  currentPageTitle: string;
  fromPageTitle?: string; // default: "Home Page"
  fromPageUrl?: string; // default: "/"
  showHomeIcon?: boolean; // default: false
  separateType?: SeparateType; // default: "arrow"
  renderLink?: (props: DefaultLinkProps) => React.ReactNode;
  className?: BreadcrumbClassNames;
  style?: BreadcrumbStyles;
}
```

### `SeparateType`

```ts
type SeparateType = "arrow" | "slash" | "dot";
```

### `DefaultLinkProps`

The shape of props forwarded to the `renderLink` function (or the built-in `<a>` fallback):

```ts
interface DefaultLinkProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
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
