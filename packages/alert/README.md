# @bearlab/alert

A versatile and accessible React alert component for displaying important messages, notifications, and user feedback. Features multiple variants with contextual icons and optional action links. Part of the BearLab UI component library.

## ✨ Features

- **🎨 Four Variants**: Success, error, warning, and info states
- **🎯 Contextual Icons**: Automatic icon selection based on variant
- **🔗 Optional Links**: Add action links with customizable text and URLs
- **🌗 Theme Support**: Built-in light and dark theme compatibility
- **♿ Accessibility**: ARIA labels and semantic HTML structure
- **📱 Responsive**: Looks great on all screen sizes
- **🎭 Consistent Design**: Unified styling across all variants
- **🚀 Lightweight**: Minimal dependencies and optimized bundle size
- **📝 TypeScript**: Full type safety and IntelliSense support

## 📦 Installation

```bash
npm install @bearlab/alert
```

```bash
yarn add @bearlab/alert
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `classnames`: For conditional CSS class handling

## 📖 API Reference

### Alert Props

| Property   | Type           | Default        | Description                       |
| ---------- | -------------- | -------------- | --------------------------------- |
| `variant`  | `AlertVariant` | **Required**   | Alert type and visual style       |
| `title`    | `string`       | **Required**   | Alert title text                  |
| `message`  | `string`       | **Required**   | Alert description message         |
| `showLink` | `boolean`      | `false`        | Whether to display an action link |
| `linkHref` | `string`       | `"/"`          | URL for the action link           |
| `linkText` | `string`       | `"Learn more"` | Text content for the action link  |

### Types

```tsx
type AlertVariant = "success" | "error" | "warning" | "info";

interface Props {
  variant: AlertVariant;
  title: string;
  message: string;
  showLink?: boolean;
  linkHref?: string;
  linkText?: string;
}
```

## 🎯 Usage Examples

### Basic Alerts

```tsx
import { Alert } from "@bearlab/alert";

const BasicAlerts = () => {
  return (
    <div className="alerts-container">
      <Alert
        variant="success"
        title="Changes Saved"
        message="Your profile has been updated successfully."
      />

      <Alert
        variant="error"
        title="Validation Error"
        message="Please fill in all required fields before submitting."
      />

      <Alert
        variant="warning"
        title="Storage Almost Full"
        message="You're using 95% of your storage space."
      />

      <Alert
        variant="info"
        title="New Feature Available"
        message="Check out our new dashboard analytics feature."
      />
    </div>
  );
};
```

### Alert with Action Links

```tsx
import { Alert } from "@bearlab/alert";

const ActionAlerts = () => {
  return (
    <div className="alerts-with-actions">
      <Alert
        variant="error"
        title="Connection Lost"
        message="Unable to connect to the server. Please check your internet connection."
        showLink={true}
        linkHref="/help/connection-issues"
        linkText="Troubleshoot"
      />

      <Alert
        variant="warning"
        title="Password Expires Soon"
        message="Your password will expire in 7 days for security reasons."
        showLink={true}
        linkHref="/settings/password"
        linkText="Update password"
      />

      <Alert
        variant="info"
        title="Update Available"
        message="A new version of the app is available with bug fixes and improvements."
        showLink={true}
        linkHref="/downloads"
        linkText="Download update"
      />
    </div>
  );
};
```

## 🎨 Variants

### Success Alert

Used for positive feedback and successful operations.

```tsx
<Alert
  variant="success"
  title="Payment Successful"
  message="Your payment has been processed successfully."
/>
```

### Error Alert

Used for error messages and failed operations.

```tsx
<Alert
  variant="error"
  title="Payment Failed"
  message="We couldn't process your payment. Please try again."
  showLink={true}
  linkHref="/help/payment-issues"
  linkText="Get help"
/>
```

### Warning Alert

Used for cautionary messages and potential issues.

```tsx
<Alert
  variant="warning"
  title="Account Expiring Soon"
  message="Your account will expire in 3 days. Please renew to continue using our services."
  showLink={true}
  linkHref="/billing/renew"
  linkText="Renew now"
/>
```

### Info Alert

Used for general information and neutral messages.

```tsx
<Alert
  variant="info"
  title="System Maintenance"
  message="We'll be performing scheduled maintenance on Sunday from 2-4 AM EST."
  showLink={true}
  linkHref="/status"
  linkText="View status page"
/>
```

### Responsive Design

Alerts work seamlessly across all device sizes:

```css
/* Mobile optimizations */
@media (max-width: 768px) {
  .alert-container {
    margin: 16px;
    padding: 12px;
  }

  .alert-content {
    gap: 8px;
  }

  .alert-title {
    font-size: 14px;
  }

  .alert-description {
    font-size: 13px;
  }
}
```

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## ♿ Accessibility

The Alert component is built with accessibility in mind:

### ARIA Support

- Proper semantic HTML structure
- Contextual color coding with icons for non-color users
- Focus management for interactive elements

### Screen Reader Support

- Clear hierarchy with title and message structure
- Meaningful link text and descriptions
- Proper color contrast ratios (WCAG AA compliant)

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
    <a href="https://www.npmjs.com/package/@bearlab/alert">📦 View on NPM</a>
  </p>
</div>
