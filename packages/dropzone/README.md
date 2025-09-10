# @bearlab/dropzone

A modern React dropzone component for file uploads with drag & drop functionality, file management, and loading states. Perfect for document uploads, image galleries, and form integrations.

## ✨ Features

- 🖱️ **Drag & Drop** - Intuitive file dropping with visual feedback
- 📁 **File Management** - View, remove, and manage uploaded files
- 🎯 **File Type Filtering** - Accept specific file types with validation
- 📷 **Multiple Files** - Support for single or multiple file uploads
- ⏳ **Loading States** - Built-in loading state handling
- 🎨 **Theme Support** - Light/dark theme compatibility
- 📱 **Responsive Design** - Works seamlessly across different devices
- 🎭 **Visual Feedback** - Hover effects and drag state indicators
- ⚡ **TypeScript** - Full TypeScript support with type definitions
- 🔒 **Secure** - Client-side file handling with proper validation

## 📦 Installation

```bash
npm install @bearlab/dropzone
```

```bash
yarn add @bearlab/dropzone
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/button` - For file removal buttons
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `classnames` - For conditional CSS class handling

## 🎯 Usage Examples

### Basic File Upload

```tsx
import { Dropzone } from "@bearlab/dropzone";
import { useState } from "react";

function FileUploader() {
  const [files, setFiles] = useState<FileList | null>(null);

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
function DocumentUploader() {
  const [documents, setDocuments] = useState<FileList | null>(null);
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

### Image Gallery Upload

```tsx
function ImageGallery() {
  const [images, setImages] = useState<FileList | null>(null);

  const handleImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Handle image preview
      console.log("Image preview:", e.target?.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dropzone
      files={images}
      setFiles={setImages}
      accept="image/jpeg,image/png,image/gif,image/webp"
      multiple={true}
      className="image-dropzone"
    />
  );
}
```

### Single File Upload

```tsx
function ProfilePictureUpload() {
  const [avatar, setAvatar] = useState<FileList | null>(null);

  return (
    <div className="profile-upload">
      <h3>Upload Profile Picture</h3>
      <Dropzone
        files={avatar}
        setFiles={setAvatar}
        accept="image/jpeg,image/png"
        multiple={false}
      />
    </div>
  );
}
```

## 📚 API Reference

### Props

| Prop        | Type                                | Default             | Description                                 |
| ----------- | ----------------------------------- | ------------------- | ------------------------------------------- |
| `files`     | `FileList \| null`                  | **Required**        | Currently selected files                    |
| `setFiles`  | `(files: FileList \| null) => void` | **Required**        | Function to update selected files           |
| `accept`    | `string`                            | `"application/pdf"` | Accepted file types (MIME types)            |
| `multiple`  | `boolean`                           | `false`             | Allow multiple file selection               |
| `isLoading` | `boolean`                           | `false`             | Show loading state and disable interactions |
| `className` | `string`                            | `undefined`         | Additional CSS class names                  |

### File Type Examples

```tsx
// Images only
accept = "image/*";

// Specific image types
accept = "image/jpeg,image/png,image/gif";

// Documents
accept = "application/pdf";

// Text files
accept = "text/plain,text/csv";

// Multiple types
accept = "image/*,application/pdf,.docx";

// All files
accept = "*";
```

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## Styling

### CSS Variables

```css
.custom-dropzone {
  --dropzone-border-radius: 12px;
  --dropzone-padding: 48px;
  --dropzone-border-color: #e0e0e0;
  --dropzone-hover-border-color: #007bff;
  --dropzone-background: #f8f9fa;
  --dropzone-icon-size: 80px;
}
```

### Custom Styling

```scss
.my-custom-dropzone {
  // Dropzone area
  .content {
    border: 2px dashed #ccc;
    border-radius: 16px;
    background: linear-gradient(145deg, #f9f9f9, #ededed);
    transition: all 0.3s ease;

    &:hover {
      border-color: #007bff;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    &.dragging {
      border-color: #28a745;
      background: linear-gradient(145deg, #f0f8f0, #e6f4e6);
      transform: scale(1.02);
    }
  }

  // Icon styling
  .icon {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    svg {
      color: white;
    }
  }

  // File list styling
  .card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    .addedItem {
      padding: 12px 16px;
      border-bottom: 1px solid #f0f0f0;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #f8f9fa;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

// Loading state animation
.custom-dropzone .disabled {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
    );
    animation: loading-shimmer 1.5s infinite;
  }
}

@keyframes loading-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
```

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support for file selection
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **High Contrast**: Supports high contrast mode
- **Alternative Input**: Click to browse fallback for drag & drop

### ARIA Attributes

The component includes proper ARIA labeling:

- `aria-label` for file input
- `role="button"` for clickable areas
- `aria-describedby` for instructions

## 🛜 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ iOS Safari
- ✅ Android Chrome

## 🤝 Contributing

To contribute to the project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 License and 👨‍💻 Author

MIT © [hasanbala](https://github.com/hasanbala)

**Hasan Bala** - [@hasanbala](https://github.com/hasanbala)

For more UI components, check out the [@bearlab/ui-components](https://github.com/hasanbala/ui-components) repository.

Feel free to open an [issue](https://github.com/hasanbala/ui-components/issues) for questions or feedback! ⭐

---

<div align="center">
  <p>Made with ❤️ by the Bearlab team</p>
  <p>
    <a href="https://github.com/hasanbala/ui-components">⭐ Star us on GitHub</a> •
    <a href="https://www.npmjs.com/package/@bearlab/dropzone">📦 View on NPM</a>
  </p>
</div>
