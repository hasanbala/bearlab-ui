# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.0.0

### Features

- initial release of `@bearlab/progress`.
- four render types via `type`: `"line"` (default), `"circle"`, `"dashboard"`,
  and a segmented bar driven by the `steps` prop.
- dual value API — drive the bar with `percent` directly, or with
  `value` + `minValue` / `maxValue` and let the component normalise it.
- `status` states (`"normal"`, `"active"`, `"success"`, `"exception"`) with
  automatic resolution from the current value when `status` is omitted.
- `indeterminate` mode for unknown-duration work, and `bufferValue` for a
  secondary buffered track on the line variant.
- gradient fills via `strokeColor`, plus `trailColor`, `strokeWidth`,
  `strokeLinecap`, `gapDegree` and `gapPosition` for the circular variants.
- `showInfo` and a `format` render prop for full control of the trailing label.
- slot-based `className` and `style` APIs for every element.
- full `role="progressbar"` semantics: `aria-valuenow`, `aria-valuetext`, and
  `aria-busy` while indeterminate.
- ships with the `"use client"` directive and SSR-safe rendering, so it can be
  imported directly from a Next.js Server Component.
