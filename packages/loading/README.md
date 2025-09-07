# Loading Component

A simple, elegant loading spinner component built with React and TypeScript for indicating loading states in your application.

## Features

- 🎯 **Lightweight** - Minimal footprint with clean design
- 🎨 **Customizable** - Easy to style and customize
- ♿ **Accessible** - Screen reader friendly
- 📱 **Responsive** - Works on all screen sizes
- ⚡ **Performance** - Optimized with CSS animations

## Installation

```bash
npm install @bearlab/loading
# or
yarn add @bearlab/loading
```

## Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react classnames @bearlab/core
```

## Basic Usage

```tsx
import { Loading } from "@bearlab/loading";

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return <div>Your content here</div>;
}
```

## Examples

### Basic Loading Spinner

```tsx
<Loading />
```

### Custom Styled Loading Spinner

```tsx
<Loading className="my-custom-loading" />
```

### Conditional Loading

```tsx
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return <div>{loading ? <Loading /> : <div>{data}</div>}</div>;
}
```

### Overlay Loading

```tsx
function LoadingOverlay({ isLoading, children }) {
  return (
    <div style={{ position: "relative" }}>
      {children}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading />
        </div>
      )}
    </div>
  );
}
```

### Loading with Custom Size

```tsx
<Loading className="large-spinner" />

/* CSS */
.large-spinner .loading {
  width: 48px;
  height: 48px;
}
```

## Props

| Prop        | Type     | Default | Description                             |
| ----------- | -------- | ------- | --------------------------------------- |
| `className` | `string` | -       | Additional CSS class for custom styling |

## Styling

The component uses CSS modules with SCSS. You can override styles by targeting these classes:

```scss
.container {
  // Main container styles
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  // Loading icon styles
  animation: spin 1s linear infinite;
}
```

### Custom Styling Examples

```scss
// Large spinner
.large-loading {
  .loading {
    width: 48px;
    height: 48px;
  }
}

// Custom color
.custom-color {
  .loading {
    color: #3b82f6;
  }
}

// Slow animation
.slow-spin {
  .loading {
    animation-duration: 2s;
  }
}
```

## Animation

The component uses CSS animations for smooth rotation. The default animation:

```scss
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## Accessibility

- Uses semantic HTML structure
- Screen reader friendly with appropriate ARIA labels
- Respects user's motion preferences (`prefers-reduced-motion`)

## Use Cases

- **API calls** - Show while fetching data
- **Form submissions** - Indicate processing state
- **Page transitions** - Loading between routes
- **File uploads** - Progress indication
- **Lazy loading** - Content loading states

## Best Practices

### Do's ✅

- Use for operations that take more than 200ms
- Provide alternative text for screen readers
- Center align in the container
- Use consistent sizing across your app

### Don'ts ❌

- Don't use for very quick operations (< 200ms)
- Don't block user interaction unnecessarily
- Avoid multiple loading spinners on the same page
- Don't forget to handle loading state cleanup

## Performance

- Lightweight component with minimal re-renders
- CSS animations are hardware accelerated
- No JavaScript-based animations for better performance

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Supports CSS animations

## Troubleshooting

### Loading spinner not showing

- Check if the component is properly imported
- Verify that `@bearlab/core` is installed
- Ensure CSS modules are configured correctly

### Animation not smooth

- Check for conflicting CSS animations
- Verify hardware acceleration is enabled
- Consider reducing animation complexity for older devices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [hasanbala]
