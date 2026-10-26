# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.0.0

### Features

- Styles now ship as a separate, pre-built `dist/styles.css` (exported as `@bearlab/navigation-menu/styles.css`) instead of being injected into `<head>` at runtime. The CSS is part of the server-rendered HTML, which removes the flash of unstyled content in Next.js and other SSR setups and drops the need for `style-src 'unsafe-inline'`.
- Icons are now rendered with [`lucide-react`](https://lucide.dev) instead of inline SVGs, which cuts the JavaScript bundle size substantially.
- `package.json` declares `"sideEffects": ["**/*.css"]`, so bundlers can tree-shake the JavaScript safely.

### BREAKING CHANGES

- Import the stylesheet once in your app, e.g. in `app/layout.tsx`:
  `import "@bearlab/navigation-menu/styles.css";`
  Without it the component renders unstyled.
- Built-in icons were replaced by their closest Lucide equivalents, so they look slightly different (stroke-based instead of filled).

## 1.0.0

### Features

- initial release of `@bearlab/navigation-menu`.
- config-driven `<NavigationMenu items={[...]} />` API with simple link items
  and trigger items that open rich content panels (grouped links with icons and
  descriptions, or fully custom content).
- Radix-style hover intent (`delayDuration` / `skipDelayDuration`), horizontal
  and vertical orientations, and an animated active-item indicator
  (`showIndicator`).
- collision-aware content panels that flip and shift to stay inside the viewport,
  exposing the resolved side as `data-side` on the panel.
- controlled (`value` / `onValueChange`) and uncontrolled usage.
- `renderLink` escape hatch for router integration (Next.js, React Router).
- full keyboard navigation (arrows, `Home`/`End`, `Enter`/`Space`, `Escape`),
  ARIA roles, focus management, dark-mode support, and a slot-based
  `className` / `style` API.
