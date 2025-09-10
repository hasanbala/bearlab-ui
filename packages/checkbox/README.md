# @bearlab/checkbox

A customizable and accessible React checkbox component with built-in error handling, tooltips, and theme support.

## ✨ Features

- 🎯 **Fully Accessible** - Built with semantic HTML and proper ARIA attributes
- 🎨 **Themeable** - Supports light/dark theme switching
- ✨ **Interactive States** - Hover, focus, checked, and disabled states
- 🚨 **Error Handling** - Built-in error display with icons
- 💬 **Tooltip Support** - Popover tooltips on hover
- 📱 **Responsive** - Works seamlessly across different screen sizes
- ⚡ **TypeScript** - Full TypeScript support with comprehensive type definitions
- 🎭 **Customizable** - Easy to style with CSS modules and custom classes

## 📦 Installation

```bash
npm install @bearlab/checkbox
```

```bash
yarn add @bearlab/checkbox
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `classnames` - For conditional CSS class handling

## 🎯 Usage Examples

### Basic Usage

```tsx
import { Checkbox } from "@bearlab/checkbox";
import { useState } from "react";

function App() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
      label="Accept terms and conditions"
    />
  );
}
```

### With Required Field

```tsx
<Checkbox
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  label="I agree to the privacy policy"
  isRequired
/>
```

### With Error State

```tsx
<Checkbox
  checked={hasError}
  onChange={(e) => setHasError(e.target.checked)}
  label="This field has an error"
  error="Please accept the terms to continue"
/>
```

### With Tooltip

```tsx
<Checkbox
  checked={showTooltip}
  onChange={(e) => setShowTooltip(e.target.checked)}
  label="Enable notifications"
  popover="You will receive email notifications about important updates"
/>
```

### Disabled State

```tsx
<Checkbox
  checked={false}
  onChange={() => {}}
  label="This checkbox is disabled"
  disabled
/>
```

### Custom Styling

```tsx
<Checkbox
  checked={customStyled}
  onChange={(e) => setCustomStyled(e.target.checked)}
  label="Custom styled checkbox"
  className="my-custom-checkbox"
/>
```

## 📚 API Reference

### Props

| Prop         | Type                                             | Default      | Description                                    |
| ------------ | ------------------------------------------------ | ------------ | ---------------------------------------------- |
| `checked`    | `boolean`                                        | **Required** | Controls the checked state of the checkbox     |
| `onChange`   | `(event: ChangeEvent<HTMLInputElement>) => void` | **Required** | Callback fired when the checkbox state changes |
| `label`      | `string`                                         | `undefined`  | Label text displayed next to the checkbox      |
| `disabled`   | `boolean`                                        | `false`      | Disables the checkbox interaction              |
| `error`      | `any`                                            | `undefined`  | Error message to display below the checkbox    |
| `isRequired` | `boolean`                                        | `false`      | Shows a red asterisk (\*) next to the label    |
| `popover`    | `string`                                         | `undefined`  | Tooltip content shown on hover                 |
| `className`  | `string`                                         | `undefined`  | Additional CSS class names                     |
| `name`       | `string`                                         | `undefined`  | Name attribute for the input element           |

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## 🎨 Styling

### CSS Variables

The component uses CSS custom properties that can be overridden:

```css
.my-custom-checkbox {
  --checkbox-size: 24px;
  --checkbox-border-radius: 8px;
  --checkbox-border-color: #custom-color;
  --checkbox-checked-bg: #custom-blue;
}
```

### Custom Classes

You can target specific parts of the component:

```scss
.my-checkbox {
  // Container styling
  .checkboxWrapper {
    // Checkbox wrapper styling

    input {
      // Input element styling
    }
  }

  .label {
    // Label styling
  }

  .popover {
    // Tooltip styling
  }

  .viewError {
    // Error message styling
  }
}
```

## ♿ Accessibility

This component follows WAI-ARIA guidelines and includes:

- Proper semantic HTML structure with `<label>` and `<input type="checkbox">`
- Keyboard navigation support (Space to toggle, Tab to focus)
- Screen reader compatibility
- High contrast mode support
- Focus indicators for keyboard users

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
    <a href="https://www.npmjs.com/package/@bearlab/checkbox">📦 View on NPM</a>
  </p>
</div>
