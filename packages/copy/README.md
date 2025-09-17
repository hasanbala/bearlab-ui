# @bearlab/copy

A React component that displays text with a convenient copy-to-clipboard functionality. Features visual feedback, error handling, and theme support.

## ✨ Features

- 📋 **One-Click Copy** - Copy text to clipboard with a single button click
- ✅ **Visual Feedback** - Icon changes to checkmark after successful copy
- 🎨 **Theme Support** - Built-in light/dark theme compatibility
- 🚫 **Disabled State** - Prevent copying when needed
- 📱 **Responsive Design** - Works seamlessly across different screen sizes
- 🔧 **Customizable** - Easy styling with CSS modules and custom classes
- ⚡ **TypeScript** - Full TypeScript support with comprehensive type definitions
- 🔒 **Secure** - Uses modern Clipboard API with fallback handling
- 💬 **Accessible** - Proper ARIA labels and keyboard navigation support

## 📦 Installation

```bash
npm install @bearlab/copy
```

```bash
yarn add @bearlab/copy
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/button` - For the copy button functionality
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `classnames` - For conditional CSS class handling

## 📚 API Reference

### Props

| Prop        | Type                                    | Default      | Description                                   |
| ----------- | --------------------------------------- | ------------ | --------------------------------------------- |
| `text`      | `string`                                | **Required** | The text content to be copied to clipboard    |
| `label`     | `string`                                | `"Copy"`     | Accessible label for the copy button          |
| `copyId`    | `string \| number \| null \| undefined` | `undefined`  | Unique identifier for the copy instance       |
| `disabled`  | `boolean`                               | `false`      | Disables the copy functionality               |
| `className` | `string`                                | `undefined`  | Additional CSS class names for custom styling |

## 🎯 Usage Examples

### Basic Usage

```tsx
import { Copy } from "@bearlab/copy";

function App() {
  return <Copy text="Hello, World!" label="Copy text" />;
}
```

### API Keys or Tokens

```tsx
<Copy text="sk-1234567890abcdef..." label="Copy API key" copyId="api-key-123" />
```

### Code Snippets

```tsx
<Copy text={`npm install @bearlab/copy`} label="Copy install command" />
```

### With Custom Styling

```tsx
<Copy
  text="Custom styled copy component"
  className="my-custom-copy"
  label="Copy"
/>
```

### Disabled State

```tsx
<Copy text="This cannot be copied" disabled label="Copy disabled" />
```

### Handling Empty or Null Text

```tsx
// Shows "-" when text is empty or null
<Copy
  text=""
  label="Copy empty text"
/>

<Copy
  text={null}
  label="Copy null text"
/>
```

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## 🎨 🎭 Styling

### CSS Variables

```css
.my-custom-copy {
  --copy-text-padding: 16px;
  --copy-border-radius: 12px;
  --copy-font-size: 16px;
  --copy-height: 48px;
}
```

### Custom Styling

```scss
.my-custom-copy {
  .text {
    background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
    border: 2px dashed #ccc;
    font-family: "Monaco", monospace;

    &:hover {
      border-color: #007bff;
    }
  }

  // Style the copy button
  button {
    margin-left: 8px;

    &:hover {
      transform: scale(1.1);
    }
  }
}
```

## ♿ Accessibility

- **ARIA Labels**: Copy button includes descriptive labels
- **Keyboard Navigation**: Fully navigable with Tab key
- **Screen Readers**: Compatible with screen reading software
- **High Contrast**: Supports high contrast mode
- **Focus Indicators**: Clear focus states for keyboard users

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

For more UI components, check out the [@bearlab/bearlab-ui](https://github.com/hasanbala/bearlab-ui) repository.

Feel free to open an [issue](https://github.com/hasanbala/bearlab-ui/issues) for questions or feedback! ⭐

---

<div align="center">
  <p>Made with ❤️ by the Bearlab team</p>
  <p>
    <a href="https://github.com/hasanbala/bearlab-ui">⭐ Star us on GitHub</a> •
    <a href="https://www.npmjs.com/package/@bearlab/copy">📦 View on NPM</a>
  </p>
</div>
