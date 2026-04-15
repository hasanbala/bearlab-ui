# @bearlab/pricing

> Accessible, fully customizable Pricing component for React applications.

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

- ✅ **3 distinct layout types** — `"one"`, `"two"`, `"three"`
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — Keyboard navigation, `aria-hidden`, and semantic structure
- ✅ **Customizable Icons** — Replace default check/close icons easily
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Built-in Billing Switcher** — Supports monthly/annually toggles (Type One)

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

Optimized for layouts featuring a billing cycle switch (e.g., Monthly vs. Annually).

```tsx
import { Pricing } from "@bearlab/pricing";

export default function App() {
  return (
    <Pricing
      type="one"
      heading="Find the right plan for you"
      defaultBilling="monthly"
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
          ],
        },
      ]}
    />
  );
}
```

### Type Two: Standard Card Layout

The classic grid layout with customizable icons for each pricing tier.

```tsx
import { Pricing } from "@bearlab/pricing";

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
          packIcon: () => <svg>...</svg>,
          features: [
            { label: "Up to 20 Projects", value: true },
            { label: "Advanced Analytics", value: true },
            { label: "Priority Support", value: true },
          ],
        },
      ]}
    />
  );
}
```

### Type Three: Recommended Badge Layout

A focused layout ideal for highlighting a specific "Recommended" or "Best Value" plan.

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
          packTitle: "Enterprise",
          packDescription: "Custom solutions for large organizations.",
          price: "$99",
          priceTag: "/ month",
          buttonLabel: "Contact Sales",
          isRecommended: true,
          features: [
            { label: "Unlimited Projects", value: true },
            { label: "Dedicated SSO", value: true },
            { label: "24/7 Phone Support", value: true },
          ],
        },
      ]}
    />
  );
}
```

---

## Props

| Prop                | Type                                                | Default                                        | Required | Description                                            |
| ------------------- | --------------------------------------------------- | ---------------------------------------------- | -------- | ------------------------------------------------------ |
| `type`              | `"one" \| "two" \| "three"`                         | —                                              | ✅       | Visual and structural variant of the pricing layout    |
| `packs`             | `PackTypeOne[] \| PackTypeTwo[] \| PackTypeThree[]` | —                                              | ✅       | Array of objects defining the pricing tiers            |
| `heading`           | `string`                                            | —                                              | ❌       | Used only in `type="one"` to display a section heading |
| `switchLabels`      | `{ monthly: string; annually: string }`             | `{ monthly: "Monthly", annually: "Annually" }` | ❌       | Labels for billing toggle in `type="one"`              |
| `recommendedLabel`  | `string`                                            | `"Recommended"`                                | ❌       | Label for the recommended badge in `type="three"`      |
| `defaultBilling`    | `"monthly" \| "annually"`                           | —                                              | ❌       | Default selected billing cycle                         |
| `defaultActivePack` | `number`                                            | —                                              | ❌       | ID of the pack to be active by default                 |
| `checkIcon`         | `React.ReactNode`                                   | `<DefaultCheckIcon />`                         | ❌       | Custom icon for included features                      |
| `closeIcon`         | `React.ReactNode`                                   | `<DefaultCloseIcon />`                         | ❌       | Custom icon for excluded features                      |
| `className`         | [`PricingClassNames`](#pricingclassnames)           | —                                              | ❌       | Per-slot className overrides                           |
| `style`             | [`PricingStyles`](#pricingstyles)                   | —                                              | ❌       | Per-slot inline style overrides                        |

---

## Variants

- **`type="one"`**: A layout featuring a main heading and a toggle switch for monthly vs. annually billing.
- **`type="two"`**: Standard pricing cards with customizable icons for each pack.
- **`type="three"`**: Focused layout with support for a recommended badge on specific packs.

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the cards natively using `style?.card`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `PricingClassNames`

| Slot            | Targets                           |
| --------------- | --------------------------------- |
| `root`          | Outermost container               |
| `header`        | Header section                    |
| `title`         | Title text                        |
| `switchWrapper` | Wrapper for billing toggle switch |
| `grid`          | Grid container for cards          |
| `card`          | Individual pricing card           |
| `cardActive`    | Active state of a pricing card    |
| `cardHeader`    | Header block inside the card      |
| `price`         | Price text element                |
| `featureList`   | Container for feature items       |
| `featureItem`   | Individual feature item           |
| `divider`       | Visual divider inside the card    |
| `button`        | Action button                     |
| `buttonActive`  | Active state of the action button |
| `badge`         | Recommended/Highlight badge       |

```tsx
<Pricing
  type="three"
  packs={myPacks}
  className={{
    root: "my-pricing-root",
    cardActive: "my-active-card",
    button: "my-buy-button",
  }}
