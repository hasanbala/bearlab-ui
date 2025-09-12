# @bearlab/view-card

A versatile card component for React applications that handles both content display and empty states. Perfect for dashboards, data displays, and content sections that may or may not have data.

## ✨ Features

- 🎴 **Dual Mode**: Content card and empty state card
- 🎨 **Flexible Layout**: Header with title and description
- 📦 **Smart Rendering**: Automatically switches between states
- 🖼️ **Empty State**: Built-in empty state with icon
- 🎯 **TypeScript Support**: Complete type definitions
- 🔧 **Customizable**: Easy styling and layout control
- 📱 **Responsive**: Works seamlessly across all screen sizes
- ⚡ **Lightweight**: Minimal dependencies and bundle size

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

| Prop          | Type                                   | Default     | Required | Description                                                                  |
| ------------- | -------------------------------------- | ----------- | -------- | ---------------------------------------------------------------------------- |
| `title`       | `string`                               | `undefined` | ❌       | Card title displayed in header                                               |
| `description` | `string`                               | `undefined` | ❌       | Description text displayed under title                                       |
| `children`    | `React.ReactNode \| null \| undefined` | `undefined` | ❌       | Card content. If provided, renders content card; if not, renders empty state |
| `className`   | `string`                               | `undefined` | ❌       | Additional CSS class names                                                   |

### TypeScript Interface

Complete TypeScript support:

```tsx
interface ViewCardProps {
  className?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode | null | undefined;
}
```

## 🎯 Usage Examples

### Content Card (With Children)

When children are provided, the component renders as a content card:

```tsx
import { ViewCard } from "your-viewcard-package-name";

function MyComponent() {
  return (
    <ViewCard
      title="Dashboard Statistics"
      description="Overview of your key metrics"
    >
      <div>
        <h4>Revenue: $12,345</h4>
        <h4>Users: 1,234</h4>
        <h4>Growth: +15%</h4>
      </div>
    </ViewCard>
  );
}
```

### Empty State Card (Without Children)

When no children are provided, it automatically shows an empty state:

```tsx
<ViewCard
  title="No Data Available"
  description="There's nothing to show here yet. Try adding some content."
/>
```

### Title Only

```tsx
<ViewCard title="Simple Card">
  <p>Some content here...</p>
</ViewCard>
```

### Description Only

```tsx
<ViewCard description="A card without a title">
  <div>Content goes here</div>
</ViewCard>
```

### Custom Styling

```tsx
<ViewCard
  className="my-custom-card"
  title="Styled Card"
  description="This card has custom styling"
>
  <div>Your content</div>
</ViewCard>
```

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## 🎨 🎭 Styling

The component uses CSS modules for styling. Customize through:

### Using className prop

```tsx
<ViewCard className="my-card">
  <div>Content</div>
</ViewCard>
```

### CSS Module overrides

```css
/* Content card styles */
.my-card {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
}

/* Header styles */
.my-card .header {
  padding: 20px 20px 0;
  border-bottom: 1px solid #f0f0f0;
}

.my-card .title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.my-card .description {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

/* Content area */
.my-card .content {
  padding: 20px;
}

/* Empty state styles */
.my-card .icon {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  opacity: 0.5;
}
```

### Custom CSS Properties

```css
.my-card {
  --card-border-color: #e1e5e9;
  --card-border-radius: 8px;
  --card-padding: 20px;
  --card-title-color: #333;
  --card-description-color: #666;
  --card-empty-icon-opacity: 0.5;
}
```

## ♿ Accessibility

- **Semantic HTML**: Uses proper heading hierarchy
- **Screen Reader**: Descriptive content structure
- **Focus Management**: Focusable content is properly managed
- **ARIA**: Proper labeling when needed

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
    <a href="https://www.npmjs.com/package/@bearlab/view-card">📦 View on NPM</a>
  </p>
</div>
