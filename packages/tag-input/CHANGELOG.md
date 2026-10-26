# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.0.0

### Features

- Styles now ship as a separate, pre-built `dist/styles.css` (exported as `@bearlab/tag-input/styles.css`) instead of being injected into `<head>` at runtime. The CSS is part of the server-rendered HTML, which removes the flash of unstyled content in Next.js and other SSR setups and drops the need for `style-src 'unsafe-inline'`.
- Icons are now rendered with [`lucide-react`](https://lucide.dev) instead of inline SVGs, which cuts the JavaScript bundle size substantially.
- `package.json` declares `"sideEffects": ["**/*.css"]`, so bundlers can tree-shake the JavaScript safely.

### BREAKING CHANGES

- Import the stylesheet once in your app, e.g. in `app/layout.tsx`:
  `import "@bearlab/tag-input/styles.css";`
  Without it the component renders unstyled.
- Built-in icons were replaced by their closest Lucide equivalents, so they look slightly different (stroke-based instead of filled).

## 1.1.5

### Features

- **Next.js support** — the published bundle now carries the `"use client"`
  directive, and the `exports` map lists `types` first so TypeScript resolves
  the declarations under `moduleResolution: "bundler"` and `"node16"`. The
  component can now be imported directly from a Server Component.

## [1.1.4](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/tag-input@1.1.3...@bearlab/tag-input@1.1.4) (2026-05-30)


### Bug Fixes

* update package styles and configurations ([1768438](https://github.com/hasanbala/bearlab-ui/commit/176843847db82cd3db85c1346a67aed614c7ae70))





## [1.1.3](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/tag-input@1.1.2...@bearlab/tag-input@1.1.3) (2026-05-25)

**Note:** Version bump only for package @bearlab/tag-input





## [1.1.2](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/tag-input@1.1.1...@bearlab/tag-input@1.1.2) (2026-05-24)

**Note:** Version bump only for package @bearlab/tag-input





## [1.1.1](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/tag-input@1.1.0...@bearlab/tag-input@1.1.1) (2026-04-27)


### Features

* standardize checkbox UI, add view-code theme support and export tag-input types ([a389e9f](https://github.com/hasanbala/bearlab-ui/commit/a389e9fdc6e78f0dd288acc7b42f404a74f75d5c))





# 1.1.0 (2026-04-26)


### Bug Fixes

* **build:** correct tsconfig paths and rootDir for proper dts emission ([a24221e](https://github.com/hasanbala/bearlab-ui/commit/a24221e16041b061b80c8afe4192c22a34044dea))


### Features

* comprehensive component updates and documentation standardization ([eb82d6e](https://github.com/hasanbala/bearlab-ui/commit/eb82d6ef8a938f8bfebd0036e0106e0d2c6e3d70))
* major refactor and improvements across all ui components ([892975c](https://github.com/hasanbala/bearlab-ui/commit/892975c0858d56672ebab4204dbf27de3953a075))
