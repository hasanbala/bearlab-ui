# @bearlab/modal

> Accessible, fully customizable Modal component for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/modal)](https://www.npmjs.com/package/@bearlab/modal)
[![license](https://img.shields.io/npm/l/@bearlab/modal)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Types & Animations](#types--animations)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **3 structural types** — `default`, `alert`, `fullscreen`
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `role="dialog"` / `role="alertdialog"`, `aria-modal`, dynamic ARIA labelling
- ✅ **Focus Management** — traps focus and prevents body scroll while open
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Rich Animations** — customizable entry and exit transitions

---

## Installation

```bash
# npm
npm install @bearlab/modal

# yarn
yarn add @bearlab/modal

# pnpm
pnpm add @bearlab/modal
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
// app.tsx
import { ModalRoot } from "@bearlab/modal";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      {/* Required for imperative modal calls */}
      <ModalRoot />
    </div>
  );
}

// component.tsx
import { useState } from "react";
import { Modal, ModalFooter, useModal } from "@bearlab/modal";

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const deleteModal = useModal();

  const handleDelete = () => {
    // delete logic
    deleteModal.closeModal();
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Default Modal</button>
      <button onClick={deleteModal.openModal}>Controlled Modal</button>

      {/* Declarative usage */}
      <Modal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Confirm action"
        type="alert"
        alertType="warning"
      >
        <p>Are you sure you want to proceed with this action?</p>
      </Modal>

      {/* usage with ModalFooter */}
      <Modal
        isOpen={deleteModal.isOpen}
        onCancel={deleteModal.closeModal}
        title="Delete Record"
        animation="fade"
      >
        <p>This will permanently delete the selected item.</p>
        <ModalFooter
          onCancel={deleteModal.closeModal}
          onConfirm={handleDelete}
          confirmLabel="Delete"
          alertType="error"
        />
      </Modal>

      {/* usage with Loading state */}
      <Modal
        isOpen={false} // toggle this to test
        onCancel={() => {}}
        title="Processing..."
        loading={true}
      >
        <p>This content will be hidden while loading is true.</p>
      </Modal>
    </>
  );
}
```

### Opening an imperative from any component

```tsx
import { modalStore, MODAL_ANIMATION, MODAL_TYPE } from "@/shared/ui/modal";

const handleDelete = () => {};

// Basit alert
modalStore.open({
  title: "Success",
  content: <p>Record has been created.</p>,
  type: "alert",
  alertType: "success",
  animation: "bounce",
});

// Confirm dialog
modalStore.open({
  title: "Are you sure you want to delete this record?",
  content: <p>This action cannot be undone.</p>,
  animation: "flip",
  confirmLabel: "Yes, delete",
  onConfirm: () => handleDelete(),
});
```

---

## Props

| Prop        | Type                                                | Default     | Required | Description                                                  |
| ----------- | --------------------------------------------------- | ----------- | -------- | ------------------------------------------------------------ |
| `isOpen`    | `boolean`                                           | —           | ✅       | Controls the visibility of the modal                         |
| `onCancel`  | `() => void`                                        | —           | ✅       | Callback function fired when the modal requests to be closed |
| `title`     | `string`                                            | —           | ✅       | Heading text rendered inside the modal header                |
| `children`  | `React.ReactNode`                                   | —           | ✅       | Main content of the modal                                    |
| `subTitle`  | `string`                                            | —           | ❌       | Subtitle text rendered below the title                       |
| `loading`   | `boolean`                                           | `false`     | ❌       | Displays a standard loading spinner (using `@bearlab/loading`) |
| `type`      | `"default" \| "alert" \| "fullscreen"`              | `"default"` | ❌       | Structural type of the modal layout                          |
| `alertType` | `"success" \| "info" \| "error" \| "warning"`       | `"info"`    | ❌       | Semantic intent used when `type` is `"alert"`                |
| `animation` | `"fade" \| "zoom" \| "slide" \| "flip" \| "bounce"` | `"zoom"`    | ❌       | Animation style used for mounting/unmounting                 |
| `zIndex`    | `number`                                            | `1000`      | ❌       | `z-index` property for the root container                    |
| `className` | [`ModalClassNames`](#modalclassnames)               | —           | ❌       | Per-slot className overrides                                 |
| `style`     | [`ModalStyles`](#modalstyles)                       | —           | ❌       | Per-slot inline style overrides                              |

---

## Types & Animations

### Modal Types

| Type         | Use case                                                                   |
| ------------ | -------------------------------------------------------------------------- |
| `default`    | Standard dialog window for forms or generic content.                       |
| `alert`      | Focuses on a single semantic notification (success, error, warning, info). |
| `fullscreen` | Expands to cover the entire viewport, ideal for complex views or mobile.   |

### Animations

```tsx
<Modal animation="fade" title="..." isOpen={isOpen} onCancel={close}>...</Modal>
<Modal animation="zoom" title="..." isOpen={isOpen} onCancel={close}>...</Modal>
<Modal animation="slide" title="..." isOpen={isOpen} onCancel={close}>...</Modal>
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the main content block utilizing `className?.content` or style the overlay directly using `style?.overlay`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `ModalClassNames`

| Slot          | Targets                         |
| ------------- | ------------------------------- |
| `container`   | Outermost positioning container |
| `overlay`     | Backdrop overlay                |
| `content`     | Main modal surface window       |
| `header`      | Header container                |
| `title`       | Title heading element           |
| `subTitle`    | Subtitle text element           |
| `bodyContent` | Inner main content body wrapper |
| `closeButton` | The "X" close button            |

```tsx
<Modal
  isOpen={isOpen}
  onCancel={close}
  title="Custom Styled Modal"
  className={{
    container: "my-modal-container",
    content: "my-custom-dialog",
    header: "my-dialog-header",
  }}
>
  Content
</Modal>
```

### `ModalStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<Modal
  isOpen={isOpen}
  onCancel={close}
  title="Inline Styles"
  style={{
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
    content: { borderRadius: "16px", padding: "2rem" },
  }}
>
  Content
</Modal>
```

---

## Theme Management

The `Modal` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-modal-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-modal-content-bg: #ffffff;
  --bearlab-modal-overlay-bg: rgba(0, 0, 0, 0.5);
  --bearlab-modal-title-color: #1a1a1a;
  --bearlab-modal-border-radius: 12px;
  --bearlab-modal-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`role="dialog"` & `role="alertdialog"`** — Uses `dialog` by default and `alertdialog` for `type="alert"` variants, ensuring relevant screen reader announcements for critical or standard interactions.
- **`aria-modal="true"`** — Informs assistive technologies that windows underneath the modal are not available for interaction.
- **`aria-labelledby` & `aria-describedby`** — Semantically links the modal window to its specific title and subtitle using dynamically generated, stable IDs (`useId()`).
- **Focus Management** — Utilizes a `useFocusTrap` hook to lock user focus inside the modal, ensuring seamless keyboard navigation. Prevent layout shifts by hiding background overflow automatically.
- **Keyboard Navigation** — Natively supports the `Escape` key to safely close the modal.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  ModalProps,
  ModalType,
  ModalAlertType,
  ModalAnimationType,
  ModalClassNames,
  ModalStyles,
} from "@bearlab/modal";
```

### `ModalType`

```ts
type ModalType = "alert" | "default" | "fullscreen";
```

### `ModalClassNames`

```ts
interface ModalClassNames {
  container?: string;
  overlay?: string;
  content?: string;
  header?: string;
  title?: string;
  subTitle?: string;
  bodyContent?: string;
  closeButton?: string;
}
```

### `ModalStyles`

```ts
interface ModalStyles {
  container?: React.CSSProperties;
  overlay?: React.CSSProperties;
  content?: React.CSSProperties;
  header?: React.CSSProperties;
  bodyContent?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
