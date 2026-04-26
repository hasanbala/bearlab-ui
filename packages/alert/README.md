# @bearlab/alert

> Accessible, fully customizable Alert component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/alert)](https://www.npmjs.com/package/@bearlab/alert)
[![license](https://img.shields.io/npm/l/@bearlab/alert)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Variants](#variants)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **4 semantic variants** — `success`, `error`, `warning`, `info`
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `role="alert"`, `aria-live`, `aria-labelledby`, `aria-describedby` via `useId()`
- ✅ **Optional action link** — configurable `href`, `text`, and per-slot styling
- ✅ **Dark mode** — built-in `[data-theme="dark"]` token overrides
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/alert

# yarn
yarn add @bearlab/alert

# pnpm
pnpm add @bearlab/alert
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Basic Usage

```tsx
import { Alert } from "@bearlab/alert";

export default function App() {
  return (
    <Alert
      variant="success"
      title="Action completed"
      message="Your changes have been saved successfully."
    />
  );
}
```

### All Variants

```tsx
<Alert variant="success" title="Success"  message="Record saved." />
<Alert variant="error"   title="Error"    message="Something went wrong." />
<Alert variant="warning" title="Warning"  message="This action is irreversible." />
<Alert variant="info"    title="Info"     message="Your session expires in 5 minutes." />
```

### With Action Link

```tsx
<Alert
  variant="error"
  title="Connection Lost"
  message="Unable to connect to the server. Please check your internet connection."
  showLink
  linkHref="/help/connection-issues"
  linkText="Troubleshoot"
/>
```

---

## Props

| Prop        | Type                                          | Default        | Required | Description                                        |
| ----------- | --------------------------------------------- | -------------- | -------- | -------------------------------------------------- |
| `variant`   | `"success" \| "error" \| "warning" \| "info"` | —              | ✅       | Visual and semantic variant of the alert           |
| `title`     | `string`                                      | —              | ✅       | Bold heading text rendered inside the alert        |
| `message`   | `string`                                      | —              | ✅       | Descriptive body text of the alert                 |
| `showLink`  | `boolean`                                     | `false`        | ❌       | Whether to render an action link below the message |
| `linkHref`  | `string`                                      | `"/"`          | ❌       | `href` value for the action link                   |
| `linkText`  | `string`                                      | `"Learn more"` | ❌       | Visible text for the action link                   |
| `className` | [`AlertClassNames`](#alertclassnames)         | —              | ❌       | Per-slot className overrides                       |
| `style`     | [`AlertStyles`](#alertstyles)                 | —              | ❌       | Per-slot inline style overrides                    |

---

## Variants

| Variant   | Background | Border    | `aria-live` | Use case                                   |
| --------- | ---------- | --------- | ----------- | ------------------------------------------ |
| `success` | `#ecfdf3`  | `#12b76a` | `polite`    | Confirmation messages, successful actions  |
| `error`   | `#fef3f2`  | `#f04438` | `assertive` | Critical failures, validation errors       |
| `warning` | `#fffaeb`  | `#f79009` | `polite`    | Non-blocking warnings, deprecation notices |
| `info`    | `#f0f9ff`  | `#0ba5ec` | `polite`    | Informational messages, hints, tips        |

> **Note:** The `error` variant uses `aria-live="assertive"` to immediately interrupt the user. All other variants use `"polite"` to wait for the user's idle state.

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. Each slot targets a specific DOM element, giving you surgical control over the rendering tree.

### `AlertClassNames`

| Slot          | Element                       | Description                              |
| ------------- | ----------------------------- | ---------------------------------------- |
| `root`        | `<div>` (outermost container) | Receives variant background/border color |
| `content`     | `<div>` (inner flex wrapper)  | Flex row holding icon + text block       |
| `iconWrapper` | `<div>` (icon container)      | Sized wrapper for the variant icon       |
| `title`       | `<h4>` (alert heading)        | Bold title text                          |
| `description` | `<p>` (alert message)         | Body text below the title                |
| `link`        | `<a>` (optional action link)  | Rendered only when `showLink` is `true`  |

```tsx
<Alert
  variant="info"
  title="Heads up"
  message="There is scheduled maintenance tonight."
  className={{
    root: "my-alert-root",
    title: "my-alert-title",
    link: "my-alert-link",
  }}
/>
```

### `AlertStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Alert
  variant="warning"
  title="Caution"
  message="You are about to delete this record."
  style={{
    root: { borderRadius: "8px" },
    title: { fontSize: "1rem", fontWeight: 700 },
    description: { color: "#374151" },
  }}
/>
```

---

## Theme Management

The `Alert` component natively responds to the **`[data-theme="dark"]`** attribute applied to any ancestor element (including `<html>` or `<body>`). In dark mode all background, border, and text tokens switch to their lower-opacity counterparts automatically.

```html
<!-- Enable dark mode globally -->
<html data-theme="dark">
  ...
</html>
```

No additional configuration required.

---

## Design Tokens (Customization)

The component exposes CSS custom properties using a `--bearlab-alert-*` namespace. All tokens are scoped to the `.container` class, so they only affect alert components.

Override tokens in your global stylesheet:

```css
/* Light mode overrides */
:root,
[data-theme="light"] {
  /* Layout */
  --bearlab-alert-radius: 0.75rem; /* border radius (default: 12px) */
  --bearlab-alert-padding: 1rem; /* container padding (default: 16px) */
  --bearlab-alert-gap: 0.75rem; /* gap between icon and text (default: 12px) */
  --bearlab-alert-border-width: 1px;

  /* Icon */
  --bearlab-alert-icon-size: 1.5rem; /* 24px */

  /* Typography */
  --bearlab-alert-title-size: 0.875rem; /* 14px */
  --bearlab-alert-title-weight: 600;
  --bearlab-alert-desc-size: 0.875rem; /* 14px */
  --bearlab-alert-link-size: 0.875rem; /* 14px */
  --bearlab-alert-link-weight: 500;

  /* Colors */
  --bearlab-alert-title-color: #1d2939;
  --bearlab-alert-desc-color: #667085;
  --bearlab-alert-link-color: #667085;

  /* Variant: success */
  --bearlab-alert-bg-success: #ecfdf3;
  --bearlab-alert-border-success: #12b76a;
  --bearlab-alert-success-icon: #12b76a;

  /* Variant: error */
  --bearlab-alert-bg-error: #fef3f2;
  --bearlab-alert-border-error: #f04438;
  --bearlab-alert-error-icon: #f04438;

  /* Variant: warning */
  --bearlab-alert-bg-warning: #fffaeb;
  --bearlab-alert-border-warning: #f79009;
  --bearlab-alert-warning-icon: #f79009;

  /* Variant: info */
  --bearlab-alert-bg-info: #f0f9ff;
  --bearlab-alert-border-info: #0ba5ec;
  --bearlab-alert-info-icon: #0ba5ec;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --bearlab-alert-title-color: rgba(255, 255, 255, 0.9);
  --bearlab-alert-desc-color: #a4aab7;
  --bearlab-alert-link-color: #a4aab7;

  --bearlab-alert-bg-success: rgba(18, 183, 106, 0.15);
  --bearlab-alert-border-success: rgba(18, 183, 106, 0.3);

  --bearlab-alert-bg-error: rgba(240, 68, 56, 0.15);
  --bearlab-alert-border-error: rgba(240, 68, 56, 0.3);

  --bearlab-alert-bg-warning: rgba(247, 144, 9, 0.15);
  --bearlab-alert-border-warning: rgba(247, 144, 9, 0.3);

  --bearlab-alert-bg-info: rgba(11, 165, 236, 0.15);
  --bearlab-alert-border-info: rgba(11, 165, 236, 0.3);
}
```

---

## Accessibility

This component adheres to **WCAG 2.1 AA** standards:

- **`role="alert"`** — Marks the container as a live region, ensuring it is announced immediately by screen readers when rendered or updated.
- **`aria-live`** — Set to `"assertive"` for `error` variant (interrupts the user) and `"polite"` for all other variants (waits for idle).
- **`aria-labelledby`** — Semantically links the alert container to its `<h4>` title using a stable, collision-free ID generated by React's `useId()`.
- **`aria-describedby`** — Semantically links the alert container to its `<p>` description using a second `useId()` value.
- **`aria-hidden="true"`** — Applied to the decorative icon wrapper to prevent redundant screen reader announcements.

---

## TypeScript

All types are exported from the package root:

```ts
import type { AlertProps, AlertClassNames, AlertStyles } from "@bearlab/alert";
```

### `AlertVariant`

```ts
type AlertVariant = "success" | "error" | "warning" | "info";
```

### `AlertProps`

```ts
interface AlertProps {
  variant: AlertVariant;
  title: string;
  message: string;
  showLink?: boolean;
  linkHref?: string;
  linkText?: string;
  className?: AlertClassNames;
  style?: AlertStyles;
}
```

### `AlertClassNames`

```ts
interface AlertClassNames {
  root?: string;
  content?: string;
  iconWrapper?: string;
  title?: string;
  description?: string;
  link?: string;
}
```

### `AlertStyles`

```ts
interface AlertStyles {
  root?: React.CSSProperties;
  content?: React.CSSProperties;
  iconWrapper?: React.CSSProperties;
  title?: React.CSSProperties;
  description?: React.CSSProperties;
  link?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)

For more UI components, check out the [@bearlab/bearlab-ui](https://github.com/hasanbala/bearlab-ui) repository.
