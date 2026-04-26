# @bearlab/dropzone

> Accessible, customizable drag-and-drop file upload component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/dropzone)](https://www.npmjs.com/package/@bearlab/dropzone)
[![license](https://img.shields.io/npm/l/@bearlab/dropzone)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Behavior](#behavior)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Drag & Drop** — intuitive file dropping with visual `data-dragging` state feedback
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **File list management** — built-in display and per-file removal via `DropzoneList`
- ✅ **File type filtering** — `accept` follows the standard HTML attribute format (MIME types, wildcards, extensions)
- ✅ **Loading state** — `isLoading` disables interactions, sets `aria-busy` and `aria-disabled`
- ✅ **Keyboard navigation** — `Enter` / `Space` opens the native file picker
- ✅ **Accessible by default** — `role="region"`, `role="button"`, `aria-label`, `aria-busy`, `aria-disabled`
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Theme ready** — light/dark mode via `[data-theme]`

---

## Installation

```bash
npm install @bearlab/dropzone
# yarn add @bearlab/dropzone
# pnpm add @bearlab/dropzone
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

### Basic image upload

```tsx
import { useState } from "react";
import { Dropzone } from "@bearlab/dropzone";

export default function App() {
  const [files, setFiles] = useState<FileList | File[] | null>(null);

  return (
    <Dropzone files={files} setFiles={setFiles} accept="image/*" multiple />
  );
}
```

### PDF upload with loading state

```tsx
const [documents, setDocuments] = useState<FileList | File[] | null>(null);
const [isUploading, setIsUploading] = useState(false);

const handleUpload = async () => {
  if (!documents) return;
  setIsUploading(true);
  try {
    // your upload logic
  } finally {
    setIsUploading(false);
  }
};

<Dropzone
  files={documents}
  setFiles={setDocuments}
  accept="application/pdf"
  multiple
  isLoading={isUploading}
  title="Upload Contract"
  subTitle="Drag and drop a PDF or click to browse"
/>;
```

### `accept` prop examples

```tsx
// Images
<Dropzone files={files} setFiles={setFiles} accept="image/*" />

// Specific formats
<Dropzone files={files} setFiles={setFiles} accept="image/jpeg,image/png" />

// PDFs
<Dropzone files={files} setFiles={setFiles} accept="application/pdf" />

// Multiple types
<Dropzone files={files} setFiles={setFiles} accept="image/*,application/pdf,.docx" />

// All files
<Dropzone files={files} setFiles={setFiles} accept="*" />
```

---

## Props

| Prop         | Type                                        | Default                                            | Required | Description                                         |
| ------------ | ------------------------------------------- | -------------------------------------------------- | -------- | --------------------------------------------------- |
| `files`      | `FileList \| File[] \| null`                | —                                                  | ✅       | Currently selected / dropped files                  |
| `setFiles`   | `(val: FileList \| File[] \| null) => void` | —                                                  | ✅       | Setter called when files are added or removed       |
| `name`       | `string`                                    | —                                                  | ❌       | Form field name forwarded to the hidden `<input>`   |
| `accept`     | `string`                                    | `"application/pdf"`                                | ❌       | Accepted file types (standard HTML `accept` format) |
| `multiple`   | `boolean`                                   | `false`                                            | ❌       | Allow selecting / dropping multiple files           |
| `isLoading`  | `boolean`                                   | `false`                                            | ❌       | Disables all interactions and shows busy state      |
| `title`      | `string`                                    | `"Drag & Drop Files Here"`                         | ❌       | Main heading text inside the drop area              |
| `subTitle`   | `string`                                    | `"Drag and drop the file here or click to upload"` | ❌       | Instruction text below the title                    |
| `browseText` | `string`                                    | `"Browse File"`                                    | ❌       | Underlined browse action text                       |
| `aria-label` | `string`                                    | `"File upload area"`                               | ❌       | ARIA label for the `role="region"` wrapper          |
| `className`  | [`DropzoneClassNames`](#dropzoneclassnames) | —                                                  | ❌       | Per-slot className overrides                        |
| `style`      | [`DropzoneStyles`](#dropzonestyles)         | —                                                  | ❌       | Per-slot inline style overrides                     |

---

## Behavior

- **Drop** — `onDrop` receives the `DataTransfer.files` and calls `setFiles`.
- **Browse** — clicking the drop area (or pressing `Enter`/`Space`) triggers the hidden `<input type="file">`.
- **Remove** — each file in the list has a remove button; clicking it filters the file out and calls `setFiles`.
- **Loading** — when `isLoading` is `true`, `tabIndex` becomes `-1` and `data-disabled` is added; drag/drop and keyboard triggers are ignored.
- **Drag visual** — `data-dragging` attribute is applied to the content area during an active drag, enabling CSS styling via `[data-dragging]`.
- **Reset after select** — `input.value` is cleared after each selection so the same file can be re-selected.

---

## Slot-based Customization

### `DropzoneClassNames`

| Slot       | Targets                                        |
| ---------- | ---------------------------------------------- |
| `root`     | Outermost `<div role="region">` container      |
| `content`  | Interactive drop area `<div role="button">`    |
| `icon`     | Upload icon wrapper `<div aria-hidden="true">` |
| `title`    | Main title `<p>` element                       |
| `subtitle` | Subtitle description `<p>` element             |
| `browse`   | Browse text `<span aria-hidden="true">`        |
| `input`    | Hidden `<input type="file">` element           |
| `list`     | File list `<ul>` container                     |
| `item`     | Individual file item `<li>` row                |

```tsx
<Dropzone
  files={files}
  setFiles={setFiles}
  className={{
    root: "my-dropzone",
    content: "my-dropzone-area",
    title: "my-title",
  }}
/>
```

### `DropzoneStyles`

```tsx
<Dropzone
  files={files}
  setFiles={setFiles}
  style={{
    root: { margin: "20px" },
    content: { border: "2px dashed #465fff" },
    title: { fontSize: "1.5rem" },
  }}
/>
```

---

## Theme Management

The `Dropzone` component is fully compatible with light and dark mode, responding to `[data-theme="dark"]` on any ancestor element.

| Token                                     | Light default | Dark default |
| ----------------------------------------- | ------------- | ------------ |
| `--bearlab-dropzone-content-bg`           | `#f9fafb`     | `#1f2937`    |
| `--bearlab-dropzone-content-border-color` | `#9ca3af`     | `#6b7280`    |
| `--bearlab-dropzone-content-dragging-bg`  | `#d1d5db`     | `#374151`    |
| `--bearlab-dropzone-icon-bg`              | `#e5e7eb`     | `#111827`    |
| `--bearlab-dropzone-icon-color`           | `#374151`     | `#f9fafb`    |
| `--bearlab-dropzone-title-color`          | `#111827`     | `#f9fafb`    |
| `--bearlab-dropzone-subtitle-color`       | `#6b7280`     | `#93c5fd`    |
| `--bearlab-dropzone-browse-color`         | `#2563eb`     | `#60a5fa`    |

---

## Design Tokens (Customization)

All tokens follow `--bearlab-dropzone-[element]-[property]` naming and are scoped to `.container`.

```css
:root {
  /* Drop area */
  --bearlab-dropzone-content-padding: 2.5rem; /* 40px */
  --bearlab-dropzone-content-border-radius: 0.5rem; /* 8px */
  --bearlab-dropzone-content-border-color: #9ca3af;
  --bearlab-dropzone-content-border-color-hover: #465fff;
  --bearlab-dropzone-content-bg: #f9fafb;
  --bearlab-dropzone-content-dragging-bg: #d1d5db;
  --bearlab-dropzone-content-outline-color-focus: #2563eb;

  /* Icon */
  --bearlab-dropzone-icon-size: 4.375rem; /* 70px */
  --bearlab-dropzone-icon-bg: #e5e7eb;
  --bearlab-dropzone-icon-color: #374151;

  /* Title & subtitle */
  --bearlab-dropzone-title-font-size: 1.25rem; /* 20px */
  --bearlab-dropzone-title-font-weight: 600;
  --bearlab-dropzone-title-color: #111827;
  --bearlab-dropzone-subtitle-font-size: 0.875rem; /* 14px */
  --bearlab-dropzone-subtitle-color: #6b7280;

  /* Browse link */
  --bearlab-dropzone-browse-color: #2563eb;
  --bearlab-dropzone-browse-font-size: 0.875rem;

  /* File list */
  --bearlab-dropzone-list-gap: 0.625rem; /* 10px */
  --bearlab-dropzone-list-padding: 0.75rem; /* 12px */
  --bearlab-dropzone-list-border-radius: 0.5rem;
  --bearlab-dropzone-list-margin-top: 1.25rem; /* 20px */
  --bearlab-dropzone-item-name-font-size: 0.875rem;

  /* States */
  --bearlab-dropzone-opacity-disabled: 0.6;
}
```

---

## Accessibility

Built to **WCAG 2.1 AA** standards:

- **`role="region"` + `aria-label`** — the outer wrapper is a named landmark region.
- **`role="button"` + `tabIndex`** — the drop area is keyboard-focusable and activatable.
- **`aria-busy="true"`** — set when `isLoading` is `true` to indicate background processing.
- **`aria-disabled="true"`** — set when `isLoading` to block assistive technology interaction.
- **`data-dragging`** — CSS hook for visual drag feedback (not ARIA, intentionally).
- **`data-disabled`** — CSS hook on the content area when loading.
- **`Enter` / `Space`** — keyboard activation opens the native file picker via `inputRef.current.click()`.
- **`aria-hidden="true"`** — decorative icon wrapper and browse text are hidden from the accessibility tree; the hidden `<input>` has `tabIndex=-1` so it never receives focus directly.
- **File removal** — remove buttons inside `DropzoneList` should carry descriptive `aria-label` attributes (e.g. `"Remove filename.pdf"`).

---

## TypeScript

```ts
import type {
  DropzoneProps,
  DropzoneClassNames,
  DropzoneStyles,
} from "@bearlab/dropzone";
```

### `DropzoneProps`

```ts
interface DropzoneProps {
  files: FileList | File[] | null;
  setFiles: (val: FileList | File[] | null) => void;
  name?: string;
  accept?: string;
  multiple?: boolean;
  isLoading?: boolean;
  title?: string;
  subTitle?: string;
  browseText?: string;
  "aria-label"?: string;
  className?: DropzoneClassNames;
  style?: DropzoneStyles;
}
```

### `DropzoneClassNames`

```ts
interface DropzoneClassNames {
  root?: string;
  content?: string;
  icon?: string;
  title?: string;
  subtitle?: string;
  browse?: string;
  input?: string;
  list?: string;
  item?: string;
}
```

### `DropzoneStyles`

```ts
interface DropzoneStyles {
  root?: React.CSSProperties;
  content?: React.CSSProperties;
  icon?: React.CSSProperties;
  title?: React.CSSProperties;
  subtitle?: React.CSSProperties;
  browse?: React.CSSProperties;
  input?: React.CSSProperties;
  list?: React.CSSProperties;
  item?: React.CSSProperties;
}
```

> `DropzoneListProps`, `DropzoneItemProps`, `UseDropzone`, and `UseDropzoneReturn` are internal types used by compound sub-components and the `useDropzone` hook. They are not exported from the package.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
