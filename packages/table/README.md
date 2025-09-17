# @bearlab/table

A powerful, feature-rich React table component with built-in pagination, search, filtering, and row selection capabilities. Part of the Bearlab UI component library.

## ✨ Features

- **🔍 Search & Filter**: Built-in search functionality with customizable filters
- **📑 Pagination**: Client-side and server-side pagination support
- **✅ Row Selection**: Support for checkbox and radio button selection
- **📱 Responsive Design**: Mobile-first design with adaptive layouts
- **🎨 Theming**: Light and dark theme support
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **🚀 Performance**: Optimized rendering with minimal re-renders
- **📝 TypeScript**: Full type safety and IntelliSense support

## 📦 Installation

```bash
npm install @bearlab/table
```

```bash
yarn add @bearlab/table
```

## 🔗 Dependencies

- `react >= 16.8.0`
- `react-dom >= 16.8.0`
- `@bearlab/core` - For upload icons, style variables, utilities and theme support
- `@bearlab/checkbox` - Checkbox component base
- `@bearlab/radio` - Radio component base
- `@bearlab/input` - Input component base
- `@bearlab/select` - Select component base
- `@bearlab/button` - Button component base
- `@bearlab/hooks` - Hooks component base
- `classnames` - For conditional CSS class handling

## 📚 API Reference

### Table Props

| Property               | Type                                    | Default              | Description                                                           |
| ---------------------- | --------------------------------------- | -------------------- | --------------------------------------------------------------------- |
| `dataSource`           | `Record<string, any>[]`                 | `[]`                 | Data source for the table. Each record must have a unique `key` field |
| `columns`              | `TableColumn[]`                         | `[]`                 | Column configuration                                                  |
| `title`                | `string`                                | -                    | Table title displayed in header                                       |
| `className`            | `string`                                | -                    | Additional CSS class name                                             |
| `rowSelection`         | `RowSelection`                          | -                    | Row selection configuration                                           |
| `pagination`           | `boolean \| PaginationConfig`           | `false`              | Pagination configuration                                              |
| `onRowClick`           | `(record: Record<string, any>) => void` | -                    | Row click handler                                                     |
| `disabled`             | `boolean`                               | `false`              | Disable all table interactions                                        |
| `serverPagination`     | `boolean`                               | `false`              | Enable server-side pagination                                         |
| `totalCount`           | `number`                                | -                    | Total number of records (for server pagination)                       |
| `currentPage`          | `number`                                | `1`                  | Current page number                                                   |
| `pageSizeOptions`      | `number[]`                              | -                    | Available page size options                                           |
| `showPageSizeSelector` | `boolean`                               | `false`              | Show page size selector                                               |
| `pageSizePlaceholder`  | `string`                                | `"Select page size"` | Page size selector placeholder                                        |
| `maxVisiblePages`      | `number`                                | `6`                  | Maximum visible page numbers                                          |
| `onTableChange`        | `TableChangeHandler`                    | -                    | Table change handler for server pagination                            |

### TableColumn

| Property    | Type                                          | Description                                            |
| ----------- | --------------------------------------------- | ------------------------------------------------------ |
| `title`     | `string`                                      | Column header title                                    |
| `dataIndex` | `string`                                      | Data field key (supports nested keys like "user.name") |
| `key`       | `string`                                      | Unique column key                                      |
| `width`     | `string \| number`                            | Column width                                           |
| `render`    | `(text: any, record: any) => React.ReactNode` | Custom render function                                 |
| `sorter`    | `(a: any, b: any) => number`                  | Sort function (future feature)                         |

### RowSelection

| Property   | Type                                                                       | Description              |
| ---------- | -------------------------------------------------------------------------- | ------------------------ |
| `type`     | `"checkbox" \| "radio"`                                                    | Selection type           |
| `onChange` | `(selectedRowKeys: string[], selectedRows: Record<string, any>[]) => void` | Selection change handler |

### PaginationConfig

| Property          | Type      | Default | Description              |
| ----------------- | --------- | ------- | ------------------------ |
| `pageSize`        | `number`  | `5`     | Number of items per page |
| `showPageNumbers` | `boolean` | `true`  | Show page number buttons |

### TableChangeHandler

```typescript
type TableChangeHandler = (
  setInitialPage: React.Dispatch<React.SetStateAction<number>>,
  page: number,
  pageSize: number,
  isPageSize?: boolean
) => void;
```

### Responsive Design

The table is fully responsive and adapts to different screen sizes:

