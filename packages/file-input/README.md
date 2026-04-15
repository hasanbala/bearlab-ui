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

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Validation ready** — built-in robust error and helper text display
- ✅ **Form integration** — accepts standard input attributes

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

```tsx
import { FileInput } from "@bearlab/file-input";

export default function App() {
  return (
    <FileInput
      label="Upload Document"
      helperText="Accepted formats: JPG, PNG, PDF"
      onChange={(e) => console.log(e.target.files)}
    />
  );
}
```

## Multiple File Selection

```tsx
import { FileInput } from "@bearlab/file-input";

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  return (
    <div>
      <FileInput
        label="Upload Multiple Documents"
        multiple
        onChange={handleFileChange}
      />

      {selectedFiles && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {Array.from(selectedFiles).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

## Props

| Prop         | Type                                                   | Default | Required | Description                                |
| ------------ | ------------------------------------------------------ | ------- | -------- | ------------------------------------------ |
| `label`      | `string`                                               | —       | ❌       | Label text displayed above the input       |
| `error`      | `boolean \| string`                                    | —       | ❌       | Error message to display format            |
| `helperText` | `string`                                               | —       | ❌       | Helper text displayed below the input      |
| `isRequired` | `boolean`                                              | `false` | ❌       | Shows required asterisk (\*) next to label |
| `id`         | `string`                                               | —       | ❌       | Element ID                                 |
| `name`       | `string`                                               | —       | ❌       | Form field name                            |
| `accept`     | `string`                                               | —       | ❌       | File types to accept                       |
| `multiple`   | `boolean`                                              | `false` | ❌       | Allow multiple file selection              |
| `disabled`   | `boolean`                                              | `false` | ❌       | Disable the input                          |
| `capture`    | `boolean \| "user" \| "environment"`                   | —       | ❌       | Camera capture mode                        |
| `className`  | [`FileInputClassNames`](#fileinputclassnames)          | —       | ❌       | Per-slot className overrides               |
| `style`      | [`FileInputStyles`](#fileinputstyles)                  | —       | ❌       | Per-slot inline style overrides            |
| `onChange`   | `(event: React.ChangeEvent<HTMLInputElement>) => void` | —       | ❌       | Callback fired when file selection changes |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.input`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `FileInputClassNames`

| Slot         | Targets                     |
| ------------ | --------------------------- |
| `root`       | Outermost container `<div>` |
| `label`      | Label `<label>`             |
| `input`      | File input `<input>`        |
| `errorText`  | Error message `<p>`         |
| `helperText` | Helper text `<p>`           |

```tsx
<FileInput
  label="Avatar"
  className={{
    root: "my-file-input-root",
    input: "my-file-input-control",
    label: "my-file-input-label",
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
    input: { padding: "10px" },
  }}
/>
```

---

## Theme Management

The `FileInput` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-file-input-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-file-input-border-color: #e5e7eb;
  --bearlab-file-input-focus-color: #3b82f6;
  --bearlab-file-input-error-color: #ef4444;
  --bearlab-file-input-background: transparent;
  --bearlab-file-input-text-color: #374151;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`htmlFor` & `id`** — properly associates the `<label>` with the `<input>` element. Generates a unique `id` via `useId()` if one is not provided.
- **`aria-invalid`** — Dynamically set to `true` when there's an error.
- **`aria-required`** — Dynamically set based on the `isRequired` prop.
- **`aria-describedby`** — Semantically links the input to its corresponding error or helper text using dynamic IDs.
- **`role="alert"` & `aria-live="polite"`** — Used on the error message container to ensure screen readers announce validation errors appropriately.
- **`aria-hidden="true"`** — Best-practice usage on decorative elements like the required asterisk and icons to prevent redundant screen reader announcements.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  FileInputProps,
  FileInputClassNames,
  FileInputStyles,
} from "@bearlab/file-input";
```

### `FileInputClassNames`

```ts
interface FileInputClassNames {
  root?: string;
  label?: string;
  input?: string;
  errorText?: string;
  helperText?: string;
}
```

### `FileInputStyles`

```ts
interface FileInputStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
  input?: React.CSSProperties;
  errorText?: React.CSSProperties;
  helperText?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
