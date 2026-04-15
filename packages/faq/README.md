# @bearlab/faq

> Accessible, fully customizable FAQ component for React applications.

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
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Multiple Layout Variants** — Supports `FaqV1`, `FaqV2`, `FaqV3` templates
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — Support for ARIA attributes, semantic HTML schema
- ✅ **Flexible data structure** — Feed data easily via `data` prop or render children explicitly
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Zero layout opinion** — bring your own layout/wrapper

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

`FaqV1` renders a vertical accordion list where each item expands/collapses on click. Supports `allowMultiple` to keep multiple items open simultaneously and `defaultOpenIndexes` to pre-open specific items.

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
  return <FaqV1 data={faqData} allowMultiple={true} defaultOpenIndexes={[0]} />;
}
```

### FaqV2 — Two-Column Layout

`FaqV2` automatically splits the `data` array into two columns — the first column renders the first 3 items and the second column renders items 4–7. Each column manages its own open/close state independently. Best used with 4–6 FAQ items for a balanced grid layout.

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
      className={{
        root: "my-faq-grid",
        header: "my-faq-header",
      }}
    />
  );
}
```

> **Note:** `FaqV2` does **not** support `allowMultiple` or `defaultOpenIndexes` — each column independently allows only one open item at a time (accordion behaviour).

### FaqV3 — Icon-based Cards

`FaqV3` renders FAQ items as static cards, each decorated with a leading icon. The icon is controlled via the `iconType` prop which accepts a `default` string key (one of the built-in icon types) and an optional `custom` ReactElement for fully custom icons.

**Available built-in `default` icon types:**

| Value        | Description              |
| ------------ | ------------------------ |
| `"none"`     | No icon rendered         |
| `"export"`   | Upload / export icon     |
| `"add"`      | Plus / add icon          |
| `"document"` | Document / file icon     |
| `"update"`   | Refresh / update icon    |
| `"search"`   | Magnifier / search icon  |
| `"notify"`   | Bell / notification icon |
| `"dots"`     | More options / dots icon |
| `"tick"`     | Checkmark / tick icon    |
| `"support"`  | Headset / support icon   |

```tsx
import { FaqV3 } from "@bearlab/faq";

const faqData = [
  {
    id: 1,
    title: "How do I export my data?",
    content:
      "Navigate to Settings → Data Management → Export and choose your preferred format.",
  },
  {
    id: 2,
    title: "How do I add a new team member?",
    content:
      "Go to Settings → Team and click the 'Invite Member' button to send an invitation.",
  },
  {
    id: 3,
    title: "Where can I find my documents?",
    content:
      "All your documents are stored in the Documents section accessible from the sidebar.",
  },
  {
    id: 4,
    title: "How do I search for content?",
    content:
      "Use the global search bar at the top of the page (Ctrl+K / ⌘K) to search across all your content.",
  },
];

// Using a built-in icon type
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
      className={{
        root: "my-faq-v3-root",
        icon: "my-faq-v3-icon",
      }}
      style={{
        root: { gap: "1.5rem" },
        icon: { color: "#6366f1" },
      }}
    />
  );
}
```

---

## Props

### `FaqProps` (Common)

