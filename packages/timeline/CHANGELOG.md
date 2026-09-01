# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
