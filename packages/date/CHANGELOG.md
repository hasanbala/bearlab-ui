# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.0.0

### Features

- Styles now ship as a separate, pre-built `dist/styles.css` (exported as `@bearlab/date/styles.css`) instead of being injected into `<head>` at runtime. The CSS is part of the server-rendered HTML, which removes the flash of unstyled content in Next.js and other SSR setups and drops the need for `style-src 'unsafe-inline'`.
- Icons are now rendered with [`lucide-react`](https://lucide.dev) instead of inline SVGs, which cuts the JavaScript bundle size substantially.
- `package.json` declares `"sideEffects": ["**/*.css"]`, so bundlers can tree-shake the JavaScript safely.

### BREAKING CHANGES

- Import the stylesheet once in your app, e.g. in `app/layout.tsx`:
  `import "@bearlab/date/styles.css";`
  Without it the component renders unstyled.
- Built-in icons were replaced by their closest Lucide equivalents, so they look slightly different (stroke-based instead of filled).

## 1.0.1

### Bug Fixes

- **time picker in `multiple` and `range` modes** — the time was parsed straight
  off the raw input string, so in `multiple` mode it read the whole
  comma-separated list instead of the first date, and in `range` mode the end
  time was only synced on the initial render. Both modes now split the value
  into its parts before parsing, so `showTimePicker` stays correct when the
  value changes after mount.
- removed the dark-theme `--bearlab-date-*-today-*` token declarations, which
  overrode the shared "today" highlight and left it out of step with the light
  theme.

### Features

- **Next.js support** — the published bundle now carries the `"use client"`
  directive, the calendar portal is guarded against server rendering, and the
  `exports` map lists `types` first so TypeScript resolves the declarations
  under `moduleResolution: "bundler"` and `"node16"`. The component can now be
  imported directly from a Server Component.

### Documentation

- translated the remaining Turkish strings in the README examples to English.

## 1.0.0 (2026-05-30)

Initial release.
