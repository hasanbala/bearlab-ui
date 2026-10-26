# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 3.0.0

### Features

- Styles now ship as a separate, pre-built `dist/styles.css` (exported as `@bearlab/table/styles.css`) instead of being injected into `<head>` at runtime. The CSS is part of the server-rendered HTML, which removes the flash of unstyled content in Next.js and other SSR setups and drops the need for `style-src 'unsafe-inline'`.
- The stylesheet `@import`s the styles of the Bearlab packages it depends on (`@bearlab/button`, `@bearlab/checkbox`, `@bearlab/loading`, `@bearlab/radio`, `@bearlab/skeleton`), so importing this package's CSS is enough.
- Icons are now rendered with [`lucide-react`](https://lucide.dev) instead of inline SVGs, which cuts the JavaScript bundle size substantially.
- `package.json` declares `"sideEffects": ["**/*.css"]`, so bundlers can tree-shake the JavaScript safely.

### Dependencies

- `@bearlab/button` → `^3.0.0`
- `@bearlab/checkbox` → `^2.0.0`
- `@bearlab/loading` → `^2.0.0`
- `@bearlab/radio` → `^2.0.0`
- `@bearlab/skeleton` → `^2.0.0`

### BREAKING CHANGES

- Import the stylesheet once in your app, e.g. in `app/layout.tsx`:
  `import "@bearlab/table/styles.css";`
  Without it the component renders unstyled.
- Built-in icons were replaced by their closest Lucide equivalents, so they look slightly different (stroke-based instead of filled).

## 2.0.0

### Features

- **server-side column sorting** — new `sortable` column option plus
  `sortState` / `defaultSortState` / `onSortChange` props. Clicking a sortable
  header cycles `asc → desc → none` and emits the active sort for API-driven
  sorting.
- **server-side column filtering** — new `filterable` / `filterPlaceholder`
  column options plus `filterState` / `defaultFilterState` / `onFilterChange`
  props. Each filterable header renders an accessible search popover (Apply /
  Reset) that emits the active filter map for API-driven filtering.
- new slot classes/styles: `headerCellInner`, `sortButton`, `sortIcon`,
  `filterTrigger`, `filterIcon`, `filterPopover`, `filterInput`,
  `filterActions`.
- exported additional types: `TableColumn`, `SortState`, `SortDirection`,
  `FilterState`, `RowSelection`, `TablePagination`.
- `loadingType` / `loadingIcon` props, forwarded to `@bearlab/loading`.
- **Next.js support** — the published bundle now carries the `"use client"`
  directive, so the component can be imported directly from a Server Component.

### BREAKING CHANGES

- removed the legacy `sortDirection` and `sorter` column fields. `sorter` was
  never invoked (it did not reorder `dataSource`) and `sortDirection` only
  produced a static `aria-sort` on non-sortable headers. Replace both with
  `sortable: true` plus an `onSortChange` handler that re-fetches the sorted
  rows.
- requires `@bearlab/button` v2 and `@bearlab/loading` v1.3 — see their
  changelogs for the `iconType` and `type` prop changes.

> Sorting and filtering are server-side only — the component never reorders or
> filters `dataSource`; it surfaces state through callbacks.

## [1.2.4](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/table@1.2.3...@bearlab/table@1.2.4) (2026-05-30)


### Bug Fixes

* update package styles and configurations ([1768438](https://github.com/hasanbala/bearlab-ui/commit/176843847db82cd3db85c1346a67aed614c7ae70))





## [1.2.3](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/table@1.2.2...@bearlab/table@1.2.3) (2026-05-25)

**Note:** Version bump only for package @bearlab/table





## [1.2.2](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/table@1.2.1...@bearlab/table@1.2.2) (2026-05-24)

**Note:** Version bump only for package @bearlab/table





## [1.2.1](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/table@1.2.0...@bearlab/table@1.2.1) (2026-04-27)

**Note:** Version bump only for package @bearlab/table





# [1.2.0](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/table@1.0.10...@bearlab/table@1.2.0) (2026-04-26)


### Bug Fixes

* **build:** correct tsconfig paths and rootDir for proper dts emission ([a24221e](https://github.com/hasanbala/bearlab-ui/commit/a24221e16041b061b80c8afe4192c22a34044dea))


### Features

* comprehensive component updates and documentation standardization ([eb82d6e](https://github.com/hasanbala/bearlab-ui/commit/eb82d6ef8a938f8bfebd0036e0106e0d2c6e3d70))
* major refactor and improvements across all ui components ([892975c](https://github.com/hasanbala/bearlab-ui/commit/892975c0858d56672ebab4204dbf27de3953a075))





## [1.0.10](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/table@1.0.9...@bearlab/table@1.0.10) (2025-11-23)

**Note:** Version bump only for package @bearlab/table





## [1.0.9](https://github.com/hasanbala/bearlab-ui/compare/@bearlab/table@1.0.5...@bearlab/table@1.0.9) (2025-09-17)

**Note:** Version bump only for package @bearlab/table





## [1.0.5](https://github.com/hasanbala/ui-components/compare/@bearlab/table@1.0.2...@bearlab/table@1.0.5) (2025-09-16)

**Note:** Version bump only for package @bearlab/table





## [1.0.2](https://github.com/hasanbala/ui-components/compare/@bearlab/table@1.0.1...@bearlab/table@1.0.2) (2025-09-15)

**Note:** Version bump only for package @bearlab/table





## [1.0.1](https://github.com/hasanbala/ui-components/compare/@bearlab/table@1.0.6...@bearlab/table@1.0.1) (2025-09-12)

**Note:** Version bump only for package @bearlab/table





## [1.0.1](https://github.com/hasanbala/ui-components/compare/@bearlab/table@1.0.6...@bearlab/table@1.0.1) (2025-09-12)

**Note:** Version bump only for package @bearlab/table





## 1.0.6 (2025-09-10)

**Note:** Version bump only for package @bearlab/table
