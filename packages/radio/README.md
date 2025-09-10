# @bearlab/radio

A modern, accessible React radio button component with advanced features including grouped radios, error states, tooltips, and comprehensive customization options.

## ✨ Features

🎯 **Single & Group Selection** - Individual radio buttons or grouped radio sets
✨ **Custom Styling** - Beautiful custom radio design with hover and focus states
🎨 **Dark Mode Ready** - Built-in dark theme support
🚨 **Error States** - Built-in error handling with visual feedback
💡 **Tooltip Support** - Optional popover tooltips for additional information
♿ **Accessibility First** - WCAG compliant with proper ARIA attributes
⌨️ **Keyboard Navigation** - Full keyboard support for navigation
🔧 **TypeScript Ready** - Complete TypeScript definitions
📱 **Responsive Design** - Works seamlessly across all device sizes
🎛️ **Flexible Layout** - Horizontal or vertical group layouts

## 📦 Installation

```bash
npm install @bearlab/radio
```

```bash
yarn add @bearlab/radio
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `classnames`: Utility for conditional CSS classes

## 🎯 Usage Examples

### Basic Radio Button

```tsx
import React, { useState } from "react";
import { Radio } from "@bearlab/radio";

export function BasicRadio() {
  const [selected, setSelected] = useState("");

  return (
    <div>
      <Radio
        name="basic"
        label="Option A"
        value="a"
        checked={selected === "a"}
        onChange={(e) => setSelected(e.target.value)}
      />
      <Radio
        name="basic"
        label="Option B"
        value="b"
        checked={selected === "b"}
        onChange={(e) => setSelected(e.target.value)}
      />
    </div>
  );
}
```

### Radio Group (Horizontal)

```tsx
import React, { useState } from "react";
import { Radio } from "@bearlab/radio";

export function HorizontalRadioGroup() {
  const [selectedValue, setSelectedValue] = useState("small");

  const sizeOptions = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
    { label: "Extra Large", value: "xl", disabled: true },
  ];

  return (
    <Radio.Group
      name="size"
      options={sizeOptions}
      value={selectedValue}
      onChange={(e) => setSelectedValue(e.target.value)}
    />
  );
}
```

### Radio Group (Vertical)

```tsx
import React, { useState } from "react";
import { Radio } from "@bearlab/radio";

export function VerticalRadioGroup() {
  const [selectedPlan, setSelectedPlan] = useState("basic");

  const planOptions = [
    { label: "Basic Plan - $9/month", value: "basic" },
    { label: "Pro Plan - $19/month", value: "pro" },
    { label: "Enterprise Plan - $49/month", value: "enterprise" },
  ];

  return (
    <Radio.Group
      name="plan"
      options={planOptions}
      value={selectedPlan}
      onChange={(e) => setSelectedPlan(e.target.value)}
      isVertical={true}
    />
  );
}
```

### With Error State

```tsx
import React, { useState } from "react";
import { Radio } from "@bearlab/radio";

