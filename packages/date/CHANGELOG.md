# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
