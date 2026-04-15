# @bearlab/dropdown

> Accessible, customizable Dropdown component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/dropdown)](https://www.npmjs.com/package/@bearlab/dropdown)
[![license](https://img.shields.io/npm/l/@bearlab/dropdown)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Components](#components)
  - [Dropdown](#dropdown)
  - [DropdownItem](#dropdownitem)
  - [DropdownList](#dropdownlist)
- [Props](#props)
  - [Dropdown Props](#dropdown-props)
  - [DropdownItem Props](#dropdownitem-props)
  - [DropdownList Props](#dropdownlist-props)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `role="menu"`, `aria-labelledby`, keyboard navigation support
- ✅ **Click Outside Support** — handles closing automatically
- ✅ **TypeScript-first** — fully typed props and interfaces
- ✅ **Zero layout opinion** — bring your own layout/wrapper
- ✅ **Self-contained composed variant** — `DropdownList` bundles trigger button + menu with its own open/close state

---

## Installation

```bash
# npm
npm install @bearlab/dropdown

# yarn
yarn add @bearlab/dropdown

# pnpm
pnpm add @bearlab/dropdown
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Components

This package exports three main components:

| Component      | Description                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| `Dropdown`     | Low-level, headless menu container. You control open/close state externally.                                 |
| `DropdownItem` | Individual menu item rendered inside `Dropdown`.                                                             |
| `DropdownList` | Self-contained dropdown with built-in trigger button and state management. Accepts a structured `list` prop. |

---

## Dropdown

Low-level primitive — you own the state. Pair it with `DropdownItem` for full control.

```tsx
import { Dropdown, DropdownItem } from "@bearlab/dropdown";

export default function App() {
  return (
    <div style={{ position: "relative" }}>
      <button id="dropdown-button">Options</button>
      <Dropdown show={true} onClose={() => {}} labelledBy="dropdown-button">
        <DropdownItem onItemClick={() => console.log("clicked")}>
          Profile
        </DropdownItem>
        <DropdownItem onItemClick={() => console.log("clicked")}>
          Settings
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
```

---

## DropdownItem

Renders a single interactive item inside a `Dropdown`. Supports both `<button>` and `<a>` tags.

```tsx
import { Dropdown, DropdownItem } from "@bearlab/dropdown";

<Dropdown show={true} onClose={() => {}}>
  {/* button variant (default) */}
  <DropdownItem onItemClick={() => console.log("clicked")}>
    Profile
  </DropdownItem>

  {/* link variant */}
  <DropdownItem tag="a" href="/settings">
    Settings
  </DropdownItem>

  {/* disabled */}
  <DropdownItem disabled>Unavailable</DropdownItem>
</Dropdown>;
```

---

## DropdownList

`DropdownList` is a **ready-to-use, self-contained** dropdown component. Unlike the primitive `Dropdown`, it manages its own open/close state internally and renders its own trigger button via `@bearlab/button`. It accepts a structured `list` prop that defines the button label and grouped navigation options.

Use this component when you need a drop-in dropdown with navigation links, organized into **option groups** (arrays of arrays), without wiring up any state yourself.

```tsx
import { DropdownList } from "@bearlab/dropdown";
import MyIcon from "./icons/my-icon.svg?react";

export default function App() {
  return (
    <DropdownList
      list={{
        dropdownLabel: "My Account",
        options: [
          // Group 1
          [
            { label: "Profile", href: "/profile" },
            { label: "Settings", href: "/settings", icon: MyIcon },
          ],
          // Group 2 (rendered with a divider)
          [{ label: "Logout", href: "/logout" }],
        ],
      }}
    />
  );
}
```

---

## Props

### Dropdown Props

| Prop         | Type                  | Default | Required | Description                                                             |
| ------------ | --------------------- | ------- | -------- | ----------------------------------------------------------------------- |
| `show`       | `boolean`             | —       | ✅       | Controls the visibility of the dropdown                                 |
| `onClose`    | `() => void`          | —       | ✅       | Callback function fired when clicking outside to close                  |
| `children`   | `React.ReactNode`     | —       | ✅       | Content rendered inside the dropdown, usually `DropdownItem` components |
| `id`         | `string`              | —       | ❌       | Unique ID for the dropdown container                                    |
| `labelledBy` | `string`              | —       | ❌       | Links the menu to its trigger button via `aria-labelledby`              |
| `className`  | `string`              | —       | ❌       | CSS class applied to the root menu container                            |
| `style`      | `React.CSSProperties` | —       | ❌       | Inline style applied to the root menu container                         |

---

### DropdownItem Props

| Prop          | Type                  | Default    | Required | Description                              |
| ------------- | --------------------- | ---------- | -------- | ---------------------------------------- |
| `children`    | `React.ReactNode`     | —          | ✅       | Content rendered inside the item         |
| `tag`         | `"a" \| "button"`     | `"button"` | ❌       | HTML element to render as                |
| `href`        | `string`              | —          | ❌       | URL to navigate to (used when `tag="a"`) |
| `onClick`     | `() => void`          | —          | ❌       | Click handler (native element click)     |
| `onItemClick` | `() => void`          | —          | ❌       | Convenience click handler alias          |
| `disabled`    | `boolean`             | `false`    | ❌       | Disables the item                        |
| `className`   | `string`              | —          | ❌       | CSS class applied to the item element    |
| `style`       | `React.CSSProperties` | —          | ❌       | Inline style applied to the item element |

---

### DropdownList Props

| Prop        | Type                                    | Default        | Required | Description                                                          |
| ----------- | --------------------------------------- | -------------- | -------- | -------------------------------------------------------------------- |
| `list`      | `DropdownListData` (defined below)      | —              | ✅       | Configuration object defining the trigger label and grouped options  |
| `id`        | `string`                                | auto-generated | ❌       | Custom ID for the trigger button. Menu ID is derived from this value |
| `className` | [`DropdownListClassNames`](#typescript) | —              | ❌       | Slot-based CSS classes for component parts                           |
| `style`     | [`DropdownListStyles`](#typescript)     | —              | ❌       | Slot-based inline styles for component parts                         |

#### `DropdownListData`

The `list` prop is a structured object that defines both the trigger label and the grouped menu options:

```ts
interface DropdownListData {
  /** Label displayed on the trigger button */
  dropdownLabel: string;
  /**
   * Grouped options rendered inside the dropdown.
   * Each inner array is a group; groups are visually separated by dividers.
   */
  options: {
    label: string;
    href: string;
    /** Optional SVG icon component (e.g. imported via SVGR) */
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }[][];
}
```

**Example with multiple groups:**

```tsx
<DropdownList
  list={{
    dropdownLabel: "User Menu",
    options: [
      // Group 1 — profile actions
      [
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/settings" },
      ],
      // Group 2 — danger zone
      [{ label: "Sign Out", href: "/logout" }],
    ],
  }}
/>
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.root` or style the inner content natively using `style?.dropdownItem`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `DropdownListClassNames`

| Slot              | Targets                       |
| ----------------- | ----------------------------- |
| `root`            | Outermost wrapper `<div>`     |
| `dropdown`        | Menu container `<div>`        |
| `dropdownButton`  | Trigger button element        |
| `dropdownItem`    | Individual menu item wrapper  |
| `dropdownOptions` | List group element (`<ul>`)   |
| `dropdownOption`  | List item element (`<li>`)    |
| `dropdownIcon`    | Icon element inside an option |
| `dropdownLabel`   | Label span inside an option   |

```tsx
<DropdownList
  list={myListData}
  className={{
    root: "custom-list-root",
    dropdownButton: "custom-trigger",
    dropdownItem: "custom-item",
  }}
/>
```

### `DropdownListStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<DropdownList
  list={myListData}
  style={{
    root: { marginTop: "20px" },
    dropdownButton: { background: "blue" },
  }}
/>
```

---

## Theme Management

The `Dropdown` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-dropdown-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-dropdown-root-bg: #ffffff;
  --bearlab-dropdown-root-border-radius: 8px;
  --bearlab-dropdown-root-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  --bearlab-dropdown-item-padding: 0.5rem 1rem;
  --bearlab-dropdown-item-hover-bg: #f5f5f5;
  --bearlab-dropdown-item-color: #1a1a1a;
}

[data-theme="dark"] {
  --bearlab-dropdown-root-bg: #1a1a1a;
  --bearlab-dropdown-item-hover-bg: #2a2a2a;
  --bearlab-dropdown-item-color: #ffffff;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`role="menu"`** — Indicates a menu widget that offers a list of choices.
- **`aria-labelledby`** — Semantically links the menu container to its specific trigger button.
- **Keyboard Navigation** — Best practices align with using `Escape` to close the dropdown securely.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  DropdownProps,
  DropdownItemProps,
  DropdownListProps,
  DropdownOptionProps,
  DropdownOptionsProps,
  DropdownListClassNames,
  DropdownListStyles,
} from "@bearlab/dropdown";
```

### `DropdownProps`

```ts
export interface DropdownProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  labelledBy?: string;
}
```

### `DropdownItemProps`

```ts
export interface DropdownItemProps {
  tag?: "a" | "button";
  href?: string;
  onClick?: () => void;
  onItemClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  disabled?: boolean;
}
```

### `DropdownListProps`

```ts
export interface DropdownListProps {
  list: {
    dropdownLabel: string;
    options: {
      label: string;
      href: string;
      icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    }[][];
  };
  className?: DropdownListClassNames;
  style?: DropdownListStyles;
  id?: string;
}
```

### `DropdownOptionsProps`

```ts
export interface DropdownOptionsProps {
  group: {
    href: string;
    label: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | undefined;
  }[];
  className?: DropdownListClassNames;
  style?: DropdownListStyles;
}
```

### `DropdownOptionProps`

```ts
export interface DropdownOptionProps {
  href: string;
  label: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | undefined;
  className?: DropdownListClassNames;
  style?: DropdownListStyles;
}
```

### `DropdownListClassNames`

```ts
export interface DropdownListClassNames {
  root?: string;
  dropdown?: string;
  dropdownButton?: string;
  dropdownItem?: string;
  dropdownOptions?: string;
  dropdownOption?: string;
  dropdownIcon?: string;
  dropdownLabel?: string;
}
```

### `DropdownListStyles`

```ts
export interface DropdownListStyles {
  root?: React.CSSProperties;
  dropdown?: React.CSSProperties;
  dropdownButton?: React.CSSProperties;
  dropdownItem?: React.CSSProperties;
  dropdownOptions?: React.CSSProperties;
  dropdownOption?: React.CSSProperties;
  dropdownIcon?: React.CSSProperties;
  dropdownLabel?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
