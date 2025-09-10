# @bearlab/otp-form

A highly customizable and accessible React OTP (One-Time Password) input component with advanced features like auto-focus, paste support, and keyboard navigation.

## ✨ Features

✨ **Auto-focus Navigation** - Automatically moves to the next input field when typing
🔐 **Number/Text Support** - Configure to accept only numbers or any characters
📋 **Paste Support** - Intelligent paste handling that distributes pasted content across inputs
⌨️ **Keyboard Navigation** - Full support for arrow keys and backspace navigation
🎨 **Dark Mode Ready** - Built-in dark theme support
♿ **Accessibility** - Screen reader friendly with proper ARIA attributes
🔧 **Highly Customizable** - Configurable length, validation, and styling
🚀 **TypeScript Support** - Full TypeScript definitions included
📱 **Responsive Design** - Works seamlessly across all device sizes

## 📦 Installation

```bash
npm install @bearlab/otp-form
```

```bash
yarn add @bearlab/otp-form
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/input` - Input component base
- `classnames` - For conditional CSS class handling

## 🎯 Usage Examples

### Basic 6-Digit Numeric OTP

```tsx
import React, { useState } from "react";
import { OTPForm } from "@bearlab/otp-form";

export function BasicOTP() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  return (
    <OTPForm
      passValue={otp}
      setPassValue={setOtp}
      title="Enter your 6-digit code"
    />
  );
}
```

### 4-Digit PIN Input

```tsx
import React, { useState } from "react";
import { OTPForm } from "@bearlab/otp-form";

export function PinInput() {
  const [pin, setPin] = useState<string[]>(new Array(4).fill(""));

  return (
    <OTPForm
      passValue={pin}
      setPassValue={setPin}
      title="Enter your PIN"
      otpLength={4}
      justNumber={true}
    />
  );
}
```

### Alphanumeric Code Input

```tsx
import React, { useState } from "react";
import { OTPForm } from "@bearlab/otp-form";

export function AlphanumericCode() {
  const [code, setCode] = useState<string[]>(new Array(8).fill(""));

  return (
    <OTPForm
      passValue={code}
      setPassValue={setCode}
      title="Enter activation code"
      otpLength={8}
      justNumber={false}
    />
  );
}
```

### With Loading State

```tsx
import React, { useState } from "react";
import { OTPForm } from "@bearlab/otp-form";

export function OTPWithLoading() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      // Simulate API call
      await verifyOTP(otp.join(""));
    } catch (error) {
      console.error("Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>
      <OTPForm
        passValue={otp}
        setPassValue={setOtp}
        title="Enter verification code"
        loading={isVerifying}
      />
      <button onClick={handleVerify} disabled={isVerifying}>
        {isVerifying ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
}
```

## 📚 API Reference

### Props

| Prop           | Type                        | Default      | Description                                  |
| -------------- | --------------------------- | ------------ | -------------------------------------------- |
| `passValue`    | `string[]`                  | **Required** | Array containing the current OTP values      |
| `setPassValue` | `(value: string[]) => void` | **Required** | Function to update the OTP values            |
| `title`        | `string`                    | **Required** | Label/title displayed above the input fields |
| `otpLength`    | `number`                    | `6`          | Number of input fields to render             |
| `justNumber`   | `boolean`                   | `true`       | Whether to accept only numeric input         |
| `loading`      | `boolean`                   | `false`      | Disables all inputs when true                |

### TypeScript Interface

```tsx
interface Props {
  setPassValue: (value: string[]) => void;
  passValue: string[];
  loading?: boolean;
  title: string;
  justNumber?: boolean;
  otpLength?: number;
}
```

### Keyboard Shortcuts

| Key                | Action                                       |
| ------------------ | -------------------------------------------- |
| `0-9`              | Enter digit (when `justNumber` is true)      |
| `a-z`, `A-Z`       | Enter character (when `justNumber` is false) |
| `Backspace`        | Clear current field and move to previous     |
| `ArrowLeft`        | Move to previous field                       |
| `ArrowRight`       | Move to next field                           |
| `Ctrl+V` / `Cmd+V` | Paste and distribute content                 |

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## 🎨 Styling

The component uses CSS modules and supports both light and dark themes out of the box.

### Default Structure

```html
<div class="container">
  <div class="subHeader">Title text</div>
  <div class="inputs">
    <input type="text" maxlength="1" />
    <input type="text" maxlength="1" />
    <!-- ... more inputs -->
  </div>
</div>
```

### CSS Custom Properties

You can override the default styles by targeting the component's CSS classes:

```css
.otp-form-container .inputs input {
  border-radius: 8px;
  border: 2px solid #e1e5e9;
  background-color: #ffffff;
}

.otp-form-container .inputs input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}
```

## ♿ Accessibility

This component follows WAI-ARIA guidelines and includes:

- Proper `role` and `aria-label` attributes
- Keyboard navigation support
- Screen reader announcements
- Focus management
- High contrast support

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
    <a href="https://www.npmjs.com/package/@bearlab/otp-form">📦 View on NPM</a>
  </p>
</div>
