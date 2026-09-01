# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
