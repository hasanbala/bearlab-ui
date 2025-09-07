# GoBack Component

A flexible navigation button component for React applications that provides "Go Back" functionality with customizable routing behavior.

## Features

- ⬅️ **Flexible Navigation** - Browser history or custom destination navigation
- 🎨 **Customizable Appearance** - Custom labels, icons, and styling
- 🔄 **Loading States** - Built-in disabled state management
- 🎯 **Multiple Navigation Modes** - Browser back or specific destination
- 🛡️ **Type Safety** - Full TypeScript support
- ♿ **Accessibility** - Screen reader friendly with proper ARIA attributes

## Installation

```bash
npm install @bearlab/go-back
# or
yarn add @bearlab/go-back
```

## Basic Usage

```tsx
import React from "react";
import { GoBack } from "@bearlab/go-back";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const navigate = useNavigate();

  return (
    <div>
      <GoBack
        destination="/products"
        onNavigate={(dest) => navigate(dest as string)}
      />
      <h1>Product Details</h1>
      {/* Your content */}
    </div>
  );
}
```

## Browser Back Navigation

```tsx
import React from "react";
import { GoBack } from "@bearlab/go-back";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div>
      <GoBack
        destination="/dashboard" // fallback destination
        hasBack={true} // Use browser history
        onNavigate={(dest) => {
          if (typeof dest === "number") {
            navigate(dest); // Browser back
          } else {
            navigate(dest); // Fallback destination
          }
        }}
      />
      <h1>User Profile</h1>
      {/* Your content */}
    </div>
  );
}
```

## Advanced Usage

```tsx
import React, { useState } from "react";
import { GoBack } from "@bearlab/go-back";
import { useNavigate, useLocation } from "react-router-dom";

function EditUserPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleNavigation = (destination: string | number) => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirm) return;
    }

    if (typeof destination === "number") {
      navigate(destination); // Browser back
    } else {
      navigate(destination); // Specific route
    }
  };

  return (
    <div>
      <GoBack
        label="Back to Users"
        destination="/users"
        hasBack={window.history.length > 1}
        isDisabled={false}
        onNavigate={handleNavigation}
        className="custom-back-button"
      />

      <h1>Edit User</h1>
      <form onChange={() => setHasUnsavedChanges(true)}>
        {/* Form content */}
      </form>
    </div>
  );
}
```

## Props

| Prop          | Type                               | Default     | Description                                |
| ------------- | ---------------------------------- | ----------- | ------------------------------------------ |
| `destination` | `string`                           | -           | **Required.** Fallback route destination   |
| `onNavigate`  | `(dest: string \| number) => void` | -           | **Required.** Navigation handler function  |
| `label`       | `string`                           | `"Go Back"` | Button text label                          |
| `hasBack`     | `boolean`                          | `false`     | Use browser history instead of destination |
| `isDisabled`  | `boolean`                          | `false`     | Disable the button                         |
| `className`   | `string`                           | -           | Additional CSS class for styling           |

## Navigation Behavior

The component supports two navigation modes:

### 1. Destination Navigation (Default)

```tsx
<GoBack destination="/home" onNavigate={(dest) => navigate(dest as string)} />
```

- Always navigates to the specified `destination`
- Useful for consistent navigation patterns

### 2. Browser Back Navigation

```tsx
<GoBack
  destination="/home" // fallback
  hasBack={true}
  onNavigate={(dest) => {
    if (typeof dest === "number") {
      navigate(dest); // -1 for browser back
    } else {
      navigate(dest); // fallback destination
    }
  }}
/>
```

- Uses browser history when `hasBack` is true
- Falls back to `destination` if no history available

## Styling

The component uses the Button component from `@bearlab/button` with these default styles:

- Secondary variant
- Icon with text layout
- Reversed icon position (arrow on left)

You can customize with CSS:

```scss
.custom-back-button {
  margin-bottom: 20px;

  &:hover {
    background-color: #f3f4f6;
    transform: translateX(-2px);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

## Integration Examples

### With React Router

```tsx
import { useNavigate } from "react-router-dom";
import { GoBack } from "@bearlab/go-back";

