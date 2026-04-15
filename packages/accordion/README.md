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
- ✅ **Slot-based `className` & `style` API** — highly customizable without CSS overrides
- ✅ **Accessible by default** — `aria-expanded`, `aria-controls`, `aria-labelledby`, `role="region"`, `role="button"`
- ✅ **Custom Renderers** — `renderTitle` and `renderContent` for specialized layouts
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Zero layout opinion** — bring your own layout/wrapper

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

```tsx
import { Accordion } from "@bearlab/accordion";

export default function App() {
  const items = [
    { title: "Section 1", content: "Content for section 1" },
    { title: "Section 2", content: "Content for section 2" },
  ];

  return <Accordion items={items} allowMultiple={false} />;
}
```

---

## Props

### `Accordion`

| Prop                 | Type                                          | Default | Required | Description                                          |
| -------------------- | --------------------------------------------- | ------- | -------- | ---------------------------------------------------- |
| `items`              | `AccordionDataItem[]`                         | —       | ✅       | Array of data items containing `title` and `content` |
| `allowMultiple`      | `boolean`                                     | `false` | ❌       | Whether multiple accordion items can be open at once |
| `defaultOpenIndexes` | `number[]`                                    | `[]`    | ❌       | Array of indexes of items to be open by default      |
| `className`          | [`AccordionClassNames`](#accordionclassnames) | —       | ❌       | Per-slot className overrides                         |
| `style`              | [`AccordionStyles`](#accordionstyles)         | —       | ❌       | Per-slot inline style overrides                      |
| `renderTitle`        | `(title, isOpen) => React.ReactNode`          | —       | ❌       | Custom render function for the accordion title       |
| `renderContent`      | `(content) => React.ReactNode`                | —       | ❌       | Custom render function for the accordion content     |

### `AccordionDataItem`

| Property  | Type               | Required | Description                                               |
| --------- | ------------------ | -------- | --------------------------------------------------------- |
| `title`   | `string`           | ✅       | Heading text of the accordion item                        |
| `content` | `string`           | ✅       | Body text rendered inside the accordion item              |
| `id`      | `string \| number` | ❌       | Optional unique identifier. Defaults to the item's index. |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.contentInner`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `AccordionClassNames`

| Slot             | Targets                             |
| ---------------- | ----------------------------------- |
| `root`           | Outermost container `<div>`         |
| `accordionItem`  | Individual accordion item wrapper   |
| `header`         | Button element acting as the header |
| `titleWrapper`   | Wrapper for the title text          |
| `icon`           | Toggle icon `<span>` or `<svg>`     |
| `contentWrapper` | Animated content wrapper block      |
| `contentInner`   | Inner container holding the content |
| `text`           | Text element inside the content     |

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
    root: { gap: "8px", display: "flex", flexDirection: "column" },
    header: { padding: "16px", backgroundColor: "#f9f9f9" },
  }}
/>
```

---

## Theme Management

The `Accordion` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-accordion-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-accordion-root-gap: 8px;
  --bearlab-accordion-header-bg: #ffffff;
  --bearlab-accordion-header-color: #1a1a1a;
  --bearlab-accordion-content-bg: #f5f5f5;
  --bearlab-accordion-text-color: #4a4a4a;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`role="button"` / Keyboard Navigation** — The header operates natively or as a button, allowing full keyboard interaction (Enter, Space).
- **`aria-expanded`** — Dynamically indicates the expansion state of the accordion panel to screen readers (`true` when open, `false` when closed).
- **`aria-controls`** — Links the control (header) to the exact content panel it manipulates, using stable IDs.
- **`role="region"` / `aria-labelledby`** — The content panel serves as a landmark region titled by its corresponding header for streamlined screen reader navigation.

---

## TypeScript

All types are exported from the package:

```ts
import {
  Accordion,
  type AccordionProps,
  type AccordionDataItem,
  type AccordionItemProps,
  type AccordionClassNames,
  type AccordionStyles,
} from "@bearlab/accordion";
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

### `AccordionDataItem`

```ts
interface AccordionDataItem {
  title: string;
  content: string;
  id?: string | number;
}
```

### `AccordionItemProps`

```ts
interface AccordionItemProps {
  id: string | number;
  title: string;
  isOpen: boolean;
  content: string;
  onToggle: () => void;
  style?: AccordionStyles;
  className?: AccordionClassNames;
  renderContent?: (content: string) => React.ReactNode;
  renderTitle?: (title: string, isOpen: boolean) => React.ReactNode;
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
