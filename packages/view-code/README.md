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

- ✅ **Multi-language syntax highlighting** — built-in, zero-dependency tokenizer for JS, TS, JSX, TSX, Python, CSS, SCSS, HTML, Bash/Shell, JSON, SQL, Markdown and more
- ✅ **One-click copy to clipboard** — uses the async Clipboard API with a `document.execCommand` fallback
- ✅ **Optional line numbers** — toggleable via the `showLineNumbers` prop (enabled by default)
- ✅ **Optional filename badge** — display context with a filename label in the header
- ✅ **Language badge** — automatically displays a human-readable language label in the header
- ✅ **Slot-based `className` & `style` API** — granular styling without CSS overrides
- ✅ **Light & dark theme** — natively responds to `[data-theme="dark"]` with One Light / One Dark color schemes
- ✅ **Accessible by default** — `aria-label` on copy button, line numbers hidden from the accessibility tree
- ✅ **Responsive** — copy button label hides on small screens (`<480px`) to save space
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

### Basic

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

### Without line numbers

```tsx
<ViewCode
  code={snippet}
  language="json"
  filename="config.json"
  showLineNumbers={false}
/>
```

### Localized copy button labels

```tsx
<ViewCode
  code={snippet}
  language="bash"
  copyText="Kopyala"
  copiedText="Kopyalandı"
/>
```

---

## Props

