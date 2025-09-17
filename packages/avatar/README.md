# @bearlab/avatar

A versatile and customizable React avatar component library with support for images, initials, status indicators, and automatic color generation. Part of the BearLab UI component library.

## ✨ Features

- **🖼️ Image Avatars**: Display user profile pictures with fallback support
- **🔤 Text Avatars**: Generate beautiful initials-based avatars
- **🎨 Auto Colors**: Automatic color generation based on user names
- **📏 Multiple Sizes**: 6 predefined sizes from xsmall to xxlarge
- **🟢 Status Indicators**: Online, offline, and busy status support
- **🎭 Theming**: Light and dark theme compatibility
- **♿ Accessibility**: Screen reader friendly with proper alt texts
- **📱 Responsive**: Looks great on all screen sizes
- **🚀 Lightweight**: Minimal bundle size with zero dependencies
- **📝 TypeScript**: Full type safety and IntelliSense support

## 📦 Installation

```bash
npm install @bearlab/avatar
```

```bash
yarn add @bearlab/avatar
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `classnames`: For conditional CSS class handling

## 📚 API Reference

### AvatarIcon

Display user avatars with profile images and status indicators.

#### Props

| Property | Type         | Default      | Description                    |
| -------- | ------------ | ------------ | ------------------------------ |
| `src`    | `string`     | **Required** | Image source URL               |
| `alt`    | `string`     | `"avatar"`   | Alternative text for the image |
| `size`   | `AvatarSize` | `"medium"`   | Size of the avatar             |
| `status` | `StatusType` | `"none"`     | Status indicator type          |

#### Types

```tsx
type AvatarSize =
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";
type StatusType = "online" | "offline" | "busy" | "none";
```

### AvatarText

Generate avatars from user names with automatic initials and colors.

#### Props

| Property    | Type     | Default      | Description                         |
| ----------- | -------- | ------------ | ----------------------------------- |
| `name`      | `string` | **Required** | Full name to generate initials from |
| `className` | `string` | -            | Additional CSS class name           |

## 🎯 Usage Examples

### Basic Image Avatar

```tsx
import { AvatarIcon } from "@bearlab/avatar";

const BasicImageAvatar = () => {
  return (
    <AvatarIcon
      src="https://example.com/avatar.jpg"
      alt="User profile picture"
      size="large"
    />
  );
};
```

### Avatar with Status Indicator

```tsx
import { AvatarIcon } from "@bearlab/avatar";

const StatusAvatar = () => {
  return (
    <div className="user-list">
      <AvatarIcon src="/avatars/john.jpg" size="medium" status="online" />
      <AvatarIcon src="/avatars/jane.jpg" size="medium" status="busy" />
      <AvatarIcon src="/avatars/bob.jpg" size="medium" status="offline" />
    </div>
  );
};
```

### Text-Based Avatars

```tsx
import { AvatarText } from "@bearlab/avatar";

const TextAvatars = () => {
  const users = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Sarah Wilson",
    "David Brown",
  ];

  return (
    <div className="avatar-group">
      {users.map((name) => (
        <AvatarText key={name} name={name} className="user-avatar" />
      ))}
    </div>
  );
};
```

### Different Sizes Showcase

```tsx
import { AvatarIcon, AvatarText } from "@bearlab/avatar";

const SizesExample = () => {
  const sizes = [
    "xsmall",
    "small",
    "medium",
    "large",
    "xlarge",
    "xxlarge",
  ] as const;

  return (
    <div className="sizes-demo">
      <h3>Image Avatars</h3>
      <div className="avatar-row">
        {sizes.map((size) => (
          <AvatarIcon
            key={size}
            src="/demo-avatar.jpg"
            size={size}
            status="online"
          />
        ))}
      </div>

      <h3>Text Avatars</h3>
      <div className="avatar-row">
        {sizes.map((size) => (
          <AvatarText key={size} name="John Doe" className={`avatar-${size}`} />
        ))}
      </div>
    </div>
  );
};
```

### User Profile Card

```tsx
import { AvatarIcon } from "@bearlab/avatar";
import { useState } from "react";

