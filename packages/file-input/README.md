# @bearlab/file-input

> Accessible, fully customizable File Input component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/file-input)](https://www.npmjs.com/package/@bearlab/file-input)
[![license](https://img.shields.io/npm/l/@bearlab/file-input)](LICENSE)
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

- ✅ **Fully Accessible** — WCAG 2.1 AA compliant with proper ARIA attributes
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Validation ready** — built-in error state and helper text with live announcement
- ✅ **Form integration** — supports `name`, `accept`, `multiple`, `capture`, `inputRef`
- ✅ **Dark mode** — native `[data-theme="dark"]` support
- ✅ **Auto-generated IDs** — uses `useId()` when no `id` prop is provided

---

## Installation

```bash
# npm
npm install @bearlab/file-input

# yarn
yarn add @bearlab/file-input

# pnpm
pnpm add @bearlab/file-input
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Basic usage

```tsx
import { FileInput } from "@bearlab/file-input";

export default function App() {
  return (
    <FileInput
      label="Upload Document"
      helperText="Accepted formats: JPG, PNG, PDF"
      accept=".jpg,.png,.pdf"
      onChange={(e) => console.log(e.target.files)}
    />
  );
}
```

### With error state

```tsx
import { FileInput } from "@bearlab/file-input";

export default function App() {
  return (
    <FileInput
      label="Profile Photo"
      isRequired
      error="Please select a valid image file."
    />
  );
}
```

### Multiple file selection

```tsx
import { useState } from "react";
import { FileInput } from "@bearlab/file-input";

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  return (
    <div>
      <FileInput
        label="Upload Multiple Documents"
        multiple
        onChange={(e) => setSelectedFiles(e.target.files)}
      />
      {selectedFiles && (
        <ul>
          {Array.from(selectedFiles).map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### With inputRef (uncontrolled / form libraries)

```tsx
import { useRef } from "react";
import { FileInput } from "@bearlab/file-input";

export default function App() {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <FileInput
      label="Attachment"
      inputRef={fileRef}
      onChange={(e) => console.log(e.target.files)}
    />
  );
}
```

---

## Props

| Prop         | Type                                                   | Default | Required | Description                                                      |
| ------------ | ------------------------------------------------------ | ------- | -------- | ---------------------------------------------------------------- |
| `label`      | `string`                                               | —       | ❌       | Label text displayed above the input                             |
| `error`      | `boolean \| string`                                    | —       | ❌       | Activates error state; string value is displayed as error text   |
| `helperText` | `string`                                               | —       | ❌       | Helper text shown below the input (hidden when error is active)  |
| `isRequired` | `boolean`                                              | `false` | ❌       | Shows a required asterisk (`*`) next to the label                |
| `id`         | `string`                                               | —       | ❌       | HTML `id` for the input; auto-generated via `useId()` if omitted |
| `name`       | `string`                                               | —       | ❌       | Form field name                                                  |
| `accept`     | `string`                                               | —       | ❌       | Accepted file types (e.g. `".png,.jpg"` or `"image/*"`)          |
| `multiple`   | `boolean`                                              | `false` | ❌       | Allow multiple file selection                                    |
| `disabled`   | `boolean`                                              | `false` | ❌       | Disables the input                                               |
| `capture`    | `boolean \| "user" \| "environment"`                   | —       | ❌       | Camera capture mode for mobile devices                           |
| `inputRef`   | `React.Ref<HTMLInputElement>`                          | —       | ❌       | Ref forwarded to the underlying `<input>` element                |
| `className`  | [`FileInputClassNames`](#fileinputclassnames)          | —       | ❌       | Per-slot className overrides                                     |
| `style`      | [`FileInputStyles`](#fileinputstyles)                  | —       | ❌       | Per-slot inline style overrides                                  |
| `onChange`   | `(event: React.ChangeEvent<HTMLInputElement>) => void` | —       | ❌       | Callback fired when file selection changes                       |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. Each slot maps directly to a DOM element in the component tree.

### `FileInputClassNames`

| Slot           | Targets                                                      |
| -------------- | ------------------------------------------------------------ |
| `root`         | Outermost container `<div>`                                  |
| `label`        | Label `<label>` element                                      |
| `input`        | File `<input type="file">` element                           |
| `helperText`   | Helper text `<p>` (rendered only when no error is active)    |
| `errorMessage` | Error message container `<div>` (rendered when error is set) |

```tsx
<FileInput
  label="Avatar"
  className={{
    root: "my-file-input-root",
    label: "my-file-input-label",
    input: "my-file-input-control",
    errorMessage: "my-file-input-error",
    helperText: "my-file-input-helper",
  }}
/>
```

### `FileInputStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<FileInput
  label="Upload Image"
  style={{
    root: { marginBottom: "1rem" },
    label: { fontWeight: 700 },
    input: { borderRadius: "0.75rem" },
  }}
/>
```

---

## Theme Management

The `FileInput` component is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="dark"]`** applied at the document or a parent element level. No configuration is needed — CSS token values switch automatically.

```html
<!-- Enable dark mode globally -->
<html data-theme="dark">
  …
</html>

<!-- Or scope to a section -->
<div data-theme="dark">
  <FileInput label="Upload" />
</div>
```

---

## Design Tokens (Customization)

The component exposes scoped CSS custom properties. Override them in your stylesheet to adjust the appearance without touching component internals.

```css
.my-wrapper {
  /* Input field */
  --bearlab-file-input-input-border-color: #d1d5db;
  --bearlab-file-input-input-border-color-focus: #465fff;
  --bearlab-file-input-input-bg: transparent;
  --bearlab-file-input-input-color: #667085;
  --bearlab-file-input-input-border-radius: 0.5rem;
  --bearlab-file-input-input-height: 2.75rem;

  /* Label */
  --bearlab-file-input-label-color: #344054;
  --bearlab-file-input-label-font-size: 0.875rem;
  --bearlab-file-input-required-color: #f04438;

  /* File selector button */
  --bearlab-file-input-button-bg: #f9fafb;
  --bearlab-file-input-button-bg-hover: #f3f4f6;
  --bearlab-file-input-button-color: #374151;
  --bearlab-file-input-button-border-color: #e5e7eb;

  /* Error state */
  --bearlab-file-input-input-border-color-error: #f00438;
  --bearlab-file-input-text-color-error: #f00438;

  /* Helper text */
  --bearlab-file-input-helper-color: #667085;
  --bearlab-file-input-helper-font-size: 0.75rem;

  /* Focus ring */
  --bearlab-file-input-input-ring-color-focus: #465fff21;
  --bearlab-file-input-ring-width-focus: 0.1875rem;
}
```

> **Tip:** Tokens are scoped to the `.container` class (not `:root`), so overrides will not leak to other parts of your application.

---

## Accessibility

- **`htmlFor` & `id`** — The `<label>` is always associated with the `<input>` via matching `htmlFor` / `id`. A unique ID is auto-generated with `useId()` when none is provided.
- **`aria-invalid`** — Set to `true` on the input when `error` is truthy.
- **`aria-required`** — Set to `true` based on the `isRequired` prop.
- **`aria-describedby`** — Dynamically constructed to include the error message ID and/or helper text ID, semantically linking the input to its contextual descriptions.
- **`role="status"` & `aria-live="polite"`** — Applied to the error message container so screen readers announce validation errors without interrupting the user.
- **`aria-hidden="true"`** — Applied to the required asterisk (`*`) and decorative error icon to prevent redundant announcements.
- **`aria-disabled`** — Set on the input element when `disabled` is true for assistive technology compatibility.

---

## TypeScript

All types are exported from the package root:

```ts
import type {
  FileInputProps,
  FileInputClassNames,
  FileInputStyles,
} from "@bearlab/file-input";
```

### `FileInputProps`

```ts
interface FileInputProps {
  id?: string;
  name?: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  helperText?: string;
  isRequired?: boolean;
  error?: boolean | string;
  capture?: boolean | "user" | "environment";
  inputRef?: React.Ref<HTMLInputElement>;
  className?: FileInputClassNames;
  style?: FileInputStyles;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
```

### `FileInputClassNames`

```ts
interface FileInputClassNames {
  root?: string;
  label?: string;
  input?: string;
  helperText?: string;
  errorMessage?: string;
}
```

### `FileInputStyles`

```ts
interface FileInputStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  input?: React.CSSProperties;
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
