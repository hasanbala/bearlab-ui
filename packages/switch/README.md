# Switch Component

A modern, accessible toggle switch component for React applications. Provides a sleek alternative to traditional checkboxes with smooth animations and comprehensive features.

## Features

- 🎨 **Modern Design**: Clean, iOS-inspired toggle switch
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 🏷️ **Flexible Labeling**: Support for labels, error messages, and help text
- 🔧 **Customizable**: Easy to style and integrate
- 📱 **Touch Friendly**: Optimized for mobile interactions
- 🎯 **TypeScript Support**: Complete type definitions included
- ❗ **Error Handling**: Built-in error state display
- 💡 **Popover Support**: Optional help text with popover

## Installation

```bash
npm install your-switch-package-name
# or
yarn add your-switch-package-name
```

## Dependencies

This component requires the following peer dependencies:

- `@bearlab/popover` (for popover functionality)
- `@bearlab/view-error` (for error display)

## Usage

### Basic Example

```tsx
import { Switch } from "your-switch-package-name";
import { useState } from "react";

function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch
      checked={isEnabled}
      onChange={(e) => setIsEnabled(e.target.checked)}
      label="Enable notifications"
    />
  );
}
```

### With Label and Required Indicator

```tsx
<Switch
  checked={darkMode}
  onChange={handleDarkModeToggle}
  label="Dark Mode"
  name="darkMode"
  isRequired
/>
```

### With Error State

```tsx
<Switch
  checked={termsAccepted}
  onChange={handleTermsChange}
  label="I accept the terms and conditions"
  name="terms"
  error="You must accept the terms to continue"
  isRequired
/>
```

### With Help Text (Popover)

```tsx
<Switch
  checked={analyticsEnabled}
  onChange={handleAnalyticsToggle}
  label="Analytics"
  name="analytics"
  popover="Help us improve by sharing anonymous usage data"
/>
```

### Disabled State

```tsx
<Switch checked={false} onChange={() => {}} label="Premium Feature" disabled />
```

## Props

| Prop         | Type                                             | Default     | Required | Description                             |
| ------------ | ------------------------------------------------ | ----------- | -------- | --------------------------------------- |
| `checked`    | `boolean`                                        | -           | ✅       | Current checked state of the switch     |
| `onChange`   | `(event: ChangeEvent<HTMLInputElement>) => void` | -           | ✅       | Callback fired when the state changes   |
| `label`      | `string`                                         | `undefined` | ❌       | Label text displayed next to the switch |
| `name`       | `string`                                         | `undefined` | ❌       | HTML name attribute                     |
| `disabled`   | `boolean`                                        | `false`     | ❌       | Whether the switch is disabled          |
| `error`      | `any`                                            | `undefined` | ❌       | Error message to display                |
| `isRequired` | `boolean`                                        | `false`     | ❌       | Shows required indicator (\*)           |
| `popover`    | `string`                                         | `undefined` | ❌       | Help text shown in popover              |
| `className`  | `string`                                         | `undefined` | ❌       | Additional CSS class names              |

All other standard HTML input props are also supported.

## Styling

The component uses CSS modules for styling. You can customize the appearance by:

### Using className prop

```tsx
<Switch className="my-switch" checked={value} onChange={handler} />
```

### CSS Module overrides

```css
.my-switch {
  /* Container styles */
}

.my-switch .slider {
  /* Slider track styles */
  background-color: #e0e0e0;
  border-radius: 20px;
}

.my-switch .toggle {
  /* Toggle button styles */
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.my-switch .checked {
  /* Checked state styles */
  background-color: #007bff;
}
```

### Custom CSS Properties

```css
.my-switch {
  --switch-width: 50px;
  --switch-height: 28px;
  --toggle-size: 24px;
  --switch-padding: 2px;
}
```

## States

### Default State

- Clean, minimal appearance
- Smooth hover effects
- Clear visual feedback

### Checked State

- Distinctive color change
- Smooth toggle animation
- Clear active indication

### Disabled State

- Reduced opacity
- No interaction possible
- Maintains visual consistency

### Error State

- Error message display
- Visual error indication
- Maintains functionality

## Accessibility

The Switch component follows WCAG guidelines:

- **Keyboard Navigation**: Full support for Space and Enter keys
- **Screen Reader**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **High Contrast**: Works with high contrast modes

### Keyboard Shortcuts

| Key           | Action                                 |
| ------------- | -------------------------------------- |
| `Space`       | Toggle the switch state                |
| `Enter`       | Toggle the switch state                |
| `Tab`         | Navigate to next focusable element     |
| `Shift + Tab` | Navigate to previous focusable element |

## TypeScript

Complete TypeScript support with exported types:

```tsx
interface SwitchProps extends Omit<JSX.IntrinsicElements["input"], "popover"> {
  error?: any;
  name?: string;
  label?: string;
  checked: boolean;
  popover?: string;
  disabled?: boolean;
  className?: string;
  isRequired?: boolean;
  onChange: (val: React.ChangeEvent<HTMLInputElement>) => void;
}
```

## Examples

### Form Integration

```tsx
import { Switch } from "your-switch-package-name";
import { useState } from "react";

function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    analytics: true,
  });

  const handleSettingChange =
    (key: keyof typeof settings) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings((prev) => ({
        ...prev,
        [key]: e.target.checked,
      }));
    };

  return (
    <form>
      <Switch
        checked={settings.notifications}
        onChange={handleSettingChange("notifications")}
        label="Push Notifications"
        name="notifications"
        popover="Receive notifications about important updates"
      />

      <Switch
        checked={settings.darkMode}
        onChange={handleSettingChange("darkMode")}
        label="Dark Mode"
        name="darkMode"
      />

      <Switch
        checked={settings.analytics}
        onChange={handleSettingChange("analytics")}
        label="Analytics"
        name="analytics"
        popover="Help us improve by sharing anonymous usage data"
      />
    </form>
  );
}
```

### Validation Example

```tsx
function ConsentForm() {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!accepted) {
      setError("You must accept the terms to continue");
      return;
    }
    setError("");
    // Continue with form submission
  };

  return (
    <div>
      <Switch
        checked={accepted}
        onChange={(e) => {
          setAccepted(e.target.checked);
          if (e.target.checked) setError("");
        }}
        label="I accept the terms and conditions"
        error={error}
        isRequired
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

### Conditional Rendering

```tsx
function FeatureToggle() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div>
      <Switch
        checked={showAdvanced}
        onChange={(e) => setShowAdvanced(e.target.checked)}
        label="Show Advanced Options"
      />

      {showAdvanced && (
        <div className="advanced-options">{/* Advanced settings here */}</div>
      )}
    </div>
  );
}
```

## Browser Support

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

## License

MIT License - see LICENSE file for details.

## Changelog

### v1.0.0

- Initial release
- Full accessibility support
- Error state handling
- Popover integration
- TypeScript support
- CSS modules styling