const UserCard = () => {
  const [user] = useState({
    name: "Alice Johnson",
    avatar: "/avatars/alice.jpg",
    status: "online" as const,
    title: "Senior Developer",
    email: "alice@example.com",
  });

  return (
    <div className="user-card">
      <div className="user-header">
        <AvatarIcon
          src={user.avatar}
          size="xlarge"
          status={user.status}
          alt={`${user.name}'s profile picture`}
        />
        <div className="user-info">
          <h3>{user.name}</h3>
          <p>{user.title}</p>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};
```

## 🎨 🎭 Styling

### Color System

The `AvatarText` component automatically generates colors based on the user's name using a deterministic algorithm. This ensures:

- **Consistent Colors**: Same name always gets the same color
- **Good Distribution**: Colors are evenly distributed across users
- **Accessibility**: All color combinations meet WCAG contrast guidelines
- **Theme Support**: Colors adapt to light and dark themes

### Custom Styling

Override default styles using CSS:

```css
/* Custom avatar sizes */
.custom-avatar {
  --avatar-size: 80px;
  --status-size: 20px;
}

/* Custom status colors */
.avatar-container .status.online {
  background-color: #00ff00;
}

.avatar-container .status.busy {
  background-color: #ffaa00;
}

/* Custom text avatar styling */
.custom-text-avatar {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}
```

### CSS Custom Properties

```css
.avatar-container {
  --avatar-border-radius: 50%;
  --status-border-width: 1.5px;
  --status-border-color: white;
}
```

### Responsive Design

Avatars work seamlessly across all device sizes:

```css
/* Example responsive avatar sizes */
.user-avatar {
  /* Mobile: smaller avatars */
  @media (max-width: 768px) {
    --avatar-size: 32px;
  }

  /* Tablet: medium avatars */
  @media (min-width: 769px) and (max-width: 1024px) {
    --avatar-size: 40px;
  }

  /* Desktop: larger avatars */
  @media (min-width: 1025px) {
    --avatar-size: 48px;
  }
}
```

## 📏 Size Guide

| Size      | Dimensions | Status Indicator | Use Case                   |
| --------- | ---------- | ---------------- | -------------------------- |
| `xsmall`  | 24×24px    | 6×6px            | Compact lists, tags        |
| `small`   | 32×32px    | 8×8px            | Navigation, small cards    |
| `medium`  | 40×40px    | 10×10px          | Default size, comments     |
| `large`   | 48×48px    | 12×12px          | User profiles, headers     |
| `xlarge`  | 56×56px    | 14×14px          | Profile pages, modals      |
| `xxlarge` | 64×64px    | 16×16px          | Hero sections, large cards |

### Image Optimization

- Use optimized image formats (WebP, AVIF)
- Implement proper image sizing
- Consider lazy loading for avatar lists

```tsx
// Optimized image avatar
<AvatarIcon
  src="/avatars/john-doe.webp"
  alt="John Doe"
  loading="lazy"
  size="medium"
/>
```

### Text Avatar Performance

- Text avatars have minimal performance impact
- Color calculation is cached automatically
- No external dependencies required

### Available Color Variants

The component cycles through 8 carefully selected color combinations:

1. **Blue**: Soft blue background with dark blue text
2. **Pink**: Light pink background with pink accent text
3. **Green**: Mint green background with blue accent text
4. **Yellow**: Warm yellow background with orange accent text
5. **Emerald**: Light green background with emerald text
6. **Purple**: Lavender background with purple accent text
7. **Amber**: Light amber background with yellow accent text
8. **Red**: Soft red background with red accent text

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## ♿ Accessibility

The avatar components are built with accessibility in mind:

### Image Avatars

- **Alt Text**: Always provide descriptive `alt` text
- **Keyboard Focus**: Focusable when interactive
- **Screen Readers**: Properly announced with role and description

### Text Avatars

- **Semantic HTML**: Uses appropriate HTML elements
- **Color Contrast**: All color combinations meet WCAG AA standards
- **Text Alternative**: Initials provide text-based representation

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
    <a href="https://www.npmjs.com/package/@bearlab/avatar">📦 View on NPM</a>
  </p>
</div>
