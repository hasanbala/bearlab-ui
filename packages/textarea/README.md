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
- ✅ **Error state support** — accepts `boolean | string`; string errors render an inline message with an icon
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity issues
- ✅ **Accessible by default** — `aria-required`, `aria-invalid`, `aria-describedby`, `role="alert"`, `aria-live="polite"`, stable IDs via `useId()`
- ✅ **Light & dark theme** — natively responds to `[data-theme="dark"]`
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

### Basic

```tsx
import { Textarea } from "@bearlab/textarea";

export default function App() {
  return (
    <Textarea label="Your message" placeholder="Write something..." rows={4} />
  );
}
```

### With error message

```tsx
<Textarea
  label="Description"
  isRequired
  error="This field is required."
  placeholder="Enter a description..."
/>
```

### Controlled

```tsx
const [value, setValue] = useState("");

<Textarea
  label="Notes"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows={6}
/>;
```

---

## Props

| Prop         | Type                                        | Default | Required | Description                                                         |
| ------------ | ------------------------------------------- | ------- | -------- | ------------------------------------------------------------------- |
| `label`      | `string`                                    | —       | ❌       | Label text rendered above the textarea                              |
| `error`      | `boolean \| string`                         | —       | ❌       | Error state; a string value renders an inline error message with icon |
| `isRequired` | `boolean`                                   | `false` | ❌       | Shows required `*` marker and sets `aria-required`                  |
| `disabled`   | `boolean`                                   | `false` | ❌       | Disables the textarea and applies disabled styling (opacity + pointer-events) |
| `id`         | `string`                                    | —       | ❌       | Custom id for the textarea; auto-generated via `useId()` if omitted |
| `className`  | [`TextareaClassNames`](#textareaclassnames) | —       | ❌       | Per-slot className overrides                                        |
| `style`      | [`TextareaStyles`](#textareastyles)         | —       | ❌       | Per-slot inline style overrides                                     |

> The component extends `React.TextareaHTMLAttributes<HTMLTextAreaElement>` (excluding `className` and `style`), so all standard textarea props such as `rows`, `maxLength`, `placeholder`, `onChange`, `onBlur`, etc. are also supported.

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

### `TextareaClassNames`

| Slot              | Targets                                   |
| ----------------- | ----------------------------------------- |
| `root`            | Outermost container `<div>`              |
| `label`           | Label element `<label>`                  |
| `requiredMark`    | Required asterisk `<span>`               |
| `textareaWrapper` | Inner wrapper `<div>` around the textarea |
| `textarea`        | Native `<textarea>` element              |
| `errorMessage`    | Error message container `<div>`          |

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
    textarea: { minHeight: "120px" },
  }}
/>
```

---

## Theme Management

The `Textarea` component features a robust theme architecture. It natively responds to the **`[data-theme="dark"]`** selector applied at any ancestor level (including `<html>`).

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

The component exposes a set of `--bearlab-textarea-*` CSS custom properties that you can override globally or within a specific scope. All tokens are scoped to the `.container` element and have sensible defaults for both light and dark modes.

```css
/* Light theme overrides */
:root,
[data-theme="light"] {
  --bearlab-textarea-border-radius: 0.5rem;
  --bearlab-textarea-border-color: #e4e7ec;
  --bearlab-textarea-border-color-focus: #465fff;
  --bearlab-textarea-color: #1f2937;
  --bearlab-textarea-placeholder-color: #98a2b3;
  --bearlab-textarea-background: transparent;
  --bearlab-textarea-label-color: #344054;
  --bearlab-textarea-label-font-weight: 600;
  --bearlab-textarea-color-error: #f00438;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-textarea-border-color: #1d2939;
  --bearlab-textarea-color: rgba(255, 255, 255, 0.9);
  --bearlab-textarea-placeholder-color: rgba(255, 255, 255, 0.3);
  --bearlab-textarea-background: #111827;
  --bearlab-textarea-label-color: #98a2b3;
}
```

### Available Tokens (representative subset)

| Token                                    | Default (light)              | Description                      |
| ---------------------------------------- | ---------------------------- | -------------------------------- |
| `--bearlab-textarea-border-radius`       | `0.5rem`                     | Textarea border radius           |
| `--bearlab-textarea-border-width`        | `0.125rem`                   | Textarea border width            |
| `--bearlab-textarea-border-color`        | `#e4e7ec`                    | Default border color             |
| `--bearlab-textarea-border-color-focus`  | `#465fff`                    | Border color on focus            |
| `--bearlab-textarea-padding-x`           | `1rem`                       | Horizontal padding               |
| `--bearlab-textarea-padding-y`           | `0.625rem`                   | Vertical padding                 |
| `--bearlab-textarea-font-size`           | `0.875rem`                   | Textarea text font size          |
| `--bearlab-textarea-color`               | `#1f2937`                    | Textarea text color              |
| `--bearlab-textarea-placeholder-color`   | `#98a2b3`                    | Placeholder text color           |
| `--bearlab-textarea-background`          | `transparent`                | Textarea background              |
| `--bearlab-textarea-label-color`         | `#344054`                    | Label text color                 |
| `--bearlab-textarea-label-font-size`     | `0.875rem`                   | Label font size                  |
| `--bearlab-textarea-label-font-weight`   | `600`                        | Label font weight                |
| `--bearlab-textarea-color-error`         | `#f00438`                    | Error text and border color      |
| `--bearlab-textarea-shadow-color-error`  | `#ffa4a4`                    | Error state ring shadow color    |
| `--bearlab-textarea-shadow-focus`        | `0 0 0 0.1875rem #465fff21`  | Focus ring shadow                |

---

## Accessibility

This component follows **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards:

- **`<label>` with `htmlFor`** — The label is programmatically linked to the textarea via a stable ID (generated via `useId()` or the custom `id` prop).
- **`aria-required`** — Set to `true` on the native `<textarea>` when `isRequired` is passed.
- **`aria-invalid`** — Set to `true` when the `error` prop is truthy, signaling an invalid field state.
- **`aria-describedby`** — When `error` is a string, the error message `<div>` receives a stable ID and is linked to the textarea, ensuring the error is announced on focus.
- **`role="alert"` & `aria-live="polite"`** — The error message container uses these attributes so assistive technologies announce the error immediately upon appearance without interrupting the user.
- **`aria-hidden="true"` on error icon** — The decorative error triangle icon is hidden from the accessibility tree.
- **`aria-hidden="true"` on required `*`** — The asterisk is decorative; `aria-required` conveys required status programmatically.

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

### `TextareaProps`

```ts
interface TextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "className" | "style"
  > {
  id?: string;
  label?: string;
  isRequired?: boolean;
  style?: TextareaStyles;
  error?: boolean | string;
  className?: TextareaClassNames;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
