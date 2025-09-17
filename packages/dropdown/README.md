# @bearlab/dropdown

A flexible and accessible React dropdown component with multiple variants for different use cases. Features click-outside handling, keyboard navigation, and theme support.

## ✨ Features

- 🎯 **Multiple Components** - Three dropdown variants for different needs
- 🖱️ **Click Outside Detection** - Automatically closes when clicking outside
- ⌨️ **Keyboard Navigation** - Full keyboard accessibility support
- 🎨 **Theme Support** - Built-in light/dark theme compatibility
- 🔗 **Flexible Items** - Support for buttons, links, and custom content
- 📱 **Responsive Design** - Works seamlessly across different screen sizes
- 🎭 **Customizable Styling** - Easy theming with CSS modules
- ⚡ **TypeScript** - Full TypeScript support with comprehensive type definitions
- 🎪 **Animated** - Smooth transitions and hover effects
- 📍 **Smart Positioning** - Automatic positioning with overflow handling

## 📦 Installation

```bash
npm install @bearlab/dropdown
```

```bash
yarn add @bearlab/dropdown
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/button` - For dropdown trigger buttons
- `classnames` - For conditional CSS class handling

## 📚 API Reference

### Components Overview

This package exports three main components:

1. **`Dropdown`** - The base container component
2. **`DropdownItem`** - Individual menu items (buttons or links)
3. **`DropdownBasic`** - A complete dropdown solution with built-in trigger

### Dropdown Component

| Prop        | Type              | Default      | Description                               |
| ----------- | ----------------- | ------------ | ----------------------------------------- |
| `show`      | `boolean`         | **Required** | Controls the visibility of the dropdown   |
| `onClose`   | `() => void`      | **Required** | Callback fired when dropdown should close |
| `children`  | `React.ReactNode` | **Required** | Content to render inside dropdown         |
| `className` | `string`          | `undefined`  | Additional CSS class names                |

### DropdownItem Component

| Prop          | Type              | Default      | Description                       |
| ------------- | ----------------- | ------------ | --------------------------------- |
| `children`    | `React.ReactNode` | **Required** | Content to render inside the item |
| `tag`         | `"a" \| "button"` | `"button"`   | HTML element type to render       |
| `href`        | `string`          | `undefined`  | URL for link items (when tag="a") |
| `onClick`     | `() => void`      | `undefined`  | Click handler for the item        |
| `onItemClick` | `() => void`      | `undefined`  | Additional click handler          |
| `className`   | `string`          | `undefined`  | Additional CSS class names        |

### DropdownBasic Component

| Prop        | Type             | Default      | Description                           |
| ----------- | ---------------- | ------------ | ------------------------------------- |
| `list`      | `DropdownConfig` | **Required** | Configuration object for the dropdown |
| `className` | `string`         | `undefined`  | Additional CSS class names            |

#### DropdownConfig Interface

```tsx
interface DropdownConfig {
  dropdownLabel: string;
  options: {
    label: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    href: string;
  }[][];
}
```

### Keyboard Shortcuts

- **Tab**: Navigate between dropdown items
- **Enter/Space**: Activate focused item
- **Escape**: Close dropdown
- **Arrow Keys**: Navigate items (when focus is within dropdown)

## 🎯 Usage Examples

### Basic Dropdown with Custom Trigger

```tsx
import { Dropdown, DropdownItem } from "@bearlab/dropdown";
import { useState } from "react";

function CustomDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-toggle">
        Open Menu
      </button>

      <Dropdown show={isOpen} onClose={() => setIsOpen(false)}>
        <DropdownItem onClick={() => console.log("Profile clicked")}>
          View Profile
        </DropdownItem>
        <DropdownItem onClick={() => console.log("Settings clicked")}>
          Settings
        </DropdownItem>
        <DropdownItem
          tag="a"
          href="/logout"
          onClick={() => console.log("Logout clicked")}
        >
          Logout
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
```

### Ready-to-Use DropdownBasic

```tsx
import { DropdownBasic } from "@bearlab/dropdown";
import { UserIcon, SettingsIcon, LogoutIcon } from "your-icon-library";

function UserMenu() {
  const menuConfig = {
    dropdownLabel: "User Menu",
    options: [
      [
        {
          label: "View Profile",
          icon: UserIcon,
          href: "/profile",
        },
        {
          label: "Settings",
          icon: SettingsIcon,
          href: "/settings",
        },
      ],
      [
        {
          label: "Logout",
          icon: LogoutIcon,
          href: "/logout",
        },
      ],
    ],
  };

  return <DropdownBasic list={menuConfig} />;
}
```

### Navigation Dropdown

```tsx
function NavigationDropdown() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="nav-dropdown">
      <button
        onClick={() => setShowNav(!showNav)}
        className="dropdown-toggle nav-trigger"
      >
        Menu
      </button>

      <Dropdown show={showNav} onClose={() => setShowNav(false)}>
        <DropdownItem tag="a" href="/about">
          About Us
        </DropdownItem>
        <DropdownItem tag="a" href="/services">
          Services
        </DropdownItem>
        <DropdownItem tag="a" href="/contact">
          Contact
        </DropdownItem>
        <DropdownItem onClick={() => setShowNav(false)}>
          Close Menu
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
```

### Integration with State Management

```tsx
// With Redux/Context
function ConnectedDropdown() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
  };

  return (
    <Dropdown show={isOpen} onClose={() => setIsOpen(false)}>
      <DropdownItem>Welcome, {user.name}!</DropdownItem>
      <DropdownItem tag="a" href="/profile">
        Profile
      </DropdownItem>
      <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
    </Dropdown>
  );
}
```

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## 🎨 🎭 Styling

### CSS Variables

```css
.my-custom-dropdown {
  --dropdown-border-radius: 16px;
  --dropdown-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  --dropdown-padding: 16px;
  --dropdown-item-padding: 12px 20px;
  --dropdown-item-border-radius: 8px;
}
```

### Custom Styling

```scss
.my-dropdown {
  // Dropdown container
  .dropdownContainer {
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
    border: 2px solid #e0e0e0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    // Custom animation
    animation: slideDown 0.2s ease-out;
  }

  // Dropdown items
  .dropdownItemContainer {
    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(90deg, #f8f9fa, #e9ecef);
      transform: translateX(4px);
    }

    // Custom icons
    .icon {
      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## ♿ Accessibility

- **Keyboard Navigation**: Tab through items, Enter/Space to activate
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Clear focus indicators and logical tab order
- **Click Outside**: Closes dropdown when clicking outside
- **Escape Key**: Press Escape to close dropdown (when focused)
- **Screen Reader Support**: Compatible with assistive technologies

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
    <a href="https://www.npmjs.com/package/@bearlab/dropdown">📦 View on NPM</a>
  </p>
</div>
