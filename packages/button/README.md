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
- [Icons](#icons)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Unified variant system** — a single `variant` prop combines visual style and semantic color (`primary`, `secondary-*`, `light-*`, `solid-*`, `liquid-*`)
- ✅ **Three layout modes** — `justText`, `justIcon`, `iconWithText` via the required `buttonType` prop
- ✅ **Built-in icon library** — 18 preset icons selectable via `iconType.default`; custom React elements via `iconType.custom`
- ✅ **Slot-based `className` & `style` API** — granular per-element overrides for `root` and `popover`
- ✅ **Accessible by default** — `aria-label`, `aria-describedby`, `aria-disabled`, `aria-busy` wired up automatically
- ✅ **Dark mode ready** — responds to `html[data-theme="dark"]` out of the box
- ✅ **Loading & disabled states** — spinner animation, cursor management, and opacity handled internally
- ✅ **TypeScript-first** — all props, slots, variant unions, and icon names are fully typed

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

### Text-only button

```tsx
import { Button } from "@bearlab/button";

<Button
  buttonType="justText"
  label="Submit"
  variant="primary"
  onClick={() => console.log("clicked")}
/>;
```

### Icon-only button (with tooltip popover)

When `buttonType="justIcon"`, the `label` prop is visually hidden but is shown as a hover popover and used as `aria-label`.

```tsx
<Button
  buttonType="justIcon"
  label="Delete item"
  iconType={{ default: "delete" }}
  variant="secondary"
/>
```

### Icon + text button

```tsx
<Button
  buttonType="iconWithText"
  label="Export"
  iconType={{ default: "export" }}
  variant="solid-success"
/>
```

### Reversed icon position

```tsx
{
  /* Icon appears before the text */
}
<Button
  buttonType="iconWithText"
  label="Filter"
  iconType={{ default: "filter" }}
  variant="secondary"
  reverseIconText
/>;
```

### Custom icon

```tsx
import { CustomIcon } from "./CustomIcon";

<Button
  buttonType="iconWithText"
  label="Custom"
  iconType={{ default: "none", custom: <CustomIcon /> }}
  variant="liquid-tinted"
/>;
```

### Loading state

```tsx
<Button buttonType="justText" label="Saving…" isLoading variant="primary" />
```

---

## Props

| Prop              | Type                                                               | Default               | Required | Description                                                                         |
| ----------------- | ------------------------------------------------------------------ | --------------------- | -------- | ----------------------------------------------------------------------------------- |
| `label`           | `string \| number`                                                 | —                     | ✅       | Button text. For `justIcon`, used as `aria-label` and popover content.              |
| `buttonType`      | `"iconWithText" \| "justIcon" \| "justText"`                       | —                     | ✅       | Controls the layout structure of the button.                                        |
| `variant`         | [`ButtonVariant`](#buttonvariant)                                  | `"primary"`           | ❌       | Visual + semantic styling variant.                                                  |
| `htmlType`        | `"button" \| "submit"`                                             | `"button"`            | ❌       | Native HTML `type` attribute for the `<button>` element.                            |
| `isLoading`       | `boolean`                                                          | `false`               | ❌       | Replaces content with a spinner; sets `aria-busy` and blocks interaction.           |
| `disabled`        | `boolean`                                                          | `false`               | ❌       | Disables the button; applies muted styling via `--bearlab-button-opacity-disabled`. |
| `iconType`        | `{ default: ButtonIconTypeValues; custom?: ReactElement \| null }` | `{ default: "none" }` | ❌       | Configures the icon. Use `custom` to override with any React element.               |
| `reverseIconText` | `boolean`                                                          | `false`               | ❌       | Swaps icon and text order; icon renders before the label in `iconWithText`.         |
| `onClick`         | `(e: React.MouseEvent<HTMLButtonElement>) => void`                 | —                     | ❌       | Click event handler.                                                                |
| `className`       | [`ButtonClassNames`](#buttonclassnames)                            | —                     | ❌       | Per-slot className overrides.                                                       |
| `style`           | [`ButtonStyles`](#buttonstyles)                                    | —                     | ❌       | Per-slot inline style overrides (`React.CSSProperties`).                            |

---

## Variants

The button uses a **unified variant system** — a single `variant` string combines the visual style and semantic intent.

### Available Variants

| Group         | Values                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------- |
| **Base**      | `primary`, `secondary`                                                                          |
| **Secondary** | `secondary-info`, `secondary-dark`, `secondary-error`, `secondary-success`, `secondary-warning` |
| **Light**     | `light-dark`, `light-info`, `light-error`, `light-light`, `light-warning`, `light-success`      |
| **Solid**     | `solid-dark`, `solid-info`, `solid-light`, `solid-error`, `solid-warning`, `solid-success`      |
| **Liquid**    | `liquid-tinted`, `liquid-holographic`                                                           |

> If `variant` is omitted, the component renders as `primary` (blue fill, white text).

```tsx
<Button buttonType="justText" variant="primary"           label="Primary" />
<Button buttonType="justText" variant="secondary"          label="Secondary" />
<Button buttonType="justText" variant="solid-success"      label="Success" />
<Button buttonType="justText" variant="light-error"        label="Error Light" />
<Button buttonType="justText" variant="liquid-tinted"      label="Liquid Tinted" />
<Button buttonType="justText" variant="liquid-holographic" label="Holographic" />
```

---

## Icons

The `iconType` prop accepts an object with two keys:

| Key       | Type                   | Description                                                         |
| --------- | ---------------------- | ------------------------------------------------------------------- |
| `default` | `ButtonIconTypeValues` | Selects a built-in icon from the preset library.                    |
| `custom`  | `ReactElement \| null` | Overrides the built-in icon with any React element. Takes priority. |

### Built-in icon names (`ButtonIconTypeValues`)

`"add"` · `"arrow"` · `"arrow_down"` · `"arrow_down2"` · `"arrow_right"` · `"close"` · `"copy"` · `"delete"` · `"document"` · `"dots"` · `"export"` · `"filter"` · `"minus"` · `"none"` · `"notify"` · `"plus"` · `"search"` · `"tick"` · `"update"`

> Use `"none"` when you want `iconType.custom` only, or when no icon is needed in `iconWithText` mode.

### Popover on `justIcon`

When `buttonType="justIcon"`, the `label` is rendered as an on-hover **tooltip popover** above the button. The popover is linked via `aria-describedby` for screen reader compatibility.

```tsx
<Button
  buttonType="justIcon"
  label="Add new item"          {/* ← becomes the popover text & aria-label */}
  iconType={{ default: "add" }}
/>
```

---

## Slot-based Customization

The component exposes two **slots** (`root` and `popover`) for injecting custom classes or inline styles without fighting CSS specificity.

### `ButtonClassNames`

| Slot      | Targets                                                |
| --------- | ------------------------------------------------------ |
| `root`    | The outermost `<button>` element                       |
| `popover` | The tooltip `<div>` shown on hover for `justIcon` mode |

```tsx
<Button
  buttonType="justIcon"
  label="Settings"
  iconType={{ default: "dots" }}
  className={{
    root: "my-icon-btn",
    popover: "my-tooltip",
  }}
/>
```

### `ButtonStyles`

```tsx
<Button
  buttonType="justText"
  label="Save"
  variant="primary"
  style={{
    root: { borderRadius: "9999px" },
    popover: { fontSize: "0.75rem" },
  }}
/>
```

---

## Theme Management

The component responds to a `data-theme` attribute on the `<html>` element (or any ancestor). Set it to `"dark"` to activate dark-mode overrides:

```html
<html data-theme="dark">
  …
</html>
```

Dark-mode token overrides are scoped inside `.container` using the `:global([data-theme="dark"])` SCSS selector. No extra configuration is required — the component adapts automatically.

---

## Design Tokens (Customization)

All internal styles are driven by **private CSS variables** (`--_button-*`) that fall back to **public CSS custom properties** (`--bearlab-button-*`). Override the public ones in your own stylesheet to globally restyle the component.

### Layout & Shape

```css
:root {
  --bearlab-button-height: 2.75rem; /* 44px */
  --bearlab-button-padding-x: 1rem; /* 16px */
  --bearlab-button-padding-y: 0.75rem; /* 12px */
  --bearlab-button-border-radius: 0.5rem; /* 8px  */
  --bearlab-button-font-size: 0.875rem; /* 14px */
  --bearlab-button-font-weight: 500;
  --bearlab-button-icon-size: 1.125rem; /* 18px */
  --bearlab-button-icon-gap: 0.625rem; /* 10px */
  --bearlab-button-opacity-disabled: 0.6;
}
```

### Icon-only (`justIcon`) Layout

```css
:root {
  --bearlab-button-justicon-size: 2.75rem; /* 44px — width & height */
  --bearlab-button-justicon-icon-size: 1.5rem; /* 24px — inner SVG     */
  --bearlab-button-justicon-border-radius: 9999px; /* pill shape by default */
}
```

### Primary Variant Colors

```css
:root {
  --bearlab-button-primary-bg: #465fff;
  --bearlab-button-primary-bg-hover: #3641f5;
  --bearlab-button-primary-color: #fff;
  --bearlab-button-primary-icon-fill: #fff;
}
```

### Secondary Variant Colors

```css
:root {
  --bearlab-button-secondary-bg: #fff;
  --bearlab-button-secondary-bg-hover: #f9fafb;
  --bearlab-button-secondary-color: #374151;
  --bearlab-button-secondary-border-color: #d1d5db;
  --bearlab-button-secondary-icon-fill: #667085;
  --bearlab-button-secondary-icon-fill-hover: #374151;
}
```

### Liquid Tinted Colors

```css
:root {
  --bearlab-button-tinted-bg: #465fff24;
  --bearlab-button-tinted-bg-hover: #465fff38;
  --bearlab-button-tinted-border: #4760ff4d;
  --bearlab-button-tinted-color: #2d3aad;
  --bearlab-button-tinted-icon-fill: #465fff;
}
```

### Solid Variant Colors

```css
:root {
  --bearlab-button-solid-success-bg: #12b76a;
  --bearlab-button-solid-error-bg: #f04438;
  --bearlab-button-solid-warning-bg: #f79009;
  --bearlab-button-solid-info-bg: #0ba5ec;
  --bearlab-button-solid-dark-bg: #344054;
  --bearlab-button-solid-light-bg: #98a2b3;
}
```

### Light Variant Colors

```css
:root {
  --bearlab-button-light-success-bg: #ecfdf3;
  --bearlab-button-light-success-color: #039855;
  --bearlab-button-light-error-bg: #fef3f2;
  --bearlab-button-light-error-color: #d92d20;
  --bearlab-button-light-warning-bg: #fffaeb;
  --bearlab-button-light-warning-color: #d36803;
  --bearlab-button-light-info-bg: #f0f9ff;
  --bearlab-button-light-info-color: #0ba5ec;
}
```

### Popover Tooltip

```css
:root {
  --bearlab-button-popover-bg: #fff;
  --bearlab-button-popover-color: #344054;
  --bearlab-button-popover-font-size: 0.8125rem; /* 13px */
  --bearlab-button-popover-font-weight: 500;
  --bearlab-button-popover-padding: 0.75rem; /* 12px */
  --bearlab-button-popover-border-radius: 0.5rem; /* 8px  */
  --bearlab-button-popover-offset-top: -2.8125rem; /* -45px — distance above button */
}
```

### Transitions & Shadows

```css
:root {
  --bearlab-button-transition: 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  --bearlab-button-transition-slow: 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  --bearlab-button-shadow: 0 1px 2px 0 #1018282e, 0 1px 3px 0 #10182814;
  --bearlab-button-spinner-size: 1.25rem; /* 20px */
}
```

> **Dark mode tokens:** All token groups have dark-mode counterparts that are applied automatically under `[data-theme="dark"]`. Override them the same way — the public variable name stays identical.

---

## Accessibility

| ARIA attribute       | When applied                                     | Purpose                                                   |
| -------------------- | ------------------------------------------------ | --------------------------------------------------------- |
| `aria-label`         | `buttonType="justIcon"`                          | Provides the accessible name (from `label` prop)          |
| `aria-describedby`   | `buttonType="justIcon"` with a non-empty `label` | Links the visible popover tooltip to the button           |
| `aria-disabled`      | `disabled` or `isLoading` is `true`              | Communicates disabled state to assistive technologies     |
| `aria-busy`          | `isLoading` is `true`                            | Signals that an async operation is in progress            |
| `aria-hidden="true"` | All icon SVGs and the loading spinner            | Prevents decorative elements from polluting the a11y tree |
| `focusable="false"`  | All icon SVGs and the loading spinner            | Prevents SVG from receiving focus in older browsers       |

The `popoverId` is generated with React's `useId()` hook, guaranteeing stable, unique IDs across SSR and client renders.

---

## TypeScript

All types are exported from the package entry point:

```ts
import type {
  ButtonProps,
  ButtonClassNames,
  ButtonStyles,
} from "@bearlab/button";
```

### `ButtonProps`

```ts
interface ButtonProps {
  label: string | number;
  buttonType: ButtonType;
  variant?: ButtonVariant;
  htmlType?: ButtonHtmlType;
  isLoading?: boolean;
  disabled?: boolean;
  iconType?: {
    default: ButtonIconTypeValues;
    custom?: null | React.ReactElement;
  };
  reverseIconText?: boolean;
  onClick?: (_val: React.MouseEvent<HTMLButtonElement>) => void;
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
  | "secondary-info"
  | "secondary-dark"
  | "secondary-error"
  | "secondary-success"
  | "secondary-warning"
  | "liquid-tinted"
  | "liquid-holographic"
  | "light-dark"
  | "light-info"
  | "light-error"
  | "light-light"
  | "light-warning"
  | "light-success"
  | "solid-dark"
  | "solid-info"
  | "solid-light"
  | "solid-error"
  | "solid-warning"
  | "solid-success";
```

### `ButtonIconTypeValues`

```ts
type ButtonIconTypeValues =
  | "add"
  | "arrow"
  | "arrow_down"
  | "arrow_down2"
  | "arrow_right"
  | "close"
  | "copy"
  | "delete"
  | "document"
  | "dots"
  | "export"
  | "filter"
  | "minus"
  | "none"
  | "notify"
  | "plus"
  | "search"
  | "tick"
  | "update";
```

### `ButtonClassNames`

```ts
interface ButtonClassNames {
  root?: string; // <button> element
  popover?: string; // tooltip <div> inside justIcon
}
```

### `ButtonStyles`

```ts
interface ButtonStyles {
  root?: React.CSSProperties; // <button> element
  popover?: React.CSSProperties; // tooltip <div> inside justIcon
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
