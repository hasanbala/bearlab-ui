# @bearlab/navigation-menu

> Accessible, fully customizable Navigation Menu component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/navigation-menu)](https://www.npmjs.com/package/@bearlab/navigation-menu)
[![license](https://img.shields.io/npm/l/@bearlab/navigation-menu)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Item Configuration](#item-configuration)
- [Content & Links](#content--links)
- [Router Integration (`renderLink`)](#router-integration-renderlink)
- [Controlled Mode](#controlled-mode)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)

---

## Features

- ✅ **Config-driven API** — describe the whole menu with a single `items` prop, no compound component boilerplate
- ✅ **Rich content panels** — grouped links with optional icons and descriptions, or fully custom panel content
- ✅ **Hover intent** — panels open on hover after `delayDuration` and stay open while the pointer travels between trigger and content
- ✅ **Portalled panels** — panels render into the body and are clamped into the viewport, so no `overflow: hidden` or transformed ancestor can clip them
- ✅ **Scrollable menubar** — a horizontal menu that runs out of room scrolls instead of overflowing its container, with faded edges and keyboard auto-scroll
- ✅ **Horizontal & vertical** orientations
- ✅ **Active indicator** — animated underline that follows the open item (toggle with `showIndicator`)
- ✅ **Keyboard navigable** — arrow keys, `Home`/`End`, `Enter`/`Space`, and `Escape` with focus restoration
- ✅ **Router-ready** — `renderLink` escape hatch to integrate Next.js `<Link>`, React Router, etc.
- ✅ **Controlled or uncontrolled** — own the open state via `value`/`onValueChange` or let the component manage it
- ✅ **Slot-based `className` & `style` API** — granular styling of every element
- ✅ **Dark mode ready** — responds to `[data-theme="dark"]` automatically
- ✅ **TypeScript-first** — fully typed items, links, and configuration options

---

## Installation

```bash
# npm
npm install @bearlab/navigation-menu

# yarn
yarn add @bearlab/navigation-menu

# pnpm
pnpm add @bearlab/navigation-menu
```

> **Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0` must be installed in your project.

> **Framework support:** Works with React 18/19 and Next.js — both the App Router
> and the Pages Router. Every component ships with the `"use client"` directive
> already applied, so you can import it straight into a Server Component without
> writing a wrapper file. All DOM access is SSR-guarded.

---

## Usage

### Basic menu with content panels

```tsx
import { NavigationMenu } from "@bearlab/navigation-menu";
import type { NavigationMenuItem } from "@bearlab/navigation-menu";

const items: NavigationMenuItem[] = [
  {
    value: "products",
    label: "Products",
    content: {
      groups: [
        {
          label: "Platform",
          links: [
            {
              label: "Analytics",
              href: "/products/analytics",
              description: "Understand your traffic in real time.",
            },
            {
              label: "Automations",
              href: "/products/automations",
              description: "Trigger workflows from any event.",
            },
          ],
        },
      ],
    },
  },
  { value: "pricing", label: "Pricing", href: "/pricing" },
  { value: "docs", label: "Docs", href: "/docs" },
];

export default function App() {
  return <NavigationMenu items={items} aria-label="Main" />;
}
```

### Simple links only

```tsx
<NavigationMenu
  items={[
    { value: "home", label: "Home", href: "/" },
    { value: "blog", label: "Blog", href: "/blog" },
    {
      value: "github",
      label: "GitHub",
      href: "https://github.com",
      external: true,
    },
  ]}
/>
```

### Vertical orientation

```tsx
<NavigationMenu orientation="vertical" items={items} />
```

### Custom panel content

```tsx
const items = [
  {
    value: "resources",
    label: "Resources",
    content: {
      custom: (
        <div style={{ display: "grid", gap: 8 }}>
          <strong>Featured</strong>
          <a href="/changelog">What&apos;s new →</a>
        </div>
      ),
    },
  },
];
```

---

## Props

| Prop                | Type                                                    | Default        | Required | Description                                                      |
| ------------------- | ------------------------------------------------------- | -------------- | -------- | ---------------------------------------------------------------- |
| `items`             | [`NavigationMenuItem[]`](#item-configuration)           | —              | ✅       | Top-level menu items (links and/or triggers)                     |
| `orientation`       | `"horizontal" \| "vertical"`                            | `"horizontal"` | ❌       | Layout direction and arrow-key behaviour                         |
| `value`             | `string \| null`                                        | —              | ❌       | Controlled open item value (`null` = all closed)                 |
| `defaultValue`      | `string \| null`                                        | `null`         | ❌       | Uncontrolled initial open item value                             |
| `onValueChange`     | `(value: string \| null) => void`                       | —              | ❌       | Fires whenever the open item changes                             |
| `delayDuration`     | `number`                                                | `200`          | ❌       | Hover-open delay in ms                                           |
| `skipDelayDuration` | `number`                                                | `300`          | ❌       | Window (ms) during which moving between triggers opens instantly |
| `showIndicator`     | `boolean`                                               | `true`         | ❌       | Renders the animated active-item indicator                       |
| `sideOffset`        | `number`                                                | `8`            | ❌       | Distance in px between a trigger and its content panel           |
| `renderLink`        | `(link, children, props) => ReactNode`                  | —              | ❌       | Render links with a custom router component (see below)          |
| `aria-label`        | `string`                                                | `"Main"`       | ❌       | Accessible label for the `<nav>` landmark                        |
| `className`         | [`NavigationMenuClassNames`](#slot-based-customization) | —              | ❌       | Per-slot className overrides                                     |
| `style`             | [`NavigationMenuStyles`](#slot-based-customization)     | —              | ❌       | Per-slot inline style overrides                                  |

---

## Item Configuration

Each entry in `items` conforms to `NavigationMenuItem`:

| Field      | Type                                       | Required | Description                                                  |
| ---------- | ------------------------------------------ | -------- | ------------------------------------------------------------ |
| `value`    | `string`                                   | ✅       | Stable identifier (also the controlled `value`)              |
| `label`    | `string`                                   | ✅       | Trigger / link text                                          |
| `href`     | `string`                                   | ❌       | Makes the item a simple link (omit when using `content`)     |
| `external` | `boolean`                                  | ❌       | Opens in a new tab with `rel="noopener noreferrer"`          |
| `disabled` | `boolean`                                  | ❌       | Disables the item                                            |
| `icon`     | `FunctionComponent<SVGProps>`              | ❌       | Leading icon component                                       |
| `content`  | [`NavigationMenuContent`](#content--links) | ❌       | Presence turns the item into a trigger with a dropdown panel |

> An item is a **link** when it has `href` and no `content`, and a **trigger** when it has `content`.

---

## Content & Links

```ts
interface NavigationMenuContent {
  groups?: NavigationMenuGroup[]; // grouped link columns
  custom?: React.ReactNode; // fully custom panel (wins over `groups`)
}

interface NavigationMenuGroup {
  label?: string; // optional section heading
  links: NavigationMenuLink[];
}

interface NavigationMenuLink {
  label: string;
  href: string;
  description?: string; // secondary line under the label
  external?: boolean;
  disabled?: boolean;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
```

---

## Router Integration (`renderLink`)

By default links render as plain `<a>` elements. Use `renderLink` to delegate to
your router so client-side navigation and prefetching work. The component passes
you the original `link`, the rendered `children`, and the props you should spread
onto your anchor.

> **Spread the whole `props` object.** Besides `className` / `style`, it carries
> the `data-nav-*` hooks and `onKeyDown` handler that arrow-key roving focus and
> `Escape` focus restoration rely on. Cherry-picking individual keys silently
> drops those items out of the keyboard navigation order.

```tsx
import Link from "next/link";

<NavigationMenu
  items={items}
  renderLink={(link, children, props) => (
    <Link {...props} href={link.href}>
      {children}
    </Link>
  )}
/>;
```

React Router:

```tsx
import { Link } from "react-router-dom";

<NavigationMenu
  items={items}
  renderLink={(link, children, props) => (
    <Link {...props} to={link.href}>
      {children}
    </Link>
  )}
/>;
```

`props` is typed as `NavigationMenuRenderLinkProps`:

| Prop               | Passed on        | Description                                    |
| ------------------ | ---------------- | ---------------------------------------------- |
| `href`             | all links        | Resolved destination                           |
| `className`        | all links        | Slot classes for the trigger / panel link      |
| `style`            | all links        | Matching `style` slot                          |
| `target` / `rel`   | `external` links | `_blank` + `noopener noreferrer`               |
| `role`             | all links        | `"menuitem"`                                   |
| `onClick`          | all links        | Closes the menu after selection                |
| `onKeyDown`        | top-level items  | Arrow / `Home` / `End` roving focus            |
| `data-nav-trigger` | top-level items  | Marks the element as a roving-focus stop       |
| `data-nav-value`   | top-level items  | The item's `value`, used for focus restoration |
| `data-nav-link`    | panel links      | Marks the element as a focusable panel link    |

> `renderLink` is only called for enabled links — disabled ones always render as
> a non-navigable `<a>`.

---

## Controlled Mode

Own the open state to sync it with the URL, analytics, or other UI:

```tsx
const [open, setOpen] = useState<string | null>(null);

<NavigationMenu items={items} value={open} onValueChange={setOpen} />;
```

Leave `value` undefined for uncontrolled behaviour (the component manages its own
open state and still calls `onValueChange`).

---

## Slot-based Customization

The component follows the **Slot-Pattern** to enable surgical styling of any element.

### `NavigationMenuClassNames`

| Slot              | Targets                                   |
| ----------------- | ----------------------------------------- |
| `root`            | Outermost `<nav>` landmark                |
| `list`            | `<ul role="menubar">`                     |
| `item`            | Each `<li>`                               |
| `trigger`         | Trigger `<button>` / top-level link `<a>` |
| `triggerIcon`     | Leading icon inside a trigger             |
| `content`         | Dropdown panel `<div>`                    |
| `contentInner`    | Inner flex wrapper of the panel           |
| `group`           | A link group column                       |
| `groupLabel`      | Group heading                             |
| `link`            | A link inside the panel                   |
| `linkIcon`        | Link leading icon wrapper                 |
| `linkLabel`       | Link label text                           |
| `linkDescription` | Link description text                     |
| `indicator`       | Active-item indicator                     |

```tsx
<NavigationMenu
  items={items}
  className={{
    root: "my-nav",
    trigger: "my-trigger",
    content: "my-panel",
  }}
/>
```

### `NavigationMenuStyles`

Every slot also accepts inline `React.CSSProperties` via the `style` prop with the
same keys.

---

## Theme Management

The component automatically adapts when a `data-theme="dark"` attribute is present
on any ancestor element.

```html
<html data-theme="dark">
  ...
</html>
```

---

## Design Tokens (Customization)

All visual defaults are scoped CSS custom properties on the component root.
Override them with `--bearlab-navigation-menu-*` variables.

```css
[data-theme="light"] {
  --bearlab-navigation-menu-trigger-color: #344054;
  --bearlab-navigation-menu-trigger-bg-active: #eef1ff;
  --bearlab-navigation-menu-indicator-color: #465fff;
  --bearlab-navigation-menu-content-bg: #ffffff;
  --bearlab-navigation-menu-content-border-radius: 0.75rem;
}

[data-theme="dark"] {
  --bearlab-navigation-menu-trigger-color: #d0d5dd;
  --bearlab-navigation-menu-content-bg: #0f1828;
  --bearlab-navigation-menu-indicator-color: #7592ff;
}
```

**Key tokens:**

| Token                                             | Default (light) | Description              |
| ------------------------------------------------- | --------------- | ------------------------ |
| `--bearlab-navigation-menu-trigger-height`        | `2.5rem`        | Trigger height           |
| `--bearlab-navigation-menu-trigger-border-radius` | `0.5rem`        | Trigger border radius    |
| `--bearlab-navigation-menu-trigger-bg-hover`      | `#f2f4f7`       | Trigger hover background |
| `--bearlab-navigation-menu-trigger-bg-active`     | `#eef1ff`       | Open trigger background  |
| `--bearlab-navigation-menu-content-min-width`     | `18rem`         | Panel minimum width      |
| `--bearlab-navigation-menu-content-border-radius` | `0.75rem`       | Panel border radius      |
| `--bearlab-navigation-menu-content-z-index`       | `40`            | Panel stacking context   |
| `--bearlab-navigation-menu-indicator-color`       | `#465fff`       | Active indicator color   |
| `--bearlab-navigation-menu-transition`            | `0.18s …`       | Shared transition timing |

---

## Accessibility

- **`<nav aria-label>` landmark** wrapping a `role="menubar"` list with `aria-orientation`.
- **Triggers** expose `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls` pointing at the open panel.
- **Keyboard support:**
  - `ArrowLeft` / `ArrowRight` (horizontal) or `ArrowUp` / `ArrowDown` (vertical) move focus between top-level items.
  - `Home` / `End` jump to the first / last item.
  - `ArrowDown` (horizontal) / `ArrowRight` (vertical) opens a trigger and moves focus into its panel.
  - `Tab` from an open trigger enters its panel; `Tab` off the last link (or `Shift`+`Tab` off the first) closes the panel and continues through the menubar.
  - `Enter` / `Space` toggles a trigger.
  - `Escape` closes the open panel and restores focus to its trigger.
- **Pointer intent** keeps the panel open while moving between the trigger and the content, and closes on outside click.
- **Portalled panels** — an open panel is rendered into `document.body`, so no
  scrolling or transformed ancestor can clip it. Horizontal menus drop below the
  trigger, vertical menus open to its inline-end side, and the position is
  clamped into the viewport so the panel never overflows the screen. The side is
  exposed as `data-side="block-end" | "inline-end"` on the portal wrapper.
- **Scrollable menubar** — when a horizontal menu is wider than its container it
  becomes a scroll area (native drag, `shift`+wheel, touch) with the scrollbar
  hidden. Arrow-key navigation scrolls the newly focused trigger into view. The
  list carries `data-overflow="none" | "start" | "end" | "both"` describing which
  edge still has content scrolled past it; the edges are faded accordingly.
- Icons are marked `aria-hidden="true"`.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  NavigationMenuProps,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuGroup,
  NavigationMenuContent,
  NavigationMenuOrientation,
  NavigationMenuClassNames,
  NavigationMenuStyles,
  NavigationMenuRenderLinkProps,
} from "@bearlab/navigation-menu";
```

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
