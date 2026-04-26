# @bearlab/carousel

> Accessible, fully customizable Carousel component for React applications — supports images and videos with drag, auto-play, and prompt overlay.

[![npm version](https://img.shields.io/npm/v/@bearlab/carousel)](https://www.npmjs.com/package/@bearlab/carousel)
[![license](https://img.shields.io/npm/l/@bearlab/carousel)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [CarouselItem](#carouselitem)
- [Slide Behavior](#slide-behavior)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Image & Video slides** — per-item `type: "image" | "video"` discriminated union
- ✅ **Drag / Swipe support** — pointer-based drag with velocity-aware snap using `useDrag`
- ✅ **Auto-play** — configurable interval, pauses on hover or drag
- ✅ **Two loop modes** — `"infinite"` (clone-based seamless loop) and `"wrap"` (boundary wrap)
- ✅ **Responsive** — adapts slide dimensions at 1024 px and 640 px breakpoints via container queries
- ✅ **Prompt overlay** — optional `title` + `description` overlay with expand/collapse on active slide
- ✅ **Video controls** — play/pause and mute/unmute buttons appear on hover for video slides
- ✅ **Optional prev/next navigation buttons** — toggled via `showNavigation`
- ✅ **Animated dot progress indicator** — gradient fill animates with `sliderTime` duration
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Dark Mode** — automatic adaptation via `[data-theme="dark"]` selector
- ✅ **TypeScript-first** — fully typed props, item types, and slot interfaces

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

### Image-only carousel

```tsx
import { Carousel } from "@bearlab/carousel";

const items = [
  {
    type: "image",
    src: "/image1.jpg",
    alt: "First slide",
    title: "Hello",
    description: "A short description",
  },
  { type: "image", src: "/image2.jpg", alt: "Second slide" },
];

export default function App() {
  return <Carousel items={items} />;
}
```

### Mixed image + video with navigation

```tsx
import { Carousel } from "@bearlab/carousel";

const items = [
  { type: "image", src: "/image1.jpg", alt: "First slide" },
  {
    type: "video",
    src: "/video1.mp4",
    poster: "/poster1.jpg",
    title: "Product Tour",
    description: "Watch how it works.",
  },
];

export default function App() {
  return (
    <Carousel
      items={items}
      showNavigation={true}
      loop="infinite"
      sliderTime={5}
      transitionDuration={560}
    />
  );
}
```

---

## Props

| Prop                 | Type                                        | Default      | Required | Description                                      |
| -------------------- | ------------------------------------------- | ------------ | -------- | ------------------------------------------------ |
| `items`              | `CarouselItem[]`                            | —            | ✅       | Array of slide items (image or video)            |
| `draggable`          | `boolean`                                   | `true`       | ❌       | Enables pointer-based drag/swipe navigation      |
| `sliderTime`         | `number`                                    | `4`          | ❌       | Auto-play interval **in seconds**                |
| `slideHeight`        | `number`                                    | —            | ❌       | Override computed slide height (px)              |
| `containerWidth`     | `number`                                    | —            | ❌       | Override computed container width (px)           |
| `showNavigation`     | `boolean`                                   | `false`      | ❌       | Show previous/next arrow buttons                 |
| `loop`               | `"infinite" \| "wrap"`                      | `"infinite"` | ❌       | Loop mode: clone-based seamless or boundary wrap |
| `transitionDuration` | `number`                                    | `560`        | ❌       | Duration of the slide transition animation (ms)  |
| `className`          | [`CarouselClassNames`](#carouselclassnames) | —            | ❌       | Per-slot className overrides                     |
| `style`              | [`CarouselStyles`](#carouselstyles)         | —            | ❌       | Per-slot inline style overrides                  |

---

## CarouselItem

Each item in the `items` array is a **discriminated union** on `type`:

```ts
type CarouselItem =
  | {
      type: "image";
      src: string;
      alt?: string;
      title?: string;
      description?: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      title?: string;
      description?: string;
    };
```

- **`title` & `description`** — When provided on the **active** slide, a `PromptOverlay` is rendered at the bottom of the slide. Long text (> 120 chars combined) is truncated with an expand/collapse toggle.
- **`poster`** — Video slides accept an optional poster image shown before playback begins.

---

## Slide Behavior

| Behavior               | Detail                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Auto-play**          | Advances to the next slide every `sliderTime` seconds. Pauses on `mouseenter` or drag. |
| **Drag threshold**     | A pointer move of ≥ 8 px triggers a drag; velocity-aware snap decides the direction.   |
| **Inactive scale**     | Non-active slides are scaled down to `0.88` (configurable via design token).           |
| **Video controls**     | Play/pause and mute/unmute buttons appear on hover, only on the active slide.          |
| **Responsive sizing**  | Slide dimensions auto-compute from container width at ≥ 1024 px, ≥ 640 px, and mobile. |
| **`slideHeight` prop** | Passing a value overrides all responsive height computations.                          |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

### `CarouselClassNames`

| Slot            | Targets                                         |
| --------------- | ----------------------------------------------- |
| `root`          | Outermost `role="region"` container `<div>`     |
| `track`         | Sliding track `<div>` that moves between slides |
| `navigation`    | Wrapper `<div>` holding prev/next arrow buttons |
| `dots`          | `role="tablist"` pagination dots container      |
| `videoSlide`    | `<video>` element inside a video slide          |
| `promptOverlay` | Text overlay at the bottom of the active slide  |

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
    root: { borderRadius: "16px" },
    dots: { marginTop: "8px" },
    promptOverlay: { borderRadius: "12px" },
  }}
/>
```

---

## Theme Management

The `Carousel` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="dark"]`** selectors applied at the root or document level.

Dark mode redefines dot container backgrounds, border colors, and shadow tokens — no manual configuration required.

---

## Design Tokens (Customization)

Beyond slots, the component leverages scoped CSS variables for a global design token system. CSS variables are declared inside the `.container` class scope and fall back to `--bearlab-carousel-*` public tokens you can override.

```css
:root {
  /* Slide dimensions */
  --bearlab-carousel-slide-radius: 1.25rem;
  --bearlab-carousel-slide-inactive-scale: 0.88;
  --bearlab-carousel-slide-height: 37.5rem; /* 600px – desktop */
  --bearlab-carousel-slide-height-tablet: 26.25rem; /* 420px */
  --bearlab-carousel-slide-height-mobile: 20rem; /* 320px */
  --bearlab-carousel-slide-gap: 1.25rem;

  /* Transition */
  --bearlab-carousel-transition-dur: 560ms;

  /* Navigation buttons */
  --bearlab-carousel-nav-btn-size: 3rem;
  --bearlab-carousel-nav-btn-bg: rgba(255, 255, 255, 0.08);
  --bearlab-carousel-nav-btn-bg-hover: rgba(255, 255, 255, 0.16);
  --bearlab-carousel-nav-btn-border: rgba(255, 255, 255, 0.15);
  --bearlab-carousel-nav-btn-color: rgba(255, 255, 255, 0.85);

  /* Dots */
  --bearlab-carousel-dots-bg: #f2f4f7;
  --bearlab-carousel-dot-size: 0.75rem;
  --bearlab-carousel-dot-width-active: 2.5rem;
  --bearlab-carousel-dot-fill-gradient: linear-gradient(
    77.04deg,
    #3186ff 6.99%,
    #346bf1 45.46%,
    #4fa0ff 88.2%
  );

  /* Prompt overlay */
  --bearlab-carousel-prompt-bg: #000000bf;
  --bearlab-carousel-prompt-text-color: rgba(255, 255, 255, 0.82);
  --bearlab-carousel-prompt-label-color: rgba(255, 255, 255, 0.45);
}
```

> All tokens follow the `--bearlab-carousel-[element]-[property]` naming convention. The full list of available tokens mirrors the CSS variable declarations in `carousel.module.scss`.

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards:

- **`role="region"` & `aria-label="Carousel"`** — Ensures screen readers properly identify the carousel landmark.
- **`role="tablist"` & `aria-label="Slides"`** — Applied to the dots container for semantic pagination controls.
- **`aria-label="Previous"` / `"Next"`** — Navigation arrow buttons carry descriptive labels for assistive technologies.
- **`aria-hidden={!isActive}`** — Non-active slides are hidden from the accessibility tree, preventing off-screen content from being announced.
- **Pause on interaction** — Auto-play halts on `mouseenter` and during drag, minimizing disruption per WCAG 2.1 guideline 2.2.2.
- **Video controls** — Play/pause and mute/unmute buttons include `aria-label` attributes for screen reader announcements.
- **Prompt expand/collapse** — The toggle button includes `aria-label="Expand prompt"` / `"Collapse prompt"` for assistive technology users.

---

## TypeScript

The following types are exported from the package:

```ts
import type {
  CarouselProps,
  CarouselClassNames,
  CarouselStyles,
} from "@bearlab/carousel";
```

### `CarouselProps`

```ts
interface CarouselProps {
  items: CarouselItem[];
  draggable?: boolean; // default: true
  sliderTime?: number; // default: 4 (seconds)
  slideHeight?: number;
  containerWidth?: number;
  showNavigation?: boolean; // default: false
  loop?: "infinite" | "wrap"; // default: "infinite"
  transitionDuration?: number; // default: 560 (ms)
  className?: CarouselClassNames;
  style?: CarouselStyles;
}
```

### `CarouselItem`

```ts
type CarouselItem =
  | {
      type: "image";
      src: string;
      alt?: string;
      title?: string;
      description?: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      title?: string;
      description?: string;
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
