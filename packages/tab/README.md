# @bearlab/tab

A flexible and customizable React tab component with support for icons, notifications, multiple layouts, and responsive design. Perfect for organizing content and creating intuitive navigation experiences. Part of the BearLab UI component library.

## ✨ Features

- **🎨 Two Action Types**: Button and underline tab styles
- **📱 Layout Options**: Horizontal and vertical orientations
- **🎯 Icon Support**: Add icons to tab headers for better UX
- **🔔 Notifications**: Display notification badges on tabs
- **🌗 Theme Support**: Built-in light and dark theme compatibility
- **📱 Responsive Design**: Mobile-friendly with scrollable tabs
- **♿ Accessibility**: Keyboard navigation and ARIA support
- **🎭 Smooth Animations**: Elegant transitions between tabs
- **🚀 Lightweight**: Minimal dependencies and optimized performance
- **📝 TypeScript**: Full type safety and IntelliSense support

## 📦 Installation

```bash
npm install @bearlab/badge
```

```bash
yarn add @bearlab/badge
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `classnames`: For conditional CSS class handling

## 📖 API Reference

### Tab Props

| Property     | Type                      | Default      | Description                           |
| ------------ | ------------------------- | ------------ | ------------------------------------- |
| `tabs`       | `TabItem[]`               | **Required** | Array of tab items to display         |
| `actionType` | `"button" \| "underline"` | **Required** | Visual style of the tabs              |
| `isVertical` | `boolean`                 | `false`      | Enable vertical layout (desktop only) |

### TabItem Interface

```tsx
interface TabItem {
  key: number; // Unique identifier for the tab
  title: string; // Tab header text
  content: string; // Tab content text
  notify: number | null; // Notification badge count (null for no badge)
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null; // Tab icon component
}
```

### Types

```tsx
interface Props {
  tabs: TabItem[];
  actionType: "button" | "underline";
  isVertical?: boolean;
}
```

## 🎯 Usage Examples

### Basic Button Tabs

```tsx
import { Tab } from "@bearlab/tab";

const BasicTabs = () => {
  const tabs = [
    {
      key: 0,
      title: "Home",
      content:
        "Welcome to the home section. Here you can find an overview of your dashboard.",
      notify: null,
      icon: null,
    },
    {
      key: 1,
      title: "Profile",
      content: "Manage your profile settings and personal information.",
      notify: null,
      icon: null,
    },
    {
      key: 2,
      title: "Settings",
      content: "Configure your application preferences and account settings.",
      notify: null,
      icon: null,
    },
  ];

  return <Tab tabs={tabs} actionType="button" />;
};
```

### Underline Style Tabs

```tsx
import { Tab } from "@bearlab/tab";

const UnderlineTabs = () => {
  const tabs = [
    {
      key: 0,
      title: "Analytics",
      content:
        "View detailed analytics and performance metrics for your account.",
      notify: null,
      icon: null,
    },
    {
      key: 1,
      title: "Reports",
      content: "Generate and download comprehensive reports.",
      notify: 2,
      icon: null,
    },
    {
      key: 2,
      title: "Exports",
      content: "Export your data in various formats.",
      notify: null,
      icon: null,
    },
  ];

  return <Tab tabs={tabs} actionType="underline" />;
};
```

### Tabs with Icons and Notifications

```tsx
import { Tab } from "@bearlab/tab";
import { HomeIcon, UserIcon, SettingsIcon, BellIcon } from "@your-icon-library";

const IconTabs = () => {
  const tabs = [
    {
      key: 0,
      title: "Dashboard",
      content: "Your main dashboard with key metrics and recent activity.",
      notify: null,
      icon: HomeIcon,
    },
    {
      key: 1,
      title: "Messages",
      content: "View and manage your messages and communications.",
      notify: 5,
      icon: BellIcon,
    },
    {
      key: 2,
      title: "Profile",
      content: "Update your profile information and account settings.",
      notify: null,
      icon: UserIcon,
    },
    {
      key: 3,
      title: "Settings",
      content: "Configure application settings and preferences.",
      notify: 1,
      icon: SettingsIcon,
    },
  ];

  return <Tab tabs={tabs} actionType="button" />;
};
```

### Vertical Layout Tabs

```tsx
import { Tab } from "@bearlab/tab";

const VerticalTabs = () => {
  const tabs = [
    {
      key: 0,
      title: "General",
      content: "General settings and configurations for your account.",
      notify: null,
      icon: null,
    },
    {
      key: 1,
      title: "Security",
      content:
        "Security settings including password and two-factor authentication.",
      notify: 2,
      icon: null,
    },
    {
      key: 2,
      title: "Notifications",
      content: "Manage your notification preferences and email settings.",
      notify: null,
      icon: null,
    },
    {
      key: 3,
      title: "Billing",
      content: "View billing information and manage your subscription.",
      notify: 1,
      icon: null,
    },
  ];

  return <Tab tabs={tabs} actionType="button" isVertical={true} />;
};
```

### Dynamic Content Tabs

```tsx
import { Tab } from "@bearlab/tab";
import { useState, useEffect } from "react";

const DynamicTabs = () => {
  const [notifications, setNotifications] = useState({
    orders: 0,
    messages: 0,
    alerts: 0,
  });

  useEffect(() => {
    // Simulate fetching notification counts
    const fetchNotifications = async () => {
      const counts = await api.getNotificationCounts();
      setNotifications(counts);
    };

    fetchNotifications();
  }, []);

  const tabs = [
    {
      key: 0,
      title: "Orders",
      content: "View and manage your recent orders and order history.",
      notify: notifications.orders > 0 ? notifications.orders : null,
      icon: null,
    },
    {
      key: 1,
      title: "Messages",
      content: "Read and respond to messages from customers and support.",
      notify: notifications.messages > 0 ? notifications.messages : null,
      icon: null,
    },
    {
      key: 2,
      title: "Alerts",
      content: "Important alerts and notifications requiring your attention.",
      notify: notifications.alerts > 0 ? notifications.alerts : null,
      icon: null,
    },
  ];

  return <Tab tabs={tabs} actionType="underline" />;
};
```

### Admin Dashboard Tabs

```tsx
import { Tab } from "@bearlab/tab";
import { ChartIcon, UsersIcon, SettingsIcon, ReportsIcon } from "@your-icons";

