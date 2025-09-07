# Textarea Component

A feature-rich, accessible textarea component for React applications. Provides enhanced functionality over standard HTML textareas with built-in validation, error handling, and modern styling.

## Features

- 📝 **Enhanced Textarea**: Improved UX over standard HTML textarea
- ♿ **Accessible**: Full WCAG compliance with proper labeling
- 🔍 **Validation Ready**: Built-in error state and message display
- 🏷️ **Smart Labeling**: Automatic label association and required indicators
- 🎨 **Modern Design**: Clean, consistent styling
- 📏 **Flexible Sizing**: Configurable rows and character limits
- 🚫 **Disabled State**: Proper disabled state handling
- 🎯 **TypeScript Support**: Complete type safety included
- 🔧 **Customizable**: Easy to style and extend

## Installation

```bash
npm install your-textarea-package-name
# or
yarn add your-textarea-package-name
```

## Dependencies

This component requires the following peer dependency:

- `@bearlab/view-error` (for error display)

## Usage

### Basic Example

```tsx
import { Textarea } from "your-textarea-package-name";
import { useState } from "react";

function MyComponent() {
  const [message, setMessage] = useState("");

  return (
    <Textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Enter your message here..."
      rows={4}
    />
  );
}
```

### With Label

```tsx
<Textarea
  value={description}
  onChange={handleDescriptionChange}
  label="Product Description"
  placeholder="Describe your product..."
  rows={6}
/>
```

### Required Field

```tsx
<Textarea
  value={feedback}
  onChange={handleFeedbackChange}
  label="Feedback"
  placeholder="Your feedback is important to us..."
  isRequired
  rows={5}
/>
```

### With Error Validation

```tsx
<Textarea
  value={comment}
  onChange={handleCommentChange}
  label="Comment"
  error={commentError}
  placeholder="Leave a comment..."
  maxLength={500}
  rows={4}
/>
```

### Character Limit

```tsx
<Textarea
  value={bio}
  onChange={handleBioChange}
  label="Bio"
  placeholder="Tell us about yourself..."
  maxLength={250}
  rows={3}
/>
```

### Disabled State

```tsx
<Textarea
  value="This content cannot be edited"
  onChange={() => {}}
  label="Read Only Content"
  disabled
  rows={3}
/>
```

## Props

| Prop          | Type                                                | Default     | Required | Description                              |
| ------------- | --------------------------------------------------- | ----------- | -------- | ---------------------------------------- |
| `value`       | `string`                                            | -           | ✅       | Current value of the textarea            |
| `onChange`    | `(event: ChangeEvent<HTMLTextAreaElement>) => void` | -           | ✅       | Callback fired when the value changes    |
| `label`       | `string`                                            | `undefined` | ❌       | Label text displayed above the textarea  |
| `error`       | `any`                                               | `undefined` | ❌       | Error message to display                 |
| `name`        | `string`                                            | `undefined` | ❌       | HTML name attribute                      |
| `rows`        | `number`                                            | `undefined` | ❌       | Number of visible text lines             |
| `maxLength`   | `number`                                            | `undefined` | ❌       | Maximum number of characters allowed     |
| `placeholder` | `string`                                            | `undefined` | ❌       | Placeholder text                         |
| `disabled`    | `boolean`                                           | `false`     | ❌       | Whether the textarea is disabled         |
| `isRequired`  | `boolean`                                           | `false`     | ❌       | Shows required indicator (\*) in label   |
| `className`   | `string`                                            | `undefined` | ❌       | Additional CSS class names               |
| `onBlur`      | `(event: FocusEvent<HTMLTextAreaElement>) => void`  | `undefined` | ❌       | Callback fired when textarea loses focus |

All other standard HTML textarea props are also supported.

## Styling

The component uses CSS modules for styling. You can customize the appearance through:

### Using className prop

```tsx
<Textarea className="my-textarea" value={value} onChange={handler} />
```

### CSS Module overrides

```css
.my-textarea {
  /* Container styles */
  margin-bottom: 20px;
}

.my-textarea textarea {
  /* Textarea input styles */
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-family: inherit;
  font-size: 16px;
  padding: 12px;
  transition: border-color 0.2s ease;
}

.my-textarea textarea:focus {
  /* Focus styles */
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.my-textarea .error {
  /* Error state styles */
  border-color: #dc3545;
}

.my-textarea .label {
  /* Label styles */
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}
```

