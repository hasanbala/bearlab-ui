# @bearlab/view-card

> Accessible, fully customizable ViewCard component for React applications — with smart dual-mode rendering (content & empty state).

[![npm version](https://img.shields.io/npm/v/@bearlab/view-card)](https://www.npmjs.com/package/@bearlab/view-card)
[![license](https://img.shields.io/npm/l/@bearlab/view-card)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Dual-Mode Rendering](#dual-mode-rendering)
- [Collapsible Mode](#collapsible-mode)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Dual-mode rendering** — Automatically switches between a content card (`ViewCardWithContent`) and an empty-state card (`ViewCardEmpty`) based on the presence of `children`
- ✅ **Collapsible support** — Optional `collapsible` mode with `defaultOpen` control, smooth CSS animation via `grid-template-rows`
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity issues
- ✅ **Design token system** — global theming via `--bearlab-view-card-*` CSS variables
- ✅ **Light & dark theme** — natively responds to `[data-theme="dark"]`
- ✅ **Accessible by default** — `role="region"`, `aria-labelledby`, `aria-expanded`, `aria-controls`, `inert` on collapsed panels, keyboard navigation
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/view-card

# yarn
yarn add @bearlab/view-card

# pnpm
pnpm add @bearlab/view-card
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Content card

```tsx
import { ViewCard } from "@bearlab/view-card";

export default function App() {
  return (
    <ViewCard
      title="Dashboard Statistics"
      description="Overview of your key metrics"
    >
      <div>
        <p>Revenue: $12,345</p>
        <p>Users: 1,234</p>
      </div>
    </ViewCard>
  );
}
```

### Empty state card

```tsx
// No children provided → renders the empty state layout with icon
<ViewCard
  title="No Data Available"
  description="There's nothing to show here yet."
/>
```

---

## Props

| Prop          | Type                                        | Default | Required | Description                                                                         |
| ------------- | ------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------- |
| `title`       | `string`                                    | —       | ❌       | Card title displayed in the header (`<h3>`)                                         |
| `description` | `string`                                    | —       | ❌       | Subtitle text displayed below the title (`<p>`)                                     |
| `children`    | `React.ReactNode \| null \| undefined`      | —       | ❌       | Card content. Present → content card; Absent → empty-state card                     |
| `collapsible` | `boolean`                                   | `false` | ❌       | Enables collapse/expand toggle on the card body (only applies when `children` exist)|
| `defaultOpen` | `boolean`                                   | `true`  | ❌       | Initial open state when `collapsible` is `true`                                     |
| `className`   | [`ViewCardClassNames`](#viewcardclassnames) | —       | ❌       | Per-slot className overrides                                                        |
| `style`       | [`ViewCardStyles`](#viewcardstyles)         | —       | ❌       | Per-slot inline style overrides                                                     |

---

## Dual-Mode Rendering

The `ViewCard` component intelligently selects its rendering mode based on the presence of `children`:

- **With `children`** → Renders `ViewCardWithContent`: a structured card with a header and scrollable content area.
- **Without `children`** (`null`, `undefined`, or not provided) → Renders `ViewCardEmpty`: a centered layout with an empty-state icon and messaging.

```tsx
// Content mode
<ViewCard title="Active Data" description="Live metrics">
  <MyChart />
</ViewCard>

// Empty state mode
<ViewCard title="No Records" description="Add some entries to get started." />
```

---

## Collapsible Mode

When `collapsible` is enabled on a content card, the header becomes a toggle button. The content panel animates in/out using `grid-template-rows` for a smooth, layout-friendly transition. The `inert` attribute is applied to the collapsed panel to prevent focus from reaching hidden content.

```tsx
<ViewCard
  title="Advanced Settings"
  description="Expand to configure"
  collapsible
  defaultOpen={false}
>
  <SettingsForm />
</ViewCard>
```

> **Note:** `collapsible` and `defaultOpen` are only relevant when `children` are provided. They have no effect in empty-state mode.

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and class names directly into child elements via the `className` and `style` objects.

### `ViewCardClassNames`

| Slot          | Targets                                                                   |
| ------------- | ------------------------------------------------------------------------- |
| `root`        | Outermost container `<div>`                                              |
| `header`      | Header wrapper `<div>` (content mode only)                               |
| `title`       | Title heading `<h3>`                                                     |
| `description` | Description paragraph `<p>`                                              |
| `content`     | Content body wrapper `<div>`                                             |
| `icon`        | Empty-state icon wrapper `<div>` (empty mode only)                       |

```tsx
<ViewCard
  title="User Report"
  description="Monthly overview"
  className={{
    root: "my-card-root",
    header: "my-card-header",
    title: "my-card-title",
    content: "my-card-content",
  }}
>
  <ReportTable />
</ViewCard>
```

### `ViewCardStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<ViewCard
  title="Analytics"
  description="Performance data"
  style={{
    root: { borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
    header: { padding: "1.5rem 2rem" },
    title: { fontSize: "1.25rem", fontWeight: 700 },
    content: { padding: "1.5rem 2rem" },
  }}
>
  <Chart />
</ViewCard>
```

---

## Theme Management

The `ViewCard` component features a robust theme architecture. It natively responds to the **`[data-theme="dark"]`** selector applied at any ancestor level (including `<html>`).

```html
<!-- Light theme (default) -->
<html data-theme="light">
  ...
</html>

<!-- Dark theme -->
<html data-theme="dark">
  ...
</html>
```

No additional configuration is required — the component automatically adapts its color scheme to match the active theme.

---

## Design Tokens (Customization)

The component exposes two sets of `--bearlab-view-card-*` CSS custom properties — one for the **content card** and one for the **empty-state card**. All tokens are scoped to their respective root class and have sensible defaults for both light and dark modes.

### Content Card Tokens

```css
/* Light theme overrides */
:root,
[data-theme="light"] {
  --bearlab-view-card-border-radius: 1rem;
  --bearlab-view-card-bg: #fff;
  --bearlab-view-card-border-color: #e5e7eb;
  --bearlab-view-card-header-border-color: #f3f4f6;
  --bearlab-view-card-title-color: #1f2937;
  --bearlab-view-card-title-font-size: 1rem;
  --bearlab-view-card-title-font-weight: 500;
  --bearlab-view-card-description-color: #6b7280;
  --bearlab-view-card-content-padding: 1rem;
  --bearlab-view-card-duration: 0.28s;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-view-card-bg: color-mix(in oklab, #fff 3%, transparent);
  --bearlab-view-card-border-color: #1d2939;
  --bearlab-view-card-header-border-color: #1d2939;
  --bearlab-view-card-title-color: rgba(255, 255, 255, 0.9);
  --bearlab-view-card-description-color: #98a2b3;
}
```

### Empty State Card Tokens

```css
/* Light theme overrides */
:root,
[data-theme="light"] {
  --bearlab-view-card-empty-min-height: 18.75rem;
  --bearlab-view-card-empty-bg: #fff;
  --bearlab-view-card-empty-border-color: #e5e7eb;
  --bearlab-view-card-empty-title-color: #1f2937;
  --bearlab-view-card-empty-title-font-size: 1.5rem;
  --bearlab-view-card-empty-description-color: #6b7280;
  --bearlab-view-card-empty-icon-fill: #6b7280;
  --bearlab-view-card-icon-size: 3.75rem;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-view-card-empty-bg: rgba(255, 255, 255, 0.03);
  --bearlab-view-card-empty-border-color: #1f2937;
  --bearlab-view-card-empty-title-color: rgba(255, 255, 255, 0.9);
  --bearlab-view-card-empty-description-color: #9ca3af;
}
```

### Representative Token Reference

| Token                                       | Default (light) | Description                          |
| ------------------------------------------- | --------------- | ------------------------------------ |
| `--bearlab-view-card-border-radius`         | `1rem`          | Card corner radius                   |
| `--bearlab-view-card-bg`                    | `#fff`          | Card background                      |
| `--bearlab-view-card-border-color`          | `#e5e7eb`       | Card border color                    |
| `--bearlab-view-card-title-color`           | `#1f2937`       | Title text color                     |
| `--bearlab-view-card-title-font-weight`     | `500`           | Title font weight                    |
| `--bearlab-view-card-description-color`     | `#6b7280`       | Description text color               |
| `--bearlab-view-card-content-padding`       | `1rem`          | Content area padding                 |
| `--bearlab-view-card-duration`              | `0.28s`         | Collapse/expand animation duration   |
| `--bearlab-view-card-chevron-size`          | `1.5rem`        | Chevron icon size                    |
| `--bearlab-view-card-empty-min-height`      | `18.75rem`      | Min height of the empty-state card   |
| `--bearlab-view-card-empty-title-font-size` | `1.5rem`        | Empty-state title font size          |
| `--bearlab-view-card-icon-size`             | `3.75rem`       | Empty-state icon size                |

---

## Accessibility

This component follows **best-practice** accessibility standards, fully adhering to **WCAG 2.1 AA** requirements:

- **`role="region"` + `aria-labelledby`** — When a `title` is provided, the card root is marked as a landmark region and labelled by the title `<h3>`, enabling efficient navigation for screen reader users.
- **Semantic heading `<h3>`** — The title is rendered as a heading to maintain a correct document outline.
- **Collapsible toggle** — The header becomes a `role="button"` with `aria-expanded` and `aria-controls` attributes, communicating the open/closed state to assistive technologies.
- **`inert` on collapsed panels** — When the content is collapsed, the `inert` attribute prevents keyboard focus from reaching hidden content, avoiding a confusing "ghost tab stop" experience.
- **Keyboard navigability** — Collapsible triggers respond to both `Enter` and `Space` keys, meeting WCAG 2.1 SC 2.1.1.
- **`aria-hidden="true"` on empty-state icon** — The decorative illustration is hidden from the accessibility tree.
- **`focus-visible` styles** — The collapsible header has a visible `:focus-visible` outline for keyboard users.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  ViewCardProps,
  ViewCardClassNames,
  ViewCardStyles,
} from "@bearlab/view-card";
```

### `ViewCardClassNames`

```ts
interface ViewCardClassNames {
  root?: string;
  icon?: string;
  title?: string;
  header?: string;
  content?: string;
  description?: string;
}
```

### `ViewCardStyles`

```ts
interface ViewCardStyles {
  root?: React.CSSProperties;
  icon?: React.CSSProperties;
  title?: React.CSSProperties;
  header?: React.CSSProperties;
  content?: React.CSSProperties;
  description?: React.CSSProperties;
}
```

### `ViewCardProps`

```ts
interface ViewCardProps {
  title?: string;
  description?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  style?: ViewCardStyles;
  className?: ViewCardClassNames;
  children?: React.ReactNode | null | undefined;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
