# @bearlab/button

A comprehensive and highly customizable React Button component with extensive functionality. Features loading states, multiple variants, built-in icons, permission-based rendering, and complete TypeScript support with automatic light/dark theme adaptation.

## ✨ Features

- 🎨 **3 Variants**: Primary, Secondary, Tertiary styles
- 🔘 **3 Button Types**: Icon with Text, Just Icon, Just Text
- 🎯 **18+ Built-in Icons**: Add, Delete, Search, Export, and more
- 🔄 **Loading States**: Smooth loading animation with spinner
- 🛡️ **Permission System**: Role-based button rendering
- 🎨 **Custom Icons**: Support for custom React elements
- 🌙 **Theme Support**: Automatic light and dark theme adaptation
- ⚡ **Performance**: Optimized rendering and animations
- 🎯 **TypeScript**: Full type safety and IntelliSense
- ♿ **Accessible**: WCAG compliant with proper focus states

## 📦 Installation

```bash
npm install @bearlab/button
```

```bash
yarn add @bearlab/button
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `classnames` - For conditional CSS class handling

## 📚 API Reference

### Props

| Prop              | Type                 | Default                           | Description                       |
| ----------------- | -------------------- | --------------------------------- | --------------------------------- |
| `label`           | `string \| number`   | -                                 | **Required.** Button text content |
| `buttonType`      | `BUTTON_TYPE`        | -                                 | **Required.** Button display type |
| `variant`         | `BUTTON_VARIANT`     | `PRIMARY`                         | Button visual style               |
| `iconType`        | `IconConfig`         | `{ default: NONE, custom: null }` | Icon configuration                |
| `isLoading`       | `boolean`            | `false`                           | Loading state with spinner        |
| `disabled`        | `boolean`            | `false`                           | Disabled state                    |
| `htmlType`        | `HTML_TYPE`          | `BUTTON`                          | HTML button type                  |
| `onClick`         | `Function`           | -                                 | Click event handler               |
| `iconTextReverse` | `boolean`            | `false`                           | Reverse icon and text order       |
| `className`       | `string`             | -                                 | Custom CSS classes                |
| `permission`      | `string \| string[]` | -                                 | Required permissions              |
| `allAuths`        | `object`             | `{}`                              | Available permissions             |

### Types

#### BUTTON_TYPE

```typescript
enum BUTTON_TYPE {
  ICON_WITH_TEXT = "ICON_WITH_TEXT",
  JUST_ICON = "JUST_ICON",
  JUST_TEXT = "JUST_TEXT",
}
```

#### BUTTON_VARIANT

```typescript
enum BUTTON_VARIANT {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  TERTIARY = "TERTIARY",
}
```

#### ICON_TYPE

```typescript
enum ICON_TYPE {
  NONE = "NONE",
  ADD = "ADD",
  DELETE = "DELETE",
  SEARCH = "SEARCH",
  EXPORT = "EXPORT",
  DOCUMENT = "DOCUMENT",
  UPDATE = "UPDATE",
  CLOSE = "CLOSE",
  NOTIFY = "NOTIFY",
  ARROW = "ARROW",
  ARROW_DOWN = "ARROW_DOWN",
  ARROW_RIGHT = "ARROW_RIGHT",
  MINUS = "MINUS",
  PLUS = "PLUS",
  FILTER = "FILTER",
  DOTS = "DOTS",
  TICK = "TICK",
  COPY = "COPY",
}
```

#### HTML_TYPE

```typescript
enum HTML_TYPE {
  BUTTON = "button",
  SUBMIT = "submit",
}
```

### TypeScript Support

```typescript
import { Button, Props as ButtonProps } from "@bearlab/button";

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## 🎯 Usage Examples

### Basic Buttons

```jsx
import { Button } from '@bearlab/button';
import { BUTTON_TYPE, BUTTON_VARIANT, ICON_TYPE } from '@bearlab/button/helpers';

// Text only button
<Button
  label="Submit"
  buttonType={BUTTON_TYPE.JUST_TEXT}
/>

// Icon with text
<Button
  label="Add Item"
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  iconType={{ default: ICON_TYPE.ADD, custom: null }}
/>

// Icon only button
<Button
  label="Delete"
  buttonType={BUTTON_TYPE.JUST_ICON}
  iconType={{ default: ICON_TYPE.DELETE, custom: null }}
/>
```

### Button Variants

