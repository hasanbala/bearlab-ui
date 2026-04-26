# @bearlab/tag-input

> Accessible, fully customizable Tag Input component for React applications — supports domain, email, and custom tag formats.

[![npm version](https://img.shields.io/npm/v/@bearlab/tag-input)](https://www.npmjs.com/package/@bearlab/tag-input)
[![license](https://img.shields.io/npm/l/@bearlab/tag-input)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Tag Formats](#tag-formats)
- [Keyboard Interactions](#keyboard-interactions)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **3 built-in formats** — `domain`, `email`, and `custom` validation modes
- ✅ **Tag validation feedback** — visual `valid` / `invalid` states with distinct colors per tag
- ✅ **Paste support** — bulk entry via clipboard; multiple values parsed automatically
- ✅ **Max-items cap** — enforced limit with live `X / N` counter and accessible announcements
- ✅ **Duplicate detection** — configurable via `allowDuplicates` prop
- ✅ **Custom validation** — inject any `validate(value) => boolean` function for custom formats
- ✅ **Error & helper text** — `error` prop accepts `boolean` or a string message
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity battles
- ✅ **Dark mode ready** — responds to `[data-theme="dark"]` automatically
- ✅ **Accessible by default** — `role="combobox"`, `role="group"`, `aria-live`, `aria-invalid`, `aria-required`
- ✅ **TypeScript-first** — fully typed props, slot interfaces, and hook return types

---

## Installation

```bash
# npm
npm install @bearlab/tag-input

# yarn
yarn add @bearlab/tag-input

# pnpm
pnpm add @bearlab/tag-input
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Basic — Email Tags

```tsx
import { useState } from "react";
import { TagInput } from "@bearlab/tag-input";
import type { TagItem } from "@bearlab/tag-input";

export default function App() {
  const [tags, setTags] = useState<TagItem[]>([]);
  const [inputValue, setInputValue] = useState("");

  return (
    <TagInput
      format="email"
      label="Email addresses"
      value={tags}
      inputValue={inputValue}
      onChange={setTags}
      onInputChange={setInputValue}
    />
  );
}
```

### With Validation & Max Items

```tsx
<TagInput
  format="email"
  label="Invite team members"
  placeholder="Add email…"
  value={tags}
  inputValue={inputValue}
  onChange={setTags}
  onInputChange={setInputValue}
  maxItems={5}
  isRequired
  helperText="Press Enter or Tab to add."
  error={hasError ? "Please enter a valid email address" : false}
/>
```

### Custom Format with Custom Validator

```tsx
<TagInput
  format="custom"
  formatLabel="username"
  label="Allowed usernames"
  value={tags}
  inputValue={inputValue}
  onChange={setTags}
  onInputChange={setInputValue}
  validate={(val) => /^[a-z0-9_]{3,20}$/.test(val)}
  onError={(val) => console.warn("Invalid:", val)}
/>
```

---

## Props

| Prop              | Type                                        | Default | Required | Description                                                 |
| ----------------- | ------------------------------------------- | ------- | -------- | ----------------------------------------------------------- |
| `format`          | `"domain" \| "email" \| "custom"`           | —       | ✅       | Validation mode                                             |
| `value`           | `TagItem[]`                                 | —       | ✅       | Controlled list of tag items                                |
| `inputValue`      | `string`                                    | —       | ✅       | Controlled value of the text input                          |
| `onChange`        | `(items: TagItem[]) => void`                | —       | ✅       | Fires when the tag list changes (add or remove)             |
| `onInputChange`   | `(value: string) => void`                   | —       | ✅       | Fires on every keystroke inside the text input              |
| `label`           | `string`                                    | —       | ❌       | Visible label rendered above the input field                |
| `placeholder`     | `string`                                    | auto    | ❌       | Input placeholder; auto-generated from `format` if omitted  |
| `helperText`      | `string`                                    | —       | ❌       | Descriptive helper text rendered below the field            |
| `error`           | `boolean \| string`                         | `false` | ❌       | Error state; pass a `string` to display a specific message  |
| `disabled`        | `boolean`                                   | `false` | ❌       | Disables all interactions (input and remove buttons)        |
| `isRequired`      | `boolean`                                   | `false` | ❌       | Marks the field as required (`aria-required`)               |
| `maxItems`        | `number`                                    | —       | ❌       | Maximum allowed tags; shows a live `X / N` counter when set |
| `allowDuplicates` | `boolean`                                   | `false` | ❌       | When `true`, duplicate values are permitted                 |
| `formatLabel`     | `string`                                    | —       | ❌       | Custom noun used in placeholders when `format="custom"`     |
| `validate`        | `(value: string) => boolean`                | —       | ❌       | Custom validation function; required when `format="custom"` |
| `onAdd`           | `(item: TagItem) => void`                   | —       | ❌       | Fires after a tag is successfully committed                 |
| `onRemove`        | `(item: TagItem) => void`                   | —       | ❌       | Fires after a tag is removed                                |
| `onError`         | `(value: string) => void`                   | —       | ❌       | Fires when a committed value fails validation               |
| `className`       | [`TagInputClassNames`](#taginputclassnames) | —       | ❌       | Per-slot className overrides                                |
| `style`           | [`TagInputStyles`](#taginputstyles)         | —       | ❌       | Per-slot inline style overrides                             |

---

## Tag Formats

| Format   | Built-in validation                    | Default placeholder  |
| -------- | -------------------------------------- | -------------------- |
| `email`  | RFC-compliant email address            | `Add email address…` |
| `domain` | Valid domain name (e.g. `example.com`) | `Add domain…`        |
| `custom` | Requires a `validate` function         | `Add item…`          |

Each committed tag receives a `status` of `"valid"` or `"invalid"` and is rendered with distinct colors. Invalid tags are still added to the list so users can review and remove them.

```tsx
<TagInput format="domain" label="Allowed domains" ... />
<TagInput format="email"  label="Recipient list"  ... />
<TagInput
  format="custom"
  formatLabel="hashtag"
  validate={(v) => /^#\w+$/.test(v)}
  ...
/>
```

---

## Keyboard Interactions

| Key         | Behavior                                                  |
| ----------- | --------------------------------------------------------- |
| `Enter`     | Commits the current input value as a new tag              |
| `Tab`       | Commits the current input value, then moves focus forward |
| `Backspace` | When input is empty, removes the last tag                 |
| `Paste`     | Parses clipboard text and bulk-adds multiple tags at once |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues.

### `TagInputClassNames`

| Slot           | Targets                                                   |
| -------------- | --------------------------------------------------------- |
| `root`         | Outermost container `<div>`                               |
| `label`        | Visible `<label>` element                                 |
| `list`         | Tag list + input field wrapper `<div role="group">`       |
| `input`        | The text `<input>` element                                |
| `tag`          | Individual tag chip `<span>`                              |
| `tagValid`     | Modifier applied to valid tag chips                       |
| `tagInvalid`   | Modifier applied to invalid tag chips                     |
| `tagLabel`     | Text label `<span>` inside each tag chip                  |
| `tagRemove`    | Remove `<button>` inside each tag chip                    |
| `helperText`   | Helper / error text `<div>`                               |
| `errorMessage` | Error message wrapper `<div>` (shown when `error` is set) |

```tsx
<TagInput
  format="email"
  label="Emails"
  value={tags}
  inputValue={inputValue}
  onChange={setTags}
  onInputChange={setInputValue}
  className={{
    root: "my-taginput-root",
    list: "my-taginput-list",
    tagValid: "my-valid-tag",
    tagInvalid: "my-invalid-tag",
  }}
/>
```

### `TagInputStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<TagInput
  format="email"
  label="Emails"
  value={tags}
  inputValue={inputValue}
  onChange={setTags}
  onInputChange={setInputValue}
  style={{
    root: { maxWidth: "480px" },
    list: { padding: "0.5rem" },
    tag: { borderRadius: "0.5rem" },
    input: { fontSize: "0.875rem" },
  }}
/>
```

---

## Theme Management

The `TagInput` component automatically adapts when a `data-theme="dark"` attribute is present on any ancestor element — no extra configuration is required.

```html
<html data-theme="dark">
  ...
</html>
```

---

## Design Tokens (Customization)

All visual defaults are scoped CSS custom properties on the component's root container. Override them with `--bearlab-tag-input-*` variables.

```css
/* Light theme overrides */
:root,
[data-theme="light"] {
  --bearlab-tag-input-field-border-color: #e4e7ec;
  --bearlab-tag-input-field-bg: #ffffff;
  --bearlab-tag-input-accent-color: #465fff;
  --bearlab-tag-input-tag-valid-bg: #d7ffea;
  --bearlab-tag-input-tag-valid-color: #039855;
  --bearlab-tag-input-tag-invalid-bg: #fee2e2;
  --bearlab-tag-input-tag-invalid-color: #dc2626;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-tag-input-field-border-color: #1d2939;
  --bearlab-tag-input-field-bg: #0f1828;
  --bearlab-tag-input-input-color: rgba(255, 255, 255, 0.9);
}
```

**Key spacing & color tokens:**

| Token                                     | Default    | Description                       |
| ----------------------------------------- | ---------- | --------------------------------- |
| `--bearlab-tag-input-field-min-height`    | `2.75rem`  | Minimum height of the input field |
| `--bearlab-tag-input-field-border-width`  | `0.125rem` | Field border width                |
| `--bearlab-tag-input-field-border-radius` | `0.5rem`   | Field border radius               |
| `--bearlab-tag-input-field-border-color`  | `#e4e7ec`  | Default field border color        |
| `--bearlab-tag-input-field-bg`            | `#ffffff`  | Field background color            |
| `--bearlab-tag-input-accent-color`        | `#465fff`  | Focus ring and caret color        |
| `--bearlab-tag-input-tag-border-radius`   | `0.5rem`   | Tag chip border radius            |
| `--bearlab-tag-input-tag-font-size`       | `0.875rem` | Tag chip font size                |
| `--bearlab-tag-input-tag-height`          | `1.75rem`  | Tag chip height                   |
| `--bearlab-tag-input-tag-valid-bg`        | `#d7ffea`  | Valid tag background              |
| `--bearlab-tag-input-tag-valid-color`     | `#039855`  | Valid tag text color              |
| `--bearlab-tag-input-tag-invalid-bg`      | `#fee2e2`  | Invalid tag background            |
| `--bearlab-tag-input-tag-invalid-color`   | `#dc2626`  | Invalid tag text color            |
| `--bearlab-tag-input-label-font-size`     | `0.875rem` | Label font size                   |
| `--bearlab-tag-input-label-font-weight`   | `600`      | Label font weight                 |
| `--bearlab-tag-input-helper-font-size`    | `0.75rem`  | Helper / error text font size     |
| `--bearlab-tag-input-helper-color`        | `#667085`  | Helper text color                 |
| `--bearlab-tag-input-required-color`      | `#f04438`  | Required asterisk color           |

---

## Accessibility

The `TagInput` component adheres to **WCAG 2.1 AA** standards:

- **`role="combobox"` on `<input>`** — correctly identifies the field as an interactive combobox widget.
- **`role="group"` + `aria-labelledby`** — wraps tags and input in a semantic group linked to the visible `<label>` via a stable auto-generated ID (`useId()`).
- **`role="list"` + `role="listitem"`** — tags are rendered inside a `<ul>/<li>` structure so screen readers can count and navigate them.
- **`aria-invalid`** — applied to both the group wrapper and the `<input>` when `error` is truthy.
- **`aria-required`** — applied to the `<input>` when `isRequired` is set.
- **`aria-describedby`** — links the input to the helper / error text element.
- **`aria-live="polite"` on helper text and counter** — non-critical updates are announced without interrupting the user.
- **`role="status"` + `aria-live="assertive"` + `aria-atomic="true"`** — a visually hidden live region announces tag additions and removals (e.g. _"example.com added"_, _"example.com removed"_).
- **`aria-label` on remove buttons** — each `<button>` announces `"Remove <value>"` to screen readers.
- **`aria-hidden="true"` on decorative icons** — the error triangle SVG is excluded from the accessibility tree.
- **Disabled state** — when `disabled` is `true`, the container gets `opacity: 0.6` and `pointer-events: none`; the `<input>` and remove buttons receive `disabled` and `aria-disabled` attributes.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  TagInputProps,
  TagInputClassNames,
  TagInputStyles,
} from "@bearlab/tag-input";
```

### `TagFormat` & `TagStatus`

```ts
type TagFormat = "domain" | "email" | "custom";
type TagStatus = "valid" | "invalid";
```

### `TagItem`

```ts
interface TagItem {
  id: string; // Auto-generated unique identifier
  value: string; // The tag string value
  status: TagStatus;
}
```

### `TagInputClassNames`

```ts
interface TagInputClassNames {
  root?: string;
  label?: string;
  list?: string;
  input?: string;
  tag?: string;
  tagValid?: string;
  tagInvalid?: string;
  tagLabel?: string;
  tagRemove?: string;
  helperText?: string;
  errorMessage?: string;
}
```

### `TagInputStyles`

```ts
interface TagInputStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  list?: React.CSSProperties;
  input?: React.CSSProperties;
  tag?: React.CSSProperties;
  tagValid?: React.CSSProperties;
  tagInvalid?: React.CSSProperties;
  tagLabel?: React.CSSProperties;
  tagRemove?: React.CSSProperties;
  helperText?: React.CSSProperties;
  errorMessage?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
