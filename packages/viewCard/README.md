# ViewCard Component

A versatile card component for React applications that handles both content display and empty states. Perfect for dashboards, data displays, and content sections that may or may not have data.

## Features

- 🎴 **Dual Mode**: Content card and empty state card
- 🎨 **Flexible Layout**: Header with title and description
- 📦 **Smart Rendering**: Automatically switches between states
- 🖼️ **Empty State**: Built-in empty state with icon
- 🎯 **TypeScript Support**: Complete type definitions
- 🔧 **Customizable**: Easy styling and layout control
- 📱 **Responsive**: Works seamlessly across all screen sizes
- ⚡ **Lightweight**: Minimal dependencies and bundle size

## Installation

```bash
npm install your-viewcard-package-name
# or
yarn add your-viewcard-package-name
```

## Dependencies

This component requires the following peer dependency:

- `@bearlab/core` (for IconEmpty)

## Usage

### Content Card (With Children)

When children are provided, the component renders as a content card:

```tsx
import { ViewCard } from "your-viewcard-package-name";

function MyComponent() {
  return (
    <ViewCard
      title="Dashboard Statistics"
      description="Overview of your key metrics"
    >
      <div>
        <h4>Revenue: $12,345</h4>
        <h4>Users: 1,234</h4>
        <h4>Growth: +15%</h4>
      </div>
    </ViewCard>
  );
}
```

### Empty State Card (Without Children)

When no children are provided, it automatically shows an empty state:

```tsx
<ViewCard
  title="No Data Available"
  description="There's nothing to show here yet. Try adding some content."
/>
```

### Title Only

```tsx
<ViewCard title="Simple Card">
  <p>Some content here...</p>
</ViewCard>
```

### Description Only

```tsx
<ViewCard description="A card without a title">
  <div>Content goes here</div>
</ViewCard>
```

### Custom Styling

```tsx
<ViewCard
  className="my-custom-card"
  title="Styled Card"
  description="This card has custom styling"
>
  <div>Your content</div>
</ViewCard>
```

## Props

| Prop          | Type                                   | Default     | Required | Description                                                                  |
| ------------- | -------------------------------------- | ----------- | -------- | ---------------------------------------------------------------------------- |
| `title`       | `string`                               | `undefined` | ❌       | Card title displayed in header                                               |
| `description` | `string`                               | `undefined` | ❌       | Description text displayed under title                                       |
| `children`    | `React.ReactNode \| null \| undefined` | `undefined` | ❌       | Card content. If provided, renders content card; if not, renders empty state |
| `className`   | `string`                               | `undefined` | ❌       | Additional CSS class names                                                   |

## Card States

### Content Card State

Activated when `children` prop contains content:

- Header section with title and description
- Content area for children
- Standard card layout

### Empty State Card

Activated when `children` is null, undefined, or not provided:

- Centered layout
- Empty state icon
- Title and description
- Visual indication of no content

## Styling

The component uses CSS modules for styling. Customize through:

### Using className prop

```tsx
<ViewCard className="my-card">
  <div>Content</div>
</ViewCard>
```

### CSS Module overrides

```css
/* Content card styles */
.my-card {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
}

/* Header styles */
.my-card .header {
  padding: 20px 20px 0;
  border-bottom: 1px solid #f0f0f0;
}

.my-card .title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.my-card .description {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

/* Content area */
.my-card .content {
  padding: 20px;
}

/* Empty state styles */
.my-card .icon {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  opacity: 0.5;
}
```

### Custom CSS Properties

```css
.my-card {
  --card-border-color: #e1e5e9;
  --card-border-radius: 8px;
  --card-padding: 20px;
  --card-title-color: #333;
  --card-description-color: #666;
  --card-empty-icon-opacity: 0.5;
}
```

## Layout Variations

### Dashboard Card

```tsx
<ViewCard title="Sales Overview" description="Monthly sales performance">
  <div className="stats-grid">
    <div className="stat">
      <span className="value">$45,231</span>
      <span className="label">Revenue</span>
    </div>
    <div className="stat">
      <span className="value">1,234</span>
      <span className="label">Orders</span>
    </div>
  </div>
</ViewCard>
```

### Data Table Card

```tsx
<ViewCard
  title="Recent Transactions"
  description="Latest customer transactions"
>
  <table className="transactions-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Customer</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((transaction) => (
        <tr key={transaction.id}>
          <td>{transaction.date}</td>
          <td>{transaction.customer}</td>
          <td>{transaction.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
</ViewCard>
```

### Chart Card

```tsx
<ViewCard
  title="Performance Metrics"
  description="Real-time analytics dashboard"
>
  <div className="chart-container">
    <LineChart data={chartData} />
  </div>
</ViewCard>
```

## TypeScript

Complete TypeScript support:

```tsx
interface ViewCardProps {
  className?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode | null | undefined;
}
```

## Examples

### Conditional Content Display

```tsx
import { ViewCard } from "your-viewcard-package-name";
import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ViewCard
      title="Team Members"
      description={users.length ? `${users.length} active members` : undefined}
    >
      {users.length > 0 ? (
        <div className="user-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.name} />
              <h4>{user.name}</h4>
              <p>{user.role}</p>
            </div>
          ))}
        </div>
      ) : null}
    </ViewCard>
  );
}
```

### Dynamic Content Cards

```tsx
function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "all" || product.category === selectedCategory
  );

  return (
    <div>
      <CategorySelector
        value={selectedCategory}
        onChange={setSelectedCategory}
      />

      <ViewCard
        title="Products"
        description={
          filteredProducts.length
            ? `${filteredProducts.length} products found`
            : "No products match your criteria"
        }
      >
        {filteredProducts.length > 0 && (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </ViewCard>
    </div>
  );
}
```

### Nested Cards

```tsx
function AnalyticsDashboard() {
  return (
    <div className="dashboard-grid">
      <ViewCard
        title="Revenue Analytics"
        description="Monthly revenue breakdown"
      >
        <div className="analytics-content">
          <ViewCard title="This Month">
            <div className="metric-large">$12,345</div>
          </ViewCard>

          <ViewCard title="Last Month">
            <div className="metric-large">$10,234</div>
          </ViewCard>
        </div>
      </ViewCard>
    </div>
  );
}
```

### Form Section Cards

```tsx
function UserProfile() {
  return (
    <div className="profile-sections">
      <ViewCard
        title="Personal Information"
        description="Update your basic profile details"
      >
        <form className="profile-form">
          <input placeholder="Full Name" />
          <input placeholder="Email" />
          <textarea placeholder="Bio" />
        </form>
      </ViewCard>

      <ViewCard title="Preferences" description="Customize your experience">
        <div className="preferences-form">
          <label>
            <input type="checkbox" /> Email Notifications
          </label>
          <label>
            <input type="checkbox" /> Dark Mode
          </label>
        </div>
      </ViewCard>
    </div>
  );
}
```

## Accessibility

- **Semantic HTML**: Uses proper heading hierarchy
- **Screen Reader**: Descriptive content structure
- **Focus Management**: Focusable content is properly managed
- **ARIA**: Proper labeling when needed

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
- Content and empty state modes
- Header with title and description
- TypeScript support
- CSS modules styling
- Responsive design
