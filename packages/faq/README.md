# @bearlab/faq

> Accessible, fully customizable FAQ component for React applications — three ready-made layout variants in one package.

[![npm version](https://img.shields.io/npm/v/@bearlab/faq)](https://www.npmjs.com/package/@bearlab/faq)
[![license](https://img.shields.io/npm/l/@bearlab/faq)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [FaqV1 — Standard Accordion](#faqv1--standard-accordion)
  - [FaqV2 — Two-Column Layout](#faqv2--two-column-layout)
  - [FaqV3 — Icon-based Cards](#faqv3--icon-based-cards)
- [Props](#props)
  - [FaqV1Props](#faqv1props-props)
  - [FaqV2Props](#faqv2props-props)
  - [FaqV3Props](#faqv3props-props)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Three layout variants** — `FaqV1` (accordion), `FaqV2` (two-column), `FaqV3` (icon cards)
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — ARIA attributes, semantic HTML, keyboard navigation
- ✅ **Flexible data structure** — feed items via `data` array prop
- ✅ **Custom renderers** — override title and content rendering on `FaqV1`
- ✅ **Dark mode** — native `[data-theme="dark"]` support
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/faq

# yarn
yarn add @bearlab/faq

# pnpm
pnpm add @bearlab/faq
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### FaqV1 — Standard Accordion

`FaqV1` renders a vertical accordion list. Each item expands/collapses on click. Supports `allowMultiple` to keep multiple panels open simultaneously and `defaultOpenIndexes` to pre-open specific items. The expand/collapse animation uses a CSS grid-template-rows transition for a smooth, layout-shift-free effect.

```tsx
import { FaqV1 } from "@bearlab/faq";

const faqData = [
  {
    id: 1,
    title: "How do I upgrade my license?",
    content:
      "You can upgrade your license from the billing section in your dashboard.",
  },
  {
    id: 2,
    title: "Is there a free trial?",
    content: "Yes, we offer a 14-day free trial on all plans.",
  },
  {
    id: 3,
    title: "How do I cancel my subscription?",
    content:
      "You can cancel your subscription at any time from the account settings page.",
  },
];

export default function App() {
  return (
    <FaqV1
      data={faqData}
      allowMultiple={true}
      defaultOpenIndexes={[0]}
      renderTitle={(title, isOpen) => (
        <strong style={{ color: isOpen ? "#465fff" : undefined }}>
          {title}
        </strong>
      )}
    />
  );
}
```

### FaqV2 — Two-Column Layout

`FaqV2` automatically splits the `data` array into two columns. The first column renders the first 3 items; the second column renders items 4–7. Each column manages its own open/close state independently (only one open item per column at a time).

> **Note:** `FaqV2` does **not** support `allowMultiple` or `defaultOpenIndexes`. Best used with 4–6 items for a balanced grid.

```tsx
import { FaqV2 } from "@bearlab/faq";

const faqData = [
  {
    id: 1,
    title: "What payment methods do you accept?",
    content: "We accept Visa, Mastercard, PayPal, and bank transfers.",
  },
  {
    id: 2,
    title: "Can I change my plan later?",
    content: "Yes, you can upgrade or downgrade your plan at any time.",
  },
  {
    id: 3,
    title: "Is my data secure?",
    content:
      "Absolutely. We use industry-standard AES-256 encryption for all stored data.",
  },
  {
    id: 4,
    title: "Do you offer a refund policy?",
    content:
      "We offer a 30-day money-back guarantee on all plans, no questions asked.",
  },
  {
    id: 5,
    title: "How do I contact support?",
    content:
      "You can reach our support team via the live chat widget or by emailing support@example.com.",
  },
  {
    id: 6,
    title: "Is there a mobile app?",
    content: "Yes, our mobile app is available on both iOS and Android.",
  },
];

export default function App() {
  return (
    <FaqV2
      data={faqData}
      className={{ root: "my-faq-grid", header: "my-faq-header" }}
    />
  );
}
```

### FaqV3 — Icon-based Cards

`FaqV3` renders FAQ items as static cards, each decorated with a leading icon. The icon is controlled via the `iconType` prop which accepts a `default` string key (one of the built-in icons) and an optional `custom` ReactElement.

**Available built-in `default` icon types:**

| Value        | Description              |
| ------------ | ------------------------ |
| `"none"`     | No icon rendered         |
| `"add"`      | Plus / add icon          |
| `"dots"`     | More options / dots icon |
| `"export"`   | Upload / export icon     |
| `"update"`   | Refresh / update icon    |
| `"search"`   | Magnifier / search icon  |
| `"notify"`   | Bell / notification icon |
| `"document"` | Document / file icon     |
| `"support"`  | Headset / support icon   |
| `"tick"`     | Checkmark / tick icon    |

```tsx
import { FaqV3 } from "@bearlab/faq";

const faqData = [
  {
    id: 1,
    title: "How do I export my data?",
    content: "Navigate to Settings → Data Management → Export.",
  },
  {
    id: 2,
    title: "How do I add a new team member?",
    content: "Go to Settings → Team and click 'Invite Member'.",
  },
  {
    id: 3,
    title: "Where can I find my documents?",
    content: "All documents are in the Documents section in the sidebar.",
  },
];

// Built-in icon
export default function App() {
  return <FaqV3 data={faqData} iconType={{ default: "support" }} />;
}
```

**Using a custom icon:**

```tsx
import { FaqV3 } from "@bearlab/faq";
import { MyCustomIcon } from "./icons";

export default function App() {
  return (
    <FaqV3
      data={faqData}
      iconType={{
        default: "none",
        custom: <MyCustomIcon width={24} height={24} />,
      }}
      className={{ root: "my-faq-v3-root", icon: "my-faq-v3-icon" }}
      style={{ root: { gap: "1.5rem" }, icon: { color: "#6366f1" } }}
    />
  );
}
```

---

## Props

### `FaqV1Props` Props

| Prop                 | Type                                            | Default | Required | Description                                               |
| -------------------- | ----------------------------------------------- | ------- | -------- | --------------------------------------------------------- |
| `data`               | `FaqData[]`                                     | —       | ✅       | Array of FAQ items with `title`, `content`, optional `id` |
| `allowMultiple`      | `boolean`                                       | `false` | ❌       | Allow multiple items open simultaneously                  |
| `defaultOpenIndexes` | `number[]`                                      | `[]`    | ❌       | Indexes of items that should be open on mount             |
| `className`          | `FaqItemV1ClassNames`                           | —       | ❌       | Per-slot className overrides                              |
| `style`              | `FaqItemV1Styles`                               | —       | ❌       | Per-slot inline style overrides                           |
| `renderTitle`        | `(title: string, isOpen: boolean) => ReactNode` | —       | ❌       | Custom render function for item titles                    |
| `renderContent`      | `(content: string) => ReactNode`                | —       | ❌       | Custom render function for item content                   |

### `FaqV2Props` Props

| Prop        | Type            | Default | Required | Description                     |
| ----------- | --------------- | ------- | -------- | ------------------------------- |
| `data`      | `FaqData[]`     | —       | ✅       | Array of FAQ items              |
| `className` | `FaqClassNames` | —       | ❌       | Per-slot className overrides    |
| `style`     | `FaqStyles`     | —       | ❌       | Per-slot inline style overrides |

### `FaqV3Props` Props

| Prop        | Type                                                                  | Default | Required | Description                      |
| ----------- | --------------------------------------------------------------------- | ------- | -------- | -------------------------------- |
| `data`      | `FaqData[]`                                                           | —       | ✅       | Array of FAQ items               |
| `iconType`  | `{ default: FaqIconTypeStringValues; custom?: null \| ReactElement }` | —       | ✅       | Icon configuration for all items |
| `className` | `FaqClassNames`                                                       | —       | ❌       | Per-slot className overrides     |
| `style`     | `FaqStyles`                                                           | —       | ❌       | Per-slot inline style overrides  |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. Each slot maps directly to a DOM element in the component tree.

### `FaqItemV1ClassNames` / `FaqItemV1Styles` (used by `FaqV1`)

| Slot             | Targets                                            |
| ---------------- | -------------------------------------------------- |
| `root`           | Outermost container `<div>`                        |
| `accordionItem`  | Wrapper `<div>` for each FAQ item                  |
| `header`         | Clickable header row (role="button")               |
| `titleWrapper`   | `<div>` wrapping the `<h4>` title                  |
| `icon`           | Expand/collapse toggle button                      |
| `contentWrapper` | Animated collapse container (`grid-template-rows`) |
| `contentInner`   | Inner `<div>` with `overflow: hidden`              |
| `text`           | Body text `<p>`                                    |

```tsx
<FaqV1
  data={faqData}
  className={{
    root: "my-faq-root",
    accordionItem: "my-faq-item",
    header: "my-faq-header",
    contentWrapper: "my-faq-content",
  }}
/>
```

### `FaqClassNames` / `FaqStyles` (used by `FaqV2` and `FaqV3`)

| Slot      | Targets                           |
| --------- | --------------------------------- |
| `root`    | Outermost container `<div>`       |
| `item`    | Wrapper `<div>` for each FAQ item |
| `header`  | Clickable header row              |
| `title`   | Question `<h4>` element           |
| `icon`    | Expand/collapse toggle icon       |
| `content` | Content area container            |
| `text`    | Body text `<p>`                   |

```tsx
<FaqV2
  data={faqData}
  style={{
    root: { gap: "1rem" },
    header: { padding: "16px", background: "#f5f5f5" },
  }}
/>
```

---

## Theme Management

All three FAQ variants respond natively to `[data-theme="dark"]` applied at the document or a parent element level. No extra configuration is needed — token values automatically switch between light and dark palettes.

```html
<!-- Enable dark mode globally -->
<html data-theme="dark">
  …
</html>

<!-- Or scope it to a container -->
<div data-theme="dark">
  <FaqV1 data="{faqData}" />
</div>
```

---

## Design Tokens (Customization)

Each variant exposes its own set of scoped CSS custom properties. Override them in your stylesheet to customize appearance without touching component internals.

### FaqV1 tokens (example)

```css
.my-faq-container {
  /* Layout */
  --bearlab-faq-one-gap: 0.75rem;
  --bearlab-faq-one-item-radius: 1rem;
  --bearlab-faq-one-header-padding: 0.75rem 0.75rem 0.75rem 1.5rem;

  /* Colors */
  --bearlab-faq-one-item-bg: #ffffff;
  --bearlab-faq-one-item-border-color: #e5e7eb;
  --bearlab-faq-one-title-color: #1d2939;
  --bearlab-faq-one-title-color-open: #465fff;
  --bearlab-faq-one-header-bg-open: #eef2ff;
  --bearlab-faq-one-content-color: #6b7280;
}
```

### FaqV2 tokens (example)

```css
.my-faq-container {
  --bearlab-faq-two-column-gap: 2rem;
  --bearlab-faq-two-item-border-radius: 0.75rem;
  --bearlab-faq-two-header-bg-open: #eef2ff;
  --bearlab-faq-two-header-bg-closed: #f3f4f6;
  --bearlab-faq-two-content-border-color: #c7d2fe;
  --bearlab-faq-two-content-text-color: #1f2937;
}
```

### FaqV3 tokens (example)

```css
.my-faq-container {
  --bearlab-faq-three-grid-gap: 1rem;
  --bearlab-faq-three-icon-size: 1.5625rem;
  --bearlab-faq-three-item-border-color: #f3f4f6;
  --bearlab-faq-three-content-title-color: #1d2939;
  --bearlab-faq-three-content-description-color: #667085;
}
```

> **Tip:** Tokens are scoped to the component container (not `:root`), so overrides will not leak to other parts of your application.

---

## Accessibility

- **`role="button"` + `aria-expanded`** — The header element on `FaqV1` is given `role="button"` and `aria-expanded` reflects the open/closed state dynamically.
- **`aria-controls` / `id` mapping** — Each header is linked to its panel via `aria-controls="accordion-panel-{id}"` and the panel has a matching `id`, providing the correct semantic relationship for screen readers.
- **`aria-hidden={!isOpen}`** — The collapsible content wrapper is hidden from the accessibility tree when closed.
- **`aria-hidden="true"` on icons** — Decorative SVG icons are hidden from screen readers to avoid redundant announcements.
- **Keyboard navigation** — The header is clickable and focusable; `Enter` / `Space` toggle the item as expected from standard button behavior.

---

## TypeScript

All types are exported from the package root:

```ts
import type {
  FaqClassNames,
  FaqStyles,
  FaqV1Props,
  FaqV2Props,
  FaqV3Props,
} from "@bearlab/faq";
```

### `FaqData`

```ts
interface FaqData {
  title: string;
  content: string;
  id?: string | number;
}
```

### `FaqV1Props`

```ts
interface FaqV1Props {
  data: FaqData[];
  allowMultiple?: boolean;
  defaultOpenIndexes?: number[];
  className?: FaqItemV1ClassNames;
  style?: FaqItemV1Styles;
  renderTitle?: (title: string, isOpen: boolean) => React.ReactNode;
  renderContent?: (content: string) => React.ReactNode;
}
```

### `FaqV2Props`

```ts
interface FaqV2Props {
  data: FaqData[];
  className?: FaqClassNames;
  style?: FaqStyles;
}
```

### `FaqV3Props`

```ts
interface FaqV3Props extends FaqV2Props {
  iconType: {
    default: FaqIconTypeStringValues;
    custom?: null | React.ReactElement;
  };
}
```

### `FaqClassNames`

```ts
interface FaqClassNames {
  root?: string;
  item?: string;
  header?: string;
  title?: string;
  icon?: string;
  content?: string;
  text?: string;
}
```

### `FaqStyles`

```ts
interface FaqStyles {
  root?: React.CSSProperties;
  item?: React.CSSProperties;
  header?: React.CSSProperties;
  title?: React.CSSProperties;
  icon?: React.CSSProperties;
  content?: React.CSSProperties;
  text?: React.CSSProperties;
}
```

### `FaqItemV1ClassNames`

```ts
interface FaqItemV1ClassNames {
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

### `FaqItemV1Styles`

```ts
interface FaqItemV1Styles {
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

### `FaqIconTypeStringValues`

```ts
type FaqIconTypeStringValues =
  | "none"
  | "add"
  | "dots"
  | "export"
  | "update"
  | "search"
  | "notify"
  | "document"
  | "support"
  | "tick";
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
