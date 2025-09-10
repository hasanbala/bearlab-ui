# @bearlab/loading

A lightweight, accessible loading spinner component for React applications with smooth animations and flexible positioning.

## ✨ Features

- ✅ **Smooth Animation** - Optimized CSS animations with 60fps performance
- 🎯 **Auto-Centered** - Automatically centers itself within its container
- 📝 **TypeScript Ready** - Full TypeScript support with proper type definitions
- 🔧 **Highly Customizable** - Easy styling with custom CSS classes
- ⚡ **Lightweight** - Minimal bundle size (~1KB gzipped)
- ♿ **Accessible** - Screen reader friendly with proper ARIA attributes
- 🌙 **Theme Compatible** - Works seamlessly with light and dark themes
- 📱 **Responsive** - Scales appropriately on all screen sizes
- 🎨 **Modern Design** - Clean, professional loading indicator

## 📦 Installation

```bash
npm install @bearlab/loading
```

```bash
yarn add @bearlab/loading
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `classnames` - For conditional CSS class handling

## 🎯 Usage Examples

### Simple Loading Spinner

```tsx
import { Loading } from "@bearlab/loading";

function App() {
  return (
    <div style={{ position: "relative", height: "200px" }}>
      <Loading />
    </div>
  );
}
```

### Conditional Loading

```tsx
import { Loading } from "@bearlab/loading";
import { useState, useEffect } from "react";

function DataFetcher() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div style={{ position: "relative", height: "300px" }}>
        <Loading />
      </div>
    );
  }

  return <div>{/* Your content */}</div>;
}
```

### Custom Styled Loading

```tsx
import { Loading } from "@bearlab/loading";
import "./custom-loading.css";

function CustomLoading() {
  return (
    <div className="custom-loading-container">
      <Loading className="custom-loading" />
      <p>Loading your content...</p>
    </div>
  );
}
```

```css
/* custom-loading.css */
.custom-loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.custom-loading {
  /* Override default positioning for inline use */
  position: relative !important;
  transform: none !important;
  top: auto !important;
  left: auto !important;
  margin-bottom: 16px;
}

/* Custom size */
.custom-loading svg {
  width: 32px !important;
  height: 32px !important;
}

/* Custom color */
.custom-loading svg {
  color: #3b82f6;
}
```

## 📚 API Reference

### Props

| Prop        | Type     | Default     | Description                             |
| ----------- | -------- | ----------- | --------------------------------------- |
| `className` | `string` | `undefined` | Additional CSS class for custom styling |

### TypeScript Support

The component is fully typed with TypeScript:

```tsx
export interface Props {
  className?: string;
}
```

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## 🎨 Styling & Customization

### Default Behavior

The Loading component:

- Positions itself absolutely at the center of its nearest positioned parent
- Uses a 24x24px spinning icon by default
- Animates with a smooth 1-second rotation cycle
- Has a high z-index (10003) to appear above other content

### Custom Positioning

#### Relative Positioning

```css
.custom-loading {
  position: relative !important;
  transform: none !important;
  top: auto !important;
  left: auto !important;
}
```

#### Fixed Positioning

```css
.fixed-loading {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
}
```

### Custom Sizing

```css
/* Small spinner */
.small-loading svg {
  width: 16px !important;
  height: 16px !important;
}

/* Large spinner */
.large-loading svg {
  width: 48px !important;
  height: 48px !important;
}
```

### Custom Colors

```css
/* Blue spinner */
.blue-loading svg {
  color: #3b82f6;
}

/* Success green spinner */
.success-loading svg {
  color: #10b981;
}

/* Warning orange spinner */
.warning-loading svg {
  color: #f59e0b;
}
```

### Animation Customization

```css
/* Faster animation */
.fast-loading svg {
  animation-duration: 0.5s !important;
}

/* Slower animation */
.slow-loading svg {
  animation-duration: 2s !important;
}

/* Reverse animation */
.reverse-loading svg {
  animation-direction: reverse !important;
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
    <a href="https://www.npmjs.com/package/@bearlab/loading">📦 View on NPM</a>
  </p>
</div>
