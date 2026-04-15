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
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **3 built-in formats** — `domain`, `email`, and `custom` validation modes
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS specificity battles
- ✅ **Accessible by default** — `role="combobox"`, `aria-live`, `aria-invalid`, `aria-required`, `aria-describedby`
- ✅ **Tag validation feedback** — visual `valid` / `invalid` states per tag item
- ✅ **Paste support** — bulk entry via clipboard paste with automatic parsing
- ✅ **Max-items cap** — enforced limit with live counter and accessible announcements
- ✅ **Duplicate detection** — configurable via `allowDuplicates` prop
- ✅ **Custom validation** — inject your own `validate` function for custom formats
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
import { TagInput, TagItem } from "@bearlab/tag-input";

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
  error={hasError ? "Invalid email address" : false}
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
/>
```

---

## Props

| Prop              | Type                            | Default     | Required | Description                                                        |
| ----------------- | ------------------------------- | ----------- | -------- | ------------------------------------------------------------------ |
| `format`          | `TagFormat`                     | —           | ✅       | Validation mode: `"domain"`, `"email"`, or `"custom"`              |
| `value`           | `TagItem[]`                     | —           | ✅       | Controlled list of tag items                                       |
| `inputValue`      | `string`                        | —           | ✅       | Controlled value of the text input                                 |
| `onChange`        | `(items: TagItem[]) => void`    | —           | ✅       | Fires when the tag list changes                                    |
| `onInputChange`   | `(value: string) => void`       | —           | ✅       | Fires on every keystroke inside the text input                     |
| `label`           | `string`                        | —           | ❌       | Visible label for the field                                        |
| `placeholder`     | `string`                        | auto        | ❌       | Input placeholder; auto-generated from `format` if omitted         |
| `helperText`      | `string`                        | —           | ❌       | Descriptive helper text rendered below the input                   |
| `error`           | `boolean \| string`             | —           | ❌       | Error state; pass a string to display an error message             |
| `disabled`        | `boolean`                       | `false`     | ❌       | Disables all interactions                                          |
| `isRequired`      | `boolean`                       | `false`     | ❌       | Marks the field as required (`aria-required`)                      |
| `maxItems`        | `number`                        | —           | ❌       | Maximum number of allowed tags; shows a live counter when set      |
| `allowDuplicates` | `boolean`                       | `false`     | ❌       | When `true`, duplicate values are permitted                        |
| `formatLabel`     | `string`                        | —           | ❌       | Custom label for the item type when `format="custom"`              |
| `validate`        | `(value: string) => boolean`    | —           | ❌       | Custom validation function used when `format="custom"`             |
| `onAdd`           | `(item: TagItem) => void`       | —           | ❌       | Fires when a tag is successfully added                             |
| `onRemove`        | `(item: TagItem) => void`       | —           | ❌       | Fires when a tag is removed                                        |
| `onError`         | `(value: string) => void`       | —           | ❌       | Fires when a value fails validation                                |
| `className`       | [`TagInputClassNames`](#tagInputclassnames) | — | ❌    | Per-slot className overrides                                       |
| `style`           | [`TagInputStyles`](#taginputstyles) | —      | ❌       | Per-slot inline style overrides                                    |

---

## Tag Formats

| Format     | Built-in validation                     | `formatLabel` default |
| ---------- | --------------------------------------- | --------------------- |
| `email`    | RFC-compliant email address             | `"email address"`     |
| `domain`   | Valid domain name (e.g. `example.com`)  | `"domain"`            |
| `custom`   | Requires a `validate` function          | `"item"`              |

Each submitted tag receives a `status` of `"valid"` or `"invalid"`, rendered with distinct visual states.

```tsx
<TagInput format="domain" label="Allowed domains" ... />
<TagInput format="email"  label="Recipient list"  ... />
<TagInput format="custom" formatLabel="hashtag" validate={(v) => /^#\w+$/.test(v)} ... />
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container via `className?.root` or style the inner list wrapper natively via `style?.list`. Each slot targets a specific DOM element, giving you surgical control over the component's rendering tree.

### `TagInputClassNames`

| Slot          | Targets                                      |
| ------------- | -------------------------------------------- |
| `root`        | Outermost container `<div>`                  |
| `list`        | Tag list + input field wrapper `<div>`       |
| `input`       | The text `<input>` element                   |
| `tag`         | Individual tag chip `<span>`                 |
| `tagValid`    | Valid tag chip modifier                      |
| `tagInvalid`  | Invalid tag chip modifier                    |
| `tagLabel`    | Tag label text `<span>`                      |
| `tagRemove`   | Tag remove button `<button>`                 |
| `helperText`  | Helper/error text `<div>`                    |

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
    root: { borderRadius: "12px" },
    list: { padding: "8px" },
    input: { fontSize: "0.9rem" },
    tag: { fontWeight: 600 },
  }}
