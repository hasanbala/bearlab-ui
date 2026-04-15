# @bearlab/growl

> Accessible, fully customizable Growl (Toast) component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/growl)](https://www.npmjs.com/package/@bearlab/growl)
[![license](https://img.shields.io/npm/l/@bearlab/growl)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Multiple semantic types** — `info`, `warning`, `success`, `error`
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — semantic usage and ARIA attributes
- ✅ **Flexible positioning** — 6 distinct screen positions
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

```tsx
// app.tsx
import { GrowlContainer } from "@bearlab/growl";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      {children}
      <GrowlContainer />
    </RootLayout>
  );
}

import { growl } from "@bearlab/growl"; // assuming 'growl' or specific interface is exported

export default function Home() {
  return (
    <>
      <button onClick={() => growl.success("Operation successful!")}>
        Show Growl
      </button>
      <button
        onClick={() =>
          growl("info", "This is an info message", {
            title: "Info",
            autoClose: 1000,
            position: "top-left",
            theme: "dark",
            animation: "bounce",
          })
        }
      >
        Show Info Growl
      </button>
    </>
  );
}
```

---

## Props

The API exposes the `growl` object with methods corresponding to `GrowlType`, or via an interface. Options can be passed configuring each notification.

### `GrowlOptions`

| Option         | Type                                  | Default       | Required | Description                      |
| -------------- | ------------------------------------- | ------------- | -------- | -------------------------------- |
| `title`        | `string`                              | —             | ❌       | Bold title text                  |
| `autoClose`    | `number`                              | `5000`        | ❌       | Auto close delay in milliseconds |
| `pauseOnHover` | `boolean`                             | `true`        | ❌       | Pause timer when hovered         |
| `theme`        | `"light" \| "dark" \| "colored"`      | `"light"`     | ❌       | Visual theme of the notification |
| `position`     | `GrowlPosition`                       | `"top-right"` | ❌       | Position on the screen           |
| `animation`    | `"flip" \| "zoom" \| "slide" \| ...`  | `"default"`   | ❌       | Enter and exit animation         |
| `className`    | [`GrowlClassNames`](#growlclassnames) | —             | ❌       | Per-slot className overrides     |
| `style`        | [`GrowlStyles`](#growlstyles)         | —             | ❌       | Per-slot inline style overrides  |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the main wrapper utilizing `className?.notification` or style the inner body directly using `style?.body`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `GrowlClassNames`

| Slot           | Targets                             |
| -------------- | ----------------------------------- |
| `notification` | Outer container of the toast item   |
| `body`         | Inner container for title & message |
| `progress`     | Countdown progress bar element      |

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

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
growl.error("Connection lost", {
  style: {
    notification: { borderRadius: "8px" },
    body: { fontWeight: 500 },
  },
});
```

---

## Theme Management

The `Growl` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-growl-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-growl-notification-bg: #ffffff;
  --bearlab-growl-notification-border-radius: 8px;
  --bearlab-growl-body-color: #333333;
  --bearlab-growl-progress-bg: #007bff;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`role="alert"`** or **`role="status"`** — Ensures screen readers properly announce incoming notifications based on their severity.
- **`aria-live`** — Dynamically adjusts context. Critical `error` variations use `"assertive"` to interrupt and notify immediately, while non-critical messages leverage `"polite"`.
- **Keyboard navigation** — Supports focus management and dismiss interactions effortlessly.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  GrowlItem,
  GrowlOptions,
  GrowlClassNames,
  GrowlStyles,
  GrowlPosition,
  GrowlType,
} from "@bearlab/growl";
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

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
