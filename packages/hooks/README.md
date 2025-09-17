# @bearlab/hooks

A collection of reusable React hooks for common UI interactions and utilities. Part of the BearLab UI ecosystem.

## 📦 Installation

```bash
npm install @bearlab/hooks
```

```bash
yarn add @bearlab/hooks
```

## 📋 Requirements

- React >= 16.8.0 (Hooks support required)
- TypeScript support included

## 🎯 Available Hooks

### `useMediaQuery`

A hook for responsive design that tracks CSS media query matches in real-time.

#### Usage

```tsx
import { useMediaQuery } from "@bearlab/hooks";

function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  return (
    <div>
      {isMobile ? "Mobile View" : "Desktop View"}
      {isDarkMode && <p>Dark mode is enabled</p>}
      {isLandscape && <p>Landscape orientation</p>}
    </div>
  );
}
```

#### API

```tsx
useMediaQuery(query: string): boolean
```

**Parameters:**

- `query` (string): CSS media query string

**Returns:**

- `boolean`: Whether the media query currently matches

#### Examples

```tsx
// Breakpoints
const isSmall = useMediaQuery("(max-width: 640px)");
const isMedium = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
const isLarge = useMediaQuery("(min-width: 1025px)");

// Device preferences
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const isHighDPI = useMediaQuery("(min-resolution: 2dppx)");

// Print media
const isPrint = useMediaQuery("print");
```

---

### `useCopyByInput`

A hook for clipboard operations with built-in state management and error handling.

#### Usage

```tsx
import { useCopyByInput } from "@bearlab/hooks";

function CopyableInput() {
  const inputValue = "Hello, World!";
  const { isCopy, handleCopy } = useCopyByInput(inputValue, false);

  return (
    <div>
      <input value={inputValue} readOnly />
      <button onClick={handleCopy}>{isCopy ? "Copied!" : "Copy"}</button>
    </div>
  );
}
```

#### API

```tsx
useCopyByInput(
  value: string | number | undefined,
  isDisabled: boolean | undefined
): {
  isCopy: boolean;
  handleCopy: () => void;
}
```

**Parameters:**

- `value` (string | number | undefined): The value to copy to clipboard
- `isDisabled` (boolean | undefined): Whether the copy functionality is disabled

**Returns:**

- `isCopy` (boolean): Whether the content was recently copied (auto-resets after 3 seconds)
- `handleCopy` (function): Function to trigger the copy operation

#### Examples

```tsx
// Basic usage
const { isCopy, handleCopy } = useCopyByInput("Copy this text", false);

// With dynamic content
const [userEmail, setUserEmail] = useState("user@example.com");
const { isCopy, handleCopy } = useCopyByInput(userEmail, !userEmail);

// With numbers
const apiKey = 12345;
const { isCopy, handleCopy } = useCopyByInput(apiKey, false);

// Conditional disable
const isLoading = true;
const { isCopy, handleCopy } = useCopyByInput("data", isLoading);
```

#### Features

- ✅ **Auto-reset**: Copy state automatically resets after 3 seconds
- ✅ **Type-safe**: Supports string, number, and undefined values
- ✅ **Error handling**: Gracefully handles clipboard API failures
- ✅ **Conditional disable**: Prevents copying when disabled or value is empty
- ✅ **Cross-browser**: Uses modern Clipboard API with fallback handling

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
    <a href="https://www.npmjs.com/package/@bearlab/hooks">📦 View on NPM</a>
  </p>
</div>