```jsx
// Primary (default)
<Button
  label="Primary"
  buttonType={BUTTON_TYPE.JUST_TEXT}
  variant={BUTTON_VARIANT.PRIMARY}
/>

// Secondary
<Button
  label="Secondary"
  buttonType={BUTTON_TYPE.JUST_TEXT}
  variant={BUTTON_VARIANT.SECONDARY}
/>

// Tertiary (gradient)
<Button
  label="Tertiary"
  buttonType={BUTTON_TYPE.JUST_TEXT}
  variant={BUTTON_VARIANT.TERTIARY}
/>
```

### With Built-in Icons

```jsx
// Available icons: ADD, DELETE, SEARCH, EXPORT, DOCUMENT, UPDATE,
// CLOSE, NOTIFY, ARROW, ARROW_DOWN, ARROW_RIGHT, MINUS, PLUS,
// FILTER, DOTS, TICK, COPY

<Button
  label="Search"
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  iconType={{ default: ICON_TYPE.SEARCH, custom: null }}
/>

<Button
  label="Export Data"
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  iconType={{ default: ICON_TYPE.EXPORT, custom: null }}
/>

<Button
  label="Delete Item"
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  iconType={{ default: ICON_TYPE.DELETE, custom: null }}
  variant={BUTTON_VARIANT.SECONDARY}
/>
```

### Custom Icons

```jsx
import { CustomIcon } from "./CustomIcon";

<Button
  label="Custom Action"
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  iconType={{
    default: ICON_TYPE.NONE,
    custom: <CustomIcon />,
  }}
/>;
```

### Loading States

```jsx
const [isLoading, setIsLoading] = useState(false);

const handleClick = async () => {
  setIsLoading(true);
  await performAsyncOperation();
  setIsLoading(false);
};

<Button
  label="Save Changes"
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  iconType={{ default: ICON_TYPE.TICK, custom: null }}
  isLoading={isLoading}
  onClick={handleClick}
/>;
```

### Icon Position Control

```jsx
// Icon after text (default)
<Button
  label="Next"
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  iconType={{ default: ICON_TYPE.ARROW_RIGHT, custom: null }}
/>

// Icon before text
<Button
  label="Previous"
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  iconType={{ default: ICON_TYPE.ARROW, custom: null }}
  iconTextReverse={true}
/>
```

### Form Integration

```jsx
<form onSubmit={handleSubmit}>
  <Button
    label="Submit Form"
    buttonType={BUTTON_TYPE.JUST_TEXT}
    htmlType="SUBMIT"
    disabled={!isFormValid}
  />

  <Button
    label="Cancel"
    buttonType={BUTTON_TYPE.JUST_TEXT}
    variant={BUTTON_VARIANT.SECONDARY}
    htmlType="BUTTON"
    onClick={handleCancel}
  />
</form>
```

### Permission-Based Rendering

```jsx
// Button will only render if user has required permissions
<Button
  label="Admin Action"
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  iconType={{ default: ICON_TYPE.UPDATE, custom: null }}
  permission="ADMIN_WRITE"
  allAuths={{
    ADMIN_READ: true,
    ADMIN_WRITE: true,
    USER_READ: true
  }}
/>

// Multiple permissions (OR logic)
<Button
  label="Moderate Content"
  buttonType={BUTTON_TYPE.JUST_TEXT}
  permission={["ADMIN_WRITE", "MODERATOR_WRITE"]}
  allAuths={userPermissions}
/>
```

## 🎨 Button Types

### ICON_WITH_TEXT

Displays label with an icon. Icon position can be controlled with `iconTextReverse`.

### JUST_ICON

Shows only the icon with a tooltip on hover displaying the label.

### JUST_TEXT

Text-only button without any icons.

## 🌈 Variants

### PRIMARY (Default)

- Blue background with white text
- Default button style for primary actions

### SECONDARY

- White background with gray text and border
- Used for secondary actions

### TERTIARY

- Gradient background
- Special emphasis for premium actions

## 🌙 Theme Support

The component automatically adapts to light and dark themes:

```html
<html data-theme="dark">
  <!-- Dark theme automatically applied -->
</html>
```

## ♿ Accessibility

- Full keyboard navigation support
- Screen reader compatible
- Proper ARIA labels for icon-only buttons
- High contrast support in dark theme
- Focus indicators and states
- Disabled state handling

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
    <a href="https://www.npmjs.com/package/@bearlab/button">📦 View on NPM</a>
  </p>
</div>
