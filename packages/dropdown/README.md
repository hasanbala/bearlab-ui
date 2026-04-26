# @bearlab/dropdown

> Accessible, customizable Dropdown component family for React applications.

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
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Three composable exports** — `Dropdown` (headless), `DropdownItem`, and `DropdownList` (self-contained)
- ✅ **Slot-based `className` & `style` API** — granular styling on `DropdownList`
- ✅ **Accessible by default** — `role="menu"`, `role="menuitem"`, `aria-labelledby`, `aria-haspopup`, `aria-expanded`
- ✅ **Click-outside support** — `useClickOutside` hook closes the menu automatically
- ✅ **Full keyboard navigation** — `Escape`, `ArrowUp`/`ArrowDown`, `Enter`/`Space`
- ✅ **Focus management** — focus moves to first item on open; returns to trigger on close
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Theme ready** — light/dark mode via `[data-theme]`

---

## Installation

```bash
npm install @bearlab/dropdown
# yarn add @bearlab/dropdown
# pnpm add @bearlab/dropdown
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0`.

---

## Components

| Component      | Description                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| `Dropdown`     | Low-level, uncontrolled menu container. You manage open/close state externally.                            |
| `DropdownItem` | Individual menu item inside `Dropdown`. Supports `<button>` and `<a>` with full keyboard navigation.       |
| `DropdownList` | Self-contained dropdown with built-in trigger button and internal state. Accepts a structured `list` prop. |

---

## Dropdown

Low-level primitive — you own the state. Renders as `role="menu"` only when `show` is true.

```tsx
import { useState } from "react";
import { Dropdown, DropdownItem } from "@bearlab/dropdown";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        id="my-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="my-menu"
        onClick={() => setOpen((v) => !v)}
      >
        Options
      </button>
      <Dropdown
        id="my-menu"
        show={open}
        onClose={() => setOpen(false)}
        labelledBy="my-trigger"
      >
        <DropdownItem onItemClick={() => console.log("Profile")}>
          Profile
        </DropdownItem>
        <DropdownItem tag="a" href="/settings">
          Settings
        </DropdownItem>
        <DropdownItem disabled>Unavailable</DropdownItem>
      </Dropdown>
    </div>
  );
}
```

---

## DropdownItem

Renders a single `role="menuitem"` inside a `Dropdown`. Supports `<button>` (default) or `<a>`.

```tsx
<Dropdown show={true} onClose={() => {}}>
  <DropdownItem onItemClick={() => {}}>Profile</DropdownItem>
  <DropdownItem tag="a" href="/settings">
    Settings
  </DropdownItem>
  <DropdownItem disabled>Unavailable</DropdownItem>
</Dropdown>
```

---

## DropdownList

Self-contained dropdown that manages state internally via `useDropdown`. The trigger button is rendered by `@bearlab/button`. Options are grouped into arrays, with dividers between groups.

```tsx
import { DropdownList } from "@bearlab/dropdown";
import MyIcon from "./icons/my-icon.svg?react";

<DropdownList
  list={{
    dropdownLabel: "My Account",
    options: [
      [
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/settings", icon: MyIcon },
      ],
      [{ label: "Logout", href: "/logout" }],
    ],
  }}
/>;
```

---

## Props

### Dropdown Props

| Prop         | Type                  | Default | Required | Description                                       |
| ------------ | --------------------- | ------- | -------- | ------------------------------------------------- |
| `show`       | `boolean`             | —       | ✅       | Controls menu visibility                          |
| `onClose`    | `() => void`          | —       | ✅       | Called on click-outside                           |
| `children`   | `React.ReactNode`     | —       | ✅       | Menu content, typically `DropdownItem` components |
| `id`         | `string`              | —       | ❌       | ID for the menu container                         |
| `labelledBy` | `string`              | —       | ❌       | Trigger button ID; linked via `aria-labelledby`   |
| `className`  | `string`              | —       | ❌       | Class on the menu container                       |
| `style`      | `React.CSSProperties` | —       | ❌       | Inline style on the menu container                |

### DropdownItem Props

| Prop          | Type                  | Default    | Required | Description                                                            |
| ------------- | --------------------- | ---------- | -------- | ---------------------------------------------------------------------- |
| `children`    | `React.ReactNode`     | —          | ✅       | Item content                                                           |
| `tag`         | `"a" \| "button"`     | `"button"` | ❌       | HTML element; use `"a"` for navigation links                           |
| `href`        | `string`              | —          | ❌       | URL (required when `tag="a"`)                                          |
| `onClick`     | `() => void`          | —          | ❌       | Native click handler                                                   |
| `onItemClick` | `() => void`          | —          | ❌       | Convenience alias called alongside `onClick`                           |
| `disabled`    | `boolean`             | `false`    | ❌       | Disables item (`aria-disabled`, `tabIndex=-1`, `pointer-events: none`) |
| `className`   | `string`              | —          | ❌       | Class on the item element                                              |
| `style`       | `React.CSSProperties` | —          | ❌       | Inline style on the item element                                       |

### DropdownList Props

