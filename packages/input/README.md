# Input Component

A flexible and feature-rich input component built with React and TypeScript, designed for modern web applications.

## Features

- 🔍 **Search functionality** - Built-in search icon support
- 👁️ **Password visibility toggle** - Show/hide password with eye icons
- 📋 **Copy to clipboard** - One-click copy functionality
- 🎨 **Customizable icons** - Support for before and after icons
- ✅ **Form validation** - Error state handling with visual feedback
- ♿ **Accessibility** - Proper ARIA labels and keyboard navigation
- 🎯 **Required field indicator** - Asterisk for required fields
- 🔒 **Disabled state** - Visual and functional disabled state

## Installation

```bash
npm install @bearlab/input
# or
yarn add @bearlab/input
```

## Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react classnames @bearlab/core @bearlab/view-error @bearlab/hooks
```

## Basic Usage

```tsx
import { Input } from "@bearlab/input";

function MyForm() {
  const [value, setValue] = useState("");

  return (
    <Input
      label="Username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter your username"
    />
  );
}
```

## Advanced Examples

### Password Input with Toggle Visibility

```tsx
<Input
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  isExistPassword={true}
  isRequired={true}
/>
```

### Search Input

```tsx
<Input
  label="Search"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  isExistSearch={true}
  onClick={handleSearch}
  placeholder="Type to search..."
/>
```

### Input with Copy Functionality

```tsx
<Input
  label="API Key"
  value={apiKey}
  onChange={(e) => setApiKey(e.target.value)}
  isExistCopy={true}
  disabled={true}
/>
```

### Input with Custom Icons

```tsx
import { UserIcon, LockIcon } from "your-icon-library";

<Input
  label="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  beforeIcon={UserIcon}
  afterIcon={LockIcon}
/>;
```

### Input with Error State

```tsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  isRequired={true}
/>
```

## Props

| Prop              | Type                                           | Default  | Description                        |
| ----------------- | ---------------------------------------------- | -------- | ---------------------------------- |
| `label`           | `string`                                       | -        | Input label text                   |
| `value`           | `string \| number`                             | -        | Input value                        |
| `onChange`        | `(e: ChangeEvent<HTMLInputElement>) => void`   | -        | **Required.** Change event handler |
| `type`            | `'text' \| 'password' \| 'email' \| 'tel'`     | `'text'` | Input type                         |
| `placeholder`     | `string`                                       | -        | Placeholder text                   |
| `disabled`        | `boolean`                                      | `false`  | Disable the input                  |
| `error`           | `any`                                          | -        | Error message to display           |
| `isRequired`      | `boolean`                                      | `false`  | Show required asterisk             |
| `className`       | `string`                                       | -        | Additional CSS class               |
| `maxLength`       | `number`                                       | -        | Maximum character length           |
| `beforeIcon`      | `string \| React.FC<SVGProps<SVGSVGElement>>`  | -        | Icon before input                  |
| `afterIcon`       | `string \| React.FC<SVGProps<SVGSVGElement>>`  | -        | Icon after input                   |
| `isExistSearch`   | `boolean`                                      | `false`  | Show search icon                   |
| `isExistPassword` | `boolean`                                      | `false`  | Enable password visibility toggle  |
| `isExistCopy`     | `boolean`                                      | `false`  | Enable copy functionality          |
| `onClick`         | `(e: MouseEvent) => void`                      | -        | Click handler for search icon      |
| `onBlur`          | `(e: FocusEvent<HTMLInputElement>) => void`    | -        | Blur event handler                 |
| `onKeyDown`       | `(e: KeyboardEvent<HTMLInputElement>) => void` | -        | KeyDown event handler              |
| `onPaste`         | `ClipboardEventHandler<HTMLInputElement>`      | -        | Paste event handler                |

## Styling

The component uses CSS modules with SCSS. You can override styles by targeting these classes:

```scss
.container {
  // Main container styles
}

.label {
  // Label styles
}

.inputWrapper {
  // Input wrapper styles
}

.withIcon {
  // Icon container styles
}

.beforeIcon {
  // Before icon positioning
}

.afterIcon {
  // After icon positioning
}

.error {
  // Error state styles
}

.disabled {
  // Disabled state styles
}
```

## Accessibility

- Uses semantic HTML with proper input labeling
- Supports keyboard navigation
- Screen reader friendly with ARIA attributes
- Focus management for password toggle and copy functionality

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [hasanbala]
