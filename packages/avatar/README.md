# @bearlab/avatar

> Accessible, fully customizable Avatar components (Icon & Text) for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/avatar)](https://www.npmjs.com/package/@bearlab/avatar)
[![license](https://img.shields.io/npm/l/@bearlab/avatar)](LICENSE)
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

- ✅ **Two components** — `AvatarIcon` (image-based) and `AvatarText` (initials-based)
- ✅ **6 size variants** — `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge` (AvatarIcon only)
- ✅ **Presence indicators** — optional status badge (`online`, `offline`, `busy`) on `AvatarIcon`
- ✅ **Auto color palette** — `AvatarText` deterministically assigns one of 8 accessible color pairs from the user's name
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `alt`, `aria-label`, `role="img"`, `aria-hidden`
- ✅ **Dark mode** — `AvatarIcon` status badge adapts to `[data-theme="dark"]`
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/avatar

# yarn
yarn add @bearlab/avatar

# pnpm
pnpm add @bearlab/avatar
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### `AvatarIcon` — Image Avatar

```tsx
import { AvatarIcon } from "@bearlab/avatar";

export default function App() {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <AvatarIcon src="/avatars/john.jpg" alt="John Doe" size="small" />
      <AvatarIcon
        src="/avatars/jane.jpg"
        alt="Jane Smith"
        size="medium"
        status="online"
      />
      <AvatarIcon
        src="/avatars/bob.jpg"
        alt="Bob Johnson"
        size="large"
        status="busy"
      />
      <AvatarIcon
        src="/avatars/alice.jpg"
        alt="Alice Brown"
        size="xlarge"
        status="offline"
      />
    </div>
  );
}
```

### `AvatarText` — Initials Avatar

`AvatarText` automatically extracts up to 2 initials from the `name` prop and assigns a deterministic color pair from the built-in 8-color palette.

```tsx
import { AvatarText } from "@bearlab/avatar";

export default function App() {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <AvatarText name="Hasan Bala" />
      <AvatarText name="Jane Smith" />
      <AvatarText name="Bob" />
    </div>
  );
}
```

> **Note:** `AvatarText` has a fixed size (`2.5rem` / 40px) and does not support a `size` prop. Use the `style.root` slot to override dimensions if needed.

---

## Props

### `AvatarIcon`

| Prop        | Type                                                                  | Default    | Required | Description                                 |
| ----------- | --------------------------------------------------------------------- | ---------- | -------- | ------------------------------------------- |
| `src`       | `string`                                                              | —          | ✅       | URL of the image to display                 |
| `alt`       | `string`                                                              | `"avatar"` | ❌       | Alternative text for the image              |
| `size`      | `"xsmall" \| "small" \| "medium" \| "large" \| "xlarge" \| "xxlarge"` | `"medium"` | ❌       | Size variant of the avatar                  |
| `status`    | `"online" \| "offline" \| "busy" \| "none"`                           | `"none"`   | ❌       | Presence indicator badge; `"none"` hides it |
| `className` | [`AvatarIconClassNames`](#avatariconclassnames)                       | —          | ❌       | Per-slot className overrides                |
| `style`     | [`AvatarIconStyles`](#avatariconstyles)                               | —          | ❌       | Per-slot inline style overrides             |

### Size Reference

| `size`    | Dimensions |
| --------- | ---------- |
| `xsmall`  | 24 × 24 px |
| `small`   | 32 × 32 px |
| `medium`  | 40 × 40 px |
| `large`   | 48 × 48 px |
| `xlarge`  | 56 × 56 px |
| `xxlarge` | 64 × 64 px |

### `AvatarText`

| Prop        | Type                                            | Default | Required | Description                                             |
| ----------- | ----------------------------------------------- | ------- | -------- | ------------------------------------------------------- |
| `name`      | `string`                                        | —       | ✅       | Full name; up to 2 initials are extracted and displayed |
| `className` | [`AvatarTextClassNames`](#avatartextclassnames) | —       | ❌       | Per-slot className overrides                            |
| `style`     | [`AvatarTextStyles`](#avatartextstyles)         | —       | ❌       | Per-slot inline style overrides                         |

---

## Slot-based Customization

The components follow the **Slot-Pattern** to provide deep customization without CSS specificity issues.

### `AvatarIconClassNames` / `AvatarIconStyles`

| Slot     | Element                    | Description                                     |
| -------- | -------------------------- | ----------------------------------------------- |
| `root`   | `<div>` (container)        | Sized wrapper, applies `size` and border-radius |
| `image`  | `<img>`                    | Full-cover image with matching border-radius    |
| `status` | `<span>` (indicator badge) | Absolute-positioned dot at bottom-right         |

```tsx
<AvatarIcon
  src="https://example.com/avatar.jpg"
  size="large"
  status="online"
  className={{
    root: "my-avatar-root",
    image: "my-avatar-img",
    status: "my-avatar-status",
  }}
  style={{
    root: { outline: "2px solid #465fff" },
    status: { border: "2px solid white" },
  }}
/>
```

### `AvatarTextClassNames` / `AvatarTextStyles`

| Slot    | Element             | Description                                |
| ------- | ------------------- | ------------------------------------------ |
| `root`  | `<div>` (container) | Circle container; receives the color class |
| `label` | `<span>`            | Initials text rendered inside the circle   |

```tsx
<AvatarText
  name="John Doe"
  className={{
    root: "my-text-avatar-root",
    label: "my-text-avatar-label",
  }}
  style={{
    root: { width: "3rem", height: "3rem" },
    label: { fontSize: "1rem" },
  }}
/>
```

---

## Theme Management

**`AvatarIcon`** natively responds to **`[data-theme="dark"]`** applied to any ancestor element. In dark mode the status badge border switches from white (`#fff`) to dark (`#111827`) to maintain contrast against dark backgrounds.

**`AvatarText`** does not have a dedicated dark mode override — the 8 preset color pairs are designed to be legible on both light and dark surfaces. If needed, override the palette tokens directly (see [Design Tokens](#design-tokens-customization)).

```html
<!-- Enable dark mode globally -->
<html data-theme="dark">
  ...
</html>
```

---

## Design Tokens (Customization)

Both components expose CSS custom properties under a `--bearlab-avatar-*` namespace. All tokens are scoped to their respective container classes.

### `AvatarIcon` Tokens

```css
:root,
[data-theme="light"] {
  /* Size tokens */
  --bearlab-avatar-icon-xsmall-size: 1.5rem; /* 24px */
  --bearlab-avatar-icon-small-size: 2rem; /* 32px */
  --bearlab-avatar-icon-medium-size: 2.5rem; /* 40px */
  --bearlab-avatar-icon-large-size: 3rem; /* 48px */
  --bearlab-avatar-icon-xlarge-size: 3.5rem; /* 56px */
  --bearlab-avatar-icon-xxlarge-size: 4rem; /* 64px */

  /* Shape */
  --bearlab-avatar-icon-border-radius: 9999px;

  /* Status badge colors */
  --bearlab-avatar-icon-status-bg-online: #12b76a;
  --bearlab-avatar-icon-status-bg-offline: #f97066;
  --bearlab-avatar-icon-status-bg-busy: #f79009;
  --bearlab-avatar-icon-status-border-color: #fff;
  --bearlab-avatar-icon-status-border-width: 0.09375rem; /* 1.5px */
}

/* Dark mode — status badge border adapts to dark backgrounds */
[data-theme="dark"] {
  --bearlab-avatar-icon-status-border-color: #111827;
}
```

### `AvatarText` Tokens

```css
:root {
  /* Size & shape */
  --bearlab-avatar-text-size: 2.5rem; /* 40px — fixed size */
  --bearlab-avatar-text-border-radius: 9999px;

  /* Label typography */
  --bearlab-avatar-text-label-font-size: 0.875rem; /* 14px */
  --bearlab-avatar-text-label-font-weight: 500;

  /* Color palette (8 pairs, assigned deterministically from name) */
  --bearlab-avatar-text-color0-bg: #dde9ff;
  --bearlab-avatar-text-color0-fg: #3641f5;

  --bearlab-avatar-text-color1-bg: #fce7f3;
  --bearlab-avatar-text-color1-fg: #db2777;

  --bearlab-avatar-text-color2-bg: #cffafe;
  --bearlab-avatar-text-color2-fg: #0891b2;

  --bearlab-avatar-text-color3-bg: #ffead5;
  --bearlab-avatar-text-color3-fg: #fb6514;

  --bearlab-avatar-text-color4-bg: #dcfce7;
  --bearlab-avatar-text-color4-fg: #12b76a;

  --bearlab-avatar-text-color5-bg: #f3e8ff;
  --bearlab-avatar-text-color5-fg: #7a5af8;

  --bearlab-avatar-text-color6-bg: #fef9c3;
  --bearlab-avatar-text-color6-fg: #ca8a04;

  --bearlab-avatar-text-color7-bg: #fee4e2;
  --bearlab-avatar-text-color7-fg: #f04438;
}
```

---

## Accessibility

These components adhere to **WCAG 2.1 AA** standards:

**`AvatarIcon`**

- **`alt` attribute** — Provides a meaningful text description of the image for screen readers (defaults to `"avatar"` if not supplied).
- **`aria-hidden="true"`** on the status badge `<span>` — The presence indicator is decorative; presence state should be communicated via surrounding context if semantically required.

**`AvatarText`**

- **`role="img"`** — Marks the `<div>` container as an image landmark so screen readers interpret it as a graphical element.
- **`aria-label={name}`** — Announces the full name (e.g., `"Hasan Bala"`) rather than just the visible initials (`"HB"`).
- **`aria-hidden="true"`** on the initials `<span>` — Prevents redundant or confusing announcements since the full name is already communicated via `aria-label`.
- **High contrast** — All 8 color pairs maintain adequate foreground/background contrast ratios.

---

## TypeScript

All types are exported from the package root:

```ts
import type {
  AvatarSize,
  AvatarStatus,
  AvatarIconProps,
  AvatarIconClassNames,
  AvatarIconStyles,
  AvatarTextProps,
  AvatarTextClassNames,
  AvatarTextStyles,
} from "@bearlab/avatar";
```

### `AvatarSize`

```ts
type AvatarSize =
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";
```

### `AvatarStatus`

```ts
type AvatarStatus = "online" | "offline" | "busy" | "none";
```

### `AvatarIconProps`

```ts
interface AvatarIconProps {
  src: string;
  alt?: string; // default: "avatar"
  size?: AvatarSize; // default: "medium"
  status?: AvatarStatus; // default: "none"
  className?: AvatarIconClassNames;
  style?: AvatarIconStyles;
}
```

### `AvatarIconClassNames`

```ts
interface AvatarIconClassNames {
  root?: string;
  image?: string;
  status?: string;
}
```

### `AvatarIconStyles`

```ts
interface AvatarIconStyles {
  root?: React.CSSProperties;
  image?: React.CSSProperties;
  status?: React.CSSProperties;
}
```

### `AvatarTextProps`

```ts
interface AvatarTextProps {
  name: string;
  className?: AvatarTextClassNames;
  style?: AvatarTextStyles;
}
```

### `AvatarTextClassNames`

```ts
interface AvatarTextClassNames {
  root?: string;
  label?: string;
}
```

### `AvatarTextStyles`

```ts
interface AvatarTextStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
