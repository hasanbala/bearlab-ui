# @bearlab/skeleton

A flexible and customizable skeleton loading component for React applications. Perfect for creating smooth loading states while your content is being fetched.

## ✨ Features

- 🎨 **Multiple Variants**: Default, article, card, and list layouts
- ⚡ **Animated or Static**: Toggle animation on/off
- 🔧 **Customizable**: Configure number of lines and styling
- 📱 **Responsive**: Works seamlessly across all screen sizes
- 🎯 **TypeScript Support**: Full type safety included
- 🎪 **Easy Integration**: Drop-in replacement for loading content

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
- `classnames` - For conditional CSS class handling

## 🎯 Usage Examples

### Basic Example

```tsx
import { Skeleton } from "your-skeleton-package-name";

function MyComponent() {
  const [loading, setLoading] = useState(true);

  return (
    <div>{loading ? <Skeleton /> : <div>Your actual content here</div>}</div>
  );
}
```

### Article Variant

Perfect for blog posts, news articles, or any content with author information:

```tsx
<Skeleton variant="article" />
```

### Card Variant

Ideal for product cards, image galleries, or media content:

```tsx
<Skeleton variant="card" />
```

### List Variant

Great for user lists, comments, or any repetitive content:

```tsx
<Skeleton variant="list" />
```

### Custom Configuration

```tsx
<Skeleton
  variant="default"
  lines={6}
  animated={false}
  className="my-custom-skeleton"
/>
```

## 📚 API Reference

### Props

| Prop        | Type                                         | Default     | Description                                             |
| ----------- | -------------------------------------------- | ----------- | ------------------------------------------------------- |
| `variant`   | `"default" \| "article" \| "card" \| "list"` | `"default"` | The skeleton layout variant                             |
| `lines`     | `number`                                     | `4`         | Number of content lines to render (for default variant) |
| `animated`  | `boolean`                                    | `true`      | Enable/disable shimmer animation                        |
| `className` | `string`                                     | `undefined` | Additional CSS class names                              |

### Variants

### Default

- Two content sections with configurable number of lines
- Variable width lines for realistic appearance
- Perfect for general text content

### Article

- Avatar placeholder
- Title and subtitle placeholders
- Body content with multiple lines
- Great for blog posts or news articles

### Card

- Image placeholder
- Card title
- Content lines
- Perfect for product cards or media items

### List

- Multiple list items (3 by default)
- Each item has avatar and content placeholders
- Ideal for user lists or comments

### TypeScript Support

Full TypeScript support with exported interfaces:

```tsx
interface SkeletonProps {
  className?: string;
  variant?: "default" | "article" | "card" | "list";
  lines?: number;
  animated?: boolean;
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

The component uses CSS modules for styling. You can override styles by:

1. **Using className prop:**

```tsx
<Skeleton className="my-skeleton" />
```

2. **CSS Module override:**

```css
.my-skeleton {
  /* Your custom styles */
}

.my-skeleton .line {
  /* Override line styles */
}
```

3. **Global CSS override:**

```css
/* Target specific elements */
.skeleton-container .line {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
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
    <a href="https://www.npmjs.com/package/@bearlab/skeleton">📦 View on NPM</a>
  </p>
</div>
