# OTPForm Component

A customizable One-Time Password (OTP) input form component built with React and TypeScript. Perfect for verification workflows, two-factor authentication, and secure code entry.

## Features

- 🔢 **Flexible Length** - Support for any OTP length (default 6 digits)
- ⌨️ **Smart Navigation** - Auto-focus next input on entry, backspace navigation
- 📋 **Paste Support** - Intelligent paste handling for full codes
- 🎯 **Input Validation** - Numbers-only mode or alphanumeric support
- ♿ **Accessibility** - Full keyboard navigation and screen reader support
- 🎨 **Customizable** - Easy styling and theming
- 📱 **Mobile Friendly** - Optimized for mobile keyboards
- ⚡ **Performance** - Efficient re-rendering with proper state management

## Installation

```bash
npm install @bearlab/otp-form
# or
yarn add @bearlab/otp-form
```

## Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react @bearlab/input
```

## Basic Usage

```tsx
import { OTPForm } from "@bearlab/otp-form";
import { useState } from "react";

function VerificationPage() {
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const otp = otpValue.join("");
    console.log("OTP:", otp);
  };

  return (
    <OTPForm
      passValue={otpValue}
      setPassValue={setOtpValue}
      title="Enter verification code"
      loading={loading}
    />
  );
}
```

## Advanced Examples

### 4-Digit PIN Entry

```tsx
<OTPForm
  passValue={pinValue}
  setPassValue={setPinValue}
  title="Enter your PIN"
  otpLength={4}
  justNumber={true}
  loading={isVerifying}
/>
```

### Alphanumeric Code (8 characters)

```tsx
<OTPForm
  passValue={codeValue}
  setPassValue={setCodeValue}
  title="Enter activation code"
  otpLength={8}
  justNumber={false}
  loading={isActivating}
/>
```

### Complete Verification Flow

```tsx
function TwoFactorAuth() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerification = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await verifyOTP(otpCode);
      // Redirect to success page
    } catch (err) {
      setError("Invalid code. Please try again.");
      setOtp(Array(6).fill("")); // Clear form
    } finally {
      setLoading(false);
    }
  };

  // Auto-submit when all fields are filled
  useEffect(() => {
    const isComplete = otp.every((digit) => digit !== "");
    if (isComplete && !loading) {
      handleVerification();
    }
  }, [otp]);

  return (
    <div>
      <OTPForm
        passValue={otp}
        setPassValue={setOtp}
        title="Enter the 6-digit code sent to your phone"
        loading={loading}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
```

### Custom Styling

```tsx
<div className="custom-otp-container">
  <OTPForm
    passValue={otp}
    setPassValue={setOtp}
    title="Verification Required"
    loading={loading}
  />
</div>

/* CSS */
.custom-otp-container .inputs input {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.custom-otp-container .inputs input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

## Props

| Prop           | Type                        | Default | Description                               |
| -------------- | --------------------------- | ------- | ----------------------------------------- |
| `passValue`    | `string[]`                  | -       | **Required.** Array of input values       |
| `setPassValue` | `(value: string[]) => void` | -       | **Required.** State setter function       |
| `title`        | `string`                    | -       | **Required.** Form title/instruction text |
| `loading`      | `boolean`                   | `false` | Disable inputs during processing          |
| `justNumber`   | `boolean`                   | `true`  | Restrict input to numbers only            |
| `otpLength`    | `number`                    | `6`     | Number of input fields                    |

## Behavior

### Keyboard Navigation

- **Type**: Automatically moves to next field
- **Backspace**: Clears current field and moves to previous
- **Arrow Left/Right**: Navigate between fields
- **Paste**: Distributes pasted content across fields

### Input Validation

- **Numbers only** (`justNumber: true`): Only accepts 0-9
- **Alphanumeric** (`justNumber: false`): Accepts all characters
- **Single character**: Each field accepts only one character

### State Management

```tsx
// Initialize empty OTP
const [otp, setOtp] = useState(Array(6).fill(""));

// Check if complete
const isComplete = otp.every((digit) => digit !== "");
const otpCode = otp.join("");

// Clear form
const clearOTP = () => setOtp(Array(6).fill(""));
```

## Styling

The component uses CSS modules with SCSS. Available classes:

```scss
.container {
  // Main container
}

.subHeader {
  // Title/instruction text
}

.inputs {
  // Input fields container
  display: flex;
  gap: 12px;
}

.inputs input {
  // Individual input field
  width: 48px;
  height: 48px;
  text-align: center;
  font-size: 18px;
}
```

### Customization Examples

```scss
// Large inputs
.large-otp .inputs input {
  width: 60px;
  height: 60px;
  font-size: 24px;
}

// Rounded style
.rounded-otp .inputs input {
  border-radius: 50%;
}

// Minimal style
.minimal-otp .inputs input {
  border: none;
  border-bottom: 2px solid #ccc;
  border-radius: 0;
  background: transparent;
}
```

## Accessibility

- Full keyboard navigation support
- Screen reader friendly with proper ARIA labels
- Focus management for seamless user experience
- High contrast support for better visibility

## Mobile Optimization

- Optimized input types for mobile keyboards
- Touch-friendly input sizes
- Proper viewport handling
- Smooth focus transitions

## Common Patterns

### Auto-Submit on Complete

```tsx
useEffect(() => {
  const isComplete = otp.every((digit) => digit !== "");
  if (isComplete) {
    handleSubmit();
  }
}, [otp]);
```

### Resend Code Timer

```tsx
const [countdown, setCountdown] = useState(60);

useEffect(() => {
  if (countdown > 0) {
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }
}, [countdown]);
```

### Error Handling

```tsx
const [error, setError] = useState("");

const handleError = (message: string) => {
  setError(message);
  setOtp(Array(6).fill("")); // Clear form
  // Focus first input
  inputsRef.current[0]?.focus();
};
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with full touch support
- Supports clipboard API for paste functionality

## Troubleshooting

### Paste not working

- Ensure the browser supports clipboard API
- Check if inputs are focused
- Verify paste data format

### Navigation issues

- Check if inputs have proper refs
- Ensure keyboard event handlers are attached
- Verify focus management logic

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [hasanbala]
