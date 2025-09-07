# Popover Component

A simple and customizable popover component for React applications.

## Installation

```bash
npm install @bearlab/popover
```

## Basic Usage

```tsx
import { Popover } from "@bearlab/popover";

function App() {
  return <Popover label="This is a popover message" />;
}
```

## Props

| Prop        | Type               | Default | Required | Description                                              |
| ----------- | ------------------ | ------- | -------- | -------------------------------------------------------- |
| `label`     | `string \| number` | -       | ✅       | The content to display inside the popover                |
| `className` | `string`           | -       | ❌       | Additional CSS classes to apply to the popover container |

## Examples

### Basic Popover

```tsx
import { Popover } from "@bearlab/popover";

function BasicExample() {
  return <Popover label="Hello World!" />;
}
```

### Popover with Custom Styling

```tsx
import { Popover } from "@bearlab/popover";
import "./custom-styles.css";

function StyledExample() {
  return <Popover label="Styled popover" className="my-custom-popover" />;
}
```

### Popover with Number Label

```tsx
import { Popover } from "@bearlab/popover";

function NumberExample() {
  return <Popover label={42} />;
}
```

## Styling

The component uses CSS modules with the following class structure:

- `.container` - Main popover container

You can override styles by:

1. **Using className prop**: Pass additional CSS classes
2. **CSS Modules**: Import and use the component's CSS module classes
3. **Global CSS**: Target the component's classes globally

### Example CSS Override

```css
.my-custom-popover {
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## TypeScript Support

This component is written in TypeScript and includes full type definitions.

```tsx
interface Props {
  className?: string;
  label: string | number;
}
```

## Dependencies

- `classnames` - For conditional CSS class handling
- `react` - React library (peer dependency)

## Browser Support

This component supports all modern browsers that support ES6+ and React 16.8+.

## Contributing

Issues and pull requests are welcome. Please ensure your code follows the existing style and includes appropriate tests.

## License

MIT