| Prop        | Type                                    | Default        | Required | Description                                           |
| ----------- | --------------------------------------- | -------------- | -------- | ----------------------------------------------------- |
| `list`      | `DropdownListData`                      | —              | ✅       | Trigger label + grouped option arrays                 |
| `id`        | `string`                                | auto-generated | ❌       | Custom ID for the trigger; menu ID is derived from it |
| `className` | [`DropdownListClassNames`](#typescript) | —              | ❌       | Slot-based CSS classes for component parts            |
| `style`     | [`DropdownListStyles`](#typescript)     | —              | ❌       | Slot-based inline styles for component parts          |

#### `list` data shape

```ts
{
  dropdownLabel: string;
  options: {
    label: string;
    href: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }[][];
}
```

---

## Slot-based Customization

`DropdownList` supports the **Slot-Pattern**. `Dropdown` and `DropdownItem` use flat `className`/`style`.

### `DropdownListClassNames`

| Slot              | Targets                                       |
| ----------------- | --------------------------------------------- |
| `root`            | Outermost `<div>` of `DropdownList`           |
| `dropdown`        | Inner menu `<div>` inside `Dropdown`          |
| `dropdownButton`  | Trigger `<button>` element                    |
| `dropdownItem`    | Individual `<a>` item wrapper inside the list |
| `dropdownOptions` | `<ul>` group list element                     |
| `dropdownOption`  | `<li>` individual option                      |
| `dropdownIcon`    | Icon `<svg>` inside an option                 |
| `dropdownLabel`   | Label `<span>` inside an option               |

```tsx
<DropdownList
  list={myListData}
  className={{
    root: "custom-root",
    dropdownButton: "custom-trigger",
    dropdownItem: "custom-item",
  }}
  style={{
    root: { marginTop: "20px" },
    dropdownButton: { fontWeight: "bold" },
  }}
/>
```

---

## Theme Management

All three components support light/dark mode via `[data-theme="dark"]` on any ancestor element.

| Component      | Key tokens that adapt                                                         |
| -------------- | ----------------------------------------------------------------------------- |
| `Dropdown`     | `--bearlab-dropdown-bg`, `--bearlab-dropdown-border-color`                    |
| `DropdownItem` | `--bearlab-dropdown-item-color`, `--bearlab-dropdown-item-bg`, hover colors   |
| `DropdownList` | `--bearlab-dropdown-list-divider-color`, `--bearlab-dropdown-list-icon-color` |

---

## Design Tokens (Customization)

All tokens follow `--bearlab-dropdown-[element]-[property]` naming and are scoped to each component's root class.

### `Dropdown` tokens

```css
:root {
  --bearlab-dropdown-z-index: 40;
  --bearlab-dropdown-border-radius: 0.75rem; /* 12px */
  --bearlab-dropdown-padding: 0.75rem; /* 12px */
  --bearlab-dropdown-bg: #ffffff;
  --bearlab-dropdown-border-color: #e5e7eb;
  --bearlab-dropdown-box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
```

### `DropdownItem` tokens

```css
:root {
  --bearlab-dropdown-item-font-size: 0.875rem; /* 14px */
  --bearlab-dropdown-item-font-weight: 500;
  --bearlab-dropdown-item-border-radius: 0.5rem; /* 8px */
  --bearlab-dropdown-item-color: #344054;
  --bearlab-dropdown-item-bg: #ffffff;
  --bearlab-dropdown-item-color-hover: #101828;
  --bearlab-dropdown-item-bg-hover: #f2f4f7;
  --bearlab-dropdown-item-ring-color-focus: #465fff;
  --bearlab-dropdown-item-opacity-disabled: 0.5;
}
```

### `DropdownList` tokens

```css
:root {
  --bearlab-dropdown-list-width: 16.25rem; /* 260px */
  --bearlab-dropdown-list-item-height: 2.5rem; /* 40px */
  --bearlab-dropdown-list-icon-size: 1.5rem; /* 24px */
  --bearlab-dropdown-list-icon-color: #6b7280;
  --bearlab-dropdown-list-icon-color-hover: #374151;
  --bearlab-dropdown-list-divider-color: #e5e7eb;
}
```

---

## Accessibility

Built to **WCAG 2.1 AA** following the [ARIA Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/):

- **`role="menu"`** — `Dropdown` container is a menu widget.
- **`role="menuitem"`** — each `DropdownItem` is a menu item.
- **`aria-labelledby`** — menu is linked to its trigger button ID.
- **`aria-haspopup="menu"` + `aria-expanded`** — `DropdownList` trigger communicates state.
- **`aria-controls`** — trigger references the menu container.
- **`aria-disabled`** — disabled items are announced; excluded from tab order (`tabIndex=-1`).
- **`Escape`** — closes the dropdown and returns focus to the trigger.
- **`ArrowDown` / `ArrowUp`** — navigate between `menuitem` elements.
- **`Enter` / `Space`** — activate the focused item.
- **Focus management** — on open, first non-disabled `menuitem` receives focus via `requestAnimationFrame`.

---

## TypeScript

```ts
import type {
  DropdownProps,
  DropdownItemProps,
  DropdownListProps,
  DropdownListClassNames,
  DropdownListStyles,
} from "@bearlab/dropdown";
```

### `DropdownProps`

```ts
interface DropdownProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  id?: string;
  labelledBy?: string;
  className?: string;
  style?: React.CSSProperties;
}
```

### `DropdownItemProps`

```ts
interface DropdownItemProps {
  children: React.ReactNode;
  tag?: "a" | "button";
  href?: string;
  onClick?: () => void;
  onItemClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

### `DropdownListProps`

```ts
interface DropdownListProps {
  list: {
    dropdownLabel: string;
    options: {
      label: string;
      href: string;
      icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    }[][];
  };
  id?: string;
  className?: DropdownListClassNames;
  style?: DropdownListStyles;
}
```

### `DropdownListClassNames`

```ts
interface DropdownListClassNames {
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
interface DropdownListStyles {
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

> `DropdownOptionsProps` and `DropdownOptionProps` are internal compound component types and are not exported.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
