# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.0.0

### Features

- Styles now ship as a separate, pre-built `dist/styles.css` (exported as `@bearlab/progress/styles.css`) instead of being injected into `<head>` at runtime. The CSS is part of the server-rendered HTML, which removes the flash of unstyled content in Next.js and other SSR setups and drops the need for `style-src 'unsafe-inline'`.
- Icons are now rendered with [`lucide-react`](https://lucide.dev) instead of inline SVGs, which cuts the JavaScript bundle size substantially.
- `package.json` declares `"sideEffects": ["**/*.css"]`, so bundlers can tree-shake the JavaScript safely.

### BREAKING CHANGES

- Import the stylesheet once in your app, e.g. in `app/layout.tsx`:
  `import "@bearlab/progress/styles.css";`
  Without it the component renders unstyled.
- Built-in icons were replaced by their closest Lucide equivalents, so they look slightly different (stroke-based instead of filled).

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