const AdminDashboard = () => {
  const tabs = [
    {
      key: 0,
      title: "Analytics",
      content: "View comprehensive analytics and key performance indicators.",
      notify: null,
      icon: ChartIcon,
    },
    {
      key: 1,
      title: "Users",
      content: "Manage user accounts, permissions, and access controls.",
      notify: 12,
      icon: UsersIcon,
    },
    {
      key: 2,
      title: "Reports",
      content: "Generate and schedule automated reports.",
      notify: 3,
      icon: ReportsIcon,
    },
    {
      key: 3,
      title: "System",
      content: "Configure system settings and maintenance options.",
      notify: null,
      icon: SettingsIcon,
    },
  ];

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      <Tab tabs={tabs} actionType="button" />
    </div>
  );
};
```

### Mobile-Responsive Tabs

```tsx
import { Tab } from "@bearlab/tab";
import { useMediaQuery } from "@your-hooks";

const ResponsiveTabs = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const tabs = [
    {
      key: 0,
      title: "Overview",
      content: "General overview and summary of your account.",
      notify: null,
      icon: null,
    },
    {
      key: 1,
      title: "Activity",
      content: "Recent activity and transaction history.",
      notify: 8,
      icon: null,
    },
    {
      key: 2,
      title: "Settings",
      content: "Account settings and preferences.",
      notify: null,
      icon: null,
    },
    {
      key: 3,
      title: "Help",
      content: "Help documentation and support resources.",
      notify: null,
      icon: null,
    },
  ];

  return (
    <Tab
      tabs={tabs}
      actionType={isMobile ? "underline" : "button"}
      isVertical={!isMobile}
    />
  );
};
```

## 🎨 Action Types

### Button Style

The default button style provides a clean, card-like appearance with rounded corners and subtle shadows.

**Best for:**

- Dashboard interfaces
- Settings panels
- Content management systems
- Applications requiring clear visual separation

```tsx
<Tab tabs={tabs} actionType="button" />
```

### Underline Style

A minimal style with bottom borders that's perfect for content-focused interfaces.

**Best for:**

- Product pages
- Documentation sites
- Blog interfaces
- Content-heavy applications

```tsx
<Tab tabs={tabs} actionType="underline" />
```

## 📱 Layout Options

### Horizontal Layout (Default)

Tabs are arranged horizontally with scrollable overflow on mobile devices.

```tsx
<Tab
  tabs={tabs}
  actionType="button"
  // isVertical defaults to false
/>
```

### Vertical Layout

Available on desktop screens (768px+), tabs are arranged vertically on the left side.

```tsx
<Tab tabs={tabs} actionType="button" isVertical={true} />
```

**Note:** Vertical layout automatically falls back to horizontal on mobile devices.

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## 🎨 🎭 Styling

### Color Scheme

| Element                | Light Theme                 | Dark Theme                  | Purpose             |
| ---------------------- | --------------------------- | --------------------------- | ------------------- |
| **Active Tab**         | White background, dark text | Dark background, light text | Current selection   |
| **Inactive Tab**       | Transparent, gray text      | Transparent, muted text     | Available options   |
| **Border**             | Light gray                  | Dark gray                   | Visual separation   |
| **Notification Badge** | Blue background             | Blue with transparency      | Attention indicator |

### Custom Styling

Override default styles using CSS:

```css
/* Custom tab container */
.custom-tabs {
  --tab-border-radius: 16px;
  --tab-padding: 16px 20px;
  --tab-gap: 12px;
}

/* Custom button styles */
.custom-tabs .header nav button {
  font-weight: 600;
  font-size: 15px;
  min-height: 44px;
}

/* Custom notification badges */
.custom-tabs .header nav button span {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
}

/* Custom underline style */
.custom-tabs.underLine nav button.active {
  border-bottom-width: 3px;
  border-color: #3b82f6;
}
```

### CSS Custom Properties

```css
.tab-container {
  --tab-active-bg: #ffffff;
  --tab-active-color: #1f2937;
  --tab-inactive-color: #6b7280;
  --tab-border-color: #e5e7eb;
  --tab-notification-bg: #3b82f6;
  --tab-notification-color: #ffffff;
}
```

## ♿ Accessibility

The Tab component is built with accessibility in mind:

## 📱 Responsive Behavior

The Tab component adapts to different screen sizes:

### Desktop (>768px)

- Full-width horizontal tabs or vertical sidebar layout
- Hover effects and animations
- All features available

### Mobile (<768px)

- Horizontal scrollable tabs
- Touch-friendly tap targets
- Vertical layout disabled (falls back to horizontal)
- Optimized spacing and typography

### Responsive Example

```css
/* Custom responsive behavior */
@media (max-width: 768px) {
  .tab-container .header nav {
    padding: 2px;
    gap: 4px;
  }

  .tab-container .header nav button {
    padding: 10px 16px;
    font-size: 14px;
    min-width: 80px;
  }

  .tab-container .content {
    padding: 16px;
  }
}
```

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
    <a href="https://www.npmjs.com/package/@bearlab/tab">📦 View on NPM</a>
  </p>
</div>
