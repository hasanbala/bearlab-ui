# @bearlab/progress

> Accessible, fully customizable Progress component for React — line, circle, dashboard & stepped variants with determinate, buffer and indeterminate modes.

[![npm version](https://img.shields.io/npm/v/@bearlab/progress)](https://www.npmjs.com/package/@bearlab/progress)
[![license](https://img.shields.io/npm/l/@bearlab/progress)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Slot-based Customization](#slot-based-customization)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)

---

## Features

- ✅ **Four variants** — `line`, `circle`, `dashboard` (gauge) and segmented `steps`.
- ✅ **Two value APIs** — drive with a simple `percent` (0–100) or with `value` + `minValue`/`maxValue`.
- ✅ **States** — `normal`, `active` (animated), `success` and `exception`, with auto-`success` at 100%.
- ✅ **Indeterminate & buffer modes** — show ongoing work without a known percentage, or a secondary buffer track.
- ✅ **Gradients** — pass `{ from, to }` to fill the bar/path with a smooth gradient (CSS for line, SVG for circle).
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity issues.
- ✅ **Theme-able** — all visuals are CSS custom properties with built-in dark mode (`[data-theme="dark"]`).
- ✅ **Accessible by default** — `role="progressbar"` with full `aria-value*` wiring.
- ✅ **TypeScript-first** — fully typed props and slot interfaces.

---

## Installation

```bash
# npm
npm install @bearlab/progress

# yarn
yarn add @bearlab/progress

# pnpm
pnpm add @bearlab/progress
```

> **Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0` must be installed in your project.

> **Framework support:** Works with React 18/19 and Next.js — both the App Router
> and the Pages Router. Every component ships with the `"use client"` directive
> already applied, so you can import it straight into a Server Component without
> writing a wrapper file. All DOM access is SSR-guarded.

---

## Usage

### Line (default)

```tsx
import { Progress } from "@bearlab/progress";

export default function App() {
  return <Progress percent={60} />;
}
```

### Circle & Dashboard

```tsx
<Progress type="circle" percent={75} />
<Progress type="dashboard" percent={75} gapDegree={90} gapPosition="bottom" />
```

### Segmented (steps)

```tsx
<Progress percent={60} steps={5} />
<Progress percent={80} steps={{ count: 10, gap: 4 }} strokeColor="#12b76a" />
```

### Status

```tsx
<Progress percent={100} status="success" />
<Progress percent={70} status="exception" />
<Progress percent={50} status="active" /> {/* animated */}
```

### Indeterminate & Buffer

```tsx
<Progress indeterminate />
<Progress type="circle" indeterminate />
<Progress percent={40} bufferValue={70} />
```

### Gradient

```tsx
<Progress percent={80} strokeColor={{ from: "#465fff", to: "#12b76a" }} />
<Progress type="circle" percent={80} strokeColor={{ from: "#465fff", to: "#f04438" }} />
<Progress
  type="circle"
  percent={80}
  strokeColor={{ from: "#465fff", to: "#f04438", direction: "to bottom right" }}
/>
```

### Value / min / max API

```tsx
{
  /* 30 within [0, 200] → 15% */
}
<Progress value={30} minValue={0} maxValue={200} />;
```

### Custom info & sizing

```tsx
<Progress
  type="circle"
  percent={42}
  size="large"
  format={(percent) => `${percent} pts`}
/>

<Progress percent={50} showInfo={false} strokeWidth={16} />
```

---

## Props

| Prop            | Type                                                                                                                                                                                                                                                             | Default     | Description                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------- |
| `type`          | `"line" \| "circle" \| "dashboard"`                                                                                                                                                                                                                              | `"line"`    | Visual variant.                                                       |
| `percent`       | `number`                                                                                                                                                                                                                                                         | —           | Completion percentage (0–100). Takes precedence over the `value` API. |
| `value`         | `number`                                                                                                                                                                                                                                                         | —           | Raw value, normalized against `minValue`/`maxValue`.                  |
| `minValue`      | `number`                                                                                                                                                                                                                                                         | `0`         | Lower bound for the `value` API.                                      |
| `maxValue`      | `number`                                                                                                                                                                                                                                                         | `100`       | Upper bound for the `value` API.                                      |
| `status`        | `"normal" \| "active" \| "success" \| "exception"`                                                                                                                                                                                                               | `"normal"`  | Visual state. Auto-promotes to `"success"` at 100%.                   |
| `indeterminate` | `boolean`                                                                                                                                                                                                                                                        | `false`     | Animated, unknown-progress mode. Drops `aria-valuenow`.               |
| `bufferValue`   | `number`                                                                                                                                                                                                                                                         | —           | Secondary buffer percentage shown behind the bar (line only).         |
| `showInfo`      | `boolean`                                                                                                                                                                                                                                                        | `true`      | Render the info label / status icon.                                  |
| `format`        | `(percent: number, info: { value?: number }) => React.ReactNode`                                                                                                                                                                                                 | —           | Custom renderer for the info content.                                 |
| `size`          | `"small" \| "default" \| "large" \| number`                                                                                                                                                                                                                      | `"default"` | Thickness/scale preset, or an explicit pixel size.                    |
| `strokeWidth`   | `number`                                                                                                                                                                                                                                                         | —           | Stroke thickness in px (overrides `size`-derived thickness).          |
| `strokeColor`   | `string \| { from: string; to: string; direction?: "to top" \| "to top right" \| "to right top" \| "to right" \| "to bottom right" \| "to right bottom" \| "to bottom" \| "to bottom left" \| "to left bottom" \| "to left" \| "to top left" \| "to left top" }` | —           | Bar/path color. Object form renders a gradient.                       |
| `trailColor`    | `string`                                                                                                                                                                                                                                                         | —           | Track (unfilled) color.                                               |
| `strokeLinecap` | `"round" \| "butt" \| "square"`                                                                                                                                                                                                                                  | `"round"`   | Stroke line cap shape.                                                |
| `steps`         | `number \| { count: number; gap?: number }`                                                                                                                                                                                                                      | —           | Render a segmented (stepped) line.                                    |
| `gapDegree`     | `number`                                                                                                                                                                                                                                                         | `75`        | Dashboard gap size in degrees.                                        |
| `gapPosition`   | `"top" \| "bottom" \| "left" \| "right"`                                                                                                                                                                                                                         | `"bottom"`  | Dashboard gap position.                                               |
| `aria-label`    | `string`                                                                                                                                                                                                                                                         | —           | Accessible name for the progressbar.                                  |
| `className`     | [`ProgressClassNames`](#progressclassnames)                                                                                                                                                                                                                      | —           | Per-slot className overrides.                                         |
| `style`         | [`ProgressStyles`](#progressstyles)                                                                                                                                                                                                                              | —           | Per-slot inline style overrides.                                      |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. Inject custom classes and styles directly into child elements via the `className` and `style` objects.

### `ProgressClassNames`

| Slot         | Targets                                        |
| ------------ | ---------------------------------------------- |
| `root`       | Outermost `role="progressbar"` container       |
| `inner`      | Line wrapper / circle wrapper                  |
| `bar`        | Filled line bar / circle progress path         |
| `trail`      | Unfilled track / circle trail path             |
| `buffer`     | Buffer layer (line, when `bufferValue` is set) |
| `info`       | Info container (percentage / status icon)      |
| `text`       | Inner text/icon element of the info            |
| `steps`      | Steps container (segmented variant)            |
| `step`       | Every individual step segment                  |
| `stepActive` | Active (filled) step segments only             |

```tsx
<Progress
  percent={60}
  className={{ root: "my-root", bar: "my-bar", info: "my-info" }}
/>
```

### `ProgressStyles`

All slots accept inline `React.CSSProperties` via the matching `style` keys:

```tsx
<Progress
  percent={60}
  style={{ trail: { backgroundColor: "#eee" }, bar: { background: "tomato" } }}
/>
```

---

## Design Tokens (Customization)

The component exposes CSS custom properties scoped to its root. Override them globally in your stylesheet, or per-instance via the `style.root` slot.

```css
:root {
  --bearlab-progress-primary: #465fff; /* bar / path fill         */
  --bearlab-progress-trail: #e4e7ec; /* unfilled track          */
  --bearlab-progress-success: #12b76a; /* success state           */
  --bearlab-progress-exception: #f04438; /* exception state         */
  --bearlab-progress-buffer: #c7d0ff; /* buffer layer            */
  --bearlab-progress-text-color: #1f2937; /* info text color         */
  --bearlab-progress-info-font-size: 1rem; /* info font size          */
  --bearlab-progress-info-gap: 0.625rem; /* gap between bar & info  */
  --bearlab-progress-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Dark mode

When an ancestor carries `data-theme="dark"`, the palette automatically switches (e.g. `--bearlab-progress-primary` → `#7592ff`, `--bearlab-progress-trail` → `#1d2939`). Override any `--bearlab-progress-*` token to customize the dark palette.

---

## Accessibility

This component adheres to **WCAG 2.1 AA** standards:

- **`role="progressbar"`** — Identifies the element as a progress indicator.
- **`aria-valuemin` / `aria-valuemax`** — Always `0` and `100` (the normalized scale).
- **`aria-valuenow` / `aria-valuetext`** — The current rounded percentage. Both are **omitted in `indeterminate` mode** to correctly signal an unknown value.
- **`aria-busy`** — Set while `indeterminate` to indicate ongoing work.
- **`aria-label`** — Provide a descriptive name via the `aria-label` prop for standalone progress bars.
- **Decorative SVG/icons** — Status icons and the circle SVG are marked `aria-hidden` / `role="presentation"` to avoid redundant announcements.

```tsx
<Progress aria-label="File upload progress" percent={42} />
```

---

## TypeScript

All types are exported from the package:

```ts
import type {
  ProgressProps,
  ProgressClassNames,
  ProgressStyles,
} from "@bearlab/progress";
```

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
