# @bearlab/textarea

A modern, accessible, and fully customizable Textarea component for React applications with comprehensive TypeScript support, error handling, and seamless theme integration.

## ✨ Features

- 🎨 **Modern Design**: Clean, professional styling with rounded corners and subtle shadows
- 🌓 **Theme Support**: Built-in light and dark theme compatibility
- ♿ **Accessibility**: Fully accessible with proper ARIA attributes and keyboard navigation
- 🔧 **TypeScript**: Complete type safety with TypeScript definitions
- 🎯 **Flexible Sizing**: Configurable rows, character limits, and auto-resize options
- 📱 **Responsive**: Works seamlessly across all device sizes and orientations
- ⚡ **Performance**: Optimized for production with minimal bundle impact
- 🚨 **Error Handling**: Built-in error states with visual feedback
- 🔍 **Form Integration**: Perfect integration with form libraries like Formik, React Hook Form
- 🎪 **Interactive States**: Hover, focus, disabled, and error states with smooth transitions

## 📦 Installation

```bash
npm install @bearlab/textarea
```

```bash
yarn add @bearlab/textarea
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `classnames` - For conditional CSS class handling

## 📚 API Reference

### Props

| Prop          | Type                                                  | Required | Default | Description                                 |
| ------------- | ----------------------------------------------------- | -------- | ------- | ------------------------------------------- |
| `value`       | `string`                                              | ✅       | -       | The current value of the textarea           |
| `onChange`    | `(e: React.ChangeEvent<HTMLTextAreaElement>) => void` | ✅       | -       | Callback fired when the value changes       |
| `name`        | `string`                                              | ❌       | -       | The name attribute for the textarea element |
| `label`       | `string`                                              | ❌       | -       | Label text displayed above the textarea     |
| `error`       | `any`                                                 | ❌       | -       | Error state/message to display              |
| `rows`        | `number`                                              | ❌       | -       | Number of visible text lines                |
| `maxLength`   | `number`                                              | ❌       | -       | Maximum number of characters allowed        |
| `className`   | `string`                                              | ❌       | -       | Additional CSS classes                      |
| `disabled`    | `boolean`                                             | ❌       | `false` | Whether the textarea is disabled            |
| `isRequired`  | `boolean`                                             | ❌       | `false` | Shows required indicator (\*)               |
| `placeholder` | `string`                                              | ❌       | -       | Placeholder text                            |
| `onBlur`      | `(e: React.FocusEvent<HTMLTextAreaElement>) => void`  | ❌       | -       | Callback fired when textarea loses focus    |

The component also accepts all standard HTML `textarea` element props through TypeScript's `JSX.IntrinsicElements["textarea"]`.

## 🎯 Usage Examples

### Basic Usage

```tsx
import { Textarea } from "@bearlab/textarea";

function ContactForm() {
  const [feedback, setFeedback] = useState("");

  return (
    <Textarea
      name="feedback"
      label="Your Feedback"
      value={feedback}
      onChange={(e) => setFeedback(e.target.value)}
      placeholder="Share your thoughts with us..."
      rows={5}
    />
  );
}
```

### With Character Limit

```tsx
<Textarea
  name="bio"
  label="Bio"
  value={bio}
  onChange={handleBioChange}
  placeholder="Tell us about yourself..."
  maxLength={500}
  rows={4}
/>
```

### With Error State

```tsx
<Textarea
  name="description"
  label="Project Description"
  value={description}
  onChange={handleDescriptionChange}
  error={errors.description}
  isRequired
  placeholder="Describe your project in detail..."
  rows={6}
/>
```

### Disabled State

```tsx
<Textarea
  name="readonly-content"
  label="Terms & Conditions"
  value={termsContent}
  onChange={() => {}}
  disabled
  rows={8}
/>
```

### Auto-Growing Textarea

```tsx
function AutoGrowTextarea() {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <Textarea
      ref={textareaRef}
      name="auto-grow"
      label="Auto-growing Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Start typing and watch me grow..."
      rows={3}
    />
  );
}
```

### Rich Text Preview

```tsx
function RichTextEditor() {
  const [markdown, setMarkdown] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="rich-editor">
      <div className="editor-tabs">
        <button
          onClick={() => setShowPreview(false)}
          className={!showPreview ? "active" : ""}
        >
          Edit
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className={showPreview ? "active" : ""}
        >
          Preview
        </button>
      </div>

      {!showPreview ? (
        <Textarea
          name="markdown"
          label="Markdown Content"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="# Enter markdown here..."
          rows={15}
        />
      ) : (
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
        />
      )}
    </div>
  );
}
```

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## 🎨 🎭 Styling

The Textarea component automatically adapts to light and dark themes based on the `data-theme` attribute on the HTML element.

### Custom Styling

Override default styles with custom CSS classes:

```scss
.custom-textarea {
  --textarea-border-radius: 12px;
  --textarea-padding: 20px;
  --textarea-min-height: 120px;
}
```

## ♿ Accessibility

The Textarea component is built with accessibility as a core principle:

### Screen Reader Support

- Proper semantic HTML with `<textarea>` element
- Associated labels with correct `htmlFor` attributes
- Error messages are properly announced to screen readers
- Required field indicators are accessible

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate to/from the textarea
- **All standard text editing shortcuts**: Copy, paste, select all, etc.
- **Arrow keys**: Navigate within the text content
- **Enter**: Create new lines (standard textarea behavior)

### Visual Accessibility

- High contrast ratios meeting WCAG AA standards
- Clear focus indicators with 3px blue outline
- Error states with both color and iconographic indicators
- Consistent visual hierarchy with proper font weights and sizes

### ARIA Support

- Automatic `aria-describedby` for error messages
- `aria-required` for required fields
- Proper `aria-invalid` states for error conditions

### Responsive Behavior

- Adapts to container width automatically
- Maintains consistent padding and typography across breakpoints
- Touch-friendly sizing for mobile devices
- Proper text scaling for different screen densities

### Textarea with Mentions

```tsx
function MentionTextarea() {
  const [content, setContent] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart;

    // Check for @ mentions
    const beforeCursor = value.slice(0, cursorPos);
    const mentionMatch = beforeCursor.match(/@(\w*)$/);

    if (mentionMatch) {
      setMentionQuery(mentionMatch[1]);
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }

    setContent(value);
  };

  return (
    <div className="mention-container">
      <Textarea
        name="mention-content"
        label="Message"
        value={content}
        onChange={handleChange}
        placeholder="Type @ to mention someone..."
        rows={4}
      />
      {showMentions && (
        <MentionDropdown query={mentionQuery} onSelect={handleMentionSelect} />
      )}
    </div>
  );
}
```

### Textarea with Auto-save

```tsx
function AutoSaveTextarea() {
  const [content, setContent] = useState("");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">(
    "saved"
  );

  // Auto-save with debounce
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (content.trim()) {
        setSaveStatus("saving");
        try {
          await saveContent(content);
          setSaveStatus("saved");
        } catch (error) {
          setSaveStatus("error");
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [content]);

  return (
    <div>
      <Textarea
        name="auto-save"
        label="Draft Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing... Your work is automatically saved"
        rows={8}
      />
      <div className="save-status">
        {saveStatus === "saving" && "💾 Saving..."}
        {saveStatus === "saved" && "✅ Saved"}
        {saveStatus === "error" && "❌ Error saving"}
      </div>
    </div>
  );
}
```

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
    <a href="https://www.npmjs.com/package/@bearlab/textarea">📦 View on NPM</a>
  </p>
</div>
