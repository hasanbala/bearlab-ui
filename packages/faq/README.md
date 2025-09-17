# @bearlab/faq

A comprehensive, accessible, and customizable FAQ component library for React applications. Built with TypeScript and SCSS, this package provides multiple FAQ layouts with smooth animations and theme support.

## ✨ Features

- **🎨Multiple Variants**: Three distinct FAQ layouts to suit different design needs
- **⚡Accordion Functionality**: Smooth expand/collapse animations with keyboard support
- **🌗Theme Support**: Built-in dark theme compatibility
- **🎯TypeScript Support**: Full type safety with comprehensive type definitions
- **📱 Responsive**: Mobile-first approach with adaptive layouts
- **🎨Icon Integration**: Seamless integration with @bearlab/core icon system
- **🔧Customizable**: Extensive styling options through SCSS modules
- **♿ Accessibility**: WCAG compliant with proper ARIA attributes

## 📦 Installation

```bash
npm install @bearlab/faq
```

```bash
yarn add @bearlab/faq
```

## 🔗 Dependencies

- `react` >= 16.8.0
- `react-dom` >= 16.8.0
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `@bearlab/button` - For interactive elements
- `classnames` - For conditional CSS class handling

## 📚 API Reference

### FaqV1 Props

| Prop   | Type        | Required | Description        |
| ------ | ----------- | -------- | ------------------ |
| `data` | `FaqItem[]` | Yes      | Array of FAQ items |

### FaqV2 Props

| Prop   | Type        | Required | Description                               |
| ------ | ----------- | -------- | ----------------------------------------- |
| `data` | `FaqItem[]` | Yes      | Array of FAQ items (recommended: 7 items) |

### FaqV3 Props

| Prop       | Type             | Required | Description               |
| ---------- | ---------------- | -------- | ------------------------- |
| `data`     | `FaqItem[]`      | Yes      | Array of FAQ items        |
| `iconType` | `IconTypeConfig` | Yes      | Icon configuration object |

### Types

```typescript
interface FaqItem {
  title: string;
  content: string;
}

interface IconTypeConfig {
  default: ICON_TYPE;
  custom?: React.ReactElement | null;
}
```

## 🎯 Usage Examples

### Basic Implementation

```jsx
import { FaqV1 } from "@bearlab/faq";

const faqData = [
  {
    title: "What is your return policy?",
    content:
      "We offer a 30-day return policy for all unused items in their original packaging.",
  },
  {
    title: "How long does shipping take?",
    content:
      "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.",
  },
];

function App() {
  return <FaqV1 data={faqData} />;
}
```

## 📋 Component Variants

### FaqV1 - Single Column Accordion

The default FAQ layout with a single column accordion structure.

```jsx
import { FaqV1 } from "@bearlab/faq";

<FaqV1 data={faqData} />;
```

**Features:**

- Single column layout
- One item open at a time
- Rounded borders with subtle shadows
- Smooth expand/collapse animations

### FaqV2 - Two Column Layout

A responsive two-column FAQ layout that splits items across columns.

```jsx
import { FaqV2 } from "@bearlab/faq";

<FaqV2 data={faqData} />;
```

**Features:**

- Responsive two-column grid (single column on mobile)
- Independent accordion states for each column
- First 3 items in left column, next 4 in right column
- Compact design with minimal borders

### FaqV3 - Icon-Based Layout

A modern FAQ layout with customizable icons for each item.

```jsx
import { FaqV3, ICON_TYPE } from "@bearlab/faq";

<FaqV3
  data={faqData}
  iconType={{
    default: ICON_TYPE.SUPPORT,
    custom: null,
  }}
/>;
```

**Features:**

- Icon-based visual hierarchy
- No accordion behavior (all content visible)
- Grid layout with responsive breakpoints
- Support for custom icons

## 🎨 Icon Types

The `FaqV3` component supports various predefined icons:

```javascript
import { ICON_TYPE } from "@bearlab/faq";

// Available icon types
ICON_TYPE.ADD;
ICON_TYPE.EXPORT;
ICON_TYPE.DOCUMENT;
ICON_TYPE.UPDATE;
ICON_TYPE.SEARCH;
ICON_TYPE.NOTIFY;
ICON_TYPE.DOTS;
ICON_TYPE.TICK;
ICON_TYPE.SUPPORT;
ICON_TYPE.NONE;
```

### Custom Icons

You can also use custom React elements as icons:

```jsx
import { CustomIcon } from "./CustomIcon";

<FaqV3
  data={faqData}
  iconType={{
    default: ICON_TYPE.NONE,
    custom: <CustomIcon />,
  }}
/>;
```

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## 🎨 Styling & Themes

### Custom Styling

The components use SCSS modules for styling. You can override styles by targeting the CSS classes:

```scss
// Override FAQ styles
.containerByFaqOne {
  .faqByOne {
    border-radius: 8px; // Custom border radius

    .header {
      padding: 20px; // Custom padding
    }
  }
}
```

### CSS Variables

The components use CSS custom properties for consistent theming:

```scss
:root {
  --faq-border-color: #e5e7eb;
  --faq-background-color: #ffffff;
  --faq-text-color: #374151;
}
```

## 📱 Responsive Behavior

### FaqV1

- Maintains single column on all screen sizes
- Adjusts padding and font sizes for mobile

### FaqV2

- Two columns on desktop (1280px+)
- Single column on tablet and mobile
- Adaptive gap spacing

### FaqV3

- Grid layout with auto-fit columns
- Minimum column width: 500px (desktop), 250px (mobile)
- Responsive icon and text sizing

## ♿ Accessibility

All FAQ components include:

- **Keyboard Navigation**: Full keyboard support with proper tab order
- **ARIA Attributes**: Proper labeling and state management
- **Focus Management**: Visible focus indicators and logical focus flow
- **Screen Reader Support**: Semantic HTML and descriptive text
- **Color Contrast**: WCAG AA compliant color combinations

### Keyboard Shortcuts

- `Tab`: Navigate between FAQ items
- `Enter` / `Space`: Toggle accordion (FaqV1, FaqV2)
- `Escape`: Close current accordion item

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
    <a href="https://www.npmjs.com/package/@bearlab/faq">📦 View on NPM</a>
  </p>
</div>
