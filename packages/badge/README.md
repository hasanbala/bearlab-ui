# Badge Component

A flexible and customizable badge component for displaying labels, status indicators, and small pieces of information.

## Installation

```bash
npm install @bearlab/badge
```

## Usage

```tsx
import { Badge } from '@bearlab/badge';
import { IconStar } from '@bearlab/core';

// Basic usage
<Badge label="New" />

// With color and variant
<Badge
  label="Success"
  color="success"
  variant="solid"
/>

// With icons
<Badge
  label="Featured"
  startIcon={IconStar}
  color="primary"
  variant="light"
/>

// Small size with end icon
<Badge
  label="5"
  size="small"
  endIcon={IconStar}
  color="warning"
/>
```

## Props

| Prop        | Type                                                                            | Default      | Description                                |
| ----------- | ------------------------------------------------------------------------------- | ------------ | ------------------------------------------ |
| `label`     | `string \| number`                                                              | **Required** | The text or number to display in the badge |
| `variant`   | `'light' \| 'solid'`                                                            | `'light'`    | Visual style variant of the badge          |
| `color`     | `'primary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'light' \| 'dark'` | `'primary'`  | Color theme of the badge                   |
| `size`      | `'small' \| 'medium'`                                                           | `'medium'`   | Size of the badge                          |
| `startIcon` | `React.FunctionComponent<React.SVGProps<SVGSVGElement>>`                        | `undefined`  | Icon to display at the start of the badge  |
| `endIcon`   | `React.FunctionComponent<React.SVGProps<SVGSVGElement>>`                        | `undefined`  | Icon to display at the end of the badge    |
| `className` | `string`                                                                        | `undefined`  | Additional CSS classes to apply            |

## Examples

### Color Variants

```tsx
// Light variants (default)
<Badge label="Primary" color="primary" variant="light" />
<Badge label="Success" color="success" variant="light" />
<Badge label="Error" color="error" variant="light" />
<Badge label="Warning" color="warning" variant="light" />
<Badge label="Info" color="info" variant="light" />

// Solid variants
<Badge label="Primary" color="primary" variant="solid" />
<Badge label="Success" color="success" variant="solid" />
<Badge label="Error" color="error" variant="solid" />
```

### With Icons

```tsx
import { IconCheck, IconClose, IconInfo } from '@bearlab/core';

<Badge label="Completed" startIcon={IconCheck} color="success" />
<Badge label="Failed" startIcon={IconClose} color="error" />
<Badge label="99+" endIcon={IconInfo} color="primary" />
```

### Notification Badges

```tsx
// Message count
<Badge label="12" color="error" variant="solid" size="small" />

// Status indicators
<Badge label="Online" color="success" variant="light" />
<Badge label="Offline" color="error" variant="light" />
<Badge label="Away" color="warning" variant="light" />
```

## Styling

The component uses CSS modules and can be customized through:

- CSS custom properties (CSS variables)
- Additional className prop
- SCSS module overrides

### CSS Classes

- `.container` - Main badge container
- `.small`, `.medium` - Size variants
- `.lightPrimary`, `.solidPrimary` - Color and variant combinations
- `.startIcon`, `.endIcon` - Icon positioning

## Accessibility

- Uses semantic `<span>` element
- Supports screen readers
- Color combinations meet WCAG contrast requirements
- Icons include appropriate aria labels when needed

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all props and variants.

## Dependencies

- `classnames` - For conditional CSS classes
- `@bearlab/core` - For icon components (peer dependency)

## License

MIT