/>
```

### `PricingStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Pricing
  type="two"
  packs={myPacks}
  style={{
    root: { padding: "2rem" },
    card: { borderRadius: "16px" },
  }}
/>
```

---

## Theme Management

The `Pricing` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-pricing-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-pricing-root-padding: 2rem;
  --bearlab-pricing-card-bg: #ffffff;
  --bearlab-pricing-card-border-radius: 12px;
  --bearlab-pricing-button-bg: #007aff;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **Keyboard Navigation** — Toggles and interactive cards handle key events (`onKeyDown`) correctly for seamless keyboard usability.
- **`aria-hidden="true"`** — Applied to decorative elements (such as `checkIcon` and `closeIcon`) to prevent redundant or confusing screen reader announcements.
- **Semantic Structure** — Uses logical HTML tags to appropriately convey the pricing information structure to assistive technologies.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  PricingProps,
  PricingTypeOneProps,
  PricingTypeTwoProps,
  PricingTypeThreeProps,
  PackTypeOne,
  PackTypeTwo,
  PackTypeThree,
  PricingClassNames,
  PricingStyles,
  Billing,
  SwitchLabels,
  PackFeature,
  TypeOneProps,
  TypeTwoProps,
  TypeThreeProps,
  TypeOnePackProps,
  TypeTwoPackProps,
  TypeThreePackProps,
  FeatureListProps,
} from "@bearlab/pricing";
```

### Core Types

#### `PricingProps`

Primary entry point for the component props.

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
  packs: PackTypeOne[];
  heading: string;
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

### Pack Types

#### `PackTypeOne`

```ts
interface PackTypeOne {
  id: number;
  packTitle: string;
  packDescription: string;
  buttonLabel: string;
  features: PackFeature[];
  priceTag: string;
  campaignPriceByMonthly: string;
  campaignPriceByAnnually: string;
  originalPriceByMonthly: string;
  originalPriceByAnnually: string;
}
```

#### `PackTypeTwo`

```ts
interface PackTypeTwo {
  id: number;
  packTitle: string;
  packDescription: string;
  buttonLabel: string;
  features: PackFeature[];
  packIcon: React.ComponentType<{ "aria-hidden"?: boolean | "true" | "false" }>;
  price: string;
  priceTag: string;
}
```

#### `PackTypeThree`

```ts
interface PackTypeThree {
  id: number;
  packTitle: string;
  packDescription: string;
  buttonLabel: string;
  features: PackFeature[];
  price: string;
  priceTag: string;
  isRecommended?: boolean;
}
```

#### `PackFeature`

```ts
interface PackFeature {
  value: boolean;
  label: string;
}
```

### Style Types

#### `PricingClassNames`

```ts
interface PricingClassNames {
  root?: string;
  header?: string;
  title?: string;
  switchWrapper?: string;
  grid?: string;
  card?: string;
  cardActive?: string;
  cardHeader?: string;
  price?: string;
  featureList?: string;
  featureItem?: string;
  divider?: string;
  button?: string;
  buttonActive?: string;
  badge?: string;
}
```

#### `PricingStyles`

```ts
interface PricingStyles {
  root?: React.CSSProperties;
  header?: React.CSSProperties;
  title?: React.CSSProperties;
  switchWrapper?: React.CSSProperties;
  grid?: React.CSSProperties;
  card?: React.CSSProperties;
  cardActive?: React.CSSProperties;
  button?: React.CSSProperties;
  buttonActive?: React.CSSProperties;
  badge?: React.CSSProperties;
}
```

### Subcomponent Props

#### `TypeOneProps` / `TypeTwoProps` / `TypeThreeProps`

Internal variant-specific props.

```ts
export interface TypeOneProps {
  packs: PackTypeOne[];
  heading: string;
  switchLabels: { monthly: string; annually: string };
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  style: PricingStyles;
}
```

#### `TypeOnePackProps` / `TypeTwoPackProps` / `TypeThreePackProps`

Props for individual pricing cards within layouts.

```ts
interface TypeOnePackProps {
  isActive: boolean;
  pack: PackTypeOne;
  cardDescId: string;
  isMonthly: boolean;
  style: PricingStyles;
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  setActivePack: (active: number) => void;
  handleCardKeyDown: (e: React.KeyboardEvent<HTMLElement>, id: number) => void;
}
```

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
