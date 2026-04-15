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

- ✅ **Text & Icon Variants** — `AvatarIcon` and `AvatarText` components
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — built-in `aria-label`, `alt` texts, and contrast considerations
- ✅ **Presence Indicators** — optional status badge (`online`, `offline`, `busy`)
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Adaptive Sizing** — multiple predefined sizes (`xsmall` to `xxlarge`)

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

```tsx
import { AvatarIcon, AvatarText } from "@bearlab/avatar";

export default function App() {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <AvatarIcon
        src="https://github.com/hasanbala.png"
        alt="Hasan Bala"
        status="online"
      />
      <AvatarIcon src="/avatars/john.jpg" size="medium" status="online" />
      <AvatarText name="Hasan Bala" />
    </div>
  );
}
```

---

## Props

### `AvatarIcon` Props

| Prop        | Type                                                                  | Default    | Required | Description                                   |
| ----------- | --------------------------------------------------------------------- | ---------- | -------- | --------------------------------------------- |
| `src`       | `string`                                                              | —          | ✅       | URL of the image to display                   |
| `alt`       | `string`                                                              | `""`       | ❌       | Alternative text for the image                |
| `size`      | `"xsmall" \| "small" \| "medium" \| "large" \| "xlarge" \| "xxlarge"` | `"medium"` | ❌       | Size variant of the avatar                    |
| `status`    | `"online" \| "offline" \| "busy" \| "none"`                           | `"none"`   | ❌       | Presence indicator to display over the avatar |
| `className` | [`AvatarIconClassNames`](#avatariconclassnames)                       | —          | ❌       | Per-slot className overrides                  |
| `style`     | [`AvatarIconStyles`](#avatariconstyles)                               | —          | ❌       | Per-slot inline style overrides               |

### `AvatarText` Props

| Prop        | Type                                            | Default | Required | Description                                  |
| ----------- | ----------------------------------------------- | ------- | -------- | -------------------------------------------- |
| `name`      | `string`                                        | —       | ✅       | Name used to extract initials for the avatar |
| `className` | [`AvatarTextClassNames`](#avatartextclassnames) | —       | ❌       | Per-slot className overrides                 |
| `style`     | [`AvatarTextStyles`](#avatartextstyles)         | —       | ❌       | Per-slot inline style overrides              |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner image natively using `style?.image`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `AvatarIconClassNames` / `AvatarIconStyles`

| Slot     | Targets                     |
| -------- | --------------------------- |
| `root`   | Outermost container `<div>` |
| `image`  | Image element `<img>`       |
| `status` | Status badge `<span>`       |

```tsx
<AvatarIcon
  src="https://example.com/avatar.jpg"
  status="online"
  className={{
    root: "my-avatar-root",
    image: "my-avatar-img",
    status: "my-avatar-status",
  }}
  style={{
    root: { borderRadius: "50%" },
    status: { border: "2px solid white" },
  }}
/>
```

### `AvatarTextClassNames` / `AvatarTextStyles`

| Slot    | Targets                     |
| ------- | --------------------------- |
| `root`  | Outermost container `<div>` |
| `label` | Initials text `<span>`      |

```tsx
<AvatarText
  name="John Doe"
  className={{
    root: "my-text-avatar-root",
    label: "my-text-avatar-label",
  }}
/>
```

---

## Theme Management

The `Avatar` components feature a robust theme architecture. They are fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level. This ensures text legibility and proper border contrasts for presence indicators.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-avatar-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-avatar-root-border-radius: 50%;
  --bearlab-avatar-image-object-fit: cover;
  --bearlab-avatar-status-online-bg: #10b981;
  --bearlab-avatar-text-bg: #e2e8f0;
  --bearlab-avatar-text-color: #475569;
}
```

---

## Accessibility

These components demonstrate **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes and HTML elements, they guarantee an inclusive experience:

- **`alt` attribute** — Native `alt` text on the `img` element in `AvatarIcon` for screen reader announcement.
- **`aria-label`** — Used on `AvatarText` to provide a complete spoken name rather than just reading the visible initials.
- **`aria-hidden="true"`** — Best-practice usage on inner textual abbreviations (initials) to avoid redundant or confusing screen reader announcements when a full `aria-label` is present.
- **High Contrast** — Built-in theme logic ensures adequate contrast ratios between text and background.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  AvatarIconProps,
  AvatarTextProps,
  AvatarSize,
  AvatarStatus,
  AvatarIconClassNames,
  AvatarIconStyles,
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

### `AvatarIconProps`

```ts
interface AvatarIconProps {
  src: string;
  alt?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: AvatarIconClassNames;
  style?: AvatarIconStyles;
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

### `AvatarTextProps`

```ts
interface AvatarTextProps {
  name: string;
  className?: AvatarTextClassNames;
  style?: AvatarTextStyles;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
