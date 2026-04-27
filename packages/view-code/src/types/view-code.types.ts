export type SupportedLanguage =
  | "md"
  | "jsx"
  | "tsx"
  | "sql"
  | "css"
  | "scss"
  | "html"
  | "bash"
  | "json"
  | "text"
  | "shell"
  | "python"
  | "markdown"
  | "typescript"
  | "javascript"
  | (string & {});
export type Tokenizer = (code: string) => string;

export interface ViewCodeProps {
  code: string;
  filename?: string;
  copyText?: string;
  copiedText?: string;
  style?: ViewCodeStyles;
  showLineNumbers?: boolean;
  language?: SupportedLanguage;
  className?: ViewCodeClassNames;
  theme?: "dark" | "light";
}

export interface TokenRule {
  re: RegExp;
  cls: string;
}

export interface ViewCodeStyles {
  codeArea?: React.CSSProperties;
  container?: React.CSSProperties;
}

export interface ViewCodeClassNames {
  codeArea?: string;
  container?: string;
}
