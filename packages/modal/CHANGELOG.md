# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.1.6

### Bug Fixes

- `<Modal>` no longer reads `#modal-root` during render. The portal target is
  resolved (and created if absent) inside an effect, which fixes two problems:
  the modal silently never opening when its host mounted before the root node
  existed, and the server/client markup mismatch that produced under SSR.
  Adding `<div id="modal-root">` by hand is now optional — supply one and it is
  reused, omit it and one is created.

### Features

- **Next.js support** — the published bundle now carries the `"use client"`
  directive, and the `exports` map lists `types` first so TypeScript resolves
  the declarations under `moduleResolution: "bundler"` and `"node16"`. The
  component can now be imported directly from a Server Component.

### BREAKING CHANGES

- requires `@bearlab/button` v2.

## [1.1.5](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/modal@1.1.4...@bearlab/modal@1.1.5) (2026-05-30)


### Bug Fixes

* update package styles and configurations ([1768438](https://github.com/hasanbala/bearlab-ui/commit/176843847db82cd3db85c1346a67aed614c7ae70))





## [1.1.4](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/modal@1.1.3...@bearlab/modal@1.1.4) (2026-05-25)

**Note:** Version bump only for package @bearlab/modal





## [1.1.3](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/modal@1.1.2...@bearlab/modal@1.1.3) (2026-05-24)

**Note:** Version bump only for package @bearlab/modal





## [1.1.2](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/modal@1.1.0...@bearlab/modal@1.1.2) (2026-04-27)


### Bug Fixes

* **modal:** add missing dependencies and prepare for release ([3ece55b](https://github.com/hasanbala/bearlab-ui/commit/3ece55b7a36057e3222ff02232ea9f6d80047bec))
* **modal:** add missing export file, updated readme.md and prepare for release ([48cbdd1](https://github.com/hasanbala/bearlab-ui/commit/48cbdd176ad32f48948d71e133d984b3290cb4fd))





# 1.1.0 (2026-04-26)


### Bug Fixes

* **build:** correct tsconfig paths and rootDir for proper dts emission ([a24221e](https://github.com/hasanbala/bearlab-ui/commit/a24221e16041b061b80c8afe4192c22a34044dea))


### Features

* comprehensive component updates and documentation standardization ([eb82d6e](https://github.com/hasanbala/bearlab-ui/commit/eb82d6ef8a938f8bfebd0036e0106e0d2c6e3d70))
* major refactor and improvements across all ui components ([892975c](https://github.com/hasanbala/bearlab-ui/commit/892975c0858d56672ebab4204dbf27de3953a075))
