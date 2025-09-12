# @bearlab/select

A modern, accessible, and customizable Select component for React applications with full TypeScript support and built-in theme compatibility.

## ✨ Features

- 🎨 **Modern Design**: Clean, professional styling with rounded corners and subtle shadows
- 🌓 **Theme Support**: Built-in light and dark theme compatibility
- ♿ **Accessibility**: Fully accessible with proper ARIA attributes and keyboard navigation
- 🔧 **TypeScript**: Complete type safety with TypeScript definitions
- 🎯 **Customizable**: Flexible styling with CSS modules and custom class support
- 📱 **Responsive**: Works seamlessly across all device sizes
- ⚡ **Performance**: Lightweight and optimized for production use
- 🎪 **Interactive States**: Hover, focus, disabled, and error states
- 🔍 **Form Integration**: Perfect integration with form libraries like Formik, React Hook Form

## 📦 Installation

```bash
npm install @bearlab/select
```

```bash
yarn add @bearlab/select
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `classnames` - For conditional CSS class handling

## 📚 API Reference

### Props

| Prop          | Type                                                | Required | Default              | Description                               |
| ------------- | --------------------------------------------------- | -------- | -------------------- | ----------------------------------------- |
| `name`        | `string`                                            | ✅       | -                    | The name attribute for the select element |
| `value`       | `string`                                            | ✅       | -                    | The current selected value                |
| `label`       | `string`                                            | ✅       | -                    | Label text displayed above the select     |
| `options`     | `Option[]`                                          | ✅       | -                    | Array of options to display               |
| `onChange`    | `(e: React.ChangeEvent<HTMLSelectElement>) => void` | ✅       | -                    | Callback fired when selection changes     |
| `error`       | `any`                                               | ❌       | -                    | Error state/message to display            |
| `className`   | `string`                                            | ❌       | -                    | Additional CSS classes                    |
| `disabled`    | `boolean`                                           | ❌       | `false`              | Whether the select is disabled            |
| `isRequired`  | `boolean`                                           | ❌       | `false`              | Shows required indicator (\*)             |
| `placeholder` | `string`                                            | ❌       | `"Select an option"` | Placeholder text                          |

### Option Interface

```tsx
interface Option {
  value: string;
  label: string;
}
```

The component also accepts all standard HTML `select` element props through TypeScript's `JSX.IntrinsicElements["select"]`.

## 🎯 Usage Examples

### Basic Usage

```tsx
import { Select } from "@bearlab/select";

const colors = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

<Select
  name="color"
  label="Favorite Color"
  value={selectedColor}
  options={colors}
  onChange={handleColorChange}
/>;
```

### With Error State

```tsx
<Select
  name="category"
  label="Category"
  value={category}
  options={categories}
  onChange={handleCategoryChange}
  error={errors.category}
  isRequired
/>
```

### Disabled State

```tsx
<Select
  name="disabled-select"
  label="Disabled Select"
  value=""
  options={options}
  onChange={() => {}}
  disabled
/>
```

### With Custom Styling

```tsx
<Select
  name="styled-select"
  label="Styled Select"
  value={value}
  options={options}
  onChange={handleChange}
  className="my-custom-select"
  placeholder="Choose wisely..."
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

The Select component comes with built-in support for light and dark themes. The theme is automatically detected based on the `data-theme` attribute on the HTML element.

### Custom Styling

You can customize the appearance by passing a `className` prop or by overriding the CSS custom properties:

```scss
.custom-select {
  --select-border-radius: 12px;
  --select-padding: 16px;
}
```

## ♿ Accessibility

The Select component is built with accessibility in mind:

- **Keyboard Navigation**: Full support for keyboard navigation (Tab, Enter, Arrow keys)
- **Screen Readers**: Proper labeling and ARIA attributes
- **Focus Management**: Clear focus indicators that meet WCAG guidelines
- **Color Contrast**: All color combinations meet WCAG AA standards
- **Error Handling**: Error messages are properly associated with the form field

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
    <a href="https://www.npmjs.com/package/@bearlab/select">📦 View on NPM</a>
  </p>
</div>
