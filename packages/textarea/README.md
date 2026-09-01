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

---

## Features

- ✅ **Label & required indicator** — native `<label>` linked via `htmlFor` with accessible `*` marker
- ✅ **Error state support** — accepts `boolean | string`; string errors render an inline message with an icon
- ✅ **Character limit with live counter** — `maxCharacter` renders a `current / max` counter and hard-caps typed **and pasted** text
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

> **Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0` must be installed in your project.

> **Framework support:** Works with React 18/19 and Next.js — both the App Router
> and the Pages Router. Every component ships with the `"use client"` directive
> already applied, so you can import it straight into a Server Component without
> writing a wrapper file. All DOM access is SSR-guarded.

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

### With character limit

Passing `maxCharacter` renders a live `current / max` counter in the bottom-right
corner and caps the field at that many characters. The limit is enforced for
typing **and** for pasted text — pasting 600 characters into a `maxCharacter={500}`
field inserts only the first 500. Without the prop the textarea stays unlimited.

```tsx
<Textarea
  label="Translation"
  maxCharacter={500}
  placeholder="Type or paste your text..."
  rows={6}
/>
```

It works the same way for controlled fields — `onChange` always receives the
already-truncated value, so your state can never exceed the limit:

```tsx
const [value, setValue] = useState("");

<Textarea
  label="Bio"
  value={value}
  maxCharacter={280}
  onChange={(e) => setValue(e.target.value)}
/>;
```

> **Counting:** characters are counted in UTF-16 code units — exactly like the
> native `maxlength` attribute — so the counter can never disagree with what the
> browser allows. A `maxCharacter` that is not a finite positive number (`0`,
> a negative value, `NaN`) is ignored and the field stays unlimited.

> **Note:** `maxCharacter` takes precedence over a native `maxLength` prop.
> A `value` / `defaultValue` that is already longer than the limit is **not**
> silently truncated — it is rendered as-is and the counter switches to its
> limit color so the overflow stays visible.

---

## Props

| Prop         | Type                                        | Default | Required | Description                                                         |
| ------------ | ------------------------------------------- | ------- | -------- | ------------------------------------------------------------------- |
| `label`      | `string`                                    | —       | ❌       | Label text rendered above the textarea                              |
| `error`      | `boolean \| string`                         | —       | ❌       | Error state; a string value renders an inline error message with icon |
| `isRequired` | `boolean`                                   | `false` | ❌       | Shows required `*` marker and sets `aria-required`                  |
| `maxCharacter` | `number`                                  | —       | ❌       | Maximum number of characters; renders a `current / max` counter and blocks typed & pasted overflow. Unlimited when omitted |
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
| `characterCount`  | Character counter `<div>` (rendered only with `maxCharacter`) |

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

The counter sits in the bottom-right corner by default (opposite the error
message). Move it to the bottom-left through its slot:

```tsx
<Textarea
  label="Message"
  maxCharacter={500}
  style={{ characterCount: { right: "auto", left: 0 } }}
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
  --bearlab-textarea-count-color: #98a2b3;
  --bearlab-textarea-count-color-limit: #f00438;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-textarea-border-color: #1d2939;
  --bearlab-textarea-color: rgba(255, 255, 255, 0.9);
  --bearlab-textarea-placeholder-color: rgba(255, 255, 255, 0.3);
  --bearlab-textarea-background: #111827;
  --bearlab-textarea-label-color: #98a2b3;
  --bearlab-textarea-count-color: rgba(255, 255, 255, 0.4);
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
| `--bearlab-textarea-count-font-size`     | `0.75rem`                    | Character counter font size      |
| `--bearlab-textarea-count-bottom`        | `-1.25rem`                   | Character counter offset below the field |
| `--bearlab-textarea-count-color`         | `#98a2b3`                    | Character counter color          |
| `--bearlab-textarea-count-color-limit`   | `#f00438`                    | Character counter color once the limit is reached |
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
- **Character counter is announced, not spammed** — The visible `current / max` text is `aria-hidden`; a visually hidden sibling ("`45 of 500 characters used`") carries a stable ID that is linked through `aria-describedby`, so screen readers report the limit on focus instead of on every keystroke. A separate `role="status"` region announces once, politely, when the limit is reached.
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
  textarea?: string;
  requiredMark?: string;
  errorMessage?: string;
  characterCount?: string;
  textareaWrapper?: string;
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
  characterCount?: React.CSSProperties;
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
  maxCharacter?: number;
  style?: TextareaStyles;
  error?: boolean | string;
  className?: TextareaClassNames;
}
```

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
