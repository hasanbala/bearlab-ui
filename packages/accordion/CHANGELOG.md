# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.1.4

### Bug Fixes

- the chevron and its border now follow `--bearlab-accordion-title-color-open`
  in the open state, so the icon stays visually tied to the active title colour.
- raised the default icon border width to `0.125rem` and darkened the default
  border colour (`#000` light / `#fff` dark) for a legible contrast ratio.

### Features

- **Next.js support** — the published bundle now carries the `"use client"`
  directive, and the `exports` map lists `types` first so TypeScript resolves
  the declarations under `moduleResolution: "bundler"` and `"node16"`. The
  component can now be imported directly from a Server Component.

## [1.1.3](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/accordion@1.1.2...@bearlab/accordion@1.1.3) (2026-05-30)


### Bug Fixes

* update package styles and configurations ([1768438](https://github.com/hasanbala/bearlab-ui/commit/176843847db82cd3db85c1346a67aed614c7ae70))





## [1.1.2](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/accordion@1.1.1...@bearlab/accordion@1.1.2) (2026-05-25)

**Note:** Version bump only for package @bearlab/accordion





## [1.1.1](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/accordion@1.1.0...@bearlab/accordion@1.1.1) (2026-05-24)

**Note:** Version bump only for package @bearlab/accordion





# 1.1.0 (2026-04-26)


### Bug Fixes

* **build:** correct tsconfig paths and rootDir for proper dts emission ([a24221e](https://github.com/hasanbala/bearlab-ui/commit/a24221e16041b061b80c8afe4192c22a34044dea))


### Features

* comprehensive component updates and documentation standardization ([eb82d6e](https://github.com/hasanbala/bearlab-ui/commit/eb82d6ef8a938f8bfebd0036e0106e0d2c6e3d70))
* major refactor and improvements across all ui components ([892975c](https://github.com/hasanbala/bearlab-ui/commit/892975c0858d56672ebab4204dbf27de3953a075))
