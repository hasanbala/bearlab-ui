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
- ✅ **Accessible by default** — `role="alert"`, `aria-live`, `aria-labelledby`, `aria-describedby`
- ✅ **Optional action link** — configurable href, text, and styling
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Zero layout opinion** — bring your own layout/wrapper

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

### Alert with Action Links

```tsx
import { Alert } from "@bearlab/alert";

export default function App() {
  return (
    <>
      <Alert
        variant="error"
        title="Connection Lost"
        message="Unable to connect to the server. Please check your internet connection."
        linkHref="/help/connection-issues"
        linkText="Troubleshoot"
        showLink
      />
      <Alert
        variant="warning"
        title="Password Expires Soon"
        message="Your password will expire in 7 days for security reasons."
        linkHref="/settings/password"
        linkText="Update password"
        showLink
      />
      <Alert
        variant="info"
        title="Update Available"
        message="A new version of the app is available with bug fixes and improvements."
        linkHref="/downloads"
        linkText="Download update"
        showLink
      />
    </>
  );
}
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

| Variant   | `aria-live` | Use case                                   |
| --------- | ----------- | ------------------------------------------ |
| `success` | `polite`    | Confirmation messages, successful actions  |
| `error`   | `assertive` | Critical failures, validation errors       |
| `warning` | `polite`    | Non-blocking warnings, deprecation notices |
| `info`    | `polite`    | Informational messages, hints, tips        |

```tsx
<Alert variant="success" title="Success" message="Record saved." />
<Alert variant="error"   title="Error"   message="Something went wrong." />
<Alert variant="warning" title="Warning" message="This action is irreversible." />
<Alert variant="info"    title="Info"    message="Your session expires in 5 minutes." />
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.content`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `AlertClassNames`

| Slot          | Targets                       |
| ------------- | ----------------------------- |
| `root`        | Outermost container `<div>`   |
| `content`     | Inner content wrapper `<div>` |
| `iconWrapper` | Icon wrapper `<div>`          |
| `title`       | Title `<h4>`                  |
| `description` | Message `<p>`                 |
| `link`        | Action link `<a>`             |

```tsx
<Alert
  variant="info"
  title="Heads up"
  message="There is a scheduled maintenance tonight."
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
    root: { borderRadius: "12px" },
    title: { fontSize: "1.1rem" },
  }}
/>
```

---

## Theme Management

The `Alert` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-alert-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-alert-root-border-radius: 12px;
  --bearlab-alert-content-padding: 1rem 1.5rem;
  --bearlab-alert-title-color: #1a1a1a;
  --bearlab-alert-description-color: #4a4a4a;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`role="alert"`** — Indicates a time-sensitive message, ensuring it is announced to screen readers.
- **`aria-live`** — Dynamically adjusts context. Uses `"assertive"` for critical `error` variants to immediately interrupt the user, while setting to `"polite"` for non-critical notifications.
- **`aria-labelledby` & `aria-describedby`** — Semantically links the container to its specific title and description using dynamically generated, stable IDs (`useId()`).
- **`aria-hidden="true"`** — Best-practice usage on decorative icons to prevent redundant or confusing screen reader announcements.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  AlertProps,
  AlertVariant,
  AlertClassNames,
  AlertStyles,
} from "@bearlab/alert";
```

### `AlertVariant`

```ts
type AlertVariant = "success" | "error" | "warning" | "info";
```

### `AlertClassNames`

```ts
interface AlertClassNames {
  root?: string;
  iconWrapper?: string;
  content?: string;
  title?: string;
  description?: string;
  link?: string;
}
```

### `AlertStyles`

```ts
interface AlertStyles {
  root?: React.CSSProperties;
  iconWrapper?: React.CSSProperties;
  content?: React.CSSProperties;
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
