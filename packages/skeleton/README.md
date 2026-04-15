# @bearlab/skeleton

> Accessible, fully customizable Skeleton component for React applications. To provide smooth loading states while content is being fetched.

[![npm version](https://img.shields.io/npm/v/@bearlab/skeleton)](https://www.npmjs.com/package/@bearlab/skeleton)
[![license](https://img.shields.io/npm/l/@bearlab/skeleton)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Variants](#variants)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **4 semantic variants** — `default`, `article`, `card`, `list`
- ✅ **Animated by default** — smooth shimmer effect (`animated` prop)
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `aria-busy`, `aria-hidden` considerations
- ✅ **TypeScript-first** — fully typed props and interfaces
- ✅ **Zero layout opinion** — drop-in replacement layout/wrapper

---

## Installation

```bash
# npm
npm install @bearlab/skeleton

# yarn
yarn add @bearlab/skeleton

# pnpm
pnpm add @bearlab/skeleton
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { Skeleton } from "@bearlab/skeleton";

export default function App() {
  return (
    <Skeleton
      variant="article"
      animated={true}
      lines={4}
    />
  );
}
```

---

## Props

| Prop | Type | Default | Required | Description |
| ---- | ---- | ------- | -------- | ----------- |
| `variant` | `"default" \| "article" \| "card" \| "list"` | `"default"` | ❌ | Visual and semantic layout variant of the skeleton |
| `lines` | `number` | `4` | ❌ | Number of content lines to render (for default variant) |
| `animated` | `boolean` | `true` | ❌ | Enable/disable shimmer animation |
| `className` | `string \| SkeletonClassNames` | — | ❌ | Additional CSS class names or per-slot overrides |
| `style` | `React.CSSProperties \| SkeletonStyles` | — | ❌ | Inline style or per-slot inline style overrides |

---

## Variants

| Variant | Use case |
| ------- | -------- |
| `default` | General text content, fluid lines |
| `article` | Blog posts, news articles with avatar and titles |
| `card` | Product cards, image galleries, media items |
| `list` | User lists, comments, repeating content |

```tsx
<Skeleton variant="default" lines={6} />
<Skeleton variant="article" />
<Skeleton variant="card" />
<Skeleton variant="list" />
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.content`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `SkeletonClassNames`

| Slot | Targets |
| ---- | ------- |
| `root` | Outermost container `<div>` |
| `content` | Inner content wrapper / lines `<div>` |

```tsx
<Skeleton
  variant="default"
  className={{
    root: "my-skeleton-root",
    content: "my-skeleton-content",
  }}
/>
```

### `SkeletonStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Skeleton
  variant="card"
  style={{
    root: { borderRadius: "12px" },
    content: { height: "200px" },
  }}
/>
```

---

## Theme Management

The `Skeleton` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-skeleton-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-skeleton-root-bg: #e0e0e0;
  --bearlab-skeleton-content-shimmer-color: #f5f5f5;
  --bearlab-skeleton-root-border-radius: 8px;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`aria-busy="true"`** — Informs assistive technologies that the content is currently loading or updating.
- **`aria-hidden="true"`** — Applied to decorative loading elements to prevent screen readers from reading meaningless or confusing visual placeholders.
- Provides fallback descriptive text or labels to ensure screen readers inform users that content will populate shortly.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  SkeletonProps,
  SkeletonVariant,
} from "@bearlab/skeleton";
```

### `SkeletonVariant`

```ts
type SkeletonVariant = "default" | "article" | "card" | "list";
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
