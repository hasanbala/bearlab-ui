# @bearlab/core

The foundation package of the BearLab UI ecosystem. Provides essential utilities, icons, constants, and shared components used across all BearLab packages.

## 📦 Installation

```bash
npm install @bearlab/core
```

```bash
yarn add @bearlab/core
```

## 📋 Requirements

- React >= 16.8.0
- React DOM >= 16.8.0
- TypeScript support included

## 🎯 What's Included

### 🎨 Icons Collection

A comprehensive set of optimized SVG icons for common UI interactions and states.

### 📊 Complete Icon Reference

| Category        | Icons                                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Actions**     | `IconAdd`, `IconDelete`, `IconUpdate`, `IconExport`, `IconSearch`, `IconCross`, `IconPlus`, `IconMinus`                     |
| **Navigation**  | `IconArrow`, `IconArrowDown`, `IconArrowDown2`, `IconArrowRight`                                                            |
| **Status**      | `IconTick`, `IconChecked`, `IconDisabled`, `IconSuccess`, `IconWarning`, `IconErrorTriangle`, `IconErrorCircle`, `IconInfo` |
| **Interactive** | `IconCopy`, `IconUpload`, `IconEyesOpen`, `IconEyesClose`, `IconPing`                                                       |
| **UI Controls** | `IconFilter`, `IconDots`                                                                                                    |
| **Loading**     | `IconLoading`, `IconLoadingSpin`                                                                                            |
| **Content**     | `IconEmpty`, `IconDocument`                                                                                                 |

### 🔒 Permission Constants

Centralized permission management for consistent access control across your application.

```tsx
import { PERMISSIONS, USER_ROLES } from "@bearlab/core";

// Example usage
function SecureComponent({ userRole, requiredPermission }) {
  const hasPermission = checkUserPermission(userRole, requiredPermission);

  if (!hasPermission) {
    return <div>Access denied</div>;
  }

  return <div>Secure content</div>;
}

// Usage with permissions
<SecureComponent
  userRole={USER_ROLES.ADMIN}
  requiredPermission={PERMISSIONS.WRITE}
/>;
```

## 📦 Bundle Size

- **Icons**: ~2-4KB per icon (optimized SVG)
- **Constants**: ~1KB total
- **Tree-shakable**: Only imports what you use

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
    <a href="https://www.npmjs.com/package/@bearlab/core">📦 View on NPM</a>
  </p>
</div>
