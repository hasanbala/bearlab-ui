# @bearlab/modal

> Accessible, fully customizable Modal component for React applications with built-in animations, focus trap, imperative API, and skeleton loading state.

[![npm version](https://img.shields.io/npm/v/@bearlab/modal)](https://www.npmjs.com/package/@bearlab/modal)
[![license](https://img.shields.io/npm/l/@bearlab/modal)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Props](#props)
- [ModalFooter](#modalfooter)
- [Modal Types & Sizes](#modal-types--sizes)
- [Animations](#animations)
- [Imperative API (modalStore)](#imperative-api-modalstore)
- [useModal Hook](#usemodal-hook)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **3 structural types** — `default`, `alert`, `fullscreen`
- ✅ **4 controlled sizes** — `small`, `medium`, `large`, `xlarge` (for `default` type)
- ✅ **5 built-in animations** — `fade`, `zoom`, `slide`, `flip`, `bounce`
- ✅ **Slot-based `className` & `style` API** — Granular styling without CSS overrides
- ✅ **Accessible by default** — `role="dialog"` / `role="alertdialog"`, `aria-modal`, dynamic ARIA labelling
- ✅ **Focus trap** — Locks focus inside the modal while open; restores on close
- ✅ **Body scroll lock** — Prevents background scrolling while modal is active
- ✅ **Imperative API** — Open/close from anywhere via `modalStore`
- ✅ **Skeleton loading state** — Built-in shimmer skeleton when `loading={true}`
- ✅ **Dark mode support** — Natively responds to `[data-theme="dark"]`
- ✅ **TypeScript-first** — Fully typed props and slot interfaces

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

## Setup

The `Modal` component renders into a dedicated DOM node via `ReactDOM.createPortal`. To use the [imperative API](#imperative-api-modalstore), add `<div id="modal-root">` to your HTML and optionally mount `<ModalRoot />` in your app root.

### 1. Add the portal target to your HTML

```html
<!-- index.html -->
<body>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>
```

### 2. Mount `<ModalRoot />` in your app root

```tsx
// app.tsx (or layout.tsx in Next.js)
import { ModalRoot } from "@bearlab/modal";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ModalRoot />
    </>
  );
}
```

> `<ModalRoot />` is only required if you use the imperative `modalStore` API. For declarative `<Modal>` usage only, it is optional — but `<div id="modal-root">` is always required.

---

## Usage

### Declarative usage (controlled)

```tsx
import { useState } from "react";
import { Modal, ModalFooter } from "@bearlab/modal";

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Confirm Action"
        subTitle="This action cannot be undone."
      >
        <p>Are you sure you want to proceed?</p>
        <ModalFooter
          onCancel={() => setIsOpen(false)}
          onConfirm={() => {
            // confirm logic
            setIsOpen(false);
          }}
          confirmLabel="Confirm"
          cancelLabel="Cancel"
        />
      </Modal>
    </>
  );
}
```

### Alert modal

```tsx
<Modal
  isOpen={isOpen}
  onCancel={() => setIsOpen(false)}
  title="Record Deleted"
  type="alert"
  alertType="success"
  animation="bounce"
>
  <p>The record was deleted successfully.</p>
  <ModalFooter
    type="alert"
    alertType="success"
    onCancel={() => setIsOpen(false)}
    confirmLabel="OK"
  />
</Modal>
```

### Fullscreen modal

```tsx
<Modal
  isOpen={isOpen}
  onCancel={() => setIsOpen(false)}
  title="Edit Profile"
  type="fullscreen"
>
  <p>Fullscreen form or complex view goes here.</p>
  <ModalFooter
    type="fullscreen"
    onCancel={() => setIsOpen(false)}
    onConfirm={handleSave}
  />
</Modal>
```

### Loading state (skeleton)

When `loading={true}`, the modal body is replaced with an animated shimmer skeleton.

```tsx
<Modal
  isOpen={isOpen}
  onCancel={() => setIsOpen(false)}
  title="Loading..."
  loading={true}
>
  {/* content is hidden while loading */}
  <p>This will appear after loading completes.</p>
</Modal>
```

### Controlled size

```tsx
<Modal
  isOpen={isOpen}
  onCancel={() => setIsOpen(false)}
  title="Large Dialog"
  size="large"
>
  <p>This modal uses the large size preset (800px max-width).</p>
</Modal>
```

### Imperative usage via `modalStore`

`modalStore.open()` can open any modal type — `default`, `alert`, or `fullscreen` — without local state.

```tsx
import { modalStore } from "@bearlab/modal";

// Alert modal
modalStore.open({
  title: "İşlem Başarılı",
  content: <p>Kayıt tamamlandı.</p>,
  type: "alert",
  alertType: "success",
  animation: "bounce",
  onConfirm: () => {
    console.log("confirmed");
  },
});

// Default confirm dialog
modalStore.open({
  title: "Kaydı sil",
  content: <p>Bu işlem geri alınamaz.</p>,
  confirmLabel: "Evet, sil",
  cancelLabel: "Vazgeç",
  animation: "flip",
  onConfirm: () => handleDelete(),
});

// Close programmatically
modalStore.close();
```

---

## Props

| Prop        | Type                                                | Default     | Required | Description                                                                           |
| ----------- | --------------------------------------------------- | ----------- | -------- | ------------------------------------------------------------------------------------- |
| `isOpen`    | `boolean`                                           | —           | ✅       | Controls the visibility of the modal                                                  |
| `onCancel`  | `() => void`                                        | —           | ✅       | Called when the overlay is clicked, Escape is pressed, or the close button is clicked |
| `title`     | `string`                                            | —           | ✅       | Heading text rendered in the modal header (`aria-labelledby`)                         |
| `children`  | `React.ReactNode`                                   | —           | ✅       | Main content of the modal body                                                        |
| `subTitle`  | `string`                                            | —           | ❌       | Subtitle rendered below the title (`aria-describedby`)                                |
| `loading`   | `boolean`                                           | `false`     | ❌       | Shows a shimmer skeleton and hides the body content                                   |
| `type`      | `"default" \| "alert" \| "fullscreen"`              | `"default"` | ❌       | Structural layout variant                                                             |
| `size`      | `"small" \| "medium" \| "large" \| "xlarge"`        | —           | ❌       | Max-width preset for the `default` type (ignored for `fullscreen`)                    |
| `alertType` | `"success" \| "info" \| "error" \| "warning"`       | `"info"`    | ❌       | Semantic intent icon shown in `alert` type modals                                     |
| `animation` | `"fade" \| "zoom" \| "slide" \| "flip" \| "bounce"` | `"zoom"`    | ❌       | Entry/exit animation style                                                            |
| `zIndex`    | `number`                                            | `10001`     | ❌       | `z-index` for the root container                                                      |
| `className` | [`ModalClassNames`](#modalclassnames)               | —           | ❌       | Per-slot className overrides                                                          |
| `style`     | [`ModalStyles`](#modalstyles)                       | —           | ❌       | Per-slot inline style overrides                                                       |

---

## ModalFooter

`ModalFooter` is a separate exported component to be placed as a child of `<Modal>`. It renders Cancel/Confirm buttons and adapts its layout to the current modal `type`.

```tsx
import { ModalFooter } from "@bearlab/modal";
```

### `ModalFooterProps`

| Prop           | Type                                          | Default     | Required | Description                                                        |
| -------------- | --------------------------------------------- | ----------- | -------- | ------------------------------------------------------------------ |
| `onCancel`     | `() => void`                                  | —           | ✅       | Called when the Cancel button is clicked                           |
| `onConfirm`    | `() => void`                                  | —           | ❌       | Called when the Confirm button is clicked                          |
| `cancelLabel`  | `string`                                      | `"Cancel"`  | ❌       | Label for the cancel button                                        |
| `confirmLabel` | `string`                                      | `"Save"`    | ❌       | Label for the confirm button                                       |
| `type`         | `"default" \| "alert" \| "fullscreen"`        | `"default"` | ❌       | Adapts footer layout — `alert` type shows a single centered button |
| `alertType`    | `"success" \| "info" \| "error" \| "warning"` | —           | ❌       | Colors the confirm button in `alert` mode                          |
| `isLoading`    | `boolean`                                     | —           | ❌       | Hides the footer entirely when `true` (for controlled loading)     |
| `isDisabled`   | `boolean`                                     | —           | ❌       | Disables the confirm button                                        |
| `className`    | `string`                                      | —           | ❌       | Additional className applied to the footer `<div>`                 |

---

## Modal Types & Sizes

### Modal Types

| Type         | Use case                                                                   |
| ------------ | -------------------------------------------------------------------------- |
| `default`    | Standard dialog window for forms or generic content. Supports `size` prop. |
| `alert`      | Focuses on a single semantic notification with a centered icon and action. |
| `fullscreen` | Expands to cover the entire viewport, ideal for complex views or mobile.   |

### Modal Sizes (for `default` type)

| Size     | Max Width | CSS Variable                  |
| -------- | --------- | ----------------------------- |
| `small`  | `400px`   | `--bearlab-modal-size-small`  |
| `medium` | `600px`   | `--bearlab-modal-size-medium` |
| `large`  | `800px`   | `--bearlab-modal-size-large`  |
| `xlarge` | `1140px`  | `--bearlab-modal-size-xlarge` |

> If `size` is omitted, the modal defaults to `700px` max-width (`--bearlab-modal-default-max-width`).

---

## Animations

| Value    | Description                        |
| -------- | ---------------------------------- |
| `zoom`   | Scale from 0.6 → 1 (default)       |
| `fade`   | Opacity 0 → 1                      |
| `slide`  | Slides in from top                 |
| `flip`   | 3D X-axis flip using `perspective` |
| `bounce` | Elastic overshoot spring effect    |

```tsx
<Modal animation="bounce" title="..." isOpen={isOpen} onCancel={close}>
  ...
</Modal>
```

---

## Imperative API (modalStore)

Open or close a modal from anywhere in your application — no local state needed. Requires `<ModalRoot />` to be mounted in your app root.

```tsx
import { modalStore } from "@bearlab/modal";

// Simple alert
modalStore.open({
  title: "Success",
  content: <p>Record has been created.</p>,
  type: "alert",
  alertType: "success",
  animation: "bounce",
});

// Confirm dialog with callbacks
modalStore.open({
  title: "Delete Record",
  content: <p>This action cannot be undone.</p>,
  animation: "flip",
  confirmLabel: "Yes, delete",
  cancelLabel: "Cancel",
  onConfirm: () => handleDelete(),
  onCancel: () => console.log("cancelled"),
});

// Close programmatically
modalStore.close();
```

### `GlobalModalConfig`

| Field          | Type                                                | Description                             |
| -------------- | --------------------------------------------------- | --------------------------------------- |
| `title`        | `string`                                            | Modal heading                           |
| `content`      | `React.ReactNode`                                   | Modal body content                      |
| `type`         | `"default" \| "alert" \| "fullscreen"`              | Structural layout variant               |
| `size`         | `"small" \| "medium" \| "large" \| "xlarge"`        | Width preset for `default` type         |
| `alertType`    | `"success" \| "info" \| "error" \| "warning"`       | Alert variant                           |
| `animation`    | `"fade" \| "zoom" \| "slide" \| "flip" \| "bounce"` | Entry/exit animation                    |
| `subTitle`     | `string`                                            | Subtitle below the heading              |
| `confirmLabel` | `string`                                            | Confirm button label                    |
| `cancelLabel`  | `string`                                            | Cancel button label                     |
| `zIndex`       | `number`                                            | `z-index` override                      |
| `onConfirm`    | `() => void`                                        | Callback on confirm (auto-closes modal) |
| `onCancel`     | `() => void`                                        | Callback on cancel (auto-closes modal)  |
| `className`    | `ModalClassNames`                                   | Per-slot className overrides            |
| `style`        | `ModalStyles`                                       | Per-slot inline style overrides         |

---

## useModal Hook

A lightweight hook to manage local open/close state without `useState` boilerplate.

```tsx
import { useModal, Modal, ModalFooter } from "@bearlab/modal";

export default function MyComponent() {
  const { isOpen, openModal, closeModal, toggleModal } = useModal();

  return (
    <>
      <button onClick={openModal}>Open</button>

      <Modal isOpen={isOpen} onCancel={closeModal} title="My Modal">
        <p>Content here.</p>
        <ModalFooter onCancel={closeModal} onConfirm={closeModal} />
      </Modal>
    </>
  );
}
```

### `UseModalReturn`

| Field         | Type         | Description                    |
| ------------- | ------------ | ------------------------------ |
| `isOpen`      | `boolean`    | Current open state             |
| `openModal`   | `() => void` | Sets `isOpen` to `true`        |
| `closeModal`  | `() => void` | Sets `isOpen` to `false`       |
| `toggleModal` | `() => void` | Toggles the current open state |

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues.

### `ModalClassNames`

| Slot          | Targets                               |
| ------------- | ------------------------------------- |
| `container`   | Outermost fixed positioning container |
| `overlay`     | Backdrop overlay `<div>`              |
| `content`     | Main modal surface `<div>`            |
| `header`      | Header container `<div>`              |
| `title`       | Title `<h2>` element                  |
| `subTitle`    | Subtitle `<p>` element                |
| `bodyContent` | Inner content body wrapper `<div>`    |
| `closeButton` | The "×" close `<button>`              |

```tsx
<Modal
  isOpen={isOpen}
  onCancel={close}
  title="Custom Styled Modal"
  className={{
    content: "my-custom-dialog",
    header: "my-dialog-header",
    title: "my-title",
  }}
>
  Content
</Modal>
```

### `ModalStyles`

| Slot          | Targets                    |
| ------------- | -------------------------- |
| `container`   | Outermost fixed container  |
| `overlay`     | Backdrop overlay           |
| `content`     | Main modal surface         |
| `header`      | Header container           |
| `bodyContent` | Inner content body wrapper |

```tsx
<Modal
  isOpen={isOpen}
  onCancel={close}
  title="Inline Styles"
  style={{
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
    content: { borderRadius: "16px" },
  }}
>
  Content
</Modal>
```

---

## Theme Management

The `Modal` component natively responds to the **`[data-theme="dark"]`** attribute applied at any ancestor element (e.g., `<html>` or `<body>`).

In dark mode, the following tokens are automatically adjusted:

- Background → `#111827`
- Text color → `#98a2b3`
- Title color → `rgba(255, 255, 255, 0.9)`
- Subtitle color → `#9ca3af`
- Close button hover → `rgba(102, 112, 133, 0.24)`
- Alert icon fills → semi-transparent variants
- Skeleton shimmer background → `#1d2939`

---

## Design Tokens (Customization)

CSS custom properties are scoped to the `.container` element. Override them in your own stylesheet to globally restyle the component.

```css
/* Sizing & Layout */
:root {
  --bearlab-modal-default-max-width: 43.75rem; /* 700px */
  --bearlab-modal-default-border-radius: 1.5rem; /* 24px */
  --bearlab-modal-content-padding: 1.25rem; /* 20px, 2.5rem on ≥1024px */
  --bearlab-modal-size-small: 25rem; /* 400px */
  --bearlab-modal-size-medium: 37.5rem; /* 600px */
  --bearlab-modal-size-large: 50rem; /* 800px */
  --bearlab-modal-size-xlarge: 71.25rem; /* 1140px */
}

/* Colors */
:root {
  --bearlab-modal-content-bg: #ffffff;
  --bearlab-modal-overlay-bg: rgb(81 86 95 / 85%);
  --bearlab-modal-title-color: #1f2937;
  --bearlab-modal-subtitle-color: #667085;
}

/* Typography */
:root {
  --bearlab-modal-title-font-size: 1.875rem; /* 30px */
  --bearlab-modal-title-font-weight: 600;
  --bearlab-modal-subtitle-font-size: 1rem; /* 16px */
}

/* Dark mode overrides */
[data-theme="dark"] {
  --bearlab-modal-content-bg: #111827;
  --bearlab-modal-title-color: rgba(255, 255, 255, 0.9);
}
```

### Footer Design Tokens

```css
:root {
  --bearlab-modal-footer-margin-top: 1.875rem; /* 30px */
  --bearlab-modal-footer-gap: 1.25rem; /* 20px */
  --bearlab-modal-footer-bg-success: #12b76a;
  --bearlab-modal-footer-bg-info: #0ba5ec;
  --bearlab-modal-footer-bg-warning: #f79009;
  --bearlab-modal-footer-bg-error: #f00438;
}
```

---

## Accessibility

This component adheres to **WCAG 2.1 AA** standards:

- **`role="dialog"` & `role="alertdialog"`** — Uses `dialog` by default; switches to `alertdialog` when `type="alert"`, ensuring screen readers make appropriate announcements for critical vs. standard interactions.
- **`aria-modal="true"`** — Informs assistive technologies that content behind the modal is inert.
- **`aria-labelledby`** — Semantically links the modal to its `<h2>` title via a stable `useId()`-generated ID.
- **`aria-describedby`** — Applied when `subTitle` is present, linking the modal to its subtitle for additional context.
- **Focus Trap** — A `useFocusTrap` hook confines keyboard focus within the modal while it is open, and restores focus to the triggering element on close.
- **Body Scroll Lock** — `document.body.style.overflow = "hidden"` is applied while the modal is open and restored on close.
- **Keyboard Navigation** — Pressing `Escape` fires `onCancel` to close the modal.
- **Close Button** — Has `aria-label="Close Modal"` for screen reader users.

---

## TypeScript

All public types are exported from the package:

```ts
import type {
  ModalProps,
  ModalFooterProps,
  ModalClassNames,
  ModalStyles,
} from "@bearlab/modal";
```

### `ModalType`

```ts
type ModalType = "alert" | "default" | "fullscreen";
```

### `ModalSizeType`

```ts
type ModalSizeType = "small" | "medium" | "large" | "xlarge";
```

### `ModalAlertType`

```ts
type ModalAlertType = "success" | "info" | "error" | "warning";
```

### `ModalAnimationType`

```ts
type ModalAnimationType = "fade" | "zoom" | "slide" | "flip" | "bounce";
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

### `ModalFooterProps`

```ts
interface ModalFooterProps {
  onCancel: () => void;
  onConfirm?: () => void;
  type?: ModalType;
  alertType?: ModalAlertType;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
