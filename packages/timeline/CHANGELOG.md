# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.0.0

### Features

- Styles now ship as a separate, pre-built `dist/styles.css` (exported as `@bearlab/timeline/styles.css`) instead of being injected into `<head>` at runtime. The CSS is part of the server-rendered HTML, which removes the flash of unstyled content in Next.js and other SSR setups and drops the need for `style-src 'unsafe-inline'`.
- Icons are now rendered with [`lucide-react`](https://lucide.dev) instead of inline SVGs, which cuts the JavaScript bundle size substantially.
- `package.json` declares `"sideEffects": ["**/*.css"]`, so bundlers can tree-shake the JavaScript safely.

### BREAKING CHANGES

- Import the stylesheet once in your app, e.g. in `app/layout.tsx`:
  `import "@bearlab/timeline/styles.css";`
  Without it the component renders unstyled.
- Built-in icons were replaced by their closest Lucide equivalents, so they look slightly different (stroke-based instead of filled).

## 1.0.0

### Features

- initial release of `@bearlab/timeline`.
- config-driven `<Timeline items={[...]} />` API for rendering ordered nodes
  with content, an opposite-side `label`, preset or custom dot `color`, custom
  `dot` nodes, and inline SVG `icon`s.
- vertical layout with `mode` `left` / `right` / `alternate`, plus an additional
  `orientation="horizontal"` layout.
- `pending` node (with customizable `pendingDot`, default animated spinner) and
  `reverse` ordering.
- optional per-item `onClick` that turns a node into a keyboard-accessible
  button (`Enter` / `Space`, `:focus-visible`).
- dark-mode support via `[data-theme="dark"]` and a slot-based `className` /
  `style` API.
