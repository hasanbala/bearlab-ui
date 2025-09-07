# Copy Component

A convenient component for copying text to clipboard with visual feedback and customizable behavior.

## Installation

```bash
npm install @bearlab/copy
```

## Usage

```tsx
import { Copy } from '@bearlab/copy';

// Basic usage
<Copy text="Hello World!" />

// With custom label
<Copy
  text="API_KEY_123456789"
  label="Copy API Key"
/>

// Disabled state
<Copy
  text="Cannot copy this"
  disabled={true}
/>
```

## Props

| Prop        | Type      | Default      | Description                        |
| ----------- | --------- | ------------ | ---------------------------------- |
| `text`      | `string`  | **Required** | The text to be copied to clipboard |
| `label`     | `string`  | `"Copy"`     | Button tooltip label               |
| `className` | `string`  | `undefined`  | Additional CSS classes             |
| `copyId`    | `any`     | `undefined`  | Optional ID for copy tracking      |
| `disabled`  | `boolean` | `false`      | Disables the copy functionality    |

## Examples

### Basic Text Copy

```tsx
<Copy text="john.doe@example.com" />
```

### API Key Copy

```tsx
const apiKey = "sk-1234567890abcdef";

<Copy text={apiKey} label="Copy API Key" className="api-key-copy" />;
```

### Code Snippet Copy

```tsx
const codeSnippet = `
const greeting = "Hello, World!";
console.log(greeting);
`;

<Copy text={codeSnippet} label="Copy Code" />;
```

### Dynamic Content

```tsx
const [userId] = useState("user_12345");

<Copy text={userId} label="Copy User ID" copyId={userId} />;
```

### With Empty/Null Text Handling

```tsx
// Shows "-" when text is empty or null
<Copy text="" label="Copy Empty" />
<Copy text={null} label="Copy Null" />
```

### Disabled Copy

```tsx
<Copy text="Protected content" label="Copy Protected" disabled={true} />
```

### List of Copyable Items

```tsx
const items = [
  { id: 1, value: "item_001", label: "Copy Item 1" },
  { id: 2, value: "item_002", label: "Copy Item 2" },
  { id: 3, value: "item_003", label: "Copy Item 3" },
];

<div>
  {items.map((item) => (
    <Copy key={item.id} text={item.value} label={item.label} copyId={item.id} />
  ))}
</div>;
```

### URL Copy

```tsx
const shareUrl = "https://example.com/share/12345";

<Copy text={shareUrl} label="Copy Share Link" className="url-copy" />;
```

### Token Copy with Formatting

```tsx
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

<div className="token-container">
  <span className="token-label">Access Token:</span>
  <Copy text={accessToken} label="Copy Token" className="token-copy" />
</div>;
```

## Features

### Visual Feedback

The component provides immediate visual feedback when copying:

1. **Default State**: Shows copy icon
2. **Success State**: Shows checkmark icon for 3 seconds
3. **Disabled State**: Grayed out appearance

### Text Display

- Displays the actual text content
- Shows "-" when text is empty or null
- Handles long text gracefully

### Error Handling

```tsx
// Component handles clipboard API errors gracefully
<Copy
  text="Text to copy"
  onError={(error) => console.error("Copy failed:", error)}
/>
```

### Clipboard API Support

The component uses the modern Clipboard API (`navigator.clipboard.writeText()`):

- Works in secure contexts (HTTPS)
- Requires user interaction
- Falls back gracefully on unsupported browsers

## State Management

The component manages its own internal state:

```tsx
const [isCopy, setIsCopy] = useState(false);
```

After successful copy:

1. Sets `isCopy` to `true`
2. Changes icon to checkmark
3. Resets to default state after 3 seconds

## Accessibility

- Uses semantic button element
- Provides descriptive tooltip labels
- Keyboard accessible
- Screen reader friendly
- Visual feedback for actions

## Styling

Uses CSS modules with these classes:

- `.container` - Main wrapper
- `.text` - Text display area
- `.disabled` - Disabled state styling

The copy button inherits styling from the Button component.

## Browser Compatibility

- Modern browsers with Clipboard API support
- Requires HTTPS in production
- Falls back gracefully in unsupported environments

## Integration Example

```tsx
import { Copy } from "@bearlab/copy";
import { useState } from "react";

const DataDisplay = () => {
  const [data] = useState({
    userId: "user_12345",
    sessionId: "session_abcdef",
    apiEndpoint: "https://api.example.com/v1",
  });

  return (
    <div className="data-display">
      <div className="data-row">
        <span>User ID:</span>
        <Copy text={data.userId} label="Copy User ID" />
      </div>

      <div className="data-row">
        <span>Session ID:</span>
        <Copy text={data.sessionId} label="Copy Session ID" />
      </div>

      <div className="data-row">
        <span>API Endpoint:</span>
        <Copy text={data.apiEndpoint} label="Copy API Endpoint" />
      </div>
    </div>
  );
};
```

## Security Considerations

- Only copies text to clipboard (no HTML or rich content)
- Respects browser security policies
- Requires user interaction to trigger copy
- Works only in secure contexts

## TypeScript Support

Full TypeScript support with proper type definitions.

## Dependencies

- `@bearlab/button` - Button component for copy action
- `classnames` - CSS class management

## License

MIT
