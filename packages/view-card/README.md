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
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Dual-mode rendering** — Automatically switches between content card and empty state based on `children`
- ✅ **Collapsible support** — Optional `collapsible` mode with `defaultOpen` control
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity issues
- ✅ **Design token system** — global theming via `--bearlab-view-card-*` CSS variables
- ✅ **Accessible by default** — semantic HTML structure and ARIA-compliant markup
- ✅ **Light & dark theme** — natively responds to `[data-theme="light"]` and `[data-theme="dark"]`
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

```tsx
import { ViewCard } from "@bearlab/view-card";

// Content card
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

```tsx
// Empty state — no children provided
<ViewCard
  title="No Data Available"
  description="There's nothing to show here yet."
/>
```

---

## Props

| Prop          | Type                                        | Default | Required | Description                                                     |
| ------------- | ------------------------------------------- | ------- | -------- | --------------------------------------------------------------- |
| `title`       | `string`                                    | —       | ❌       | Card title displayed in the header section                      |
| `description` | `string`                                    | —       | ❌       | Subtitle text displayed below the title                         |
| `children`    | `React.ReactNode \| null \| undefined`      | —       | ❌       | Card content. Present → content card; Absent → empty state card |
| `collapsible` | `boolean`                                   | `false` | ❌       | Enables collapse/expand toggle on the card body                 |
| `defaultOpen` | `boolean`                                   | `true`  | ❌       | Initial open state when `collapsible` is `true`                 |
| `className`   | [`ViewCardClassNames`](#viewcardclassnames) | —       | ❌       | Per-slot className overrides                                    |
| `style`       | [`ViewCardStyles`](#viewcardstyles)         | —       | ❌       | Per-slot inline style overrides                                 |

---

## Dual-Mode Rendering

The `ViewCard` component intelligently selects its rendering mode based on the presence of `children`:

- **With `children`** → Renders `ViewCardWithContent`: a structured card with header and content area.
- **Without `children`** → Renders `ViewCardEmpty`: a card with an empty-state icon and messaging.

```tsx
// Content mode
<ViewCard title="Active Data" description="Live metrics">
  <MyChart />
</ViewCard>

// Empty state mode
<ViewCard title="No Records" description="Add some entries to get started." />
```

### Collapsible Mode

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

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and class names directly into child elements via the `className` and `style` objects.

For example, you can target the root container using `className?.root` or apply inline styles to the header using `style?.header`. Each slot targets a specific DOM element, giving you surgical control over the component's rendering tree.

### `ViewCardClassNames`

| Slot          | Targets                      |
| ------------- | ---------------------------- |
| `root`        | Outermost container `<div>`  |
| `header`      | Header wrapper `<div>`       |
| `title`       | Title element                |
| `description` | Description `<p>`            |
| `content`     | Content body wrapper `<div>` |
| `icon`        | Empty state icon wrapper     |

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

The `ViewCard` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

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

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-view-card-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-view-card-root-border-radius: 12px;
  --bearlab-view-card-root-border-color: #e2e8f0;
  --bearlab-view-card-header-padding: 1.25rem 1.5rem;
  --bearlab-view-card-title-color: #1a202c;
  --bearlab-view-card-title-font-size: 1rem;
  --bearlab-view-card-description-color: #718096;
  --bearlab-view-card-content-padding: 1.25rem 1.5rem;
  --bearlab-view-card-icon-opacity: 0.4;
}

[data-theme="dark"] {
  --bearlab-view-card-root-border-color: #2d3748;
  --bearlab-view-card-title-color: #f7fafc;
  --bearlab-view-card-description-color: #a0aec0;
}
```

---

## Accessibility

This component follows **best-practice** accessibility standards, fully adhering to **WCAG 2.1 AA** requirements. By utilizing semantic HTML and appropriate ARIA attributes, it guarantees an inclusive experience:

- **Semantic heading hierarchy** — The `title` is rendered using a semantically appropriate heading element to ensure correct document outline and screen reader navigation.
- **Descriptive structure** — The `description` is associated with the card header, providing meaningful context for assistive technologies.
- **Empty state clarity** — When in empty-state mode, the icon is decorative and marked accordingly to prevent redundant announcements by screen readers (`aria-hidden="true"`).
- **Collapsible regions** — When `collapsible` is enabled, the component uses appropriate ARIA attributes (`aria-expanded`, `aria-controls`) to communicate the toggle state to assistive technologies.
- **Keyboard navigability** — Collapsible triggers are fully operable via keyboard (`Enter` / `Space`), meeting WCAG 2.1 SC 2.1.1.

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
  header?: string;
  title?: string;
  description?: string;
  content?: string;
  icon?: string;
}
```

### `ViewCardStyles`

```ts
interface ViewCardStyles {
  root?: React.CSSProperties;
  header?: React.CSSProperties;
  title?: React.CSSProperties;
  description?: React.CSSProperties;
  content?: React.CSSProperties;
  icon?: React.CSSProperties;
}
```

### `ViewCardProps`

```ts
interface ViewCardProps {
  className?: ViewCardClassNames;
  style?: ViewCardStyles;
  title?: string;
  description?: string;
  children?: React.ReactNode | null | undefined;
  collapsible?: boolean;
  defaultOpen?: boolean;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
