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
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Horizontal or Vertical Layouts** — Support for both orientations
- ✅ **Visual variants** — `button` or `underline` visual styles for tab items
- ✅ **Notifications** — Render a badge/notification inside tab items
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `role="tablist"`, `role="tab"`, `aria-selected`
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

```tsx
import { Tab } from "@bearlab/tab";

const myTabs = [
  { key: 1, title: "Profile", content: "Profile Information", notify: null, icon: null },
  { key: 2, title: "Settings", content: "User Settings", notify: 3, icon: null },
];

export default function App() {
  return (
    <Tab
      tabs={myTabs}
      actionType="underline"
    />
  );
}
```

---

## Props

| Prop         | Type                                    | Default | Required | Description                                     |
| ------------ | --------------------------------------- | ------- | -------- | ----------------------------------------------- |
| `tabs`       | [`TabItem[]`](#tabitem)                 | —       | ✅       | Configuration array for rendering tabs          |
| `actionType` | `"button" \| "underline"`               | —       | ✅       | Visual styling type for the tab triggers        |
| `isVertical` | `boolean`                               | `false` | ❌       | Whether the tabs should be arranged vertically  |
| `className`  | [`TabClassNames`](#tabclassnames)       | —       | ❌       | Per-slot className overrides                    |
| `style`      | [`TabStyles`](#tabstyles)               | —       | ❌       | Per-slot inline style overrides                 |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.content`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `TabClassNames`

| Slot      | Targets                                 |
| --------- | --------------------------------------- |
| `root`    | Outermost container `<div>`             |
| `header`  | Header wrapper `<div>`                  |
| `nav`     | The correct semantic `<nav>` wrapper    |
| `button`  | Individual tab trigger button           |
| `notify`  | Notification badge indicator            |
| `content` | The wrapper for active tab panel content|

```tsx
<Tab
  tabs={myTabs}
  actionType="button"
  className={{
    root: "my-tab-root",
    button: "my-tab-button",
    content: "my-tab-content",
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
    root: { gap: "1rem" },
    nav: { borderBottom: "1px solid #ccc" },
  }}
/>
```

---

## Theme Management

The `Tab` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-tab-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-tab-root-gap: 16px;
  --bearlab-tab-button-padding: 0.5rem 1rem;
  --bearlab-tab-button-active-bg: #e0e0e0;
  --bearlab-tab-content-padding: 1.5rem;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`role="tablist"`** — Identifies the element that serves as the container for a set of tabs.
- **`role="tab"` & `role="tabpanel"`** — Associates the trigger button with its corresponding content panel.
- **`aria-selected`** — Indicates the currently active tab.
- **`aria-controls` & `aria-labelledby`** — Provide a semantic connection tying the tab and its content panel together for screen readers.
- **`aria-orientation`** — Set to `"vertical" | "horizontal"` depending on the `isVertical` prop.
- **Keyboard Navigation** — Should be navigable using proper tab-index and keyboard patterns (Arrow keys/Tab).

---

## TypeScript

All types are exported from the package:

```ts
import type {
  TabProps,
  TabItem,
  TabActionType,
  TabClassNames,
  TabStyles,
} from "@bearlab/tab";
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