- **Desktop (>1024px)**: Full feature set with all controls visible
- **Tablet (768px-1024px)**: Optimized layout with adjusted controls
- **Mobile (<768px)**: Simplified pagination controls
- **Small Mobile (<540px)**: Minimized pagination with page info display

### TypeScript Support

This component is written in TypeScript and includes full type definitions. No additional `@types` packages are needed.

```typescript
import { Table, Props as TableProps } from "@bearlab/table";

const MyTable: React.FC<{ data: any[] }> = ({ data }) => {
  return <Table dataSource={data} columns={columns} />;
};
```

## 🎯 Usage Examples

```jsx
import { Table } from "@bearlab/table";
import "@bearlab/table/dist/index.css";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

const dataSource = [
  {
    key: "1",
    name: "John Doe",
    age: 28,
    email: "john@example.com",
  },
  {
    key: "2",
    name: "Jane Smith",
    age: 32,
    email: "jane@example.com",
  },
];

function MyTable() {
  return <Table dataSource={dataSource} columns={columns} />;
}
```

### Table with Pagination

```jsx
import { Table } from "@bearlab/table";

function PaginatedTable() {
  return (
    <Table
      title="User Management"
      dataSource={dataSource}
      columns={columns}
      pagination={{
        pageSize: 10,
        showPageNumbers: true,
      }}
    />
  );
}
```

### Table with Row Selection

```jsx
import { Table } from "@bearlab/table";
import { useState } from "react";

function SelectableTable() {
  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    type: "checkbox", // or 'radio'
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("Selected rows:", selectedRows);
      setSelectedRows(selectedRows);
    },
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowSelection={rowSelection}
      pagination={true}
    />
  );
}
```

### Server-Side Pagination

```jsx
import { Table } from "@bearlab/table";
import { useState, useEffect } from "react";

function ServerPaginatedTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTableChange = (setInitialPage, page, pageSize, isPageSize) => {
    if (isPageSize) {
      // Handle page size change
      fetchData(1, pageSize);
      setInitialPage(1);
    } else {
      // Handle page change
      fetchData(page, pageSize);
      setInitialPage(page);
    }
  };

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await api.fetchUsers({ page, pageSize });
      setData(response.data);
      setTotalCount(response.total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table
      dataSource={data}
      columns={columns}
      serverPagination={true}
      totalCount={totalCount}
      currentPage={currentPage}
      pagination={{
        pageSize: 20,
        showPageNumbers: true,
      }}
      showPageSizeSelector={true}
      pageSizeOptions={[10, 20, 50, 100]}
      onTableChange={handleTableChange}
      disabled={loading}
    />
  );
}
```

### Custom Column Rendering

```jsx
const columns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (text, record) => (
      <img
        src={record.avatar}
        alt="Avatar"
        style={{ width: 40, height: 40, borderRadius: "50%" }}
      />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <div>
        <div style={{ fontWeight: "bold" }}>{text}</div>
        <div style={{ color: "#666", fontSize: "12px" }}>{record.email}</div>
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <span
        style={{
          padding: "4px 8px",
          borderRadius: "4px",
          backgroundColor: status === "active" ? "#d4edda" : "#f8d7da",
          color: status === "active" ? "#155724" : "#721c24",
        }}
      >
        {status}
      </span>
    ),
  },
];
```

## 🌙 Theme Support

The component automatically supports dark theme. When the `data-theme="dark"` attribute is added to the HTML element, it automatically switches to dark theme colors.

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

## 🎨 🎭 Styling

The component comes with built-in styles that support both light and dark themes. The styles are automatically applied when you import the CSS file.

```jsx
import "@bearlab/table/dist/index.css";
```

### Custom Styling

You can override the default styles by targeting the CSS classes:

```css
.bearlab-table-container {
  /* Custom container styles */
}

.bearlab-table-header {
  /* Custom header styles */
}

.bearlab-table-body {
  /* Custom body styles */
}
```

### Custom Styling

You can override default styles using CSS classes:

```css
.custom-table {
  --table-border-color: #e0e0e0;
  --table-header-bg: #f5f5f5;
  --table-row-hover: #f0f8ff;
}

.custom-table .table-header {
  background-color: var(--table-header-bg);
}

.custom-table .table-row:hover {
  background-color: var(--table-row-hover);
}
```

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
    <a href="https://www.npmjs.com/package/@bearlab/table">📦 View on NPM</a>
  </p>
</div>
