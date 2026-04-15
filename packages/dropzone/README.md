# @bearlab/dropzone

> Accessible, customizable and drag-and-drop file upload component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/dropzone)](https://www.npmjs.com/package/@bearlab/dropzone)
[![license](https://img.shields.io/npm/l/@bearlab/dropzone)](LICENSE)
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

- ✅ **Drag & Drop** — Intuitive file dropping with visual feedback
- ✅ **Slot-based `className` & `style` API** — Granular styling without CSS overrides
- ✅ **File Management** — View, remove, and manage uploaded files
- ✅ **File Type Filtering** — Accept specific file types with validation
- ✅ **Accessible by default** — Keyboard navigation, `role="region"`, `aria-label`, `aria-busy`
- ✅ **TypeScript-first** — Fully typed props and slot interfaces
- ✅ **Loading States** — Built-in loading state handling
- ✅ **Zero layout opinion** — Bring your own layout/wrapper

---

## Installation

```bash
# npm
npm install @bearlab/dropzone

# yarn
yarn add @bearlab/dropzone

# pnpm
pnpm add @bearlab/dropzone
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { Dropzone } from "@bearlab/dropzone";
import { useState } from "react";

export default function App() {
  const [files, setFiles] = useState<FileList | File[] | null>(null);

  return (
    <Dropzone
      files={files}
      setFiles={setFiles}
      accept="image/*"
      multiple={true}
    />
  );
}
```

### PDF Document Upload

```tsx
export default function App() {
  const [documents, setDocuments] = useState<FileList | File[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!documents) return;

    setIsUploading(true);
    try {
      // Upload logic here
      console.log("Uploading documents:", documents);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Dropzone
        files={documents}
        setFiles={setDocuments}
        accept="application/pdf"
        multiple={true}
        isLoading={isUploading}
      />
      {documents && documents.length > 0 && (
        <button onClick={handleUpload} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Documents"}
        </button>
      )}
    </div>
  );
}
```

### File Type Examples

The `accept` prop follows the standard HTML `accept` attribute format and supports MIME types, wildcards, and file extensions:

```tsx
// Images only
<Dropzone files={files} setFiles={setFiles} accept="image/*" />

// Specific image types
<Dropzone files={files} setFiles={setFiles} accept="image/jpeg,image/png,image/gif" />

// Documents
<Dropzone files={files} setFiles={setFiles} accept="application/pdf" />

// Text files
<Dropzone files={files} setFiles={setFiles} accept="text/plain,text/csv" />

// Multiple types
<Dropzone files={files} setFiles={setFiles} accept="image/*,application/pdf,.docx" />

// All files
<Dropzone files={files} setFiles={setFiles} accept="*" />
```

---

## Props

| Prop         | Type                                        | Default                              | Required | Description                                 |
| ------------ | ------------------------------------------- | ------------------------------------ | -------- | ------------------------------------------- |
| `files`      | `FileList \| File[] \| null`                | —                                    | ✅       | Currently selected files                    |
| `setFiles`   | `(val: FileList \| File[] \| null) => void` | —                                    | ✅       | Function to update selected files           |
| `accept`     | `string`                                    | `"application/pdf"`                  | ❌       | Accepted file types (MIME types)            |
| `multiple`   | `boolean`                                   | `false`                              | ❌       | Allow multiple file selection               |
| `isLoading`  | `boolean`                                   | `false`                              | ❌       | Show loading state and disable interactions |
| `title`      | `string`                                    | `"Drag & Drop Files Here"`           | ❌       | Main title text                             |
| `subTitle`   | `string`                                    | `"Drag and drop... click to upload"` | ❌       | Subtitle instructional text                 |
| `browseText` | `string`                                    | `"Browse File"`                      | ❌       | Text for the browse action                  |
| `aria-label` | `string`                                    | `"File upload area"`                 | ❌       | ARIA label for screen readers               |
| `className`  | [`DropzoneClassNames`](#dropzoneclassnames) | —                                    | ❌       | Per-slot className overrides                |
| `style`      | [`DropzoneStyles`](#dropzonestyles)         | —                                    | ❌       | Per-slot inline style overrides             |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.content`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `DropzoneClassNames`

| Slot       | Targets                                 |
| ---------- | --------------------------------------- |
| `root`     | Outermost container `<div>`             |
| `content`  | Inner dropzone interaction area `<div>` |
| `icon`     | Upload icon wrapper `<div>`             |
| `title`    | Main title `<p>`                        |
| `subtitle` | Subtitle description `<p>`              |
| `browse`   | Browse text `<span>`                    |
| `input`    | Hidden `<input type="file">` element    |
| `list`     | File list container wrapper             |
| `item`     | Individual uploaded file item container |

```tsx
<Dropzone
  files={files}
  setFiles={setFiles}
  className={{
    root: "my-dropzone-root",
    content: "my-dropzone-content",
    title: "my-dropzone-title",
  }}
/>
```

### `DropzoneStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Dropzone
  files={files}
  setFiles={setFiles}
  style={{
    root: { margin: "20px" },
    content: { border: "2px dashed blue" },
  }}
/>
```

---

## Theme Management

The `Dropzone` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-dropzone-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-dropzone-bg: #f8f9fa;
  --bearlab-dropzone-border-color: #e0e0e0;
  --bearlab-dropzone-hover-border-color: #007bff;
  --bearlab-dropzone-border-radius: 12px;
  --bearlab-dropzone-padding: 48px;
  --bearlab-dropzone-title-color: #1a1a1a;
  --bearlab-dropzone-subtitle-color: #4a4a4a;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience for file uploads:

- **`role="region"`** — Exposes the dropzone area semantically.
- **`role="button"`** — Interactive area for browsing files with keyboard triggers capabilities.
- **`aria-label`** — Provides a clear accessible name to the main region.
- **`aria-busy="true"`** — Automatically added when `isLoading` is true to indicate background processing.
- **`aria-disabled="true"`** — Disables interactions for screen readers when loading.
- **`aria-hidden="true"`** — Best-practice usage on decorative icons, text, and the hidden `<input>` to prevent redundant screen reader announcements while ensuring focus is properly managed.
- **Keyboard Navigation** — Fully supports file selection via `tabIndex` and `Enter`/`Space` key interactions.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  DropzoneProps,
  DropzoneClassNames,
  DropzoneStyles,
} from "@bearlab/dropzone";
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

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