| Prop                 | Type                                            | Default | Required | Description                                               |
| -------------------- | ----------------------------------------------- | ------- | -------- | --------------------------------------------------------- |
| `data`               | [`FaqData[]`](#faqdata)                         | —       | ✅       | Array of FAQ data items containing `title` and `content`  |
| `allowMultiple`      | `boolean`                                       | `false` | ❌       | Whether multiple FAQ items can be open at the same time   |
| `defaultOpenIndexes` | `number[]`                                      | —       | ❌       | Array of indexes for items that should be open by default |
| `className`          | [`FaqClassNames`](#faqclassnames)               | —       | ❌       | Per-slot className overrides                              |
| `style`              | [`FaqStyles`](#faqstyles)                       | —       | ❌       | Per-slot inline style overrides                           |
| `renderTitle`        | `(title: string, isOpen: boolean) => ReactNode` | —       | ❌       | Custom render function for titles                         |
| `renderContent`      | `(content: string) => ReactNode`                | —       | ❌       | Custom render function for content bodies                 |

_(Specific variants like `FaqV3` accept additional props such as `iconType`)_

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.content`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `FaqClassNames` / `FaqItemV1ClassNames`

| Slot                         | Targets                               |
| ---------------------------- | ------------------------------------- |
| `root`                       | Outermost container wrapper           |
| `item` / `accordionItem`     | Wrapper for each FAQ item             |
| `header`                     | Clickable header section (`<button>`) |
| `title` / `titleWrapper`     | Text wrapper for the question         |
| `icon`                       | Expansion toggle icon                 |
| `content` / `contentWrapper` | Collapsible section container         |
| `text`                       | Body text or inner wrapper (`<p>`)    |

```tsx
<FaqV1
  data={faqData}
  className={{
    root: "my-faq-root",
    header: "my-faq-header",
    content: "my-faq-content",
  }}
/>
```

### `FaqStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<FaqV1
  data={faqData}
  style={{
    root: { gap: "1rem", display: "flex", flexDirection: "column" },
    header: { padding: "16px", background: "#f5f5f5" },
  }}
/>
```

---

## Theme Management

The `Faq` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-faq-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-faq-root-gap: 12px;
  --bearlab-faq-header-background: #ffffff;
  --bearlab-faq-header-color: #1a1a1a;
  --bearlab-faq-content-padding: 1rem 1.5rem;
  --bearlab-faq-content-color: #4a4a4a;
  --bearlab-faq-border-radius: 8px;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience for collapsible accordions:

- **`<button>` natively** — The header triggers are actionable buttons to ensure native keyboard navigation (`Tab`, `Space`, `Enter`).
- **`aria-expanded`** — Indicates the open/closed state of each FAQ item dynamically.
- **`aria-controls`** — Links the header button directly to its collapsible content region, providing screen readers with the correct semantic relationship.
- **`id` mapping** — Ensures secure connections between standard trigger attributes and content areas using generated IDs.
- **`aria-hidden="true"`** — Applied properly to animated toggle icons to prevent redundant screen reader announcements.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  FaqProps,
  FaqClassNames,
  FaqV3Props,
  FaqItemProps,
  FaqV3ItemProps,
  FaqIconTypeStringValues,
  FaqData,
  FaqItemV1ClassNames,
  FaqItemV1Props,
  FaqItemV1Styles,
  FaqStyles,
  FaqV1Props,
} from "@bearlab/faq";
```

### `FaqProps`

```ts
interface FaqProps {
  style?: FaqItemV1Styles;
  allowMultiple?: boolean;
  data: FaqData[];
  className?: FaqItemV1ClassNames;
  defaultOpenIndexes?: number[];
  renderTitle?: (title: string, isOpen: boolean) => React.ReactNode;
  renderContent?: (content: string) => React.ReactNode;
}
```

### `FaqV1Props`

```ts
interface FaqV1Props {
  data: FaqData[];
  className?: FaqClassNames;
  style?: FaqStyles;
}
```

### `FaqV3Props`

```ts
interface FaqV3Props extends FaqProps {
  iconType: {
    default: FaqIconTypeStringValues;
    custom?: null | React.ReactElement;
  };
}
```

### `FaqItemProps`

```ts
interface FaqItemProps {
  title: string;
  content: string;
  isOpen?: boolean;
  toggleAccordion?: () => void;
  className?: FaqClassNames;
  style?: FaqStyles;
}
```

### `FaqV3ItemProps`

```ts
interface FaqV3ItemProps {
  item: FaqData;
  iconType: {
    default: FaqIconTypeStringValues;
    custom?: null | React.ReactElement;
  };
  className?: FaqClassNames;
  style?: FaqStyles;
}
```

### `FaqItemV1Props`

```ts
interface FaqItemV1Props {
  id: string | number;
  title: string;
  isOpen: boolean;
  content: string;
  style?: FaqItemV1Styles;
  className?: FaqItemV1ClassNames;
  onToggle: () => void;
  renderContent?: (content: string) => React.ReactNode;
  renderTitle?: (title: string, isOpen: boolean) => React.ReactNode;
}
```

### `FaqData`

```ts
interface FaqData {
  title: string;
  content: string;
  id?: string | number;
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
  | "export"
  | "add"
  | "document"
  | "update"
  | "search"
  | "notify"
  | "dots"
  | "tick"
  | "support";
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
