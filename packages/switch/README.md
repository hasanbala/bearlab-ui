# @bearlab/switch

A modern, accessible, and highly customizable Switch (toggle) component for React applications with full TypeScript support, smooth animations, and built-in theme compatibility.

## ✨ Features

- 🎯 **Modern Toggle Design**: Sleek iOS-style switch with smooth animations
- 🌓 **Theme Support**: Built-in light and dark theme compatibility
- ♿ **Accessibility First**: Screen reader friendly with proper ARIA attributes
- 🔧 **TypeScript**: Complete type safety with TypeScript definitions
- 🎨 **Customizable**: Flexible styling with CSS modules and custom classes
- 📱 **Touch Friendly**: Optimized for mobile and touch interactions
- ⚡ **Smooth Animations**: 60fps transitions with CSS transforms
- 💬 **Popover Support**: Optional tooltip/popover functionality
- 🚨 **Error Handling**: Built-in error state with visual feedback
- 🔍 **Form Integration**: Perfect for form libraries and controlled components

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

## 📚 API Reference

### Props

| Prop         | Type                                               | Required | Default | Description                              |
| ------------ | -------------------------------------------------- | -------- | ------- | ---------------------------------------- |
| `checked`    | `boolean`                                          | ✅       | -       | Whether the switch is checked/enabled    |
| `onChange`   | `(e: React.ChangeEvent<HTMLInputElement>) => void` | ✅       | -       | Callback fired when switch state changes |
| `name`       | `string`                                           | ❌       | -       | The name attribute for the input element |
| `label`      | `string`                                           | ❌       | -       | Label text displayed next to the switch  |
| `error`      | `any`                                              | ❌       | -       | Error state/message to display           |
| `className`  | `string`                                           | ❌       | -       | Additional CSS classes                   |
| `disabled`   | `boolean`                                          | ❌       | `false` | Whether the switch is disabled           |
| `isRequired` | `boolean`                                          | ❌       | `false` | Shows required indicator (\*)            |
| `popover`    | `string`                                           | ❌       | -       | Popover/tooltip text shown on hover      |

The component also accepts all standard HTML `input` element props (except `popover` which is handled separately) through TypeScript's `JSX.IntrinsicElements["input"]`.

## 🎯 Usage Examples

### Basic Usage

```tsx
import { Switch } from "@bearlab/switch";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Switch
      name="darkMode"
      label="Dark Mode"
      checked={darkMode}
      onChange={(e) => setDarkMode(e.target.checked)}
    />
  );
}
```

### With Popover

```tsx
<Switch
  name="autoSave"
  label="Auto Save"
  checked={autoSave}
  onChange={handleAutoSave}
  popover="Automatically save your changes as you work"
/>
```

### With Error State

```tsx
<Switch
  name="terms"
  label="Accept Terms & Conditions"
  checked={acceptedTerms}
  onChange={handleTermsChange}
  error={!acceptedTerms ? "You must accept the terms to continue" : null}
  isRequired
/>
```

### Disabled State

```tsx
<Switch
  name="premium"
  label="Premium Features"
  checked={false}
  onChange={() => {}}
  disabled
  popover="Upgrade to Pro to enable premium features"
/>
```

### Without Label

```tsx
<Switch
  name="toggle"
  checked={isToggled}
  onChange={handleToggle}
  className="standalone-switch"
/>
```

### Custom Switch Groups

```tsx
function PermissionsGroup() {
  const [permissions, setPermissions] = useState({
    read: true,
    write: false,
    delete: false,
  });

  const handlePermissionChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPermissions((prev) => ({
        ...prev,
        [key]: e.target.checked,
      }));
    };

  return (
    <div className="permissions-group">
      <h3>User Permissions</h3>

      <Switch
        name="read"
        label="Read Access"
        checked={permissions.read}
        onChange={handlePermissionChange("read")}
        disabled // Read access always enabled
        popover="Basic read permission - cannot be disabled"
      />

      <Switch
        name="write"
        label="Write Access"
        checked={permissions.write}
        onChange={handlePermissionChange("write")}
        popover="Allow user to create and edit content"
      />

      <Switch
        name="delete"
        label="Delete Access"
        checked={permissions.delete}
        onChange={handlePermissionChange("delete")}
        error={
          permissions.delete && !permissions.write
            ? "Write access required for delete permission"
            : null
        }
        popover="Allow user to delete content (requires write access)"
      />
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

## 🎨 Styling

The Switch component automatically adapts to light and dark themes based on the `data-theme` attribute on the HTML element.

### Custom Styling

Override default styles with custom CSS classes:

```scss
.custom-switch {
  .slider {
    --switch-width: 50px;
    --switch-height: 24px;
    --toggle-size: 20px;
  }
}
```

## ♿ Accessibility

The Switch component is built with accessibility as a priority:

### Screen Reader Support

- Proper semantic HTML with `<input type="checkbox">`
- Associated labels with `htmlFor` attributes
- Clear focus indicators that meet WCAG guidelines

### Keyboard Navigation

- **Space**: Toggle the switch state
- **Tab/Shift+Tab**: Navigate to/from the switch
- **Enter**: Activate the switch (in form contexts)

### Visual Accessibility

- High contrast ratios in both light and dark themes
- Clear visual states for all interactions
- Reduced motion support for users with vestibular disorders

### ARIA Attributes

The component automatically handles ARIA attributes for optimal screen reader experience.

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
    <a href="https://www.npmjs.com/package/@bearlab/switch">📦 View on NPM</a>
  </p>
</div>
