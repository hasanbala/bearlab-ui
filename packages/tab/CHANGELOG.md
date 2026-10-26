# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.0.0

### Features

- Styles now ship as a separate, pre-built `dist/styles.css` (exported as `@bearlab/tab/styles.css`) instead of being injected into `<head>` at runtime. The CSS is part of the server-rendered HTML, which removes the flash of unstyled content in Next.js and other SSR setups and drops the need for `style-src 'unsafe-inline'`.
- `package.json` declares `"sideEffects": ["**/*.css"]`, so bundlers can tree-shake the JavaScript safely.
- `title` and `content` accept any `ReactNode`.
- `TabItem` and `TabActionType` are now exported.
- `notify` and `icon` are optional on `TabItem`; `icon` accepts any `React.ElementType`.

### Bug Fixes

- Tab and panel IDs are generated with `useId`, so several `Tab` instances on one page no longer produce duplicate IDs.

### BREAKING CHANGES

- Import the stylesheet once in your app, e.g. in `app/layout.tsx`:
  `import "@bearlab/tab/styles.css";`
  Without it the component renders unstyled.
- The panel body is now rendered inside `<div>` (class `text`) instead of `<p>`, so block-level content is valid HTML. Custom CSS that targeted the panel's `p` element must be updated.

## 1.2.4

### Features

- **Next.js support** — the published bundle now carries the `"use client"`
  directive, and the `exports` map lists `types` first so TypeScript resolves
  the declarations under `moduleResolution: "bundler"` and `"node16"`. The
  component can now be imported directly from a Server Component.

## [1.2.3](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/tab@1.2.2...@bearlab/tab@1.2.3) (2026-05-30)


### Bug Fixes

* update package styles and configurations ([1768438](https://github.com/hasanbala/bearlab-ui/commit/176843847db82cd3db85c1346a67aed614c7ae70))





## [1.2.2](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/tab@1.2.1...@bearlab/tab@1.2.2) (2026-05-25)

**Note:** Version bump only for package @bearlab/tab





## [1.2.1](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/tab@1.2.0...@bearlab/tab@1.2.1) (2026-05-24)

**Note:** Version bump only for package @bearlab/tab





# [1.2.0](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/tab@1.0.5...@bearlab/tab@1.2.0) (2026-04-26)


### Bug Fixes

* **build:** correct tsconfig paths and rootDir for proper dts emission ([a24221e](https://github.com/hasanbala/bearlab-ui/commit/a24221e16041b061b80c8afe4192c22a34044dea))


### Features

* comprehensive component updates and documentation standardization ([eb82d6e](https://github.com/hasanbala/bearlab-ui/commit/eb82d6ef8a938f8bfebd0036e0106e0d2c6e3d70))
* major refactor and improvements across all ui components ([892975c](https://github.com/hasanbala/bearlab-ui/commit/892975c0858d56672ebab4204dbf27de3953a075))





## [1.0.5](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/tab@1.0.4...@bearlab/tab@1.0.5) (2025-11-23)

**Note:** Version bump only for package @bearlab/tab





## [1.0.4](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/tab@1.0.3...@bearlab/tab@1.0.4) (2025-09-17)

**Note:** Version bump only for package @bearlab/tab





## [1.0.3](https://github.com/hasanbala/ui-components/compare/@bearlab/tab@1.0.2...@bearlab/tab@1.0.3) (2025-09-16)

**Note:** Version bump only for package @bearlab/tab





## [1.0.2](https://github.com/hasanbala/ui-components/compare/@bearlab/tab@1.0.1...@bearlab/tab@1.0.2) (2025-09-15)

**Note:** Version bump only for package @bearlab/tab





## 1.0.1 (2025-09-12)

**Note:** Version bump only for package @bearlab/tab





## 1.0.1 (2025-09-12)

**Note:** Version bump only for package @bearlab/tab
