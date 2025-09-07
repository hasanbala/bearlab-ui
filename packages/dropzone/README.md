# Dropzone Component

A modern, customizable drag-and-drop file upload component for React applications with TypeScript support.

## Features

- 🎯 **Drag & Drop Support** - Intuitive file upload via drag and drop
- 📁 **Multiple File Selection** - Support for single or multiple file uploads
- 🎨 **Customizable Styling** - Easy to customize with CSS modules
- 🔄 **Loading States** - Built-in loading state management
- 📋 **File Management** - View and remove uploaded files
- 🛡️ **Type Safety** - Full TypeScript support
- 📱 **Responsive Design** - Works on all device sizes

## Installation

```bash
npm install @bearlab/dropzone
# or
yarn add @bearlab/dropzone
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { Dropzone } from "@bearlab/dropzone";

function App() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dropzone
      files={files}
      setFiles={setFiles}
      isLoading={isLoading}
      multiple={true}
      accept="image/*"
    />
  );
}
```

## Advanced Usage

```tsx
import React, { useState } from "react";
import { Dropzone } from "@bearlab/dropzone";

function FileUploader() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async () => {
    if (!files) return;

    setIsLoading(true);

    try {
      // Your file upload logic here
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      // await uploadFiles(formData);
      console.log("Files uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dropzone
        files={files}
        setFiles={setFiles}
        isLoading={isLoading}
        multiple={true}
        accept="application/pdf,image/*"
        className="custom-dropzone"
      />

      {files && files.length > 0 && (
        <button onClick={handleFileUpload} disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload Files"}
        </button>
      )}
    </div>
  );
}
```

## Props

| Prop        | Type                                | Default             | Description                                   |
| ----------- | ----------------------------------- | ------------------- | --------------------------------------------- |
| `files`     | `FileList \| null`                  | -                   | **Required.** Current files in the dropzone   |
| `setFiles`  | `(files: FileList \| null) => void` | -                   | **Required.** Function to update files state  |
| `className` | `string`                            | -                   | Additional CSS class for styling              |
| `isLoading` | `boolean`                           | `false`             | Shows loading state and disables interactions |
| `multiple`  | `boolean`                           | `false`             | Allow multiple file selection                 |
| `accept`    | `string`                            | `"application/pdf"` | File types to accept (MIME types)             |

## Styling

The component uses CSS modules for styling. You can override styles by passing a `className` prop:

```scss
.custom-dropzone {
  border: 2px dashed #007bff;
  border-radius: 12px;

  &:hover {
    border-color: #0056b3;
    background-color: #f8f9fa;
  }
}
```

### Default CSS Classes

- `.container` - Main wrapper
- `.content` - Dropzone area
- `.dragging` - Applied when dragging files over
- `.disabled` - Applied when loading
- `.card` - File list container
- `.addedItem` - Individual file item
- `.icon` - Upload icon container
- `.description` - Text content area

## Events

The component handles the following events automatically:

- **Drag Over** - Shows visual feedback when files are dragged over
- **Drag Leave** - Removes visual feedback when drag leaves the area
- **Drop** - Processes dropped files
- **File Input Change** - Handles traditional file selection
- **File Remove** - Removes individual files from the list

## File Types

You can specify accepted file types using the `accept` prop:

```tsx
// Images only
<Dropzone accept="image/*" />

// PDFs only
<Dropzone accept="application/pdf" />

// Multiple types
<Dropzone accept="image/*,application/pdf,.docx" />

// All files
<Dropzone accept="*/*" />
```

## Loading States

The component provides built-in loading state management:

```tsx
const [isLoading, setIsLoading] = useState(false);

// During upload
setIsLoading(true);

<Dropzone
  isLoading={isLoading}
  // ... other props
/>;
```

When `isLoading` is `true`:

- Drag and drop is disabled
- File selection is disabled
- Remove buttons are disabled
- Visual loading state is shown

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatible
- Focus management

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- `react` >= 16.8.0
- `@bearlab/core` (for icons)
- `@bearlab/button` (for remove buttons)
- `classnames` (for conditional styling)

## TypeScript

Full TypeScript support with proper type definitions:

```tsx
interface DropzoneProps {
  className?: string;
  accept?: string;
  multiple?: boolean;
  isLoading?: boolean;
  files: FileList | null;
  setFiles: (files: FileList | null) => void;
}
```

## Examples

### Image Gallery Uploader

```tsx
function ImageGallery() {
  const [images, setImages] = useState<FileList | null>(null);

  return (
    <Dropzone
      files={images}
      setFiles={setImages}
      accept="image/jpeg,image/png,image/webp"
      multiple={true}
      className="image-uploader"
    />
  );
}
```

### Document Uploader

```tsx
function DocumentUploader() {
  const [documents, setDocuments] = useState<FileList | null>(null);

  return (
    <Dropzone
      files={documents}
      setFiles={setDocuments}
      accept="application/pdf,.doc,.docx,.txt"
      multiple={false}
    />
  );
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, please open an issue on GitHub or contact our team.
