# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.0.0

### Features

- Styles now ship as a separate, pre-built `dist/styles.css` (exported as `@bearlab/outline-input/styles.css`) instead of being injected into `<head>` at runtime. The CSS is part of the server-rendered HTML, which removes the flash of unstyled content in Next.js and other SSR setups and drops the need for `style-src 'unsafe-inline'`.
- Icons are now rendered with [`lucide-react`](https://lucide.dev) instead of inline SVGs, which cuts the JavaScript bundle size substantially.
- `package.json` declares `"sideEffects": ["**/*.css"]`, so bundlers can tree-shake the JavaScript safely.

### BREAKING CHANGES

- Import the stylesheet once in your app, e.g. in `app/layout.tsx`:
  `import "@bearlab/outline-input/styles.css";`
  Without it the component renders unstyled.
- Built-in icons were replaced by their closest Lucide equivalents, so they look slightly different (stroke-based instead of filled).
- The default light-theme icon color is now `#667085` (previously `currentColor`). Override it with `--bearlab-outline-input-icon-color`.

## 1.0.0

### Features

- initial release of `@bearlab/outline-input`.
- floating-label text field: the `label` acts as a placeholder and lifts to the
  top-left of the field on focus or when a value is present.
- feature parity with `@bearlab/input`: password visibility toggle, copy button,
  search button, leading/trailing icons, and an inline error message.
- full accessibility (`aria-invalid`, `aria-required`, `aria-describedby`,
  `role="status"`, labelled control), dark-mode support via
  `[data-theme="dark"]`, and a slot-based `className` / `style` API.
