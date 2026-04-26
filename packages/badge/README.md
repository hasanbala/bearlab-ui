# @bearlab/badge

> Accessible, highly customizable Badge component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/badge)](https://www.npmjs.com/package/@bearlab/badge)
[![license](https://img.shields.io/npm/l/@bearlab/badge)](LICENSE)
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

- ✅ **Variants & Colors** — `light` and `solid` variants with 7 different colors (`primary`, `success`, `error`, `warning`, `info`, `light`, `dark`)
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity issues
- ✅ **Design Tokens** — fully customizable via scoped CSS variables
- ✅ **Icon Support** — seamlessly integrate `startIcon` and `endIcon` SVG components
- ✅ **Two Sizes** — `small` (12px) and `medium` (14px)
- ✅ **Dark Mode** — automatic adaptation via `[data-theme="dark"]` selector
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/badge

# yarn
yarn add @bearlab/badge

# pnpm
pnpm add @bearlab/badge
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { Badge } from "@bearlab/badge";
import { CheckIcon, ArrowRightIcon } from "@icons...";

export default function App() {
  return (
    <>
      {/* Solid variant */}
      <Badge
        variant="solid"
        color="primary"
        label="New Feature"
        size="medium"
      />

      {/* Light variant with warning color */}
      <Badge label="Warning" color="warning" />

      {/* With icons */}
      <Badge
        label="Completed"
        color="success"
        startIcon={CheckIcon}
        endIcon={ArrowRightIcon}
      />

      {/* Small size */}
      <Badge label="Beta" color="info" size="small" />
    </>
  );
}
```

---

## Props

| Prop        | Type                                                                            | Default     | Required | Description                           |
| ----------- | ------------------------------------------------------------------------------- | ----------- | -------- | ------------------------------------- |
| `label`     | `string \| number`                                                              | —           | ✅       | Content rendered inside the badge     |
| `variant`   | `"light" \| "solid"`                                                            | `"light"`   | ❌       | Visual variant style of the badge     |
| `color`     | `"primary" \| "success" \| "error" \| "warning" \| "info" \| "light" \| "dark"` | `"primary"` | ❌       | Color representation of the badge     |
| `size`      | `"small" \| "medium"`                                                           | `"medium"`  | ❌       | Sizing configuration                  |
| `startIcon` | `React.FunctionComponent<React.SVGProps<SVGSVGElement>>`                        | —           | ❌       | Icon component placed before the text |
| `endIcon`   | `React.FunctionComponent<React.SVGProps<SVGSVGElement>>`                        | —           | ❌       | Icon component placed after the text  |
| `className` | [`BadgeClassNames`](#badgeclassnames)                                           | —           | ❌       | Per-slot className overrides          |
| `style`     | [`BadgeStyles`](#badgestyles)                                                   | —           | ❌       | Per-slot inline style overrides       |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style an icon directly using `style?.startIcon`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `BadgeClassNames`

| Slot        | Targets                    |
| ----------- | -------------------------- |
| `root`      | Outermost wrapper `<span>` |
| `startIcon` | Start icon SVG element     |
| `endIcon`   | End icon SVG element       |

```tsx
<Badge
  color="success"
  label="Verified"
  className={{
    root: "my-badge-root",
    startIcon: "my-badge-icon",
  }}
/>
```

### `BadgeStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Badge
  color="warning"
  label="In Review"
  style={{
    root: { borderRadius: "6px" },
    startIcon: { color: "inherit" },
  }}
/>
```

---

## Theme Management

The `Badge` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="dark"]`** selectors applied at the root or document level.

All color tokens are redefined inside the `[data-theme="dark"]` scope — using `color-mix(in oklab, ...)` for semi-transparent backgrounds — so no manual switching is required.

---

## Design Tokens (Customization)

Beyond slots, the component leverages scoped CSS variables for a global design token system. CSS variables are declared inside the `.container` class scope and fall back to `--bearlab-badge-*` public tokens you can override.

```css
:root {
  /* Layout */
  --bearlab-badge-container-gap: 0.25rem;
  --bearlab-badge-container-padding: 0.125rem 0.625rem;
  --bearlab-badge-container-border-radius: 9999px;
  --bearlab-badge-container-font-weight: 600;

  /* Sizes */
  --bearlab-badge-small-font-size: 0.75rem;
  --bearlab-badge-medium-font-size: 0.875rem;

  /* Icons */
  --bearlab-badge-start-icon-width: 0.75rem;
  --bearlab-badge-end-icon-width: 0.75rem;

  /* Light / Primary colors */
  --bearlab-badge-light-primary-bg: #ecf3ff;
  --bearlab-badge-light-primary-color: #465fff;

  /* Solid / Primary colors */
  --bearlab-badge-solid-primary-bg: #465fff;
  --bearlab-badge-solid-primary-color: #fff;
}
```

> All tokens follow the `--bearlab-badge-[variant]-[color]-[property]` naming convention. The full list of available tokens mirrors the CSS variable declarations in `badge.module.scss`.

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **Semantic Iconography (`aria-hidden="true"`)** — Applied to decorative `startIcon` and `endIcon` elements to prevent redundant screen reader announcements, keeping focus on the `label`.

---

## TypeScript

The following types are exported from the package:

```ts
import type { BadgeProps, BadgeClassNames, BadgeStyles } from "@bearlab/badge";
```

### `BadgeProps`

```ts
interface BadgeProps {
  label: string | number;
  variant?: BadgeVariant; // "light" | "solid", default: "light"
  color?: BadgeColor; // "primary" | "success" | "error" | "warning" | "info" | "light" | "dark", default: "primary"
  size?: BadgeSize; // "small" | "medium", default: "medium"
  startIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: BadgeClassNames;
  style?: BadgeStyles;
}
```

### `BadgeClassNames`

```ts
interface BadgeClassNames {
  root?: string;
  startIcon?: string;
  endIcon?: string;
}
```

### `BadgeStyles`

```ts
interface BadgeStyles {
  root?: React.CSSProperties;
  startIcon?: React.CSSProperties;
  endIcon?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
