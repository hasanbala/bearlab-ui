# @bearlab/input

A comprehensive, feature-rich input component for React applications with TypeScript support, including password visibility toggle, copy functionality, search integration, and flexible icon positioning.

## ✨ Features

- ✅ **Password Visibility Toggle** - Built-in show/hide password functionality
- 📋 **Copy to Clipboard** - One-click copy functionality with visual feedback
- 🔍 **Search Integration** - Built-in search icon and functionality
- 🎨 **Flexible Icon System** - Support for before/after icons with string or component
- 📝 **TypeScript Ready** - Full TypeScript support with proper type definitions
- 🌙 **Dark Mode Support** - Seamless light/dark theme switching
- ♿ **Fully Accessible** - WCAG compliant with proper ARIA attributes
- 🎯 **Validation Support** - Built-in error handling and display
- 📱 **Mobile Responsive** - Optimized for mobile devices
- 🔧 **Highly Customizable** - Extensive styling options and configurations
- ⚡ **Lightweight** - Minimal bundle size with tree-shaking support

## 📦 Installation

```bash
npm install @bearlab/input
```

```bash
yarn add @bearlab/input
```

## 🔗 Dependencies

- `react` >= 16.8.0
- `react-dom` >= 16.8.0
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `@bearlab/hooks` For handle copy by input
- `classnames` - For conditional CSS class handling

## 📚 API Reference

### Props

| Prop          | Type                                               | Default      | Description                                |
| ------------- | -------------------------------------------------- | ------------ | ------------------------------------------ |
| `label`       | `string`                                           | `undefined`  | Label text displayed above the input       |
| `value`       | `string \| number`                                 | `undefined`  | The input value                            |
| `onChange`    | `(e: React.ChangeEvent<HTMLInputElement>) => void` | **Required** | Callback fired when input value changes    |
| `type`        | `"text" \| "password" \| "email" \| "tel"`         | `"text"`     | Input type                                 |
| `placeholder` | `string`                                           | `undefined`  | Placeholder text                           |
| `error`       | `any`                                              | `undefined`  | Error message to display                   |
| `disabled`    | `boolean`                                          | `false`      | Whether the input is disabled              |
| `isRequired`  | `boolean`                                          | `false`      | Shows required asterisk (\*) next to label |
| `className`   | `string`                                           | `undefined`  | Additional CSS class for container         |
| `maxLength`   | `number`                                           | `undefined`  | Maximum number of characters               |

### Feature Props

| Prop              | Type                                                | Default     | Description                          |
| ----------------- | --------------------------------------------------- | ----------- | ------------------------------------ |
| `isExistPassword` | `boolean`                                           | `false`     | Adds password visibility toggle      |
| `isExistCopy`     | `boolean`                                           | `false`     | Adds copy to clipboard functionality |
| `isExistSearch`   | `boolean`                                           | `false`     | Adds search icon                     |
| `beforeIcon`      | `string \| React.FC<React.SVGProps<SVGSVGElement>>` | `undefined` | Icon displayed before the input      |
| `afterIcon`       | `string \| React.FC<React.SVGProps<SVGSVGElement>>` | `undefined` | Icon displayed after the input       |

### Event Handler Props

| Prop        | Type                                                 | Description                           |
| ----------- | ---------------------------------------------------- | ------------------------------------- |
| `onBlur`    | `(e: React.FocusEvent<HTMLInputElement>) => void`    | Callback fired when input loses focus |
| `onKeyDown` | `(e: React.KeyboardEvent<HTMLInputElement>) => void` | Callback fired on key press           |
| `onPaste`   | `React.ClipboardEventHandler<HTMLInputElement>`      | Callback fired on paste event         |
| `onClick`   | `(e: React.MouseEvent) => void`                      | Callback for search icon click        |

### TypeScript Support

The component is fully typed with TypeScript:

```tsx
export interface Props extends JSX.IntrinsicElements["input"] {
  error?: any;
  name?: string;
  value?: string | number;
  label?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  isRequired?: boolean;
  placeholder?: string;
  isExistCopy?: boolean;
  isExistSearch?: boolean;
  isExistPassword?: boolean;
  type?: "text" | "password" | "email" | "tel";
  beforeIcon?: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  afterIcon?: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onChange: (val: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (val: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  onClick?: (e: React.MouseEvent) => void;
}
```

### Icon System

The component supports flexible icon positioning:

