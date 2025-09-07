# Button Component

A versatile and feature-rich button component with support for icons, loading states, variants, and permission-based rendering.

## Installation

```bash
npm install @bearlab/button
```

## Usage

```tsx
import { Button, BUTTON_TYPE, BUTTON_VARIANT, ICON_TYPE } from '@bearlab/button';

// Basic button
<Button
  buttonType={BUTTON_TYPE.JUST_TEXT}
  label="Click me"
  onClick={handleClick}
/>

// Button with icon
<Button
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  label="Add Item"
  iconType={{ default: ICON_TYPE.ADD }}
  onClick={handleAdd}
/>

// Loading button
<Button
  buttonType={BUTTON_TYPE.JUST_TEXT}
  label="Save"
  isLoading={isLoading}
  onClick={handleSave}
/>
```

## Props

| Prop              | Type                                                   | Default                                     | Description                              |
| ----------------- | ------------------------------------------------------ | ------------------------------------------- | ---------------------------------------- |
| `label`           | `string \| number`                                     | **Required**                                | Button text/label                        |
| `buttonType`      | `BUTTON_TYPE`                                          | **Required**                                | Type of button (text, icon, or combined) |
| `onClick`         | `(event: React.MouseEvent<HTMLButtonElement>) => void` | `undefined`                                 | Click handler function                   |
| `isLoading`       | `boolean`                                              | `false`                                     | Shows loading spinner when true          |
| `disabled`        | `boolean`                                              | `false`                                     | Disables the button                      |
| `iconType`        | `{ default: ICON_TYPE, custom?: React.ReactElement }`  | `{ default: ICON_TYPE.NONE, custom: null }` | Icon configuration                       |
| `variant`         | `BUTTON_VARIANT`                                       | `undefined`                                 | Visual style variant                     |
| `htmlType`        | `'button' \| 'submit'`                                 | `'button'`                                  | HTML button type                         |
| `iconTextReverse` | `boolean`                                              | `false`                                     | Reverses icon and text order             |
| `className`       | `string`                                               | `undefined`                                 | Additional CSS classes                   |
| `permission`      | `string \| string[]`                                   | `PERMISSIONS.DEFAULT`                       | Required permissions                     |
| `allAuths`        | `object`                                               | `{}`                                        | User permissions object                  |

## Button Types

### `BUTTON_TYPE.JUST_TEXT`

Text-only button without icons.

```tsx
<Button
  buttonType={BUTTON_TYPE.JUST_TEXT}
  label="Save Changes"
  onClick={handleSave}
/>
```

### `BUTTON_TYPE.JUST_ICON`

Icon-only button with tooltip on hover.

```tsx
<Button
  buttonType={BUTTON_TYPE.JUST_ICON}
  label="Delete" // Shows as tooltip
  iconType={{ default: ICON_TYPE.DELETE }}
  onClick={handleDelete}
/>
```

### `BUTTON_TYPE.ICON_WITH_TEXT`

Button with both icon and text.

```tsx
<Button
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  label="Export Data"
  iconType={{ default: ICON_TYPE.EXPORT }}
  onClick={handleExport}
/>
```

## Icon Types

Available built-in icons:

```tsx
ICON_TYPE.ADD; // Plus icon
ICON_TYPE.DELETE; // Trash icon
ICON_TYPE.SEARCH; // Search icon
ICON_TYPE.EXPORT; // Export icon
ICON_TYPE.DOCUMENT; // Document icon
ICON_TYPE.UPDATE; // Update icon
ICON_TYPE.CLOSE; // Close/X icon
ICON_TYPE.NOTIFY; // Notification icon
ICON_TYPE.ARROW; // Arrow icon
ICON_TYPE.ARROW_DOWN; // Down arrow
ICON_TYPE.ARROW_RIGHT; // Right arrow
ICON_TYPE.FILTER; // Filter icon
ICON_TYPE.COPY; // Copy icon
ICON_TYPE.TICK; // Check mark
ICON_TYPE.MINUS; // Minus icon
ICON_TYPE.PLUS; // Plus icon
ICON_TYPE.DOTS; // Menu dots
ICON_TYPE.NONE; // No icon
```

### Custom Icons

```tsx
<Button
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  label="Custom Action"
  iconType={{
    default: ICON_TYPE.NONE,
    custom: <MyCustomIcon />,
  }}
  onClick={handleCustomAction}
/>
```

## Variants

```tsx
// Primary variant
<Button
  buttonType={BUTTON_TYPE.JUST_TEXT}
  label="Primary Action"
  variant={BUTTON_VARIANT.PRIMARY}
/>

// Secondary variant
<Button
  buttonType={BUTTON_TYPE.JUST_TEXT}
  label="Secondary Action"
  variant={BUTTON_VARIANT.SECONDARY}
/>

// Tertiary variant
<Button
  buttonType={BUTTON_TYPE.JUST_TEXT}
  label="Tertiary Action"
  variant={BUTTON_VARIANT.TERTIARY}
/>
```

## Loading State

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleAsyncAction = async () => {
  setIsLoading(true);
  try {
    await someAsyncOperation();
  } finally {
    setIsLoading(false);
  }
};

<Button
  buttonType={BUTTON_TYPE.JUST_TEXT}
  label="Process Data"
  isLoading={isLoading}
  onClick={handleAsyncAction}
/>;
```

## Permission-based Rendering

```tsx
const userPermissions = {
  DELETE_USER: true,
  EDIT_USER: false,
  VIEW_USER: true
};

// Button won't render if user lacks permission
<Button
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  label="Delete User"
  iconType={{ default: ICON_TYPE.DELETE }}
  permission="DELETE_USER"
  allAuths={userPermissions}
  onClick={handleDelete}
/>

// Multiple permissions (OR logic)
<Button
  buttonType={BUTTON_TYPE.JUST_TEXT}
  label="Admin Action"
  permission={["ADMIN", "SUPER_USER"]}
  allAuths={userPermissions}
  onClick={handleAdminAction}
/>
```

## Examples

### Form Buttons

```tsx
// Submit button
<Button
  buttonType={BUTTON_TYPE.JUST_TEXT}
  label="Submit"
  htmlType="submit"
  variant={BUTTON_VARIANT.PRIMARY}
  isLoading={isSubmitting}
/>

// Cancel button
<Button
  buttonType={BUTTON_TYPE.JUST_TEXT}
  label="Cancel"
  variant={BUTTON_VARIANT.SECONDARY}
  onClick={handleCancel}
/>
```

### Action Buttons

```tsx
// Add new item
<Button
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  label="Add New"
  iconType={{ default: ICON_TYPE.ADD }}
  variant={BUTTON_VARIANT.PRIMARY}
  onClick={handleAdd}
/>

// Search with reversed icon
<Button
  buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
  label="Search"
  iconType={{ default: ICON_TYPE.SEARCH }}
  iconTextReverse={true}
  onClick={handleSearch}
/>
```

## Accessibility

- Semantic `<button>` element
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Loading state announcements
- Tooltip support for icon-only buttons

## Styling

Uses CSS modules with the following classes:

- `.container` - Main button container
- `.justIcon` - Icon-only button styles
- `.customIcon` - Custom icon styles
- `.loadingButton` - Loading state styles
- `.disabledButton` - Disabled state styles
- `.iconTextReverse` - Reversed layout styles

## TypeScript Support

Full TypeScript support with enums and type definitions.

## Dependencies

- `classnames` - CSS class management
- `@bearlab/core` - Icon components
- `@bearlab/popover` - Tooltip functionality

## License

MIT
