# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.0.0

### Features

- `FaqV3` gains an `icon` prop for supplying your own React element.
- **Next.js support** — the published bundle now carries the `"use client"`
  directive, and the `exports` map lists `types` first so TypeScript resolves
  the declarations under `moduleResolution: "bundler"` and `"node16"`. The
  component can now be imported directly from a Server Component.

### BREAKING CHANGES

- `FaqV3`'s `iconType` is now a plain string instead of an object, matching
  `@bearlab/button` v2. `iconType={{ default: "support" }}` becomes
  `iconType="support"`, and `iconType={{ default: "none", custom: <Icon /> }}`
  becomes `icon={<Icon />}`. `iconType` is now optional and defaults to `"none"`.
- requires `@bearlab/button` v2.

## [1.2.3](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/faq@1.2.2...@bearlab/faq@1.2.3) (2026-05-30)


### Bug Fixes

* update package styles and configurations ([1768438](https://github.com/hasanbala/bearlab-ui/commit/176843847db82cd3db85c1346a67aed614c7ae70))





## [1.2.2](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/faq@1.2.1...@bearlab/faq@1.2.2) (2026-05-25)

**Note:** Version bump only for package @bearlab/faq





## [1.2.1](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/faq@1.2.0...@bearlab/faq@1.2.1) (2026-05-24)

**Note:** Version bump only for package @bearlab/faq





# [1.2.0](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/faq@1.0.2...@bearlab/faq@1.2.0) (2026-04-26)


### Bug Fixes

* **build:** correct tsconfig paths and rootDir for proper dts emission ([a24221e](https://github.com/hasanbala/bearlab-ui/commit/a24221e16041b061b80c8afe4192c22a34044dea))


### Features

* comprehensive component updates and documentation standardization ([eb82d6e](https://github.com/hasanbala/bearlab-ui/commit/eb82d6ef8a938f8bfebd0036e0106e0d2c6e3d70))
* major refactor and improvements across all ui components ([892975c](https://github.com/hasanbala/bearlab-ui/commit/892975c0858d56672ebab4204dbf27de3953a075))





## [1.0.2](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/faq@1.0.1...@bearlab/faq@1.0.2) (2025-11-23)

**Note:** Version bump only for package @bearlab/faq





## [1.0.1](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/faq@1.0.9...@bearlab/faq@1.0.1) (2025-09-17)

**Note:** Version bump only for package @bearlab/faq





## 1.0.9 (2025-09-16)

**Note:** Version bump only for package @bearlab/faq
