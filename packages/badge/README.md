# @bearlab/badge

A modern and flexible React Badge component with full customization support through various variants, colors, and sizes. Built with TypeScript support and includes both light and dark theme compatibility.

## ✨ Features

- 🎨 **2 Variants**: Light and Solid styles
- 🌈 **7 Color Options**: Primary, Success, Error, Warning, Info, Light, Dark
- 📏 **2 Sizes**: Small (12px) and Medium (14px)
- 🔄 **Icon Support**: Start and end icons
- 🌙 **Theme Support**: Automatic light and dark theme adaptation
- 📱 **Responsive**: Perfect display on all devices
- 🎯 **TypeScript**: Full type safety
- ♿ **Accessible**: WCAG compliant

## 📦 Installation

```bash
npm install @bearlab/badge
```

```bash
yarn add @bearlab/badge
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `classnames`: For conditional CSS class handling

## 🎨 Color Palette

### Light Variant

- **Primary**: Blue tone with light background
- **Success**: Green tone for success messages
- **Error**: Red tone for error notifications
- **Warning**: Orange tone for warning messages
- **Info**: Light blue tone for informational content
- **Light**: Light gray tone for neutral content
- **Dark**: Dark gray tone for emphasis

### Solid Variant

- All color options with filled background and white text

## 📏 Size Guide

| Size   | Font Size | Use Case                   |
| ------ | --------- | -------------------------- |
| Small  | 12px      | Compact spaces, list items |
| Medium | 14px      | General use, standard size |

## 🎯 Usage Examples

### Basic Usage

```jsx
<Badge label="Default Badge" />
```

### Different Colors

```jsx
<Badge label="Primary" color="primary" />
<Badge label="Success" color="success" />
<Badge label="Error" color="error" />
<Badge label="Warning" color="warning" />
<Badge label="Info" color="info" />
<Badge label="Light" color="light" />
<Badge label="Dark" color="dark" />
```

### Solid Variant

```jsx
<Badge label="Solid Primary" variant="solid" color="primary" />
<Badge label="Solid Success" variant="solid" color="success" />
<Badge label="Solid Error" variant="solid" color="error" />
```

### Size Options

```jsx
<Badge label="Small Badge" size="small" />
<Badge label="Medium Badge" size="medium" />
```

### With Icons

```jsx
import { CheckIcon, XIcon } from '@heroicons/react/solid';

<Badge
  label="Completed"
  color="success"
  startIcon={CheckIcon}
/>

<Badge
  label="Failed"
  color="error"
  endIcon={XIcon}
/>

<Badge
  label="Processing"
  color="warning"
  startIcon={ClockIcon}
  endIcon={ArrowRightIcon}
/>
```

### Numeric Values

```jsx
<Badge label={42} color="primary" />
<Badge label={999} color="error" variant="solid" />
```

### Custom Styling

```jsx
<Badge
  label="Custom"
  className="my-custom-badge"
  color="primary"
  variant="solid"
/>
```

### Notification System

```jsx
const NotificationBadge = ({ type, message, isNew }) => {
  return (
    <Badge
      label={isNew ? `${message} • New` : message}
      color={type}
      variant={isNew ? "solid" : "light"}
      size="small"
      startIcon={isNew ? BellIcon : undefined}
    />
  );
};
```

### Category Tags

```jsx
const CategoryTags = ({ categories }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) => (
        <Badge
          key={category.id}
          label={category.name}
          color={index % 2 === 0 ? "primary" : "info"}
          variant="light"
          size="small"
        />
      ))}
    </div>
  );
};
```

## 📚 API Reference

### Props

| Prop        | Type                                                                            | Default     | Description                 |
| ----------- | ------------------------------------------------------------------------------- | ----------- | --------------------------- |
| `label`     | `string \| number`                                                              | -           | **Required.** Badge content |
| `variant`   | `'light' \| 'solid'`                                                            | `'light'`   | Badge style                 |
| `color`     | `'primary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'light' \| 'dark'` | `'primary'` | Color theme                 |
| `size`      | `'small' \| 'medium'`                                                           | `'medium'`  | Badge size                  |
| `startIcon` | `React.FunctionComponent<React.SVGProps<SVGSVGElement>>`                        | -           | Start icon                  |
| `endIcon`   | `React.FunctionComponent<React.SVGProps<SVGSVGElement>>`                        | -           | End icon                    |
| `className` | `string`                                                                        | -           | Custom CSS classes          |

### TypeScript Support

The component comes with full TypeScript support:

```typescript
import { Badge, Props as BadgeProps } from "@bearlab/badge";

const MyBadge: React.FC<BadgeProps> = (props) => {
  return <Badge {...props} />;
};
```

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
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
    <a href="https://www.npmjs.com/package/@bearlab/badge">📦 View on NPM</a>
  </p>
</div>
