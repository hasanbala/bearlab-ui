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

- ✅ **Variants & Colors** — `light` and `solid` variants with 7 different colors
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Design Tokens** — fully customizable via CSS variables
- ✅ **Icon Support** — seamlessly integrate `startIcon` and `endIcon`
- ✅ **Available Sizes** — easily switch between `small` and `medium`
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
      <Badge
        variant="solid"
        color="primary"
        label="New Feature"
        size="medium"
      />
      <Badge label="Warning" color="warning" />
      <Badge
        label="Completed"
        color="success"
        startIcon={CheckIcon}
        endIcon={ArrowRightIcon}
      />
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

| Slot        | Targets                            |
| ----------- | ---------------------------------- |
| `root`      | Outermost wrapper element `<span>` |
| `startIcon` | `startIcon` SVG element            |
| `endIcon`   | `endIcon` SVG element              |

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

The `Badge` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-badge-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-badge-root-border-radius: 9999px;
  --bearlab-badge-root-padding: 0.25rem 0.5rem;
  --bearlab-badge-root-font-size: 0.75rem;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **Semantic Iconography (`aria-hidden="true"`)** — Best-practice usage on decorative `startIcon` and `endIcon` elements to prevent redundant or confusing screen reader announcements, ensuring they focus purely to present the `label`.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  BadgeProps,
  BadgeVariant,
  BadgeColor,
  BadgeSize,
  BadgeClassNames,
  BadgeStyles,
} from "@bearlab/badge";
```

### `BadgeProps`

```ts
interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: BadgeColor;
  startIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string | number;
  className?: BadgeClassNames;
  style?: BadgeStyles;
}
```

### `BadgeVariant`, `BadgeColor` & `BadgeSize`

```ts
type BadgeVariant = "light" | "solid";
type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";
type BadgeSize = "small" | "medium";
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
