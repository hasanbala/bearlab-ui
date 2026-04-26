# @bearlab/pricing

> Accessible, fully customizable Pricing component for React applications. Supports three distinct layout variants with built-in billing toggle, recommended badges, and per-slot customization.

[![npm version](https://img.shields.io/npm/v/@bearlab/pricing)](https://www.npmjs.com/package/@bearlab/pricing)
[![license](https://img.shields.io/npm/l/@bearlab/pricing)](LICENSE)
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

- ✅ **3 distinct layout types** — `"one"` (billing toggle), `"two"` (icon cards), `"three"` (recommended badge)
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity issues
- ✅ **Accessible by default** — keyboard navigation (`Enter`, `Space`), `aria-selected`, `aria-label`, semantic HTML
- ✅ **Customizable Icons** — replace default check/close icons with any `ReactNode`
- ✅ **TypeScript-first** — fully typed discriminated union props and slot interfaces
- ✅ **Dark mode support** — responds to `[data-theme="dark"]` out of the box
- ✅ **Responsive grid** — 1 column → 2 columns (768px) → 3 columns (1280px)

---

## Installation

```bash
# npm
npm install @bearlab/pricing

# yarn
yarn add @bearlab/pricing

# pnpm
pnpm add @bearlab/pricing
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Type One: Billing Toggle Layout

Features a heading, a monthly/annually switcher, campaign pricing, and original (strikethrough) pricing.

```tsx
import { Pricing } from "@bearlab/pricing";

export default function App() {
  return (
    <Pricing
      type="one"
      heading="Find the right plan for you"
      switchLabels={{ monthly: "Monthly", annually: "Annually" }}
      packs={[
        {
          id: 1,
          packTitle: "Starter",
          packDescription: "For hobbyists and small projects.",
          buttonLabel: "Get Started",
          priceTag: "per month",
          campaignPriceByMonthly: "$19",
          campaignPriceByAnnually: "$15",
          originalPriceByMonthly: "$24",
          originalPriceByAnnually: "$20",
          features: [
            { label: "1 Project", value: true },
            { label: "Basic Analytics", value: true },
            { label: "Community Support", value: true },
            { label: "Custom Domain", value: false },
          ],
        },
      ]}
    />
  );
}
```

### Type Two: Icon Card Layout

Standard grid cards, each with a pack icon component, a fixed price, and a feature list.

```tsx
import { Pricing } from "@bearlab/pricing";
import { StarIcon } from "./icons";

export default function App() {
  return (
    <Pricing
      type="two"
      packs={[
        {
          id: 1,
          packTitle: "Professional",
          packDescription: "For growing teams and businesses.",
          price: "$49",
          priceTag: "/ month",
          buttonLabel: "Go Pro",
          packIcon: StarIcon, // React.ComponentType
          features: [
            { label: "Up to 20 Projects", value: true },
            { label: "Advanced Analytics", value: true },
            { label: "Priority Support", value: true },
            { label: "Dedicated SSO", value: false },
          ],
        },
      ]}
    />
  );
}
```

### Type Three: Recommended Badge Layout

Compact cards designed for comparison tables. Supports an `isRecommended` flag that renders a floating badge on the card.

```tsx
import { Pricing } from "@bearlab/pricing";

export default function App() {
  return (
    <Pricing
      type="three"
      recommendedLabel="Best Value"
      packs={[
        {
          id: 1,
          packTitle: "Basic",
          packDescription: "A solid starting point.",
          buttonLabel: "Choose Basic",
          features: [
            { label: "5 Projects", value: true },
            { label: "Email Support", value: true },
            { label: "Custom Domain", value: false },
          ],
        },
        {
          id: 2,
          packTitle: "Pro",
          packDescription: "Everything you need to scale.",
          buttonLabel: "Choose Pro",
          isRecommended: true,
          features: [
            { label: "Unlimited Projects", value: true },
            { label: "Priority Support", value: true },
            { label: "Custom Domain", value: true },
          ],
        },
      ]}
    />
  );
}
```

---

## Props

The `Pricing` component uses a **discriminated union** based on the `type` prop. Shared base props are available on all variants.

### Shared (Base) Props

| Prop                | Type                                      | Default                 | Required | Description                                        |
| ------------------- | ----------------------------------------- | ----------------------- | -------- | -------------------------------------------------- |
| `type`              | `"one" \| "two" \| "three"`               | —                       | ✅       | Selects the visual and structural variant          |
| `checkIcon`         | `React.ReactNode`                         | Built-in SVG check icon | ❌       | Custom icon for included features (`value: true`)  |
| `closeIcon`         | `React.ReactNode`                         | Built-in SVG close icon | ❌       | Custom icon for excluded features (`value: false`) |
| `defaultActivePack` | `number`                                  | `0` (none active)       | ❌       | ID of the pack to pre-select on mount              |
| `className`         | [`PricingClassNames`](#pricingclassnames) | `{}`                    | ❌       | Per-slot className overrides                       |
| `style`             | [`PricingStyles`](#pricingstyles)         | `{}`                    | ❌       | Per-slot inline style overrides                    |

### `type="one"` Additional Props

| Prop             | Type                                    | Default                                        | Required | Description                               |
| ---------------- | --------------------------------------- | ---------------------------------------------- | -------- | ----------------------------------------- |
| `heading`        | `string`                                | —                                              | ✅       | Section heading rendered above the toggle |
| `packs`          | [`PackTypeOne[]`](#packtypeone)         | —                                              | ✅       | Pricing tier data                         |
| `switchLabels`   | `{ monthly: string; annually: string }` | `{ monthly: "Monthly", annually: "Annually" }` | ❌       | Labels for the billing toggle buttons     |
| `defaultBilling` | `"monthly" \| "annually"`               | —                                              | ❌       | Pre-selects a billing cycle on mount      |

### `type="two"` Additional Props

| Prop    | Type                            | Default | Required | Description       |
| ------- | ------------------------------- | ------- | -------- | ----------------- |
| `packs` | [`PackTypeTwo[]`](#packtypetwo) | —       | ✅       | Pricing tier data |

### `type="three"` Additional Props

| Prop               | Type                                | Default         | Required | Description                                  |
| ------------------ | ----------------------------------- | --------------- | -------- | -------------------------------------------- |
| `packs`            | [`PackTypeThree[]`](#packtypethree) | —               | ✅       | Pricing tier data                            |
| `recommendedLabel` | `string`                            | `"Recommended"` | ❌       | Text shown in the badge on recommended cards |

---

## Variants

| Variant   | Layout                         | Key Features                                                                                |
| --------- | ------------------------------ | ------------------------------------------------------------------------------------------- |
| `"one"`   | Full-width section with header | Heading, monthly/annually billing switcher, campaign price + original (strikethrough) price |
| `"two"`   | Responsive grid cards          | Per-card icon component, single fixed price                                                 |
| `"three"` | Compact comparison grid        | Recommended badge, no pricing display (feature-comparison focused)                          |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. You can inject custom styles and classes directly into child elements via the `className` and `style` objects.

### `PricingClassNames`

| Slot            | Targets                                | Applies to            |
| --------------- | -------------------------------------- | --------------------- |
| `root`          | Outermost container                    | `type="one"`          |
| `header`        | Header section (`<header>`)            | `type="one"`          |
| `title`         | Heading text (`<h2>`)                  | `type="one"`          |
| `switchWrapper` | Billing toggle container               | `type="one"`          |
| `grid`          | Grid container for cards               | All                   |
| `card`          | Individual pricing card                | All                   |
| `cardActive`    | Active state of a pricing card         | All                   |
| `price`         | Price text element (`<strong>`)        | `type="one"`, `"two"` |
| `featureList`   | `<ul>` container for feature items     | All                   |
| `featureItem`   | Individual `<li>` feature item         | All                   |
| `divider`       | Visual `<div>` divider inside the card | `type="one"`, `"two"` |
| `button`        | Action button (default state)          | All                   |
| `buttonActive`  | Action button (active card state)      | All                   |
| `badge`         | Recommended badge (`<span>`)           | `type="three"`        |

```tsx
<Pricing
  type="three"
  packs={myPacks}
  className={{
    root: "my-pricing-root",
    card: "my-card",
    cardActive: "my-active-card",
    badge: "my-badge",
    button: "my-buy-button",
    buttonActive: "my-active-button",
  }}
/>
```

### `PricingStyles`

Inline `React.CSSProperties` overrides via the `style` prop:

```tsx
<Pricing
  type="two"
  packs={myPacks}
  style={{
    root: { padding: "2rem" },
    card: { borderRadius: "16px" },
    cardActive: { background: "#1e1b4b" },
    button: { fontWeight: 700 },
    buttonActive: { background: "#4f46e5" },
  }}
/>
```

---

## Theme Management

The `Pricing` component has a built-in two-theme architecture. It natively responds to **`[data-theme="dark"]`** applied to any ancestor element, automatically switching card backgrounds, text colors, dividers, switcher indicator, badge colors, and button states. No extra configuration is needed.

---

## Design Tokens (Customization)

Beyond slots, the component exposes CSS custom properties for global theming. Override them using the `--bearlab-pricing-*` namespace:

```css
/* Light / global overrides */
:root {
  --bearlab-pricing-card-radius: 1.25rem;
  --bearlab-pricing-card-border-color: #e5e7eb;
  --bearlab-pricing-card-bg-active: #1e293b;
  --bearlab-pricing-title-color: #111827;
  --bearlab-pricing-feature-icon-included-color: #16a34a;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --bearlab-pricing-card-border-color: #1f2937;
  --bearlab-pricing-title-color: rgba(255, 255, 255, 0.9);
  --bearlab-pricing-switch-wrapper-bg: #1f2937;
}
```

### Available Tokens (Selection)

| Token                                           | Default (light)                              | Description                                     |
| ----------------------------------------------- | -------------------------------------------- | ----------------------------------------------- |
| `--bearlab-pricing-card-radius`                 | `1rem`                                       | Border radius for all cards                     |
| `--bearlab-pricing-btn-radius`                  | `0.5rem`                                     | Border radius for action buttons                |
| `--bearlab-pricing-grid-gap`                    | `1.25rem`                                    | Gap between cards (mobile/tablet)               |
| `--bearlab-pricing-card-padding`                | `1.5rem`                                     | Inner padding of each card                      |
| `--bearlab-pricing-card-border-color`           | `#e5e7eb`                                    | Default card border color                       |
| `--bearlab-pricing-card-border-color-hover`     | `#d1d5db`                                    | Card border on hover                            |
| `--bearlab-pricing-card-bg-active`              | `#1f2937`                                    | Background of the active card (type one)        |
| `--bearlab-pricing-title-color`                 | `#1d2939`                                    | Section heading text color                      |
| `--bearlab-pricing-title-font-size`             | `1.875rem`                                   | Section heading font size                       |
| `--bearlab-pricing-switch-wrapper-bg`           | `#e5e7eb`                                    | Billing toggle track background                 |
| `--bearlab-pricing-switch-indicator-bg`         | `#fff`                                       | Sliding indicator background                    |
| `--bearlab-pricing-price-font-size`             | `2.25rem`                                    | Price number font size                          |
| `--bearlab-pricing-feature-icon-included-color` | `#22c55e`                                    | Color for check icons                           |
| `--bearlab-pricing-feature-icon-excluded-color` | `#ef4444`                                    | Color for close icons                           |
| `--bearlab-pricing-badge-bg`                    | `color-mix(in oklab, #fff 20%, transparent)` | Recommended badge background                    |
| `--bearlab-pricing-transition-speed`            | `200ms`                                      | Transition duration for all animated properties |

---

## Accessibility

This component demonstrates **best-practice** accessibility, adhering to **WCAG 2.1 AA** standards:

- **`aria-label` on the card grid** — The `role="list"` container has `aria-label="Pricing plans"` for screen readers.
- **`aria-label` per card** — Each card announces itself as `"[Plan name] plan"` (or `"[Plan name] plan, recommended"` when applicable).
- **`aria-selected`** — Cards receive `aria-selected={true}` when active, conveying selection state to assistive technologies.
- **Keyboard Navigation** — Cards respond to `Enter` and `Space` keys to activate/select a plan. The billing toggle in `type="one"` uses `role="radio"` with `aria-checked`.
- **`aria-hidden` on decorative elements** — Feature icons (`checkIcon`, `closeIcon`) and the billing switcher's animated indicator are hidden from screen readers. Each feature item uses a text `aria-label` (`"Included"` / `"Not included"`) instead.
- **Semantic structure** — `type="one"` renders as a `<section>` with an `aria-labelledby` heading. Individual cards render as `<article>` elements.
- **Focus management** — All interactive elements (cards, buttons, toggle) are reachable via `Tab` and have `focus-visible` outlines.

---

## TypeScript

All public types are exported from the package:

```ts
import type {
  PricingProps,
  PricingClassNames,
  PricingStyles,
} from "@bearlab/pricing";
```

### Core Types

#### `PricingProps`

Discriminated union — TypeScript will narrow available props based on `type`.

```ts
type PricingProps =
  | PricingTypeOneProps
  | PricingTypeTwoProps
  | PricingTypeThreeProps;
```

#### `PricingTypeOneProps`

```ts
interface PricingTypeOneProps extends PricingBaseProps {
  type: "one";
  heading: string;
  packs: PackTypeOne[];
  switchLabels?: SwitchLabels;
  defaultBilling?: Billing;
}
```

#### `PricingTypeTwoProps`

```ts
interface PricingTypeTwoProps extends PricingBaseProps {
  type: "two";
  packs: PackTypeTwo[];
}
```

#### `PricingTypeThreeProps`

```ts
interface PricingTypeThreeProps extends PricingBaseProps {
  type: "three";
  packs: PackTypeThree[];
  recommendedLabel?: string;
}
```

#### `Billing`

```ts
type Billing = "monthly" | "annually";
```

#### `SwitchLabels`

```ts
interface SwitchLabels {
  monthly: string;
  annually: string;
}
```

---

### Pack Types

#### `PackTypeOne`

```ts
interface PackTypeOne {
  id: number;
  packTitle: string;
  packDescription: string;
  buttonLabel: string;
  priceTag: string;
  campaignPriceByMonthly: string;
  campaignPriceByAnnually: string;
  originalPriceByMonthly: string;
  originalPriceByAnnually: string;
  features: PackFeature[];
}
```

#### `PackTypeTwo`

```ts
interface PackTypeTwo {
  id: number;
  packTitle: string;
  packDescription: string;
  price: string;
  priceTag: string;
  buttonLabel: string;
  packIcon: React.ComponentType<{ "aria-hidden"?: boolean | "true" | "false" }>;
  features: PackFeature[];
}
```

#### `PackTypeThree`

```ts
interface PackTypeThree {
  id: number;
  price: string;
  packTitle: string;
  priceTag: string;
  buttonLabel: string;
  packDescription: string;
  isRecommended?: boolean;
  features: PackFeature[];
}
```

#### `PackFeature`

```ts
interface PackFeature {
  label: string;
  value: boolean;
}
```

---

### Style Types

#### `PricingClassNames`

```ts
interface PricingClassNames {
  root?: string;
  card?: string;
  grid?: string;
  price?: string;
  title?: string;
  badge?: string;
  header?: string;
  button?: string;
  divider?: string;
  cardActive?: string;
  cardHeader?: string;
  featureItem?: string;
  featureList?: string;
  buttonActive?: string;
  switchWrapper?: string;
}
```

#### `PricingStyles`

```ts
interface PricingStyles {
  root?: React.CSSProperties;
  grid?: React.CSSProperties;
  card?: React.CSSProperties;
  badge?: React.CSSProperties;
  title?: React.CSSProperties;
  button?: React.CSSProperties;
  header?: React.CSSProperties;
  cardActive?: React.CSSProperties;
  buttonActive?: React.CSSProperties;
  switchWrapper?: React.CSSProperties;
}
```

---

### Subcomponent Props

These are internal component interfaces. They are not exported from the package but documented here for library contributors.

#### `TypeOneProps`

```ts
interface TypeOneProps {
  packs: PackTypeOne[];
  heading: string;
  switchLabels: { monthly: string; annually: string };
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  style: PricingStyles;
}
```

#### `TypeTwoProps`

```ts
interface TypeTwoProps {
  packs: PackTypeTwo[];
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  style: PricingStyles;
}
```

#### `TypeThreeProps`

```ts
interface TypeThreeProps {
  packs: PackTypeThree[];
  recommendedLabel: string;
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  style: PricingStyles;
}
```

#### `TypeOnePackProps` / `TypeTwoPackProps` / `TypeThreePackProps`

Props for individual pricing cards rendered within each layout variant. Each pack component receives `isActive`, `cardDescId`, `setActivePack`, and `handleCardKeyDown` in addition to the shared slot props.

#### `FeatureListProps`

```ts
interface FeatureListProps {
  label: string;
  value: boolean;
  isActive: boolean;
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
