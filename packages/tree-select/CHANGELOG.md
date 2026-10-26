# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.0.0

### Features

- Styles now ship as a separate, pre-built `dist/styles.css` (exported as `@bearlab/tree-select/styles.css`) instead of being injected into `<head>` at runtime. The CSS is part of the server-rendered HTML, which removes the flash of unstyled content in Next.js and other SSR setups and drops the need for `style-src 'unsafe-inline'`.
- Icons are now rendered with [`lucide-react`](https://lucide.dev) instead of inline SVGs, which cuts the JavaScript bundle size substantially.
- `package.json` declares `"sideEffects": ["**/*.css"]`, so bundlers can tree-shake the JavaScript safely.

### BREAKING CHANGES

- Import the stylesheet once in your app, e.g. in `app/layout.tsx`:
  `import "@bearlab/tree-select/styles.css";`
  Without it the component renders unstyled.
- Built-in icons were replaced by their closest Lucide equivalents, so they look slightly different (stroke-based instead of filled).

## 1.0.0

### Features

- initial release of `@bearlab/tree-select`.
- config-driven `<TreeSelect treeData={[...]} />` — a dropdown whose options are
  an arbitrarily nested tree.
- `"single"` and `"multiple"` selection modes; multiple mode renders selected
  values as tags with parent/child cascade and indeterminate states, and
  `checkStrictly` opts out of the cascade.
- overflow-aware tag display: tags that no longer fit collapse into a `+N` badge
  that is recalculated on resize.
- built-in search that filters the tree, auto-expands matching branches
  (`autoExpandParent`) and highlights matches (`highlightMatch`).
- controlled or uncontrolled expansion via `expandedValues` /
  `defaultExpandedValues` and `onExpand`.
- options render through a portal with `optionZIndex`, so the dropdown escapes
  `overflow: hidden` ancestors and stays anchored on scroll and resize.
- full keyboard navigation, `label`, `error`, `isRequired`, `disabled`,
  `isLoading`, `showIcon`, `showLine`, and configurable `placeholder` /
  `emptyText` / `notFoundText`.
- slot-based `className` and `style` APIs for every element.
- ships with the `"use client"` directive and SSR-safe rendering, so it can be
  imported directly from a Next.js Server Component.
