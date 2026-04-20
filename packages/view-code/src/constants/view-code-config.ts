import { TokenRule } from "../types/view-code.types";

export const LANG_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  jsx: "JSX",
  tsx: "TSX",
  python: "Python",
  css: "CSS",
  scss: "SCSS",
  html: "HTML",
  bash: "Bash",
  shell: "Shell",
  json: "JSON",
  sql: "SQL",
  markdown: "Markdown",
  md: "Markdown",
  text: "Plain Text",
};

export const JS_RULES: TokenRule[] = [
  { re: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, cls: "tok-comment" },
  { re: /(["'`])(?:\\.|(?!\1)[^\\])*\1/g, cls: "tok-string" },
  {
    re: /\b(const|let|var|function|return|if|else|for|while|class|extends|import|export|default|from|async|await|new|typeof|instanceof|null|undefined|true|false|this|super|switch|case|break|continue|throw|try|catch|finally|of|in|yield|static|get|set|type|interface|enum|implements|keyof|infer|never|unknown|any|void)\b/g,
    cls: "tok-keyword",
  },
  { re: /\b([A-Z][a-zA-Z0-9_]*)\b/g, cls: "tok-type" },
  { re: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, cls: "tok-function" },
  { re: /\b(\d+\.?\d*)\b/g, cls: "tok-number" },
  { re: /([=><!&|+\-*/%?:;,{}[\]().])/g, cls: "tok-operator" },
];

export const PYTHON_RULES: TokenRule[] = [
  { re: /(#[^\n]*)/g, cls: "tok-comment" },
  {
    re: /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g,
    cls: "tok-string",
  },
  { re: /(@\w+)/g, cls: "tok-decorator" },
  {
    re: /\b(def|class|return|import|from|as|if|elif|else|for|while|in|not|and|or|is|None|True|False|pass|break|continue|with|try|except|finally|raise|lambda|yield|global|nonlocal|del|assert)\b/g,
    cls: "tok-keyword",
  },
  { re: /\b([a-zA-Z_]\w*)\s*(?=\()/g, cls: "tok-function" },
  { re: /\b(\d+\.?\d*)\b/g, cls: "tok-number" },
];

export const CSS_RULES: TokenRule[] = [
  { re: /(\/\*[\s\S]*?\*\/)/g, cls: "tok-comment" },
  { re: /(["'])(?:\\.|(?!\1)[^\\])*\1/g, cls: "tok-string" },
  { re: /(@[\w-]+)/g, cls: "tok-keyword" },
  { re: /([.#]?[a-zA-Z][\w-]*)\s*(?=[{,])/g, cls: "tok-type" },
  { re: /([a-z][\w-]*)\s*(?=:)/g, cls: "tok-property" },
  { re: /\b(\d+\.?\d*(?:px|em|rem|%|vh|vw|s|ms|deg)?)\b/g, cls: "tok-number" },
];

export const HTML_RULES: TokenRule[] = [
  { re: /(<!--[\s\S]*?-->)/g, cls: "tok-comment" },
  { re: /(<\/?)([\w-]+)/g, cls: "tok-keyword" },
  { re: /\s([\w-]+)(?==)/g, cls: "tok-property" },
  { re: /(["'])(?:\\.|(?!\1)[^\\])*\1/g, cls: "tok-string" },
];

export const BASH_RULES: TokenRule[] = [
  { re: /(#[^\n]*)/g, cls: "tok-comment" },
  { re: /(["'`])(?:\\.|(?!\1)[^\\])*\1/g, cls: "tok-string" },
  { re: /(\$[\w{][^}]*}?)/g, cls: "tok-type" },
  {
    re: /\b(echo|cd|ls|mkdir|rm|cp|mv|cat|grep|find|sed|awk|curl|wget|git|npm|yarn|pnpm|node|python|pip|docker|chmod|sudo|export|source|if|then|else|fi|for|do|done|while|case|esac|function)\b/g,
    cls: "tok-keyword",
  },
  { re: /\s(-{1,2}[\w-]+)/g, cls: "tok-property" },
];

export const JSON_RULES: TokenRule[] = [
  { re: /(["'])(?:\\.|(?!\1)[^\\])*\1/g, cls: "tok-string" },
  { re: /\b(true|false|null)\b/g, cls: "tok-keyword" },
  { re: /\b(\d+\.?\d*)\b/g, cls: "tok-number" },
];

export const LANG_TOKEN_RULES: Record<string, TokenRule[]> = {
  javascript: JS_RULES,
  typescript: JS_RULES,
  jsx: JS_RULES,
  tsx: JS_RULES,
  python: PYTHON_RULES,
  css: CSS_RULES,
  scss: CSS_RULES,
  html: HTML_RULES,
  bash: BASH_RULES,
  shell: BASH_RULES,
  json: JSON_RULES,
};
