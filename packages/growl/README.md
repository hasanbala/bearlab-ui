# @bearlab/growl

> Accessible, fully customizable Growl (Toast notification) component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/growl)](https://www.npmjs.com/package/@bearlab/growl)
[![license](https://img.shields.io/npm/l/@bearlab/growl)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [GrowlOptions](#growloptions)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Four semantic types** — `success`, `error`, `warning`, `info`
- ✅ **Three themes** — `light`, `dark`, `colored`
- ✅ **Five animations** — `default`, `slide`, `flip`, `zoom`, `bounce`
- ✅ **Six positions** — `top-right`, `top-left`, `top-center`, `bottom-right`, `bottom-left`, `bottom-center`
- ✅ **Auto-close with pause on hover** — optional progress bar countdown
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `role="alert"` and ARIA attributes
- ✅ **Dark mode** — native `[data-theme="dark"]` support
- ✅ **TypeScript-first** — fully typed props and slot interfaces

---

## Installation

```bash
# npm
npm install @bearlab/growl

# yarn
yarn add @bearlab/growl

# pnpm
pnpm add @bearlab/growl
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Step 1 — Mount `<GrowlContainer />`

Place `<GrowlContainer />` once at the root of your application (outside any scrollable content). It renders all toast portals and requires no props.

```tsx
// app.tsx (or your root layout)
import { GrowlContainer } from "@bearlab/growl";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <GrowlContainer />
    </>
  );
}
```

### Step 2 — Trigger notifications via `growl`

Import the `growl` function anywhere in your application and call it imperatively. It does **not** need to be inside a React component.

```tsx
import { growl } from "@bearlab/growl";

// Shorthand methods
growl.success("Changes saved successfully!");
growl.error("Something went wrong. Please try again.");
growl.warning("Your session is about to expire.");
growl.info("A new version is available.");

// Full signature: growl(type, message, options?)
growl("info", "This is an info message", {
  title: "Heads up",
  autoClose: 4000,
  position: "top-left",
  theme: "dark",
  animation: "bounce",
  pauseOnHover: true,
});
```

### With slot-based customization

```tsx
growl.success("Profile updated!", {
  theme: "colored",
  animation: "slide",
  className: {
    notification: "my-toast",
    body: "my-toast-body",
  },
  style: {
    notification: { borderRadius: "1rem" },
    body: { fontWeight: 600 },
  },
});
```

---

## API Reference

The `growl` export is a callable function with typed shorthand methods:

```ts
growl(type, message, options?)   // generic call
growl.success(message, options?) // shorthand
growl.error(message, options?)
growl.warning(message, options?)
growl.info(message, options?)
```

### `GrowlOptions`

| Option         | Type                                                   | Default       | Required | Description                                               |
| -------------- | ------------------------------------------------------ | ------------- | -------- | --------------------------------------------------------- |
| `title`        | `string`                                               | type label    | ❌       | Bold title text (defaults to `"Successful"`, `"Error"` …) |
| `autoClose`    | `number`                                               | `5000`        | ❌       | Auto-dismiss delay in milliseconds; `0` disables timer    |
| `pauseOnHover` | `boolean`                                              | `true`        | ❌       | Pause auto-close countdown while the cursor is over it    |
| `theme`        | `"light" \| "dark" \| "colored"`                       | `"light"`     | ❌       | Visual theme of the notification                          |
| `position`     | `GrowlPosition`                                        | `"top-right"` | ❌       | Screen position for the notification                      |
| `animation`    | `"default" \| "slide" \| "flip" \| "zoom" \| "bounce"` | `"default"`   | ❌       | Enter/exit animation                                      |
| `className`    | `GrowlClassNames`                                      | —             | ❌       | Per-slot className overrides                              |
| `style`        | `GrowlStyles`                                          | —             | ❌       | Per-slot inline style overrides                           |

**Available positions (`GrowlPosition`):**

| Value             | Description                |
| ----------------- | -------------------------- |
| `"top-right"`     | Top-right corner (default) |
| `"top-left"`      | Top-left corner            |
| `"top-center"`    | Top center                 |
| `"bottom-right"`  | Bottom-right corner        |
| `"bottom-left"`   | Bottom-left corner         |
| `"bottom-center"` | Bottom center              |

**Default titles per type:**

| Type      | Default title  |
| --------- | -------------- |
| `success` | `"Successful"` |
| `error`   | `"Error"`      |
| `warning` | `"Warning"`    |
| `info`    | `"Info"`       |

---

## Slot-based Customization

Each toast notification supports three customization slots targeting specific DOM elements.

### `GrowlClassNames`

| Slot           | Targets                                   |
| -------------- | ----------------------------------------- |
| `notification` | Outer wrapper `<div>` of the toast item   |
| `body`         | Inner `<div>` containing title & message  |
| `progress`     | Countdown progress bar `<div>` (absolute) |

```tsx
growl.info("Update available", {
  className: {
    notification: "my-growl-notification",
    body: "my-growl-body",
    progress: "my-growl-progress",
  },
});
```

### `GrowlStyles`

All slots also accept inline `React.CSSProperties` via the `style` option:

```tsx
growl.error("Connection lost", {
  style: {
    notification: { borderRadius: "0.75rem" },
    body: { fontWeight: 500 },
    progress: { height: "0.25rem" },
  },
});
```

---

## Theme Management

The `Growl` container responds to the **`[data-theme="dark"]`** attribute on a parent element, automatically switching dark-mode token values. Additionally, each notification has its own `theme` option (`"light"`, `"dark"`, or `"colored"`) that is applied per-toast independently of the document theme.

```html
<!-- Document-level dark mode affects token defaults -->
<html data-theme="dark">
  …
</html>
```

```tsx
// Per-toast theme override
growl.success("Done!", { theme: "colored" });
```

---

## Design Tokens (Customization)

The component exposes scoped CSS custom properties on the container. Override them in your stylesheet to customize the appearance globally without modifying component internals.

```css
/* Apply to your app's root or a wrapper element */
:root {
  /* Container layout */
  --bearlab-growl-container-max-width: 25rem;
  --bearlab-growl-container-gap: 0.625rem;
  --bearlab-growl-container-offset: 1.25rem;

  /* Toast item */
  --bearlab-growl-item-border-radius: 0.5rem;
  --bearlab-growl-item-border-width: 0.25rem;
  --bearlab-growl-item-gap: 0.75rem;
  --bearlab-growl-item-padding-block: 0.875rem;
  --bearlab-growl-item-padding-inline: 1rem;

  /* Typography */
  --bearlab-growl-title-font-size: 0.875rem;
  --bearlab-growl-title-font-weight: 600;
  --bearlab-growl-message-font-size: 0.8125rem;

  /* Type-specific colors (light theme) */
  --bearlab-growl-bg-success: #f0fdf6;
  --bearlab-growl-border-color-success: #12b76a;
  --bearlab-growl-text-color-success: #039855;
  --bearlab-growl-bg-error: #fff1f0;
  --bearlab-growl-border-color-error: #f04438;

  /* Colored theme backgrounds */
  --bearlab-growl-colored-bg-success: #12b76a;
  --bearlab-growl-colored-bg-error: #f04438;
  --bearlab-growl-colored-bg-warning: #fd853a;
  --bearlab-growl-colored-bg-info: #465fff;

  /* Progress bar */
  --bearlab-growl-progress-height: 0.1875rem;
}
```

> **Tip:** Tokens are scoped to the growl container class, so they will not leak into other parts of your application.

---

## Accessibility

- **`role="alert"`** — Applied to every toast notification element, ensuring screen readers immediately announce new messages.
- **Keyboard interaction** — The close button (`✕`) is a clickable `<div>` with pointer cursor; keyboard-only users can navigate to it via `Tab` and dismiss with `Enter`.
- **`aria-hidden="true"` on icons** — Decorative type icons are hidden from the accessibility tree to avoid redundant announcements since the message content conveys the same information.
- **Auto-dismiss pause** — `pauseOnHover` ensures users who need more time to read are not interrupted mid-interaction.

---

## TypeScript

All public types are exported from the package root:

```ts
import type {
  GrowlClassNames,
  GrowlStyles,
  GrowlInterface,
} from "@bearlab/growl";
```

### `GrowlInterface`

```ts
interface GrowlInterface {
  (type: GrowlType, message: string, options?: GrowlOptions): void;
  info: (message: string, options?: GrowlOptions) => void;
  error: (message: string, options?: GrowlOptions) => void;
  success: (message: string, options?: GrowlOptions) => void;
  warning: (message: string, options?: GrowlOptions) => void;
}
```

### `GrowlOptions`

```ts
interface GrowlOptions {
  title?: string;
  autoClose?: number;
  pauseOnHover?: boolean;
  theme?: GrowlTheme;
  position?: GrowlPosition;
  animation?: GrowlAnimation;
  className?: GrowlClassNames;
  style?: GrowlStyles;
}
```

### `GrowlClassNames`

```ts
interface GrowlClassNames {
  body?: string;
  progress?: string;
  notification?: string;
}
```

### `GrowlStyles`

```ts
interface GrowlStyles {
  body?: React.CSSProperties;
  progress?: React.CSSProperties;
  notification?: React.CSSProperties;
}
```

### Union types

```ts
type GrowlType = "info" | "warning" | "success" | "error";
type GrowlTheme = "light" | "dark" | "colored";
type GrowlAnimation = "default" | "slide" | "flip" | "zoom" | "bounce";
type GrowlPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
