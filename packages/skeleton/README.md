# @bearlab/skeleton

> Accessible, fully customizable Skeleton loading component for React applications. Provides smooth shimmer placeholders while content is being fetched.

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

- ✅ **8 semantic variants** — `default`, `article`, `card`, `list`, `modal`, `profile`, `table`, `form`
- ✅ **Shimmer animation** — smooth animated effect enabled via the `animated` prop
- ✅ **`lines` control** — configure how many content lines each variant renders
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Dark mode support** — responds to `[data-theme="dark"]` automatically
- ✅ **TypeScript-first** — fully typed props, variant types, and slot interfaces
- ✅ **Zero layout opinion** — drop-in loading placeholder, no layout assumptions

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

### Basic Usage

```tsx
import { Skeleton } from "@bearlab/skeleton";

export default function App() {
  return <Skeleton variant="article" lines={4} />;
}
```

### Conditional Loading

```tsx
import { Skeleton } from "@bearlab/skeleton";

export default function UserCard({ isLoading, user }) {
  if (isLoading) {
    return <Skeleton variant="card" animated={true} />;
  }

  return <div>{user.name}</div>;
}
```

### Static (Non-animated) Skeleton

```tsx
<Skeleton variant="list" animated={false} lines={5} />
```

---

## Props

| Prop        | Type                 | Default     | Required | Description                                          |
| ----------- | -------------------- | ----------- | -------- | ---------------------------------------------------- |
| `variant`   | `SkeletonVariant`    | `"default"` | ❌       | Visual and structural layout variant of the skeleton |
| `lines`     | `number`             | `4`         | ❌       | Number of content lines to render inside the variant |
| `animated`  | `boolean`            | `true`      | ❌       | Enables or disables the shimmer animation            |
| `className` | `SkeletonClassNames` | —           | ❌       | Per-slot CSS class names for internal elements       |
| `style`     | `SkeletonStyles`     | —           | ❌       | Per-slot inline style objects for internal elements  |

---

## Variants

The `variant` prop determines both the visual structure and the semantic layout of the skeleton. Each variant is implemented as a dedicated sub-component internally.

| Variant   | Sub-component     | Use case                                           |
| --------- | ----------------- | -------------------------------------------------- |
| `default` | `SkeletonDefault` | Generic two-column grid of text lines              |
| `article` | `SkeletonArticle` | Blog posts, news articles with avatar and title    |
| `card`    | `SkeletonCard`    | Product cards, image galleries, media items        |
| `list`    | `SkeletonList`    | User lists, comments, repeating row content        |
| `modal`   | `SkeletonModal`   | Loading states inside dialogs and modal windows    |
| `profile` | `SkeletonProfile` | User profile summaries with avatar and stats grid  |
| `table`   | `SkeletonTable`   | Data tables with header row and body rows          |
| `form`    | `SkeletonForm`    | Input fields, labels, and action buttons in a form |

```tsx
<Skeleton variant="default" lines={6} />
<Skeleton variant="article" />
<Skeleton variant="card" />
<Skeleton variant="list" lines={5} />
<Skeleton variant="modal" />
<Skeleton variant="profile" />
<Skeleton variant="table" lines={4} />
<Skeleton variant="form" lines={3} />
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. Both `className` and `style` accept an object whose keys correspond to specific internal DOM elements.

> **Note:** Not every slot is used by every variant. For example, `avatar` is used by `article` and `profile`; `row` and `cell` are used by `table`; `label` and `input` are used by `form`.

### `SkeletonClassNames` & `SkeletonStyles`

| Slot          | Targets                                                  |
| ------------- | -------------------------------------------------------- |
| `root`        | Outermost container `<div>` (receives variant class too) |
| `content`     | Inner content card wrapper                               |
| `header`      | Header section (article, modal)                          |
| `body`        | Main content area (article, modal)                       |
| `footer`      | Footer section (modal)                                   |
| `avatar`      | Circular avatar placeholder (article, profile)           |
| `title`       | Main title line                                          |
| `subtitle`    | Secondary/subtitle line                                  |
| `description` | Description text block                                   |
| `line`        | Individual text line (default, article, card, modal)     |
| `image`       | Large image/media placeholder (card)                     |
| `item`        | Repeating list item wrapper (list)                       |
| `label`       | Form label placeholder (form)                            |
| `input`       | Input field placeholder (form)                           |
| `button`      | Action button placeholder (form, modal)                  |
| `row`         | Table row (table)                                        |
| `cell`        | Table cell (table)                                       |

```tsx
<Skeleton
  variant="article"
  className={{
    root: "my-skeleton-root",
    avatar: "my-avatar-placeholder",
    title: "my-title-placeholder",
    line: "my-line-placeholder",
  }}
  style={{
    line: { height: "0.75rem", marginBottom: "0.5rem" },
    avatar: { width: "3rem", height: "3rem" },
  }}
