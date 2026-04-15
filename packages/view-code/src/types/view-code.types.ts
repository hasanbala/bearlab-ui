export type SupportedLanguage =
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

export type Tokenizer = (code: string) => string;

export interface ViewCodeProps {
  code: string;
  filename?: string;
  style?: ViewCodeStyles;
  showLineNumbers?: boolean;
  language?: SupportedLanguage;
  className?: ViewCodeClassNames;
  copyText?: string;
  copiedText?: string;
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
