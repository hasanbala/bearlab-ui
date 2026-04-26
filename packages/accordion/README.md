# @bearlab/accordion

> Accessible, fully customizable Accordion component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/accordion)](https://www.npmjs.com/package/@bearlab/accordion)
[![license](https://img.shields.io/npm/l/@bearlab/accordion)](LICENSE)
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

- ✅ **Single & Multiple Expansion** — `allowMultiple` prop for granular control
- ✅ **Default Open State** — `defaultOpenIndexes` to pre-open items on mount
- ✅ **Slot-based `className` & `style` API** — highly customizable without CSS overrides
- ✅ **Accessible by default** — `aria-expanded`, `aria-controls`, `aria-labelledby`, `role="region"`, `inert` attribute for hidden panels
- ✅ **Custom Renderers** — `renderTitle` and `renderContent` for specialized layouts
- ✅ **Smooth Animations** — CSS `grid-template-rows` transition for content expand/collapse
- ✅ **Dark mode** — built-in `[data-theme="dark"]` token overrides
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/accordion

# yarn
yarn add @bearlab/accordion

# pnpm
pnpm add @bearlab/accordion
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Basic Usage

```tsx
import { Accordion } from "@bearlab/accordion";

const items = [
  {
    id: "1",
    title: "What is BearLab UI?",
    content: "A component library for React.",
  },
  {
    id: "2",
    title: "Is it accessible?",
    content: "Yes, fully WCAG 2.1 AA compliant.",
  },
  {
    id: "3",
    title: "Does it support dark mode?",
    content: 'Yes, via [data-theme="dark"] selector.',
  },
];

export default function App() {
  return <Accordion items={items} />;
}
```

### Multiple Expansion

```tsx
<Accordion items={items} allowMultiple defaultOpenIndexes={[0, 2]} />
```

### Custom Renderers

```tsx
<Accordion
  items={items}
  renderTitle={(title, isOpen) => (
    <strong style={{ color: isOpen ? "#465fff" : "#1d2939" }}>{title}</strong>
  )}
  renderContent={(content) => <div className="custom-content">{content}</div>}
/>
```

---

## Props

### `Accordion`

| Prop                 | Type                                            | Default | Required | Description                                          |
| -------------------- | ----------------------------------------------- | ------- | -------- | ---------------------------------------------------- |
| `items`              | `AccordionDataItem[]`                           | —       | ✅       | Array of data items containing `title` and `content` |
| `allowMultiple`      | `boolean`                                       | `false` | ❌       | Whether multiple accordion items can be open at once |
| `defaultOpenIndexes` | `number[]`                                      | `[]`    | ❌       | Indexes of items that are open on initial render     |
| `className`          | [`AccordionClassNames`](#accordionclassnames)   | —       | ❌       | Per-slot className overrides                         |
| `style`              | [`AccordionStyles`](#accordionstyles)           | —       | ❌       | Per-slot inline style overrides                      |
| `renderTitle`        | `(title: string, isOpen: boolean) => ReactNode` | —       | ❌       | Custom render function for the accordion title       |
| `renderContent`      | `(content: string) => ReactNode`                | —       | ❌       | Custom render function for the accordion content     |

### `AccordionDataItem`

| Property  | Type               | Required | Description                                               |
| --------- | ------------------ | -------- | --------------------------------------------------------- |
| `title`   | `string`           | ✅       | Heading text of the accordion item                        |
| `content` | `string`           | ✅       | Body text rendered inside the accordion item              |
| `id`      | `string \| number` | ❌       | Optional unique identifier. Defaults to the item's index. |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

### `AccordionClassNames`

| Slot             | Element                             | Description                        |
| ---------------- | ----------------------------------- | ---------------------------------- |
| `root`           | `<div>` (outermost container)       | The flex column wrapping all items |
| `accordionItem`  | `<div>` (per-item wrapper)          | Each accordion row                 |
| `header`         | `<button>` (toggle button)          | Clickable header region            |
| `titleWrapper`   | `<div>` wrapping the title          | Flex child that holds title text   |
| `icon`           | `<svg>` (chevron icon)              | Animated toggle icon               |
| `contentWrapper` | `<div>` (animated grid container)   | CSS grid expand/collapse wrapper   |
| `contentInner`   | `<div>` (overflow hidden container) | Inner overflow guard               |
| `text`           | `<p>` (default content text)        | Default paragraph renderer         |

```tsx
<Accordion
  items={items}
  className={{
    root: "my-accordion-root",
    header: "my-accordion-header",
    contentInner: "my-accordion-content",
  }}
/>
```

### `AccordionStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Accordion
  items={items}
  style={{
    root: { gap: "8px" },
    accordionItem: { borderRadius: "8px" },
    header: { padding: "12px 24px" },
  }}
/>
```

---

## Theme Management

The `Accordion` component features a robust theme architecture. It natively responds to **`[data-theme="dark"]`** applied to any ancestor element (including `<html>` or `<body>`), overriding all color tokens automatically for dark mode.

```html
<!-- Enable dark mode globally -->
<html data-theme="dark">
  ...
</html>
```

No additional configuration is required — all color transitions are handled via scoped CSS variables.

---

## Design Tokens (Customization)

The component exposes CSS custom properties using a `--bearlab-accordion-*` namespace. All tokens are scoped to the `.container` class, so they only affect the accordion — not your entire app.

Override tokens in your global stylesheet:

```css
/* Light mode overrides */
:root,
[data-theme="light"] {
  /* Layout & Spacing */
  --bearlab-accordion-gap: 0.75rem; /* gap between items (default: 12px) */
  --bearlab-accordion-item-radius: 1rem; /* item border radius (default: 16px) */
  --bearlab-accordion-header-padding: 0.75rem 0.75rem 0.75rem 1.5rem;

  /* Typography */
  --bearlab-accordion-title-font-size: 1.125rem; /* 18px */
  --bearlab-accordion-content-font-size: 1rem; /* 16px */
  --bearlab-accordion-content-line-height: 1.625rem; /* 26px */

  /* Colors */
  --bearlab-accordion-item-bg: #fff;
  --bearlab-accordion-item-border-color: #e5e7eb;
  --bearlab-accordion-title-color: #1d2939;
  --bearlab-accordion-content-color: #6b7280;

  /* Open / Active state */
  --bearlab-accordion-header-bg-open: #eef2ff;
  --bearlab-accordion-title-color-open: #465fff;
  --bearlab-accordion-item-border-color-open: #d0d5dd;

  /* Animation */
  --bearlab-accordion-duration: 0.28s;
  --bearlab-accordion-easing: cubic-bezier(0.4, 0, 0.2, 1);

  /* Icon */
  --bearlab-accordion-icon-size: 1.5rem; /* 24px */
  --bearlab-accordion-icon-wrapper-size: 2.75rem; /* 44px */
  --bearlab-accordion-icon-border-color: #c6cad1;
  --bearlab-accordion-icon-border-color-open: #8c93a0;
  --bearlab-accordion-icon-bg-hover: #e4e7ec;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --bearlab-accordion-item-bg: rgba(255, 255, 255, 0.03);
  --bearlab-accordion-item-border-color: #1f2937;
  --bearlab-accordion-title-color: rgba(255, 255, 255, 0.9);
  --bearlab-accordion-title-color-open: #7592ff;
  --bearlab-accordion-content-color: #9ca3af;
  --bearlab-accordion-header-bg-open: rgba(255, 255, 255, 0.03);
  --bearlab-accordion-icon-bg-hover: rgba(102, 112, 133, 0.24);
  --bearlab-accordion-icon-border-color: #5b5e62;
  --bearlab-accordion-icon-border-color-open: #fff;
}
```

---

## Accessibility

This component adheres to **WCAG 2.1 AA** standards and follows the [ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/):

- **`<button>` element** — The header is a native `<button>` (with `all: unset`) ensuring full keyboard support (Enter, Space) without any extra configuration.
- **`aria-expanded`** — Dynamically reflects the open/closed state to screen readers (`true` when open, `false` when closed).
- **`aria-controls`** — Links each header button to its content panel via a stable, deterministic ID (`accordion-panel-{id}`).
- **`role="region"` + `aria-labelledby`** — Each content panel is a landmark region labelled by its corresponding header (`accordion-header-{id}`), enabling efficient screen reader navigation.
- **`aria-hidden` + `inert`** — Hidden panels receive both `aria-hidden="true"` and the `inert` attribute, preventing interaction and announcement of collapsed content.
- **Decorative icon** — The chevron icon has `aria-hidden="true"` to avoid redundant announcements.

---

## TypeScript

All public types are exported from the package root:

```ts
import type {
  AccordionProps,
  AccordionDataItem,
  AccordionClassNames,
  AccordionStyles,
} from "@bearlab/accordion";
```

### `AccordionDataItem`

```ts
interface AccordionDataItem {
  title: string;
  content: string;
  id?: string | number;
}
```

### `AccordionProps`

```ts
interface AccordionProps {
  items: AccordionDataItem[];
  allowMultiple?: boolean;
  defaultOpenIndexes?: number[];
  className?: AccordionClassNames;
  style?: AccordionStyles;
  renderTitle?: (title: string, isOpen: boolean) => React.ReactNode;
  renderContent?: (content: string) => React.ReactNode;
}
```

### `AccordionClassNames`

```ts
interface AccordionClassNames {
  root?: string;
  accordionItem?: string;
  header?: string;
  titleWrapper?: string;
  icon?: string;
  contentWrapper?: string;
  contentInner?: string;
  text?: string;
}
```

### `AccordionStyles`

```ts
interface AccordionStyles {
  root?: React.CSSProperties;
  accordionItem?: React.CSSProperties;
  header?: React.CSSProperties;
  titleWrapper?: React.CSSProperties;
  icon?: React.CSSProperties;
  contentWrapper?: React.CSSProperties;
  contentInner?: React.CSSProperties;
  text?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
