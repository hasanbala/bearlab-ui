# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
