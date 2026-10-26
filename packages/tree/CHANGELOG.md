# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.0.0

### Features

- Styles now ship as a separate, pre-built `dist/styles.css` (exported as `@bearlab/tree/styles.css`) instead of being injected into `<head>` at runtime. The CSS is part of the server-rendered HTML, which removes the flash of unstyled content in Next.js and other SSR setups and drops the need for `style-src 'unsafe-inline'`.
- Icons are now rendered with [`lucide-react`](https://lucide.dev) instead of inline SVGs, which cuts the JavaScript bundle size substantially.
- `package.json` declares `"sideEffects": ["**/*.css"]`, so bundlers can tree-shake the JavaScript safely.

### BREAKING CHANGES

- Import the stylesheet once in your app, e.g. in `app/layout.tsx`:
  `import "@bearlab/tree/styles.css";`
  Without it the component renders unstyled.
- Built-in icons were replaced by their closest Lucide equivalents, so they look slightly different (stroke-based instead of filled).

## 1.0.0

### Features

- initial release of `@bearlab/tree`.
- config-driven `<Tree treeData={[...]} />` API for arbitrarily nested nodes.
- selection modes — `"single"` and `"multiple"` — plus a `checkable` mode with
  parent/child cascade and indeterminate states; `checkStrictly` opts out of the
  cascade and treats every node independently.
- controlled or uncontrolled expansion via `expandedValues` /
  `defaultExpandedValues` and `onExpand`.
- built-in search (`showSearch`) that filters the tree, auto-expands matching
  branches (`autoExpandParent`) and highlights matches (`highlightMatch`).
- full keyboard navigation following the ARIA tree pattern: arrow keys to move
  and expand/collapse, `Enter`/`Space` to select or check, `Escape` to clear the
  active node, with `aria-activedescendant` roving focus.
- `showIcon`, `showLine`, per-node `disabled`, `label`, `error`, `isRequired`,
  and configurable `emptyText` / `notFoundText` empty states.
- form-friendly: pass `name` to receive a synthetic change event instead of the
  positional `onChange` signature.
- slot-based `className` and `style` APIs for every element.
- ships with the `"use client"` directive and SSR-safe rendering, so it can be
  imported directly from a Next.js Server Component.
