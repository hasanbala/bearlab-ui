# @bearlab/button

> Accessible, highly customizable Button component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/button)](https://www.npmjs.com/package/@bearlab/button)
[![license](https://img.shields.io/npm/l/@bearlab/button)](LICENSE)
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

- ✅ **Multiple semantic variants** — `primary`, `secondary`, `tertiary`, `liquid-holographic`, `liquid-tinted`
- ✅ **Slot-based `className` & `style` API** — granular styling for root and popover layouts
- ✅ **Accessible by default** — dynamic `aria-label`, `aria-describedby`, `aria-disabled`, `aria-busy`
- ✅ **Flexible content types** — `justText`, `justIcon`, `iconWithText`
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Built-in loading & icon support** — seamless integration of custom and default icons

---

## Installation

```bash
# npm
npm install @bearlab/button

# yarn
yarn add @bearlab/button

# pnpm
pnpm add @bearlab/button
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { Button } from "@bearlab/button";
import { CustomIcon } from "./customIcon";

export default function App() {
  return (
    <>
      <Button
        buttonType="justText"
        variant="primary"
        label="Submit"
        onClick={() => console.log("Clicked!")}
      />
      <Button
        label=""
        buttonType={"justIcon"}
        onClick={() => console.log("Clicked")}
        iconType={{ default: "delete" }}
        className={{
          root: classnames(styles.delete),
        }}
      />
      <Button
        label="Test"
        buttonType={"iconWithText"}
        iconType={{ default: "notify" }}
        onClick={() => console.log("Clicked")}
        variant={"secondary"}
      />
      <Button
        label="Test 2"
        buttonType={"justText"}
        onClick={() => console.log("Clicked")}
        variant={"liquid-holographic"}
      />
      <Button
        label="Test 3"
        buttonType={"justText"}
        onClick={() => console.log("Clicked")}
        variant={"liquid-tinted"}
      />
      <Button
        label="Custom"
        buttonType={"iconWithText"}
        iconType={{
          default: "none",
          custom: <CustomIcon />,
        }}
      />
    </>
  );
}
```

---

## Props

| Prop              | Type                                              | Default    | Required | Description                                        |
| ----------------- | ------------------------------------------------- | ---------- | -------- | -------------------------------------------------- |
| `label`           | `string \| number`                                | —          | ✅       | Text content or label of the button                |
| `buttonType`      | `"iconWithText" \| "justIcon" \| "justText"`      | —          | ✅       | Determines the layout structure of the button      |
| `variant`         | [`ButtonVariant`](#buttonvariant)                 | —          | ❌       | Visual styling variant of the button               |
| `htmlType`        | `"button" \| "submit"`                            | `"button"` | ❌       | Native HTML button type attribute                  |
| `isLoading`       | `boolean`                                         | `false`    | ❌       | Displays a loading spinner and disables the button |
| `disabled`        | `boolean`                                         | `false`    | ❌       | Disables the button completely                     |
| `iconType`        | `{ default: ButtonIconTypeValues, custom?: ... }` | `none`     | ❌       | Configures the icon displayed in the button        |
| `reverseIconText` | `boolean`                                         | `false`    | ❌       | Reverses the order of icon and text                |
| `onClick`         | `(e: React.MouseEvent) => void`                   | —          | ❌       | Click event handler                                |
| `className`       | [`ButtonClassNames`](#buttonclassnames)           | —          | ❌       | Per-slot className overrides                       |
| `style`           | [`ButtonStyles`](#buttonstyles)                   | —          | ❌       | Per-slot inline style overrides                    |

---

## Variants

| Variant              | Description                                  |
| -------------------- | -------------------------------------------- |
| `primary`            | Main call-to-action buttons                  |
| `secondary`          | Alternative generic actions                  |
| `tertiary`           | Subtle actions without prominent backgrounds |
| `liquid-holographic` | High-impact, visually rich actions           |
| `liquid-tinted`      | Subtle, tinted background variations         |

```tsx
<Button buttonType="justText" variant="primary" label="Primary Action" />
<Button buttonType="justText" variant="secondary" label="Secondary Action" />
<Button buttonType="justText" variant="tertiary" label="Tertiary Action" />
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner popover natively using `style?.popover`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `ButtonClassNames`

| Slot      | Targets                                      |
| --------- | -------------------------------------------- |
| `root`    | Outermost button container `<button>`        |
| `popover` | Popover wrapper for `justIcon` label `<div>` |

```tsx
<Button
  buttonType="justIcon"
  label="Add New"
  iconType={{ default: "add" }}
  className={{
    root: "my-btn-root",
    popover: "my-btn-popover",
  }}
/>
```

### `ButtonStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Button
  buttonType="justText"
  label="Save Changes"
  style={{
    root: { borderRadius: "8px", fontWeight: "bold" },
  }}
/>
```

---

## Theme Management

The `Button` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-button-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-button-root-border-radius: 8px;
  --bearlab-button-root-padding: 0.5rem 1rem;
  --bearlab-button-primary-bg: #007bff;
  --bearlab-button-primary-hover: #0056b3;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`aria-label`** — Provides an accessible name for screen readers when the button is of type `justIcon`.
- **`aria-describedby`** — Semantically links the tooltip popover (`popoverId` dynamically generated, stable IDs `useId()`) to the button.
- **`aria-disabled`** — Semantically communicates when a button is disabled, synchronizing state with the native `disabled` attribute.
- **`aria-busy`** — Indicates the button's transient loading state when `isLoading` is true.
- **`aria-hidden="true"`** & **`focusable="false"`** — Applied to all decorative icons and loading spinners to prevent redundant or confusing screen reader announcements.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  ButtonProps,
  ButtonType,
  ButtonHtmlType,
  ButtonVariant,
  ButtonIconTypeValues,
  ButtonClassNames,
  ButtonStyles,
} from "@bearlab/button";
```

### `ButtonProps`

```ts
interface ButtonProps {
  label: string | number;
  isLoading?: boolean;
  iconType?: {
    default: ButtonIconTypeValues;
    custom?: null | React.ReactElement;
  };
  buttonType: ButtonType;
  disabled?: boolean;
  htmlType?: ButtonHtmlType;
  onClick?: (_val: React.MouseEvent<HTMLButtonElement>) => void;
  reverseIconText?: boolean;
  variant?: ButtonVariant;
  className?: ButtonClassNames;
  style?: ButtonStyles;
}
```

### `ButtonType`

```ts
type ButtonType = "iconWithText" | "justIcon" | "justText";
```

### `ButtonHtmlType`

```ts
type ButtonHtmlType = "button" | "submit";
```

### `ButtonVariant`

```ts
type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "liquid-holographic"
  | "liquid-tinted";
```

### `ButtonIconTypeValues`

```ts
type ButtonIconTypeValues =
  | "none"
  | "delete"
  | "arrow"
  | "export"
  | "add"
  | "document"
  | "update"
  | "search"
  | "close"
  | "notify"
  | "arrow_down"
  | "minus"
  | "plus"
  | "filter"
  | "dots"
  | "arrow_down2"
  | "arrow_right"
  | "tick"
  | "copy";
```

### `ButtonClassNames`

```ts
interface ButtonClassNames {
  root?: string;
  popover?: string;
}
```

### `ButtonStyles`

```ts
interface ButtonStyles {
  root?: React.CSSProperties;
  popover?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
