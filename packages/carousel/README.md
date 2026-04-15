# @bearlab/carousel

> Accessible, fully customizable Carousel component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/carousel)](https://www.npmjs.com/package/@bearlab/carousel)
[![license](https://img.shields.io/npm/l/@bearlab/carousel)](LICENSE)
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

- ✅ **Rich Content** — Supports both `image` and `video` slides
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `role="region"`, `aria-label`, correct `tablist` architecture
- ✅ **Gesture Support** — Integrated drag capabilities for intuitive navigation
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/carousel

# yarn
yarn add @bearlab/carousel

# pnpm
pnpm add @bearlab/carousel
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { Carousel } from "@bearlab/carousel";

const items = [
  { type: "image", src: "/image1.jpg", alt: "First slide" },
  { type: "video", src: "/video1.mp4", poster: "/poster1.jpg" },
];

export default function App() {
  return <Carousel items={items} showNavigation={true} loop="infinite" />;
}
```

---

## Props

| Prop                 | Type                                        | Default      | Required | Description                                |
| -------------------- | ------------------------------------------- | ------------ | -------- | ------------------------------------------ |
| `items`              | `CarouselItem[]`                            | —            | ✅       | Array of items (image or video) to display |
| `draggable`          | `boolean`                                   | `true`       | ❌       | Enables drag gesture navigation            |
| `sliderTime`         | `number`                                    | `5000`       | ❌       | Auto-play interval in milliseconds         |
| `slideHeight`        | `number`                                    | —            | ❌       | Override slide height                      |
| `containerWidth`     | `number`                                    | —            | ❌       | Override container width                   |
| `showNavigation`     | `boolean`                                   | `false`      | ❌       | Show previous/next buttons                 |
| `loop`               | `"infinite" \| "wrap"`                      | `"infinite"` | ❌       | Defines loop behavior at boundaries        |
| `transitionDuration` | `number`                                    | `560`        | ❌       | Duration of slide transitions in ms        |
| `className`          | [`CarouselClassNames`](#carouselclassnames) | —            | ❌       | Per-slot className overrides               |
| `style`              | [`CarouselStyles`](#carouselstyles)         | —            | ❌       | Per-slot inline style overrides            |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.track`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `CarouselClassNames`

| Slot            | Targets                               |
| --------------- | ------------------------------------- |
| `root`          | Outermost region container `<div>`    |
| `track`         | Inner track displaying slides `<div>` |
| `dots`          | Wrapper for the pagination dots       |
| `navigation`    | Wrapper for previous and next buttons |
| `videoSlide`    | Video slide container                 |
| `promptOverlay` | Optional text overlay on top of slide |

```tsx
<Carousel
  items={items}
  className={{
    root: "my-carousel-root",
    track: "my-carousel-track",
    dots: "my-carousel-dots",
  }}
/>
```

### `CarouselStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Carousel
  items={items}
  style={{
    root: { borderRadius: "16px", overflow: "hidden" },
    dots: { bottom: "10px" },
  }}
/>
```

---

## Theme Management

The `Carousel` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-carousel-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-carousel-root-border-radius: 12px;
  --bearlab-carousel-dots-color-active: #1a1a1a;
  --bearlab-carousel-dots-color-inactive: #e0e0e0;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`role="region"` & `aria-label="Carousel"`** — Ensures screen readers properly identify the carousel element.
- **`role="tablist"`** — Applied to the dots container for semantic structuring of pagination controls.
- **`aria-label`** — Given to the previous/next buttons for understandable navigation announcements.
- **Pause on Interaction** — Auto-play automatically halts on `onMouseEnter` or start of drag, minimizing disruption for all users.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  CarouselProps,
  CarouselItem,
  CarouselClassNames,
  CarouselStyles,
} from "@bearlab/carousel";
```

### `CarouselItem`

```ts
type CarouselItem =
  | {
      type: "video";
      src: string;
      poster?: string;
      description?: string;
      title?: string;
    }
  | {
      type: "image";
      src: string;
      alt?: string;
      description?: string;
      title?: string;
    };
```

### `CarouselClassNames`

```ts
interface CarouselClassNames {
  root?: string;
  track?: string;
  dots?: string;
  navigation?: string;
  videoSlide?: string;
  promptOverlay?: string;
}
```

### `CarouselStyles`

```ts
interface CarouselStyles {
  root?: React.CSSProperties;
  track?: React.CSSProperties;
  dots?: React.CSSProperties;
  navigation?: React.CSSProperties;
  videoSlide?: React.CSSProperties;
  promptOverlay?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