| Prop              | Type                                        | Default        | Required | Description                                                      |
| ----------------- | ------------------------------------------- | -------------- | -------- | ---------------------------------------------------------------- |
| `code`            | `string`                                    | —              | ✅       | The source code string to display, highlight, and copy           |
| `language`        | [`SupportedLanguage`](#supportedlanguage)   | `"javascript"` | ❌       | Language identifier for syntax highlighting and the header badge |
| `filename`        | `string`                                    | —              | ❌       | Optional filename shown in the header next to the language badge |
| `showLineNumbers` | `boolean`                                   | `true`         | ❌       | Whether to render line numbers in a gutter alongside the code    |
| `copyText`        | `string`                                    | `"Copy"`       | ❌       | Label for the copy button in its default state                   |
| `copiedText`      | `string`                                    | `"Copied"`     | ❌       | Label for the copy button after a successful copy action         |
| `className`       | [`ViewCodeClassNames`](#viewcodeclassnames) | —              | ❌       | Per-slot className overrides                                     |
| `style`           | [`ViewCodeStyles`](#viewcodestyles)         | —              | ❌       | Per-slot inline style overrides                                  |

---

## Supported Languages

| Value          | Header Label | Tokenizer Used |
| -------------- | ------------ | -------------- |
| `javascript`   | `JavaScript` | JS rules       |
| `typescript`   | `TypeScript` | JS rules       |
| `jsx`          | `JSX`        | JS rules       |
| `tsx`          | `TSX`        | JS rules       |
| `python`       | `Python`     | Python rules   |
| `css`          | `CSS`        | CSS rules      |
| `scss`         | `SCSS`       | CSS rules      |
| `html`         | `HTML`       | HTML rules     |
| `bash`         | `Bash`       | Bash rules     |
| `shell`        | `Shell`      | Bash rules     |
| `json`         | `JSON`       | JSON rules     |
| `sql`          | `SQL`        | Plain text     |
| `markdown`     | `Markdown`   | Plain text     |
| `md`           | `Markdown`   | Plain text     |
| `text`         | `Plain Text` | Plain text     |
| _(any string)_ | Uppercased   | Plain text     |

```tsx
<ViewCode code={shellScript} language="bash"       filename="setup.sh" />
<ViewCode code={jsonData}    language="json"       filename="config.json" />
<ViewCode code={cssRules}    language="css"        filename="styles.css" />
<ViewCode code={mdContent}   language="markdown"   filename="README.md" />
```

---

## Slot-based Customization

The component follows the **Slot-Pattern** to provide deep customization without CSS specificity issues.

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

The `ViewCode` component features a robust theme architecture. It natively responds to the **`[data-theme="dark"]`** selector applied at any ancestor level (including `<html>`).

```html
<!-- Apply dark theme globally -->
<html data-theme="dark">
  ...
</html>

<!-- Or scope to a specific section -->
<div data-theme="light">
  <ViewCode code="{snippet}" language="typescript" />
</div>
```

The component automatically adapts its background, text, gutter, header, syntax token colors, and border styles based on the active theme:

- **Light** — One Light-inspired palette (`#fafafa` background, `#383a42` text)
- **Dark** — One Dark-inspired palette (`#282c34` background, `#abb2bf` text)

---

## Design Tokens (Customization)

The component exposes a rich set of `--bearlab-code-block-*` CSS custom properties. All tokens are scoped to the `.container` element with sensible defaults for both light and dark modes.

```css
/* Light theme overrides */
:root,
[data-theme="light"] {
  --bearlab-code-block-container-bg: #fafafa;
  --bearlab-code-block-container-border-color: #e0e0e0;
  --bearlab-code-block-container-radius: 1rem;
  --bearlab-code-block-header-bg: #f0f0f0;
  --bearlab-code-block-gutter-bg: #f5f5f5;
  --bearlab-code-block-text-color: #383a42;
  --bearlab-code-block-gutter-text-color: #9d9d9f;
  --bearlab-code-block-tok-keyword-color: #a626a4;
  --bearlab-code-block-tok-string-color: #50a14f;
  --bearlab-code-block-tok-function-color: #4078f2;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --bearlab-code-block-container-bg: #282c34;
  --bearlab-code-block-container-border-color: #1d2939;
  --bearlab-code-block-header-bg: #21252b;
  --bearlab-code-block-gutter-bg: #282c34;
  --bearlab-code-block-text-color: #abb2bf;
  --bearlab-code-block-gutter-text-color: #495162;
  --bearlab-code-block-tok-keyword-color: #c678dd;
  --bearlab-code-block-tok-string-color: #98c379;
  --bearlab-code-block-tok-function-color: #61afef;
}
```

### Available Tokens (representative subset)

| Token                                         | Default (light) | Description                       |
| --------------------------------------------- | --------------- | --------------------------------- |
| `--bearlab-code-block-container-radius`       | `1rem`          | Container corner radius           |
| `--bearlab-code-block-container-bg`           | `#fafafa`       | Container background              |
| `--bearlab-code-block-container-border-color` | `#e0e0e0`       | Container border color            |
| `--bearlab-code-block-header-bg`              | `#f0f0f0`       | Header bar background             |
| `--bearlab-code-block-header-border-color`    | `#e0e0e0`       | Header bottom border color        |
| `--bearlab-code-block-gutter-bg`              | `#f5f5f5`       | Line number gutter background     |
| `--bearlab-code-block-gutter-width`           | `3rem`          | Line number gutter width          |
| `--bearlab-code-block-text-color`             | `#383a42`       | Default code text color           |
| `--bearlab-code-block-gutter-text-color`      | `#9d9d9f`       | Line number text color            |
| `--bearlab-code-block-badge-bg`               | `#e8e8e8`       | Language badge background         |
| `--bearlab-code-block-badge-text-color`       | `#383a42`       | Language badge text color         |
| `--bearlab-code-block-copy-btn-bg`            | `#e8e8e8`       | Copy button background            |
| `--bearlab-code-block-copy-btn-bg-hover`      | `#dcdcdc`       | Copy button background on hover   |
| `--bearlab-code-block-copy-btn-ok-text-color` | `#50a14f`       | Copy button text color after copy |
| `--bearlab-code-block-filename-text-color`    | `#696c77`       | Filename text color               |
| `--bearlab-code-block-scrollbar-color`        | `#c0c0c0`       | Horizontal scrollbar thumb color  |
| `--bearlab-code-block-tok-keyword-color`      | `#a626a4`       | Keyword token color               |
| `--bearlab-code-block-tok-string-color`       | `#50a14f`       | String literal token color        |
| `--bearlab-code-block-tok-comment-color`      | `#a0a1a7`       | Comment token color               |
| `--bearlab-code-block-tok-number-color`       | `#986801`       | Number literal token color        |
| `--bearlab-code-block-tok-function-color`     | `#4078f2`       | Function name token color         |
| `--bearlab-code-block-tok-type-color`         | `#c18401`       | Type / class name token color     |
| `--bearlab-code-block-tok-property-color`     | `#e45649`       | Property token color              |
| `--bearlab-code-block-tok-operator-color`     | `#0184bc`       | Operator token color              |
| `--bearlab-code-block-tok-decorator-color`    | `#4078f2`       | Decorator token color             |
| `--bearlab-code-block-code-font-size`         | `0.875rem`      | Code text font size               |
| `--bearlab-code-block-code-line-height`       | `1.25rem`       | Code line height                  |
| `--bearlab-code-block-code-tab-size`          | `2`             | Tab stop width                    |

---

## Accessibility

This component follows **best-practice** accessibility, fully adhering to **WCAG 2.1 AA** standards:

- **`aria-label` on copy button** — Provides a descriptive label (`copyText` value) for screen readers so that button intent is always clear, even without visible text on small screens.
- **`aria-hidden="true"` on line numbers** — Line number elements are purely presentational and are hidden from the accessibility tree to prevent redundant announcements.
- **`<pre>` + `<code>` semantic markup** — Uses the standard HTML5 semantic pair for preformatted code blocks, ensuring screen readers and assistive technologies correctly interpret the content.
- **Keyboard-accessible copy button** — The copy button is a native `<button>` element, fully operable via `Tab` focus and `Enter`/`Space` activation without any additional configuration.
- **Visual feedback on copy** — The button state change (icon + label swap after 2 seconds) provides confirmation for both sighted and screen reader users.
- **Monospace font stack** — Falls back gracefully through `Cascadia Code → SF Mono → Fira Code → Menlo → Monaco → Courier New` for cross-platform code rendering.

---

## TypeScript

All types are exported from the package:

```ts
import type {
  ViewCodeClassNames,
  ViewCodeProps,
  ViewCodeStyles,
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

### `ViewCodeProps`

```ts
interface ViewCodeProps {
  code: string;
  filename?: string;
  copyText?: string;
  copiedText?: string;
  style?: ViewCodeStyles;
  showLineNumbers?: boolean;
  language?: SupportedLanguage;
  className?: ViewCodeClassNames;
}
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT © [hasanbala](https://github.com/hasanbala)
