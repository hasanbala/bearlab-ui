# @bearlab/go-back

A flexible and accessible navigation component for React applications that provides "Go Back" functionality with TypeScript support.

## ✨ Features

- ✅ **Router Agnostic** - Works with any routing solution (React Router, Next.js, etc.)
- 🔄 **Browser History Support** - Navigate back through browser history
- 🎯 **Custom Destinations** - Navigate to specific routes or paths
- 🎨 **Consistent Design** - Built on top of @bearlab/button for consistent styling
- 📝 **TypeScript Ready** - Full TypeScript support with proper type definitions
- ♿ **Accessible** - WCAG compliant with proper ARIA attributes
- 🔧 **Customizable** - Custom labels, styling, and disabled states
- ⚡ **Lightweight** - Minimal bundle size with tree-shaking support
- 📱 **Responsive** - Works perfectly on all screen sizes

## 📦 Installation

```bash
npm install @bearlab/go-back
```

```bash
yarn add @bearlab/go-back
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/button` - For go back button
- `classnames` - For conditional CSS class handling

## 📚 API Reference

### Props

| Prop          | Type                                      | Default      | Description                                                          |
| ------------- | ----------------------------------------- | ------------ | -------------------------------------------------------------------- |
| `destination` | `string`                                  | **Required** | The route or path to navigate to when not using browser history      |
| `label`       | `string`                                  | `"Go Back"`  | Text displayed on the button                                         |
| `className`   | `string`                                  | `undefined`  | Additional CSS class for custom styling                              |
| `hasBack`     | `boolean`                                 | `false`      | If true, uses browser history navigation (-1) instead of destination |
| `isDisabled`  | `boolean`                                 | `false`      | Disables the button and prevents navigation                          |
| `onNavigate`  | `(destination: string \| number) => void` | **Required** | Callback function to handle navigation                               |

### Navigation Logic

The component follows this navigation logic:

1. If `isDisabled` is `true` → No navigation occurs
2. If `hasBack` is `true` → Calls `onNavigate(-1)` for browser history navigation
3. Otherwise → Calls `onNavigate(destination)` for route navigation

### TypeScript Support

The component is fully typed with TypeScript:

```tsx
export interface Props {
  destination: string;
  label?: string;
  className?: string;
  hasBack?: boolean;
  isDisabled?: boolean;
  onNavigate: (destination: string | number) => void;
}
```

## 🎯 Usage Examples

### With React Router

```tsx
import { GoBack } from "@bearlab/go-back";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const navigate = useNavigate();

  const handleNavigate = (destination: string | number) => {
    if (typeof destination === "number") {
      navigate(destination); // Browser history navigation
    } else {
      navigate(destination); // Route navigation
    }
  };

  return (
    <div>
      <GoBack destination="/products" onNavigate={handleNavigate} />
      <h1>Product Details</h1>
      {/* Rest of your component */}
    </div>
  );
}
```

### With Next.js

```tsx
import { GoBack } from "@bearlab/go-back";
import { useRouter } from "next/router";

function ProductPage() {
  const router = useRouter();

  const handleNavigate = (destination: string | number) => {
    if (typeof destination === "number") {
      router.back(); // Browser history navigation
    } else {
      router.push(destination); // Route navigation
    }
  };

  return (
    <div>
      <GoBack destination="/products" onNavigate={handleNavigate} />
      <h1>Product Page</h1>
      {/* Rest of your component */}
    </div>
  );
}
```

### Browser History Navigation

```tsx
import { GoBack } from "@bearlab/go-back";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();

  const handleNavigate = (destination: string | number) => {
    if (typeof destination === "number") {
      navigate(destination);
    } else {
      navigate(destination);
    }
  };

  return (
    <div>
      <GoBack
        label="Back to Previous Page"
        destination="/dashboard" // Fallback destination
        hasBack={true} // Use browser history
        onNavigate={handleNavigate}
      />
      <h1>User Profile</h1>
      {/* Component content */}
    </div>
  );
}
```

### Custom Styling

```tsx
import { GoBack } from "@bearlab/go-back";
import "./custom-styles.css";

function CustomGoBack() {
  const handleNavigate = (destination: string | number) => {
    // Your navigation logic
  };

  return (
    <GoBack
      label="← Return to Dashboard"
      destination="/dashboard"
      onNavigate={handleNavigate}
      className="custom-go-back-style"
    />
  );
}
```

```css
/* custom-styles.css */
.custom-go-back-style {
  margin-bottom: 20px;

  /* Override button styles */
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
}

.custom-go-back-style:hover {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
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

### Default Styling

The component uses the secondary variant of `@bearlab/button` with:

- Arrow icon rotated 180 degrees (pointing left)
- Icon positioned before text
- Max-content width
- 30px bottom margin

### Custom CSS Classes

Override styles by targeting the component's classes:

```css
.your-custom-class {
  /* Container styles */
  margin-bottom: 20px;
  width: auto;
}

.your-custom-class svg {
  /* Icon styles - already rotated 180deg */
  width: 16px;
  height: 16px;
}
```

## ♿ Accessibility

The GoBack component inherits accessibility features from `@bearlab/button`:

- Proper focus management with visible focus indicators
- Keyboard navigation support (Enter/Space)
- Screen reader announcements
- ARIA attributes for button states
- Semantic button element usage

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
    <a href="https://www.npmjs.com/package/@bearlab/go-back">📦 View on NPM</a>
  </p>
</div>