- **beforeIcon**: Displayed on the left side with border separator
- **afterIcon**: Displayed on the right side with border separator
- **String icons**: Simple text/symbols (e.g., "@", "$", "%")
- **Component icons**: React SVG components from `@bearlab/core`

## 🎯 Usage Examples

### Standard Text Input

```tsx
import { Input } from "@bearlab/input";
import { useState } from "react";

function BasicExample() {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Input
      label="Full Name"
      value={value}
      onChange={handleChange}
      placeholder="Enter your full name"
    />
  );
}
```

### Password Input with Toggle

```tsx
import { Input } from "@bearlab/input";
import { useState } from "react";

function PasswordExample() {
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Input
      label="Password"
      type="password"
      value={password}
      onChange={handleChange}
      placeholder="Enter your password"
      isExistPassword={true}
      isRequired
    />
  );
}
```

### Copy to Clipboard Input

```tsx
import { Input } from "@bearlab/input";

function CopyExample() {
  const apiKey = "sk-1234567890abcdef";

  return (
    <Input
      label="API Key"
      value={apiKey}
      onChange={() => {}} // Read-only
      isExistCopy={true}
      disabled={true}
    />
  );
}
```

### Search Input

```tsx
import { Input } from "@bearlab/input";
import { useState } from "react";

function SearchExample() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement your search logic
  };

  return (
    <Input
      label="Search Products"
      value={searchQuery}
      onChange={handleChange}
      placeholder="Type to search..."
      isExistSearch={true}
      onClick={handleSearch}
    />
  );
}
```

### Input with Icons

```tsx
import { Input } from "@bearlab/input";
import { IconUser, IconMail } from "@bearlab/core";
import { useState } from "react";

function IconExample() {
  const [email, setEmail] = useState("");

  return (
    <div>
      {/* With icon component */}
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        beforeIcon={IconMail}
        placeholder="Enter your email"
      />

      {/* With string icon */}
      <Input
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        afterIcon="@"
        placeholder="Enter username"
      />
    </div>
  );
}
```

### Form Validation

```tsx
import { Input } from "@bearlab/input";
import { useState } from "react";

function ValidationExample() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
    };

  return (
    <form>
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        error={errors.email}
        isRequired
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange("password")}
        error={errors.password}
        isExistPassword={true}
        isRequired
        placeholder="Create a password"
      />

      <Input
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange("confirmPassword")}
        error={errors.confirmPassword}
        isExistPassword={true}
        isRequired
        placeholder="Confirm your password"
      />
    </form>
  );
}
```

### Complex Input with Multiple Features

```tsx
import { Input } from "@bearlab/input";
import { IconLock } from "@bearlab/core";
import { useState } from "react";

function ComplexExample() {
  const [secureData, setSecureData] = useState("encrypted-data-12345");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter pressed");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("Paste blocked for security");
  };

  return (
    <Input
      label="Secure Token"
      value={secureData}
      onChange={(e) => setSecureData(e.target.value)}
      beforeIcon={IconLock}
      isExistCopy={true}
      isExistPassword={true}
      type="password"
      maxLength={50}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      className="secure-input"
    />
  );
}
```

## 🎨 🎭 Styling

### CSS Custom Properties

```css
.your-input-class {
  --input-border-color: #e5e7eb;
  --input-focus-color: #3b82f6;
  --input-error-color: #ef4444;
  --input-background: transparent;
  --input-text-color: #374151;
  --input-placeholder-color: #9ca3af;
}
```

### Custom Styling

```css
.custom-input {
  /* Container styling */
}

.custom-input .inputWrapper input {
  border-radius: 12px;
  border: 2px solid #e2e8f0;
}

.custom-input .label {
  font-weight: 700;
  color: #1f2937;
}

.custom-input .withIcon {
  background-color: #f8fafc;
}
```

### Mobile Responsiveness

The component includes mobile-specific optimizations:

- Responsive label sizing
- Touch-friendly icon areas
- Optimized spacing for mobile devices
- Hidden elements that don't work well on mobile

## ♿ Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Visible focus indicators with proper contrast
- **Keyboard Navigation**: Full keyboard support
- **Error Announcements**: Screen reader announcements for validation errors
- **Semantic HTML**: Proper form element structure
- **Required Field Indicators**: Clear visual and programmatic required field marking

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
    <a href="https://www.npmjs.com/package/@bearlab/input">📦 View on NPM</a>
  </p>
</div>