function ArticleDetails() {
  const navigate = useNavigate();

  return (
    <div>
      <GoBack
        destination="/articles"
        onNavigate={(dest) => navigate(dest as string)}
        label="Back to Articles"
      />
      {/* Article content */}
    </div>
  );
}
```

### With Next.js Router

```tsx
import { useRouter } from "next/router";
import { GoBack } from "@bearlab/go-back";

function UserProfile() {
  const router = useRouter();

  return (
    <div>
      <GoBack
        destination="/users"
        hasBack={true}
        onNavigate={(dest) => {
          if (typeof dest === "number") {
            router.back();
          } else {
            router.push(dest);
          }
        }}
      />
      {/* Profile content */}
    </div>
  );
}
```

### With Custom Navigation Logic

```tsx
function CheckoutPage() {
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState(true);

  const handleNavigation = (dest: string | number) => {
    // Custom logic before navigation
    analytics.track("back_button_clicked", {
      from: "checkout",
      to: typeof dest === "number" ? "browser_back" : dest,
    });

    if (typeof dest === "number") {
      window.history.back();
    } else {
      navigate(dest);
    }
  };

  return (
    <div>
      <GoBack
        label="Continue Shopping"
        destination="/products"
        isDisabled={!canGoBack}
        onNavigate={handleNavigation}
      />
      {/* Checkout form */}
    </div>
  );
}
```

## Conditional Rendering

```tsx
function ConditionalBack() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();

  // Only show back button on certain pages
  const shouldShowBack = ["/profile", "/settings", "/orders"].includes(
    location.pathname
  );

  if (!shouldShowBack) return null;

  return (
    <GoBack
      destination={user?.role === "admin" ? "/admin" : "/dashboard"}
      onNavigate={(dest) => navigate(dest as string)}
      label={user?.role === "admin" ? "Back to Admin" : "Back to Dashboard"}
    />
  );
}
```

## Loading States

```tsx
function AsyncOperationPage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  return (
    <div>
      <GoBack
        destination="/dashboard"
        isDisabled={isSaving}
        onNavigate={(dest) => navigate(dest as string)}
        label={isSaving ? "Saving..." : "Cancel"}
      />

      {/* Form or content */}
    </div>
  );
}
```

## Accessibility Features

- **Keyboard Navigation** - Fully keyboard accessible
- **Screen Reader Support** - Proper ARIA labels
- **Focus Management** - Clear focus indicators
- **Semantic HTML** - Uses proper button element

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- `react` >= 16.8.0
- `@bearlab/button` (for button component)
- `classnames` (for conditional styling)

## TypeScript Support

```tsx
interface Props {
  destination: string;
  label?: string;
  className?: string;
  hasBack?: boolean;
  isDisabled?: boolean;
  onNavigate: (destination: string | number) => void;
}
```

## Testing

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { GoBack } from "@bearlab/go-back";

test("calls onNavigate with destination when clicked", () => {
  const mockNavigate = jest.fn();

  render(
    <GoBack destination="/home" onNavigate={mockNavigate} label="Go Home" />
  );

  fireEvent.click(screen.getByText("Go Home"));
  expect(mockNavigate).toHaveBeenCalledWith("/home");
});

test("calls onNavigate with -1 when hasBack is true", () => {
  const mockNavigate = jest.fn();

  render(
    <GoBack destination="/home" hasBack={true} onNavigate={mockNavigate} />
  );

  fireEvent.click(screen.getByRole("button"));
  expect(mockNavigate).toHaveBeenCalledWith(-1);
});
```

## Common Patterns

### Breadcrumb Alternative

```tsx
function BreadcrumbBack({ currentPage, parentPage, parentPath }) {
  const navigate = useNavigate();

  return (
    <div className="breadcrumb-back">
      <GoBack
        destination={parentPath}
        label={`← ${parentPage}`}
        onNavigate={(dest) => navigate(dest as string)}
      />
      <span className="current-page">{currentPage}</span>
    </div>
  );
}
```

### Modal-Like Navigation

```tsx
function ModalBack({ onClose, fallbackRoute }) {
  const navigate = useNavigate();

  return (
    <GoBack
      destination={fallbackRoute}
      hasBack={true}
      label="× Close"
      onNavigate={(dest) => {
        onClose?.();
        if (typeof dest === "number") {
          navigate(dest);
        } else {
          navigate(dest);
        }
      }}
    />
  );
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, please open an issue on GitHub or contact our team.
