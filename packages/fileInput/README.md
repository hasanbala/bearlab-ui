# @bearlab/file-input

A modern, accessible, and customizable file input component for React applications with TypeScript support.

## ✨ Features

- ✅ **Fully Accessible** - WCAG compliant with proper ARIA attributes
- 🎨 **Dark Mode Support** - Seamless light/dark theme switching
- 🔧 **Highly Customizable** - Custom styling with CSS modules and classNames
- 📝 **TypeScript Ready** - Full TypeScript support with proper type definitions
- ⚡ **Lightweight** - Minimal bundle size with tree-shaking support
- 🎯 **Modern Design** - Beautiful default styling with hover and focus states
- 📱 **Responsive** - Works perfectly on all screen sizes
- 🚨 **Error Handling** - Built-in error display with validation support

## 📦 Installation

```bash
npm install @bearlab/file-input
```

```bash
yarn add @bearlab/file-input
```

## 🔗 Dependencies

- `react` >= 16.8.0
- `react-dom` >= 16.8.0
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `classnames` - For conditional CSS class handling

## 🎯 Usage Examples

### Basic Usage

```tsx
import { FileInput } from "@bearlab/file-input";

function App() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected file:", files[0]);
    }
  };

  return <FileInput label="Upload Document" onChange={handleFileChange} />;
}
```

### With Validation and Error Handling

```tsx
import { FileInput } from "@bearlab/file-input";
import { useState } from "react";

function FileUploadForm() {
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    if (!allowedTypes.includes(file.type)) {
      return "Only JPEG, PNG, and PDF files are allowed";
    }

    return null;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const validationError = validateFile(file);
      setError(validationError);

      if (!validationError) {
        // Process the file
        console.log("File is valid:", file);
      }
    }
  };

  return (
    <FileInput
      label="Profile Picture"
      error={error}
      isRequired
      accept="image/*,.pdf"
      onChange={handleFileChange}
      className="my-custom-file-input"
    />
  );
}
```

### Multiple File Selection

```tsx
import { FileInput } from "@bearlab/file-input";

function MultipleFileUpload() {
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

### Custom Styling

```tsx
import { FileInput } from "@bearlab/file-input";
import "./custom-styles.css";

function CustomStyledFileInput() {
  return (
    <FileInput
      label="Custom Styled Upload"
      className="custom-file-input"
      onChange={handleFileChange}
    />
  );
}
```

```css
/* custom-styles.css */
.custom-file-input input {
  border: 2px dashed #3b82f6;
  background-color: #f8fafc;
}

.custom-file-input input:hover {
  border-color: #2563eb;
  background-color: #f1f5f9;
}
```

## 📚 API Reference

### Props

| Prop         | Type                                                   | Default     | Description                                |
| ------------ | ------------------------------------------------------ | ----------- | ------------------------------------------ |
| `label`      | `string`                                               | `undefined` | Label text displayed above the input       |
| `error`      | `any`                                                  | `undefined` | Error message to display below the input   |
| `isRequired` | `boolean`                                              | `false`     | Shows required asterisk (\*) next to label |
| `className`  | `string`                                               | `undefined` | Additional CSS class for the container     |
| `onChange`   | `(event: React.ChangeEvent<HTMLInputElement>) => void` | `undefined` | Callback fired when file selection changes |

All other props are passed through to the underlying `<input>` element, including:

- `accept` - File types to accept
- `multiple` - Allow multiple file selection
- `disabled` - Disable the input
- `name` - Form field name
- `id` - Element ID
- `required` - HTML5 required attribute

### TypeScript Support

The component is fully typed with TypeScript:

```typescript
import { FileInput, Props as FileInputProps } from "@bearlab/file-input";

const MyButton: React.FC<FileInputProps> = (props) => {
  return <FileInput {...props} />;
};
```

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## 🎨 Styling

### CSS Custom Properties

The component uses CSS modules but exposes several CSS custom properties for easy theming:

```css
.your-custom-class {
  --file-input-border-color: #e5e7eb;
  --file-input-focus-color: #3b82f6;
  --file-input-error-color: #ef4444;
  --file-input-background: transparent;
  --file-input-text-color: #374151;
}
```

### Custom CSS Classes

Override styles by targeting the component's CSS classes:

```css
.your-container .bearlab-file-input {
  /* Container styles */
}

.your-container .bearlab-file-input input {
  /* Input styles */
}

.your-container .bearlab-file-input label {
  /* Label styles */
}
```

## ♿ Accessibility

The FileInput component follows WAI-ARIA guidelines:

- Proper labeling with `<label>` elements
- Error announcements for screen readers
- Keyboard navigation support
- Focus management with visible focus indicators
- Semantic HTML structure

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
    <a href="https://www.npmjs.com/package/@bearlab/file-input">📦 View on NPM</a>
  </p>
</div>