### Custom CSS Properties

```css
.my-textarea {
  --textarea-border-color: #e1e5e9;
  --textarea-focus-color: #007bff;
  --textarea-error-color: #dc3545;
  --textarea-disabled-bg: #f8f9fa;
  --textarea-font-size: 16px;
  --textarea-line-height: 1.5;
}
```

## States

### Default State

- Clean, minimal border
- Smooth focus transitions
- Clear typography

### Focus State

- Highlighted border color
- Optional focus ring
- Enhanced visual feedback

### Error State

- Red border color
- Error message display
- Clear error indication

### Disabled State

- Muted appearance
- Non-interactive
- Maintained readability

## Validation

### Built-in Validation Features

- **maxLength**: Automatic character limit enforcement
- **required**: Visual required indicator
- **Custom validation**: Error prop for external validation

### Validation Examples

```tsx
// Character limit validation
function validateLength(value: string): string | undefined {
  if (value.length < 10) {
    return "Message must be at least 10 characters long";
  }
  if (value.length > 500) {
    return "Message cannot exceed 500 characters";
  }
  return undefined;
}

// Usage
<Textarea
  value={message}
  onChange={handleChange}
  error={validateLength(message)}
  maxLength={500}
/>;
```

## Accessibility

The Textarea component follows WCAG guidelines:

- **Labels**: Proper label association with `htmlFor` and `id`
- **Error Announcement**: Screen reader accessible error messages
- **Focus Management**: Clear focus indicators
- **Keyboard Navigation**: Standard textarea keyboard shortcuts
- **Required Fields**: Proper indication for screen readers

### ARIA Attributes

- `aria-required`: Set when `isRequired` is true
- `aria-invalid`: Set when `error` is present
- `aria-describedby`: Links to error message when present

## TypeScript

Complete TypeScript support with exported interfaces:

```tsx
interface TextareaProps extends JSX.IntrinsicElements["textarea"] {
  label?: string;
  error?: any;
  rows?: number;
  value: string;
  name?: string;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  onChange: (val: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (val: React.FocusEvent<HTMLTextAreaElement>) => void;
}
```

## Examples

### Form Integration

```tsx
import { Textarea } from "your-textarea-package-name";
import { useState } from "react";

interface FormData {
  title: string;
  description: string;
  comments: string;
}

function ProductForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    comments: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  return (
    <form>
      <Textarea
        value={formData.description}
        onChange={handleChange("description")}
        label="Product Description"
        error={errors.description}
        placeholder="Describe your product in detail..."
        isRequired
        rows={6}
        maxLength={1000}
      />

      <Textarea
        value={formData.comments}
        onChange={handleChange("comments")}
        label="Additional Comments"
        placeholder="Any additional information..."
        rows={4}
        maxLength={500}
      />
    </form>
  );
}
```

### Real-time Validation

```tsx
function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const validateFeedback = (value: string) => {
    if (value.length < 20) {
      setError("Feedback must be at least 20 characters long");
    } else if (value.length > 1000) {
      setError("Feedback cannot exceed 1000 characters");
    } else {
      setError("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFeedback(value);
    validateFeedback(value);
  };

  return (
    <Textarea
      value={feedback}
      onChange={handleChange}
      label="Your Feedback"
      error={error}
      placeholder="Please share your thoughts..."
      isRequired
      rows={5}
      maxLength={1000}
    />
  );
}
```

### Auto-resize Integration

```tsx
// Custom hook for auto-resize functionality
function useAutoResize(ref: RefObject<HTMLTextAreaElement>) {
  const adjustHeight = useCallback(() => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [ref]);

  return adjustHeight;
}

function AutoResizeTextarea() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustHeight = useAutoResize(textareaRef);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    adjustHeight();
  };

  return (
    <div>
      <Textarea
        value={value}
        onChange={handleChange}
        label="Auto-resize Textarea"
        placeholder="This textarea will grow as you type..."
        rows={3}
      />
    </div>
  );
}
```

## Browser Support

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

## License

MIT License - see LICENSE file for details.

## Changelog

### v1.0.0

- Initial release
- Full accessibility support
- Error state handling
- Character limit support
- TypeScript support
- CSS modules styling
