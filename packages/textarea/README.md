# @bearlab/textarea

> Accessible, fully customizable Textarea component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/textarea)](https://www.npmjs.com/package/@bearlab/textarea)
[![license](https://img.shields.io/npm/l/@bearlab/textarea)](LICENSE)
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

- ✅ **Label & required indicator** — native `<label>` linked via `htmlFor` with accessible `*` marker
- ✅ **Error state support** — accepts `boolean | string`; string errors render an inline message with icon
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity issues
- ✅ **Accessible by default** — `aria-required`, `aria-invalid`, `aria-describedby`, `useId()` for stable IDs
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Extends native `<textarea>`** — all standard HTML textarea attributes are forwarded

---

## Installation

```bash
# npm
npm install @bearlab/textarea

# yarn
yarn add @bearlab/textarea

# pnpm
pnpm add @bearlab/textarea
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { Textarea } from "@bearlab/textarea";

export default function App() {
  return (
    <Textarea label="Your message" placeholder="Write something..." rows={4} />
  );
}
```

---

## Props

| Prop         | Type                                        | Default | Required | Description                                                         |
| ------------ | ------------------------------------------- | ------- | -------- | ------------------------------------------------------------------- |
| `label`      | `string`                                    | —       | ❌       | Label text rendered above the textarea                              |
| `error`      | `boolean \| string`                         | —       | ❌       | Error state; string value renders an inline error message           |
| `isRequired` | `boolean`                                   | `false` | ❌       | Shows required `*` marker and sets `aria-required`                  |
| `disabled`   | `boolean`                                   | `false` | ❌       | Disables the textarea and applies disabled styling                  |
| `id`         | `string`                                    | —       | ❌       | Custom id for the textarea; auto-generated via `useId()` if omitted |
| `className`  | [`TextareaClassNames`](#textareaclassnames) | —       | ❌       | Per-slot className overrides                                        |
| `style`      | [`TextareaStyles`](#textareastyles)         | —       | ❌       | Per-slot inline style overrides                                     |

> The component extends `React.TextareaHTMLAttributes<HTMLTextAreaElement>` (excluding `className` and `style`), so all standard textarea props such as `rows`, `maxLength`, `placeholder`, `onChange`, `onBlur`, etc. are also supported.

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container using `className?.root` or style the inner textarea element natively using `style?.textarea`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `TextareaClassNames`

| Slot              | Targets                               |
| ----------------- | ------------------------------------- |
| `root`            | Outermost container `<div>`           |
| `label`           | Label element `<label>`               |
| `requiredMark`    | Required asterisk `<span>`            |
| `textareaWrapper` | Inner wrapper `<div>` around textarea |
| `textarea`        | Native `<textarea>` element           |
| `errorMessage`    | Error message `<div>`                 |

```tsx
<Textarea
  label="Description"
  placeholder="Enter a description..."
  className={{
    root: "my-textarea-root",
    label: "my-textarea-label",
    textarea: "my-textarea-field",
    errorMessage: "my-error-message",
  }}
/>
```

### `TextareaStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Textarea
  label="Notes"
  placeholder="Add your notes here..."
  style={{
    root: { marginBottom: "1.5rem" },
    label: { fontWeight: 600 },
    textarea: { minHeight: "120px", borderRadius: "8px" },
  }}
/>
```

---

## Theme Management

The `Textarea` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

```html
<!-- Light theme (default) -->
<html data-theme="light">
  ...
</html>

<!-- Dark theme -->
<html data-theme="dark">
  ...
</html>
```

No additional configuration is required — the component's stylesheet automatically applies the correct color tokens based on the active theme selector.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-textarea-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-textarea-root-gap: 0.5rem;
  --bearlab-textarea-label-color: #1a1a1a;
  --bearlab-textarea-label-font-size: 0.875rem;
  --bearlab-textarea-textarea-border-radius: 8px;
  --bearlab-textarea-textarea-padding: 0.75rem 1rem;
  --bearlab-textarea-textarea-border-color: #d1d5db;
  --bearlab-textarea-error-color: #dc2626;
  --bearlab-textarea-error-font-size: 0.8125rem;
}

[data-theme="dark"] {
  --bearlab-textarea-label-color: #f3f4f6;
  --bearlab-textarea-textarea-border-color: #374151;
  --bearlab-textarea-error-color: #f87171;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`<label>` with `htmlFor`** — The label is programmatically linked to the textarea using a stable ID (generated via `useId()` or the custom `id` prop), ensuring screen readers announce the label when the field is focused.
- **`aria-required`** — Set to `true` on the native `<textarea>` when `isRequired` is passed, informing assistive technologies that the field is required.
- **`aria-invalid`** — Set to `true` when the `error` prop is truthy, signaling an invalid field state to screen readers.
- **`aria-describedby`** — When `error` is a string, the error message `<div>` receives a stable ID and is linked to the textarea via `aria-describedby`, ensuring the error is announced on focus or state change.
- **`role="alert"` & `aria-live="polite"`** — The error message container uses these attributes so assistive technologies announce the error immediately upon appearance without interrupting the user's flow.
- **`aria-hidden="true"`** — Applied to the decorative error icon to prevent redundant or confusing screen reader announcements.
- **`aria-hidden="true"` on required `*`** — The asterisk required marker is hidden from screen readers because the `aria-required` attribute already conveys required status programmatically.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  TextareaProps,
  TextareaClassNames,
  TextareaStyles,
} from "@bearlab/textarea";
```

### `TextareaClassNames`

```ts
interface TextareaClassNames {
  root?: string;
  label?: string;
  requiredMark?: string;
  textareaWrapper?: string;
  textarea?: string;
  errorMessage?: string;
}
```

### `TextareaStyles`

```ts
interface TextareaStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  requiredMark?: React.CSSProperties;
  textareaWrapper?: React.CSSProperties;
  textarea?: React.CSSProperties;
  errorMessage?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
