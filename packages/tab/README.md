# @bearlab/tab

> Accessible, fully customizable Tab component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/tab)](https://www.npmjs.com/package/@bearlab/tab)
[![license](https://img.shields.io/npm/l/@bearlab/tab)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [TabItem](#tabitem-1)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Two visual variants** — `button` (pill-style) or `underline` tab triggers
- ✅ **Horizontal & Vertical layouts** — vertical layout activates at `≥768px`
- ✅ **Notification badge** — optional numeric badge per tab button
- ✅ **Icon support** — pass any SVG component as `icon` per tab item
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity battles
- ✅ **Dark mode ready** — responds to `[data-theme="dark"]` automatically
- ✅ **Accessible by default** — `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-orientation`
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/tab

# yarn
yarn add @bearlab/tab

# pnpm
pnpm add @bearlab/tab
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Basic — Button Variant

```tsx
import { Tab } from "@bearlab/tab";
import type { TabItem } from "@bearlab/tab";

const myTabs: TabItem[] = [
  {
    key: 1,
    title: "Profile",
    content: "Profile Information",
    notify: null,
    icon: null,
  },
  {
    key: 2,
    title: "Settings",
    content: "User Settings",
    notify: 3,
    icon: null,
  },
  {
    key: 3,
    title: "Billing",
    content: "Billing Details",
    notify: null,
    icon: null,
  },
];

export default function App() {
  return <Tab tabs={myTabs} actionType="button" />;
}
```

### Underline Variant

```tsx
<Tab tabs={myTabs} actionType="underline" />
```

### Vertical Layout

```tsx
<Tab tabs={myTabs} actionType="button" isVertical />
```

> **Note:** The vertical layout is only applied at viewport widths of `768px` and above. Below that breakpoint the component falls back to a horizontal layout.

---

## Props

| Prop         | Type                              | Default | Required | Description                                                 |
| ------------ | --------------------------------- | ------- | -------- | ----------------------------------------------------------- |
| `tabs`       | [`TabItem[]`](#tabitem-1)         | —       | ✅       | Array of tab definitions                                    |
| `actionType` | `"button" \| "underline"`         | —       | ✅       | Visual style for the tab triggers                           |
| `isVertical` | `boolean`                         | `false` | ❌       | Side-by-side layout for nav + content (activates at ≥768px) |
| `className`  | [`TabClassNames`](#tabclassnames) | —       | ❌       | Per-slot className overrides                                |
| `style`      | [`TabStyles`](#tabstyles)         | —       | ❌       | Per-slot inline style overrides                             |

---

## TabItem

Each object in the `tabs` array must conform to `TabItem`:

| Field     | Type                                                             | Required | Description                                 |
| --------- | ---------------------------------------------------------------- | -------- | ------------------------------------------- |
| `key`     | `number`                                                         | ✅       | Unique identifier for active-tab tracking   |
| `title`   | `string`                                                         | ✅       | Label rendered inside the tab button        |
| `content` | `string`                                                         | ✅       | Text rendered inside the tab panel          |
| `notify`  | `number \| null`                                                 | ✅       | Numeric badge count; `null` hides the badge |
| `icon`    | `React.FunctionComponent<React.SVGProps<SVGSVGElement>> \| null` | ✅       | SVG icon component; `null` renders no icon  |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. Pass custom class names or inline styles to the `className` / `style` props — each key targets a specific DOM element.

### `TabClassNames`

| Slot      | Targets                                          |
| --------- | ------------------------------------------------ |
| `root`    | Outermost container `<div>`                      |
| `header`  | Header wrapper `<div>` (contains the `<nav>`)    |
| `nav`     | The `<nav role="tablist">` element               |
| `button`  | Individual tab trigger `<button>`                |
| `notify`  | Notification badge `<span>` inside each button   |
| `content` | Active tab panel wrapper `<div role="tabpanel">` |

```tsx
<Tab
  tabs={myTabs}
  actionType="button"
  className={{
    root: "my-tab-root",
    button: "my-tab-button",
    content: "my-tab-content",
    notify: "my-badge",
  }}
/>
```

### `TabStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Tab
  tabs={myTabs}
  actionType="underline"
  style={{
    root: { gap: "1.5rem" },
    nav: { borderBottom: "2px solid #e4e7ec" },
    content: { padding: "1.5rem" },
  }}
/>
```

---

## Theme Management

The `Tab` component automatically adapts when a `data-theme="dark"` attribute is present on any ancestor element — no extra configuration is required.

```html
<html data-theme="dark">
  ...
</html>
```

---

## Design Tokens (Customization)

All visual defaults are scoped CSS custom properties defined on the component's root container. Override them globally or locally with `--bearlab-tab-*` variables.

```css
/* Light theme overrides */
:root,
[data-theme="light"] {
  --bearlab-tab-nav-bg: #f2f4f7;
  --bearlab-tab-button-bg-active: #ffffff;
  --bearlab-tab-button-color-active: #101828;
  --bearlab-tab-button-inactive-color: #667085;
  --bearlab-tab-notify-bg: #ecf3ff;
  --bearlab-tab-notify-color: #465fff;
  --bearlab-tab-content-border-color: #e4e7ec;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-tab-nav-bg: #101828;
  --bearlab-tab-button-bg-active: rgba(255, 255, 255, 0.03);
  --bearlab-tab-button-color-active: #ffffff;
  --bearlab-tab-notify-bg: color-mix(in oklab, #465fff 15%, transparent);
  --bearlab-tab-notify-color: #7592ff;
  --bearlab-tab-content-border-color: #1d2939;
}
```

**Key spacing tokens:**

| Token                                 | Default    | Description                            |
| ------------------------------------- | ---------- | -------------------------------------- |
| `--bearlab-tab-header-padding`        | `0.75rem`  | Header area padding                    |
| `--bearlab-tab-nav-padding`           | `0.25rem`  | Nav inner padding                      |
| `--bearlab-tab-nav-border-radius`     | `0.5rem`   | Nav background border radius           |
| `--bearlab-tab-button-border-radius`  | `0.375rem` | Tab button border radius               |
| `--bearlab-tab-button-padding-block`  | `0.5rem`   | Button vertical padding                |
| `--bearlab-tab-button-padding-inline` | `0.75rem`  | Button horizontal padding              |
| `--bearlab-tab-button-font-size`      | `0.875rem` | Button font size                       |
| `--bearlab-tab-button-font-weight`    | `500`      | Button font weight                     |
| `--bearlab-tab-button-gap`            | `0.5rem`   | Gap between icon and label             |
| `--bearlab-tab-notify-font-size`      | `0.75rem`  | Badge font size                        |
| `--bearlab-tab-content-padding`       | `1.5rem`   | Content area padding                   |
| `--bearlab-tab-vertical-gap`          | `1.875rem` | Gap between nav and content (vertical) |

---

## Accessibility

The `Tab` component follows the [ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) and conforms to **WCAG 2.1 AA**:

- **`role="tablist"` + `aria-orientation`** — the `<nav>` exposes `"horizontal"` or `"vertical"` based on `isVertical`.
- **`role="tab"` + `aria-selected`** — each `<button>` reports its active state.
- **`aria-controls`** — links each tab button to its panel via matching IDs (auto-generated with `useId`).
- **`role="tabpanel"` + `aria-labelledby`** — the active panel is labelled by its triggering button.
- **`tabIndex`** — active tab receives `0`; inactive tabs receive `-1` (roving focus pattern).
- **`aria-hidden="true"` on SVG icons** — decorative icons are excluded from the accessibility tree.
- **Notification badge** — the `<span>` uses `aria-label` (e.g. `"3 notifications"`) to announce the count.

---

## TypeScript

All types are exported from the package:

```ts
import type { TabProps, TabStyles, TabClassNames } from "@bearlab/tab";
```

### `TabItem`

```ts
interface TabItem {
  key: number;
  title: string;
  content: string;
  notify: number | null;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null;
}
```

### `TabClassNames`

```ts
interface TabClassNames {
  root?: string;
  header?: string;
  nav?: string;
  button?: string;
  notify?: string;
  content?: string;
}
```

### `TabStyles`

```ts
interface TabStyles {
  root?: React.CSSProperties;
  header?: React.CSSProperties;
  nav?: React.CSSProperties;
  button?: React.CSSProperties;
  notify?: React.CSSProperties;
  content?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
