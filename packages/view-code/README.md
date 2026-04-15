# @bearlab/view-code

> Accessible, syntax-highlighted code viewer with one-click copy for React applications.

[![npm version](https://img.shields.io/npm/v/@bearlab/view-code)](https://www.npmjs.com/package/@bearlab/view-code)
[![license](https://img.shields.io/npm/l/@bearlab/view-code)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Supported Languages](#supported-languages)
- [Slot-based Customization](#slot-based-customization)
- [Theme Management](#theme-management)
- [Design Tokens (Customization)](#design-tokens-customization)
- [Accessibility](#accessibility)
- [TypeScript](#typescript)
- [Changelog](#changelog)

---

## Features

- ✅ **Multi-language syntax highlighting** — JS, TS, JSX, TSX, Python, CSS, SCSS, HTML, Bash, JSON, SQL, Markdown and more
- ✅ **One-click copy to clipboard** — with async Clipboard API and fallback support
- ✅ **Optional line numbers** — toggleable via `showLineNumbers` prop
- ✅ **Optional filename badge** — display context with a filename label
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Accessible by default** — `aria-label` on copy button, decorative elements hidden from screen readers
- ✅ **TypeScript-first** — fully typed props and slot interfaces
- ✅ **Zero dependencies** — no external syntax highlighting libraries required

---

## Installation

```bash
# npm
npm install @bearlab/view-code

# yarn
yarn add @bearlab/view-code

# pnpm
pnpm add @bearlab/view-code
```

> **Peer dependencies:** `react >= 16.8.0` and `react-dom >= 16.8.0` must be installed in your project.

---

## Usage

```tsx
import { ViewCode } from "@bearlab/view-code";

export default function App() {
  const snippet = `const greet = (name: string) => {
  console.log(\`Hello, \${name}!\`);
};

greet("BearLab");`;

  return (
    <ViewCode
      code={snippet}
      language="typescript"
      filename="greet.ts"
      showLineNumbers
    />
  );
}
```

---

## Props

| Prop              | Type                                        | Default        | Required | Description                                       |
| ----------------- | ------------------------------------------- | -------------- | -------- | ------------------------------------------------- |
| `code`            | `string`                                    | —              | ✅       | The source code string to display and highlight   |
| `language`        | [`SupportedLanguage`](#supportedlanguage)   | `"javascript"` | ❌       | Language for syntax highlighting                  |
| `filename`        | `string`                                    | —              | ❌       | Optional filename shown in the header badge       |
| `showLineNumbers` | `boolean`                                   | `true`         | ❌       | Whether to render line numbers alongside the code |
| `copyText`        | `string`                                    | `"Copy"`       | ❌       | Label for the copy button in its default state    |
| `copiedText`      | `string`                                    | `"Copied"`     | ❌       | Label for the copy button after successful copy   |
| `className`       | [`ViewCodeClassNames`](#viewcodeclassnames) | —              | ❌       | Per-slot className overrides                      |
| `style`           | [`ViewCodeStyles`](#viewcodestyles)         | —              | ❌       | Per-slot inline style overrides                   |

---

## Supported Languages

| Value          | Displayed Label |
| -------------- | --------------- |
| `javascript`   | `JS`            |
| `typescript`   | `TS`            |
| `jsx`          | `JSX`           |
| `tsx`          | `TSX`           |
| `python`       | `Python`        |
| `css`          | `CSS`           |
| `scss`         | `SCSS`          |
| `html`         | `HTML`          |
| `bash`         | `Bash`          |
| `shell`        | `Shell`         |
| `json`         | `JSON`          |
| `sql`          | `SQL`           |
| `markdown`     | `Markdown`      |
| `md`           | `Markdown`      |
| `text`         | `Text`          |
| _(any string)_ | Uppercased      |

```tsx
<ViewCode code={shellScript} language="bash" filename="setup.sh" />
<ViewCode code={jsonData}    language="json" filename="config.json" />
<ViewCode code={cssRules}    language="css"  filename="styles.css" />
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues. It allows you to inject custom styles and classes directly into child elements via the `className` and `style` objects.

For example, you can target the root container utilizing `className?.container` or style the code area natively using `style?.codeArea`. Each slot targets a specific DOM element, giving you surgical control over the component rendering tree.

### `ViewCodeClassNames`

| Slot        | Targets                   |
| ----------- | ------------------------- |
| `container` | Outermost wrapper `<div>` |
| `codeArea`  | Code display area `<div>` |

```tsx
<ViewCode
  code={snippet}
  language="typescript"
  className={{
    container: "my-code-block",
    codeArea: "my-code-area",
  }}
/>
```

### `ViewCodeStyles`

All slots also accept inline `React.CSSProperties` via the `style` prop:

```tsx
<ViewCode
  code={snippet}
  language="javascript"
  style={{
    container: {
      borderRadius: "16px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
    },
    codeArea: { maxHeight: "400px", overflowY: "auto" },
  }}
/>
```

---

## Theme Management

The `ViewCode` component features a robust theme architecture. It is fully compatible with both light and dark mode contexts, natively responding to **`[data-theme="light"]`** and **`[data-theme="dark"]`** selectors applied at the root or document level.

```html
<!-- Apply dark theme at the root level -->
<html data-theme="dark">
  ...
</html>

<!-- Or scope to a specific section -->
<div data-theme="light">
  <ViewCode code="{snippet}" language="typescript" />
</div>
```

The component automatically adapts its background colors, text colors, syntax token colors, and border styles based on the active theme.

---

## Design Tokens (Customization)

Beyond slots, the component leverages CSS variables for a global design token system. You can override the default appearance by redefining these CSS variables in your own stylesheets. Using the `--bearlab-view-code-[element]-[property]` format, you can globally style the component across your application:

```css
:root,
[data-theme="light"] {
  --bearlab-view-code-container-bg: #f8f9fa;
  --bearlab-view-code-container-border-radius: 12px;
  --bearlab-view-code-container-border-color: #e2e8f0;
  --bearlab-view-code-header-bg: #edf2f7;
  --bearlab-view-code-code-area-bg: #ffffff;
  --bearlab-view-code-code-color: #1a202c;
  --bearlab-view-code-line-number-color: #a0aec0;
  --bearlab-view-code-copy-btn-bg: #e2e8f0;
  --bearlab-view-code-copy-btn-color: #4a5568;
}

[data-theme="dark"] {
  --bearlab-view-code-container-bg: #1a1a2e;
  --bearlab-view-code-container-border-color: #2d3748;
  --bearlab-view-code-header-bg: #16213e;
  --bearlab-view-code-code-area-bg: #0f0f23;
  --bearlab-view-code-code-color: #e2e8f0;
  --bearlab-view-code-line-number-color: #4a5568;
  --bearlab-view-code-copy-btn-bg: #2d3748;
  --bearlab-view-code-copy-btn-color: #a0aec0;
}
```

---

## Accessibility

This component demonstrates **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards. By utilizing appropriate ARIA attributes, it guarantees an inclusive experience:

- **`aria-label` on the copy button** — Provides a descriptive, context-aware label (`copyText` value) for screen readers so that button intent is always clear, even without visible icon text.
- **`aria-hidden="true"` on line numbers** — Line number elements are purely presentational and are hidden from the accessibility tree to prevent redundant announcements.
- **`<pre>` + `<code>` semantic markup** — Uses the proper HTML5 semantic pair for machine-readable code blocks, ensuring screen readers and other assistive technologies correctly interpret the content as preformatted code.
- **Keyboard-accessible copy button** — The copy button is a native `<button>` element, fully operable via keyboard (`Tab` focus, `Enter`/`Space` activation) without any additional configuration.
- **Visual feedback on copy** — The button state change (icon + label swap) ensures both sighted and screen reader users receive confirmation of a successful copy action.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  ViewCodeProps,
  ViewCodeClassNames,
  ViewCodeStyles,
  SupportedLanguage,
} from "@bearlab/view-code";
```

### `SupportedLanguage`

```ts
type SupportedLanguage =
  | "javascript"
  | "typescript"
  | "jsx"
  | "tsx"
  | "python"
  | "css"
  | "scss"
  | "html"
  | "bash"
  | "shell"
  | "json"
  | "sql"
  | "markdown"
  | "md"
  | "text"
  | (string & {});
```

### `ViewCodeClassNames`

```ts
interface ViewCodeClassNames {
  container?: string;
  codeArea?: string;
}
```

### `ViewCodeStyles`

```ts
interface ViewCodeStyles {
  container?: React.CSSProperties;
  codeArea?: React.CSSProperties;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
