# FileInput Component

A clean, accessible file input component for React applications with built-in error handling and validation support.

## Features

- 📁 **Native File Input** - Built on native HTML file input
- ✅ **Form Validation** - Built-in error handling and display
- 🏷️ **Labels & Required Fields** - Proper form labeling with required indicators
- 🎨 **Customizable Styling** - Easy to style with CSS modules
- 🛡️ **Type Safety** - Full TypeScript support with proper typing
- ♿ **Accessibility** - Screen reader friendly with proper ARIA attributes

## Installation

```bash
npm install @bearlab/file-input
# or
yarn add @bearlab/file-input
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { FileInput } from "@bearlab/file-input";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <FileInput
      label="Upload Document"
      onChange={handleFileChange}
      accept="application/pdf"
      required
    />
  );
}
```

## Advanced Usage

```tsx
import React, { useState } from "react";
import { FileInput } from "@bearlab/file-input";

function DocumentUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      // File size validation (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      // File type validation
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Please select a PDF or image file");
        return;
      }

      setError("");
      setFile(selectedFile);
    }
  };

  return (
    <div>
      <FileInput
        label="Upload Document"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
        isRequired={true}
        error={error}
        className="document-input"
      />

      {file && (
        <div className="file-info">
          <p>Selected: {file.name}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
    </div>
  );
}
```

## Props

| Prop         | Type                                             | Default | Description                      |
| ------------ | ------------------------------------------------ | ------- | -------------------------------- |
| `label`      | `string`                                         | -       | Label text for the input         |
| `error`      | `any`                                            | -       | Error message to display         |
| `isRequired` | `boolean`                                        | `false` | Shows required indicator (\*)    |
| `className`  | `string`                                         | -       | Additional CSS class for styling |
| `onChange`   | `(event: ChangeEvent<HTMLInputElement>) => void` | -       | File selection change handler    |

### Inherited HTML Input Props

The component also accepts all standard HTML input props:

| Prop       | Type      | Description                   |
| ---------- | --------- | ----------------------------- |
| `accept`   | `string`  | File types to accept          |
| `multiple` | `boolean` | Allow multiple file selection |
| `disabled` | `boolean` | Disable the input             |
| `name`     | `string`  | Form field name               |
| `id`       | `string`  | Input ID                      |

## Styling

The component uses CSS modules for styling. You can customize it with your own CSS:

```scss
.document-input {
  .label {
    color: #2563eb;
    font-weight: 600;
  }

  input[type="file"] {
    border: 2px dashed #d1d5db;
    padding: 12px;
    border-radius: 8px;

    &:focus {
      border-color: #2563eb;
      outline: none;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    &.error {
      border-color: #dc2626;
    }
  }
}
```

### Default CSS Classes

- `.container` - Main wrapper
- `.label` - Label element
- `.inputWrapper` - Input container
- `.error` - Applied to input when error exists

## Error Handling

The component provides built-in error display:

```tsx
const [error, setError] = useState("");

const validateFile = (file: File) => {
  if (file.size > 10 * 1024 * 1024) {
    setError("File size cannot exceed 10MB");
    return false;
  }

  if (!file.type.startsWith("image/")) {
    setError("Please select an image file");
    return false;
  }

  setError("");
  return true;
};

<FileInput
  error={error}
  onChange={handleFileChange}
  // ... other props
/>;
```

## File Type Validation

Specify accepted file types using the `accept` attribute:

```tsx
// Images only
<FileInput accept="image/*" />

// Specific image types
<FileInput accept="image/jpeg,image/png,image/webp" />

// Documents
<FileInput accept=".pdf,.doc,.docx" />

// Multiple categories
<FileInput accept="image/*,application/pdf,.txt" />
```

## Form Integration

Perfect for use with form libraries like React Hook Form:

```tsx
import { useForm, Controller } from "react-hook-form";
import { FileInput } from "@bearlab/file-input";

interface FormData {
  document: FileList;
}

function MyForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const file = data.document[0];
    console.log("Selected file:", file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="document"
        control={control}
        rules={{ required: "Please select a file" }}
        render={({ field, fieldState }) => (
          <FileInput
            label="Upload Document"
            onChange={field.onChange}
            error={fieldState.error?.message}
            isRequired
            accept=".pdf"
          />
        )}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Accessibility Features

The component follows accessibility best practices:

- **Proper labeling** - Associates label with input using htmlFor
- **Required field indication** - Visual (\*) indicator for required fields
- **Error announcements** - Screen readers announce errors
- **Keyboard navigation** - Full keyboard accessibility
- **Focus management** - Proper focus states

## Examples

### Profile Picture Uploader

```tsx
function ProfilePictureUploader() {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image must be less than 2MB");
        return;
      }

      setError("");
      setProfilePic(file);
    }
  };

  return (
    <FileInput
      label="Profile Picture"
      onChange={handleImageUpload}
      accept="image/jpeg,image/png"
      error={error}
      isRequired
    />
  );
}
```

### Multiple File Upload

```tsx
function MultipleFileUploader() {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  return (
    <div>
      <FileInput
        label="Select Documents"
        onChange={handleFilesChange}
        accept=".pdf,.doc,.docx"
        multiple
      />

      {files && (
        <ul>
          {Array.from(files).map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Drag and Drop Alternative

```tsx
function SimpleFileUploader() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="upload-area">
      {!file ? (
        <FileInput
          label="Choose File"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept="*/*"
        />
      ) : (
        <div className="file-selected">
          <p>✓ {file.name}</p>
          <button onClick={() => setFile(null)}>Remove</button>
        </div>
      )}
    </div>
  );
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- `react` >= 16.8.0
- `@bearlab/view-error` (for error display)
- `classnames` (for conditional styling)

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
interface Props extends InputProps {
  error?: any;
  label?: string;
  className?: string;
  isRequired?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type InputProps = JSX.IntrinsicElements["input"];
```

## Testing

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { FileInput } from "@bearlab/file-input";

test("handles file selection", () => {
  const mockOnChange = jest.fn();

  render(<FileInput label="Test File Input" onChange={mockOnChange} />);

  const input = screen.getByLabelText("Test File Input");
  const file = new File(["test"], "test.txt", { type: "text/plain" });

  fireEvent.change(input, { target: { files: [file] } });

  expect(mockOnChange).toHaveBeenCalled();
});
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