export function RadioWithError() {
  const [selected, setSelected] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!selected) {
      setShowError(true);
    } else {
      setShowError(false);
      // Process form
    }
  };

  return (
    <div>
      <Radio
        name="required"
        label="I agree to the terms"
        value="agree"
        checked={selected === "agree"}
        onChange={(e) => {
          setSelected(e.target.value);
          setShowError(false);
        }}
        error={showError}
        isRequired={true}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

### With Tooltips

```tsx
import React, { useState } from "react";
import { Radio } from "@bearlab/radio";

export function RadioWithTooltips() {
  const [delivery, setDelivery] = useState("standard");

  return (
    <div>
      <Radio
        name="delivery"
        label="Standard Delivery"
        value="standard"
        checked={delivery === "standard"}
        onChange={(e) => setDelivery(e.target.value)}
        popover="Free delivery in 5-7 business days"
      />
    </div>
  );
}
```

### Form Integration

```tsx
// ✅ Good - Clear grouping with proper names
<Radio.Group
  name="payment-method"
  options={paymentOptions}
  value={paymentMethod}
  onChange={handlePaymentChange}
/>

// ❌ Avoid - Individual radios without proper grouping
<Radio name="payment1" value="card" onChange={handleChange} />
<Radio name="payment2" value="paypal" onChange={handleChange} />
```

## 📚 API Reference

### Radio Props

| Prop         | Type                            | Default      | Description                            |
| ------------ | ------------------------------- | ------------ | -------------------------------------- |
| `value`      | `string \| number`              | **Required** | The value of the radio button          |
| `onChange`   | `(e: RadioChangeEvent) => void` | **Required** | Callback fired when selection changes  |
| `name`       | `string`                        | -            | Name attribute for the radio input     |
| `label`      | `string`                        | -            | Label text displayed next to the radio |
| `checked`    | `boolean`                       | `false`      | Whether the radio is selected          |
| `disabled`   | `boolean`                       | `false`      | Whether the radio is disabled          |
| `error`      | `any`                           | -            | Error state indicator                  |
| `isRequired` | `boolean`                       | `false`      | Shows required asterisk (\*)           |
| `popover`    | `string`                        | -            | Tooltip text shown on hover            |
| `className`  | `string`                        | -            | Additional CSS classes                 |

### Radio.Group Props

| Prop         | Type                            | Default      | Description                           |
| ------------ | ------------------------------- | ------------ | ------------------------------------- |
| `options`    | `Array<RadioOption>`            | **Required** | Array of radio options                |
| `value`      | `string \| number`              | **Required** | Currently selected value              |
| `onChange`   | `(e: RadioChangeEvent) => void` | **Required** | Callback fired when selection changes |
| `name`       | `string`                        | -            | Name attribute for all radio inputs   |
| `disabled`   | `boolean`                       | `false`      | Disables all radio options            |
| `isVertical` | `boolean`                       | `false`      | Vertical layout instead of horizontal |
| `className`  | `string`                        | -            | Additional CSS classes                |

### TypeScript Interfaces

```tsx
interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface RadioChangeEvent {
  target: {
    value: string | number;
    checked: boolean;
  };
}

interface RadioProps {
  value: string | number;
  onChange: (e: RadioChangeEvent) => void;
  name?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  error?: any;
  isRequired?: boolean;
  popover?: string;
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

## 🎨 Styling

The component uses CSS modules and supports extensive customization.

### Default Structure

```html
<label class="container">
  <div class="radioWrapper">
    <input type="radio" />
    <span class="checkedWrapper">
      <span class="innerDot"></span>
    </span>
  </div>
  <div class="label">Label text</div>
</label>
```

### CSS Custom Properties

```css
/* Custom radio styles */
.my-radio .checkedWrapper {
  border-width: 2px;
  width: 24px;
  height: 24px;
}

.my-radio .checked {
  border-color: #10b981;
  background-color: #10b981;
}

.my-radio .innerDot {
  width: 10px;
  height: 10px;
}

/* Custom label styles */
.my-radio .label {
  font-size: 16px;
  font-weight: 500;
  color: #374151;
}

/* Hover effects */
.my-radio:hover .unchecked {
  border-color: #6b7280;
}
```

## ♿ Accessibility

This component follows WAI-ARIA guidelines:

- ✅ Proper `role` and ARIA attributes
- ✅ Keyboard navigation (Tab, Space, Arrow keys)
- ✅ Screen reader support
- ✅ Focus management
- ✅ High contrast mode support
- ✅ Required field indicators

### Keyboard Shortcuts

| Key                | Action                                 |
| ------------------ | -------------------------------------- |
| `Tab`              | Move focus to next radio group         |
| `Shift + Tab`      | Move focus to previous radio group     |
| `Space`            | Select focused radio button            |
| `Arrow Up/Down`    | Navigate within vertical radio group   |
| `Arrow Left/Right` | Navigate within horizontal radio group |

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
    <a href="https://www.npmjs.com/package/@bearlab/radio">📦 View on NPM</a>
  </p>
</div>