/>
```

---

## Theme Management

The `TagInput` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level. No additional configuration is required — theme switching is handled automatically via CSS custom properties.

```html
<!-- Apply to <html> or any parent element -->
<html data-theme="dark">...</html>
```

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS custom properties for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-tag-input-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-tag-input-root-border-radius: 8px;
  --bearlab-tag-input-list-border-color: #d1d5db;
  --bearlab-tag-input-list-padding: 6px 10px;
  --bearlab-tag-input-tag-background: #e0f2fe;
  --bearlab-tag-input-tag-color: #0369a1;
  --bearlab-tag-input-tag-border-radius: 999px;
  --bearlab-tag-input-tag-invalid-background: #fee2e2;
  --bearlab-tag-input-tag-invalid-color: #b91c1c;
  --bearlab-tag-input-input-font-size: 0.875rem;
}

[data-theme="dark"] {
  --bearlab-tag-input-list-border-color: #374151;
  --bearlab-tag-input-tag-background: #1e3a5f;
  --bearlab-tag-input-tag-color: #93c5fd;
  --bearlab-tag-input-tag-invalid-background: #450a0a;
  --bearlab-tag-input-tag-invalid-color: #fca5a5;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience for keyboard and screen reader users:

- **`role="combobox"`** on the `<input>` — correctly identifies the field as an interactive combobox widget.
- **`role="group"` + `aria-labelledby`** — wraps the tag field and input in a semantic group linked to the visible `<label>`.
- **`role="list"` + `role="listitem"`** — tag chips are rendered as a semantic `<ul>/<li>` structure, enabling screen readers to count and navigate tags.
- **`aria-invalid`** — propagated to both the group and the `<input>` when `error` is truthy, signalling form validation failure.
- **`aria-required`** — applied to the `<input>` when `isRequired` is set, ensuring form validation tools and assistive technologies respect the required state.
- **`aria-describedby`** — links the input and group to the helper/error text element using a stable, auto-generated ID (`useId()`).
- **`aria-live="assertive"`** on the error container — immediately announces validation errors to screen reader users without delay.
- **`aria-live="polite"`** on the helper text and item counter — announces non-critical updates without interrupting the user.
- **`role="status"` + `aria-live="assertive"` + `aria-atomic="true"`** — a visually hidden live region announces tag additions and removals to assistive technologies (e.g. *"example.com added"*, *"example.com removed"*).
- **`aria-hidden="true"`** — applied to decorative icons (e.g. the error triangle) to prevent redundant announcements.
- **Keyboard interactions:**
  - **`Enter` / `Tab`** — commits the current input value as a new tag.
  - **`Backspace`** — removes the last tag when the input is empty.
  - **`Paste`** — bulk-parses clipboard content and adds multiple tags at once.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  TagInputProps,
  TagItem,
  TagFormat,
  TagStatus,
  TagInputClassNames,
  TagInputStyles,
  TagProps,
} from "@bearlab/tag-input";
```

### `TagFormat`

```ts
type TagFormat = "domain" | "email" | "custom";
```

### `TagStatus`

```ts
type TagStatus = "valid" | "invalid";
```

### `TagItem`

```ts
interface TagItem {
  id: string;
  value: string;
  status: TagStatus;
}
```

### `TagInputClassNames`

```ts
interface TagInputClassNames {
  root?: string;
  list?: string;
  input?: string;
  tag?: string;
  tagValid?: string;
  tagInvalid?: string;
  tagLabel?: string;
  tagRemove?: string;
  helperText?: string;
}
```

### `TagInputStyles`

```ts
interface TagInputStyles {
  root?: React.CSSProperties;
  list?: React.CSSProperties;
  input?: React.CSSProperties;
  tag?: React.CSSProperties;
  tagValid?: React.CSSProperties;
  tagInvalid?: React.CSSProperties;
  tagLabel?: React.CSSProperties;
  tagRemove?: React.CSSProperties;
  helperText?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