/>
```

---

## Theme Management

The `Skeleton` component features a robust theme architecture. It natively responds to **`[data-theme="dark"]`** selectors applied at any ancestor level, automatically switching shimmer colors, background colors, and surface backgrounds for dark mode. No additional configuration or JavaScript is required.

---

## Design Tokens (Customization)

Beyond slots, the component leverages scoped CSS variables for a global design token system. You can override the default appearance by redefining these variables in your own stylesheet. All tokens follow the `--bearlab-skeleton-*` naming convention.

```css
/* Override examples — only set what you need */
:root {
  /* Base skeleton tile color */
  --bearlab-skeleton-bg: #e4e7ec;

  /* Shimmer gradient overlay */
  --bearlab-skeleton-shimmer: linear-gradient(
    90deg,
    transparent,
    rgba(70, 95, 255, 0.15),
    transparent
  );

  /* Animation speed */
  --bearlab-skeleton-shimmer-duration: 2s;

  /* Content card surface */
  --bearlab-skeleton-surface-bg: #fff;

  /* Border and shadow */
  --bearlab-skeleton-border: #e4e7ec;
  --bearlab-skeleton-border-radius: 0.5rem;

  /* Accent color (hover state) */
  --bearlab-skeleton-accent: color-mix(in oklab, #465fff 8%, transparent);

  /* Spacing */
  --bearlab-skeleton-content-padding: 1.5rem;
  --bearlab-skeleton-line-height: 1rem;
}
```

---

## Accessibility

The `Skeleton` component follows best practices for accessible loading states:

- **Visual-only placeholders** — All skeleton tiles are purely presentational. They carry no meaningful content for screen readers.
- **`aria-hidden="true"`** — Should be applied to the skeleton wrapper when rendered conditionally alongside real content, preventing screen readers from announcing empty placeholder shapes.
- **`aria-busy="true"`** — Recommended on the closest meaningful ancestor element (e.g., a section or region) while content is loading, informing assistive technologies that the area is updating.
- **Fallback text** — For critical loading regions, consider adding a visually hidden `<span>` (e.g., `"Loading content..."`) inside the skeleton wrapper for screen reader announcements.

```tsx
{
  /* Best practice usage for accessible loading states */
}
<section aria-busy={isLoading} aria-label="User profile">
  {isLoading ? (
    <Skeleton variant="profile" aria-hidden="true" />
  ) : (
    <UserProfile data={user} />
  )}
</section>;
```

---

## TypeScript

All types are exported from the package:

```ts
import type {
  SkeletonProps,
  SkeletonClassNames,
  SkeletonStyles,
} from "@bearlab/skeleton";
```

### `SkeletonVariant`

```ts
type SkeletonVariant =
  | "default"
  | "article"
  | "card"
  | "list"
  | "modal"
  | "profile"
  | "table"
  | "form";
```

### `SkeletonProps`

```ts
interface SkeletonProps {
  variant?: SkeletonVariant;
  lines?: number;
  animated?: boolean;
  className?: SkeletonClassNames;
  style?: SkeletonStyles;
}
```

### `SkeletonClassNames`

```ts
interface SkeletonClassNames {
  root?: string;
  content?: string;
  header?: string;
  body?: string;
  footer?: string;
  avatar?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  line?: string;
  image?: string;
  item?: string;
  label?: string;
  input?: string;
  button?: string;
  row?: string;
  cell?: string;
}
```

### `SkeletonStyles`

```ts
interface SkeletonStyles {
  root?: React.CSSProperties;
  content?: React.CSSProperties;
  header?: React.CSSProperties;
  body?: React.CSSProperties;
  footer?: React.CSSProperties;
  avatar?: React.CSSProperties;
  title?: React.CSSProperties;
  subtitle?: React.CSSProperties;
  description?: React.CSSProperties;
  line?: React.CSSProperties;
  image?: React.CSSProperties;
  item?: React.CSSProperties;
  label?: React.CSSProperties;
  input?: React.CSSProperties;
  button?: React.CSSProperties;
  row?: React.CSSProperties;
  cell?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
