# Skeleton Component

A flexible and customizable skeleton loading component for React applications. Perfect for creating smooth loading states while your content is being fetched.

## Features

- 🎨 **Multiple Variants**: Default, article, card, and list layouts
- ⚡ **Animated or Static**: Toggle animation on/off
- 🔧 **Customizable**: Configure number of lines and styling
- 📱 **Responsive**: Works seamlessly across all screen sizes
- 🎯 **TypeScript Support**: Full type safety included
- 🎪 **Easy Integration**: Drop-in replacement for loading content

## Installation

```bash
npm install your-skeleton-package-name
# or
yarn add your-skeleton-package-name
```

## Usage

### Basic Example

```tsx
import { Skeleton } from "your-skeleton-package-name";

function MyComponent() {
  const [loading, setLoading] = useState(true);

  return (
    <div>{loading ? <Skeleton /> : <div>Your actual content here</div>}</div>
  );
}
```

### Article Variant

Perfect for blog posts, news articles, or any content with author information:

```tsx
<Skeleton variant="article" />
```

### Card Variant

Ideal for product cards, image galleries, or media content:

```tsx
<Skeleton variant="card" />
```

### List Variant

Great for user lists, comments, or any repetitive content:

```tsx
<Skeleton variant="list" />
```

### Custom Configuration

```tsx
<Skeleton
  variant="default"
  lines={6}
  animated={false}
  className="my-custom-skeleton"
/>
```

## Props

| Prop        | Type                                         | Default     | Description                                             |
| ----------- | -------------------------------------------- | ----------- | ------------------------------------------------------- |
| `variant`   | `"default" \| "article" \| "card" \| "list"` | `"default"` | The skeleton layout variant                             |
| `lines`     | `number`                                     | `4`         | Number of content lines to render (for default variant) |
| `animated`  | `boolean`                                    | `true`      | Enable/disable shimmer animation                        |
| `className` | `string`                                     | `undefined` | Additional CSS class names                              |

## Variants

### Default

- Two content sections with configurable number of lines
- Variable width lines for realistic appearance
- Perfect for general text content

### Article

- Avatar placeholder
- Title and subtitle placeholders
- Body content with multiple lines
- Great for blog posts or news articles

### Card

- Image placeholder
- Card title
- Content lines
- Perfect for product cards or media items

### List

- Multiple list items (3 by default)
- Each item has avatar and content placeholders
- Ideal for user lists or comments

## Styling

The component uses CSS modules for styling. You can override styles by:

1. **Using className prop:**

```tsx
<Skeleton className="my-skeleton" />
```

2. **CSS Module override:**

```css
.my-skeleton {
  /* Your custom styles */
}

.my-skeleton .line {
  /* Override line styles */
}
```

3. **Global CSS override:**

```css
/* Target specific elements */
.skeleton-container .line {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
}
```

## Animation

The skeleton includes a smooth shimmer animation by default. The animation:

- Uses CSS transforms for optimal performance
- Provides visual feedback that content is loading
- Can be disabled with `animated={false}`

## TypeScript

Full TypeScript support with exported interfaces:

```tsx
interface SkeletonProps {
  className?: string;
  variant?: "default" | "article" | "card" | "list";
  lines?: number;
  animated?: boolean;
}
```

## Examples

### Loading State Management

```tsx
import { useState, useEffect } from "react";
import { Skeleton } from "your-skeleton-package-name";

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <Skeleton variant="article" />;
  }

  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
}
```

### Multiple Skeletons

```tsx
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="product-grid">
      {loading ? (
        <>
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} variant="card" />
          ))}
        </>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}
```

## Browser Support

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

## License

MIT License - see LICENSE file for details.

## Changelog

### v1.0.0

- Initial release
- Support for 4 skeleton variants
- Animation control
- TypeScript support
- CSS modules styling
