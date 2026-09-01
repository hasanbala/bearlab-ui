# @bearlab/timeline

> Accessible, fully customizable Timeline component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/timeline)](https://www.npmjs.com/package/@bearlab/timeline)
[![license](https://img.shields.io/npm/l/@bearlab/timeline)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Item Configuration](#item-configuration)
- [Modes & Orientation](#modes--orientation)
- [Dots, Colors & Icons](#dots-colors--icons)
- [Status Icons](#status-icons)
- [Active Node](#active-node)
- [Pending & Reverse](#pending--reverse)
- [Interactive Nodes](#interactive-nodes)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)

---

## Features

- ✅ **Config-driven API** — describe the whole timeline with a single `items` prop
- ✅ **Vertical modes** — `left`, `right`, and `alternate` content placement
- ✅ **Horizontal orientation** — lay the timeline out along the x-axis
- ✅ **Opposite-side labels** — render timestamps or meta opposite the content
- ✅ **Flexible dots** — any CSS color string, an inline SVG icon, or a fully custom node
- ✅ **Solid dots** — fill dots with their color via a single `solid` prop
- ✅ **Status icons** — `success`, `warning`, `error`, `info` flags render built-in semantic icons; add `isPing` to enable the pulse animation
- ✅ **Active node** — `isActive` marks the current step on a regular dot with an animated ping ring
- ✅ **Pending node** — trailing "in progress" item with an animated spinner (customizable)
- ✅ **Reverse ordering** — newest-first with a single prop
- ✅ **Optional interactivity** — per-item `onClick` turns a node into a keyboard-accessible button
- ✅ **Slot-based `className` & `style` API** — granular styling of every element
- ✅ **Dark mode ready** — responds to `[data-theme="dark"]` automatically
- ✅ **TypeScript-first** — fully typed items and configuration options

---

## Installation

```bash
# npm
npm install @bearlab/timeline

# yarn
yarn add @bearlab/timeline

# pnpm
pnpm add @bearlab/timeline
```

> **Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0` must be installed in your project.

> **Framework support:** Works with React 18/19 and Next.js — both the App Router
> and the Pages Router. Every component ships with the `"use client"` directive
> already applied, so you can import it straight into a Server Component without
> writing a wrapper file. All DOM access is SSR-guarded.

---

## Usage

### Basic timeline

```tsx
import { Timeline } from "@bearlab/timeline";
import type { TimelineItem } from "@bearlab/timeline";

const items: TimelineItem[] = [
  { content: "Create a services site — 2015-09-01" },
  { content: "Solve initial network problems — 2015-09-01" },
  { content: "Technical testing — 2015-09-01" },
  { content: "Network problems being solved — 2015-09-01" },
];

export default function App() {
  return <Timeline items={items} />;
}
```

### With labels (timestamps)

```tsx
<Timeline
  mode="left"
  items={[
    { label: "2015-09-01", content: "Create a services site" },
    { label: "2015-09-01 09:12:11", content: "Solve initial network problems" },
    { label: "2015-09-01", content: "Technical testing" },
  ]}
/>
```

---

## Props

| Prop          | Type                                              | Default      | Required | Description                                             |
| ------------- | ------------------------------------------------- | ------------ | -------- | ------------------------------------------------------- |
| `items`       | [`TimelineItem[]`](#item-configuration)           | —            | ✅       | Timeline nodes rendered in order                        |
| `mode`        | `"left" \| "right" \| "alternate"`                | `"left"`     | ❌       | Content/label placement for the vertical timeline       |
| `orientation` | `"vertical" \| "horizontal"`                      | `"vertical"` | ❌       | Overall layout direction                                |
| `pending`     | `React.ReactNode \| boolean`                      | —            | ❌       | Appends a trailing "in progress" node                   |
| `pendingDot`  | `React.ReactNode`                                 | —            | ❌       | Custom dot for the pending node (defaults to a spinner) |
| `reverse`     | `boolean`                                         | `false`      | ❌       | Reverses node order (pending always stays last)         |
| `solid`       | `boolean`                                         | `false`      | ❌       | Fills each dot with its color instead of hollow style   |
| `className`   | [`TimelineClassNames`](#slot-based-customization) | —            | ❌       | Per-slot className overrides                            |
| `style`       | [`TimelineStyles`](#slot-based-customization)     | —            | ❌       | Per-slot inline style overrides                         |

---

## Item Configuration

Each entry in `items` conforms to `TimelineItem`:

| Field      | Type                                             | Required | Description                                                    |
| ---------- | ------------------------------------------------ | -------- | -------------------------------------------------------------- |
| `key`      | `string \| number`                               | ❌       | Stable identifier (falls back to the index)                    |
| `content`  | `React.ReactNode`                                | ❌       | Main content of the node                                       |
| `label`    | `React.ReactNode`                                | ❌       | Opposite-side label (e.g. a timestamp)                         |
| `color`    | `string`                                         | ❌       | Dot color — any valid CSS color (named, hex, rgb, hsl, oklch…). Defaults to gray when omitted or invalid. |
| `dot`      | `React.ReactNode`                                | ❌       | Fully custom dot node (wins over `icon` and `color`)           |
| `icon`     | `FunctionComponent<SVGProps>`                    | ❌       | SVG icon rendered inside the dot                               |
| `position` | `"left" \| "right"`                              | ❌       | Per-item side override used in `alternate` mode                |
| `onClick`  | `(item, index) => void`                          | ❌       | Turns the node into an interactive, keyboard-accessible button |
| `success`  | `boolean`                                        | ❌       | Shows the built-in success icon (green)                        |
| `warning`  | `boolean`                                        | ❌       | Shows the built-in warning icon (amber)                        |
| `error`    | `boolean`                                        | ❌       | Shows the built-in error icon (red)                            |
| `info`     | `boolean`                                        | ❌       | Shows the built-in info icon (blue)                            |
| `isPing`   | `boolean`                                        | ❌       | Adds a pulse ring animation to a status icon node              |
| `isActive` | `boolean`                                        | ❌       | Adds a pulse ring animation to any regular, icon, or solid dot |

**Priority rules:**
- `dot` always wins — it fully replaces the dot area.
- Status flags (`error` → `warning` → `success` → `info`) take priority over `color` and `icon`. Setting a status flag alongside `color` renders the status icon; `color` is ignored.
- `isPing` and `isActive` are scoped to their respective dot types and have no cross-effect.

---

## Modes & Orientation

```tsx
// Vertical (default) — axis left, content right
<Timeline mode="left" items={items} />

// Vertical — axis right, content left
<Timeline mode="right" items={items} />

// Vertical — axis centered, nodes alternate sides
<Timeline mode="alternate" items={items} />

// Horizontal — nodes laid out along the x-axis
<Timeline orientation="horizontal" items={items} />
```

In `alternate` mode each item can override its side with `position: "left" | "right"`.
In horizontal layout the node side (`left` → below the axis, `right` → above) follows
the same `mode`/`position` resolution.

---

## Dots, Colors & Icons

The `color` prop accepts **any valid CSS color string** — named colors, hex, rgb, hsl, hwb, lab, lch, oklab, oklch, and so on. If omitted, or if the browser does not recognise the value, the dot falls back to the default gray.

```tsx
<Timeline
  items={[
    { color: "green", content: "Named color" },
    { color: "#7c3aed", content: "Hex" },
    { color: "rgb(239, 68, 68)", content: "RGB" },
    { color: "oklch(65% 0.22 29)", content: "Oklch" },
    { icon: ClockIcon, content: "Icon dot" },
    { dot: <MyBadge />, content: "Fully custom dot node" },
  ]}
/>
```

Dot resolution order: **`dot`** → status flags → **`icon`** → **`color`** → default gray.

### Solid dots

Pass `solid` to fill each dot with its color, useful for progress timelines.

```tsx
<Timeline
  solid
  items={[
    { color: "#12b76a", content: "Order confirmed" },
    { color: "#12b76a", content: "Packed at warehouse" },
    { color: "#465fff", content: "At distribution hub" },
    { color: "#98a2b3", content: "Out for delivery" },
  ]}
/>
```

`solid` is independent — you can use either or both.
Custom `dot` nodes and SVG `icon` items are unaffected by `solid`; their
appearance is fully controlled by the caller.

---

## Status Icons

Pass one of `success`, `warning`, `error`, or `info` as `true` to replace the dot with a built-in themed icon. No color configuration is required — each status has its own semantic color baked in.

```tsx
const items: TimelineItem[] = [
  { label: "Step 1", content: "Repository initialised.", success: true },
  { label: "Step 2", content: "Vulnerabilities flagged.", warning: true },
  { label: "Step 3", content: "Build failed.", error: true },
  { label: "Step 4", content: "Running tests.", info: true },
];

<Timeline mode="left" items={items} />
```

Add `isPing: true` to enable a pulse ring animation on a status icon node:

```tsx
{ label: "Step 3", content: "Build failed.", error: true, isPing: true }
```

When multiple status flags are set on the same item, the highest-severity wins: `error` > `warning` > `success` > `info`.

Status icons are always 16 × 16 px, carry their own visual identity through the icon shape, and respond to `[data-theme="dark"]` automatically.

---

## Active Node

Set `isActive: true` on a **regular dot** item to overlay a pulse ring animation, signalling the current step in a progress or tracking timeline. Works with any CSS color and with or without `solid`.

```tsx
const items: TimelineItem[] = [
  { label: "Jan 14", content: "Order confirmed.", color: "#12b76a" },
  { label: "Jan 14", content: "Packed at warehouse.", color: "#12b76a" },
  { label: "Jan 15", content: "At distribution hub.", color: "#465fff", isActive: true },
  { label: "Jan 16", content: "Out for delivery." },
];

// hollow dot
<Timeline mode="left" items={items} />

// solid dot — ping ring follows the dot color
<Timeline mode="left" items={items} solid />
```

> **`isActive` vs `isPing`**
> - `isActive` → ping on a regular/icon/solid dot.
> - `isPing` → ping on a status icon dot (`success`, `warning`, `error`, `info`).
> Both are optional and independent of each other.

---

## Pending & Reverse

```tsx
// Trailing spinner node
<Timeline items={items} pending="Recording..." />

// Custom pending dot
<Timeline items={items} pending="Recording..." pendingDot={<MySpinner />} />

// Newest-first (pending always stays last)
<Timeline items={items} reverse pending />
```

---

## Interactive Nodes

Provide `onClick` on an item to make its content a focusable button. It is
operable with `Enter` / `Space` and shows a `:focus-visible` outline.

```tsx
<Timeline
  items={[
    {
      content: "View release notes",
      onClick: (item, index) => console.log("clicked", index),
    },
  ]}
/>
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to enable surgical styling of any element.

### `TimelineClassNames`

| Slot            | Targets                         |
| --------------- | ------------------------------- |
| `root`          | Outermost `<ul>` list           |
| `item`          | Each node `<li>`                |
| `itemTail`      | Connector line                  |
| `itemHead`      | Axis wrapper (dot + tail)       |
| `itemDot`       | The dot                         |
| `itemDotCustom` | Wrapper for a custom `dot` node |
| `itemContent`   | Node content                    |
| `itemLabel`     | Opposite-side label             |
| `pending`       | The pending node `<li>`         |
| `pendingDot`    | The pending dot                 |

```tsx
<Timeline
  items={items}
  className={{ root: "my-timeline", itemContent: "my-content" }}
/>
```

### `TimelineStyles`

Every slot also accepts inline `React.CSSProperties` via the `style` prop with the same keys.

---

## Theme Management

The component automatically adapts when a `data-theme="dark"` attribute is present
on any ancestor element.

```html
<html data-theme="dark">
  ...
</html>
```

---

## Design Tokens (Customization)

All visual defaults are scoped CSS custom properties on the component root.
Override them with `--bearlab-timeline-*` variables.

```css
[data-theme="light"] {
  --bearlab-timeline-dot-color: #98a2b3;
  --bearlab-timeline-tail-color: #e4e7ec;
  --bearlab-timeline-gap: 1.375rem;
}
```

**Key tokens:**

| Token                                         | Default (light) | Description                       |
| --------------------------------------------- | --------------- | --------------------------------- |
| `--bearlab-timeline-dot-size`                 | `0.75rem`       | Diameter of the dot               |
| `--bearlab-timeline-dot-color`                | `#98a2b3`       | Default dot color (gray)          |
| `--bearlab-timeline-tail-width`               | `0.125rem`      | Connector line thickness          |
| `--bearlab-timeline-tail-color`               | `#e4e7ec`       | Connector line color              |
| `--bearlab-timeline-gap`                      | `1.375rem`      | Vertical spacing between nodes    |
| `--bearlab-timeline-axis-gap`                 | `1rem`          | Gap between the axis and content  |
| `--bearlab-timeline-content-color`            | `#344054`       | Content text color                |
| `--bearlab-timeline-label-color`              | `#667085`       | Label text color                  |
| `--bearlab-timeline-pending-color`            | `#465fff`       | Pending dot / spinner color       |
| `--bearlab-timeline-transition`               | `0.18s …`       | Shared transition timing          |

---

## Accessibility

- The timeline renders as a `<ul role="list">` of `<li>` nodes.
- Decorative dots and connector lines are marked `aria-hidden="true"`.
- Interactive nodes (`onClick`) expose `role="button"`, are focusable
  (`tabIndex={0}`), respond to `Enter` / `Space`, and show a `:focus-visible` outline.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  TimelineProps,
  TimelineClassNames,
  TimelineStyles,
  TimelineItem,
} from "@bearlab/timeline";
```

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
