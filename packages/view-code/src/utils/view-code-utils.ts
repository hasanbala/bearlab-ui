import { Tokenizer, TokenRule } from "../types/view-code.types";

const escapeHtml = (str: string): string =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const span = (cls: string, text: string): string =>
  `<span class="${cls}">${escapeHtml(text)}</span>`;

const applyRules = (code: string, rules: TokenRule[]) => {
  let segments: Array<{ text: string; isToken: boolean }> = [
    { text: code, isToken: false },
  ];

  for (const { re, cls } of rules) {
    const next: typeof segments = [];
    for (const seg of segments) {
      if (seg.isToken) {
        next.push(seg);
        continue;
      }
      re.lastIndex = 0;
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      const src = seg.text;
      while ((match = re.exec(src)) !== null) {
        if (match.index > lastIndex) {
          next.push({
            text: src.slice(lastIndex, match.index),
            isToken: false,
          });
        }
        next.push({ text: span(cls, match[0]), isToken: true });
        lastIndex = match.index + match[0].length;
        if (!re.global) break;
      }
      if (lastIndex < src.length) {
        next.push({ text: src.slice(lastIndex), isToken: false });
      }
    }
    segments = next;
  }

  return segments
    .map((seg) => (seg.isToken ? seg.text : escapeHtml(seg.text)))
    .join("");
};

const tokenizeJS = (code: string) => {
  const keywords =
    /\b(const|let|var|function|return|if|else|for|while|class|extends|import|export|default|from|async|await|new|typeof|instanceof|null|undefined|true|false|this|super|switch|case|break|continue|throw|try|catch|finally|of|in|yield|static|get|set|type|interface|enum|implements|keyof|infer|never|unknown|any|void)\b/g;
  const strings = /(["'`])(?:\\.|(?!\1)[^\\])*\1/g;
  const comments = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;
  const numbers = /\b(\d+\.?\d*)\b/g;
  const functions = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g;
  const types = /\b([A-Z][a-zA-Z0-9_]*)\b/g;
  const operators = /([=><!&|+\-*/%?:;,{}[\]().])/g;

  return applyRules(code, [
    { re: comments, cls: "tok-comment" },
    { re: strings, cls: "tok-string" },
    { re: keywords, cls: "tok-keyword" },
    { re: types, cls: "tok-type" },
    { re: functions, cls: "tok-function" },
    { re: numbers, cls: "tok-number" },
    { re: operators, cls: "tok-operator" },
  ]);
};

const tokenizePython = (code: string) => {
  const keywords =
    /\b(def|class|return|import|from|as|if|elif|else|for|while|in|not|and|or|is|None|True|False|pass|break|continue|with|try|except|finally|raise|lambda|yield|global|nonlocal|del|assert)\b/g;
  const strings =
    /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g;
  const comments = /(#[^\n]*)/g;
  const numbers = /\b(\d+\.?\d*)\b/g;
  const decorators = /(@\w+)/g;
  const functions = /\b([a-zA-Z_]\w*)\s*(?=\()/g;

  return applyRules(code, [
    { re: comments, cls: "tok-comment" },
    { re: strings, cls: "tok-string" },
    { re: decorators, cls: "tok-decorator" },
    { re: keywords, cls: "tok-keyword" },
    { re: functions, cls: "tok-function" },
    { re: numbers, cls: "tok-number" },
  ]);
};

const tokenizeCSS = (code: string) => {
  const comments = /(\/\*[\s\S]*?\*\/)/g;
  const strings = /(["'])(?:\\.|(?!\1)[^\\])*\1/g;
  const selectors = /([.#]?[a-zA-Z][\w-]*)\s*(?=[{,])/g;
  const properties = /([a-z][\w-]*)\s*(?=:)/g;
  const numbers = /\b(\d+\.?\d*(?:px|em|rem|%|vh|vw|s|ms|deg)?)\b/g;
  const atRules = /(@[\w-]+)/g;

  return applyRules(code, [
    { re: comments, cls: "tok-comment" },
    { re: strings, cls: "tok-string" },
    { re: atRules, cls: "tok-keyword" },
    { re: selectors, cls: "tok-type" },
    { re: properties, cls: "tok-property" },
    { re: numbers, cls: "tok-number" },
  ]);
};

const tokenizeHTML = (code: string) => {
  const comments = /(<!--[\s\S]*?-->)/g;
  const tags = /(<\/?)([\w-]+)/g;
  const attrs = /\s([\w-]+)(?==)/g;
  const strings = /(["'])(?:\\.|(?!\1)[^\\])*\1/g;

  return applyRules(code, [
    { re: comments, cls: "tok-comment" },
    { re: tags, cls: "tok-keyword" },
    { re: attrs, cls: "tok-property" },
    { re: strings, cls: "tok-string" },
  ]);
};

const tokenizeBash = (code: string) => {
  const comments = /(#[^\n]*)/g;
  const strings = /(["'`])(?:\\.|(?!\1)[^\\])*\1/g;
  const commands =
    /\b(echo|cd|ls|mkdir|rm|cp|mv|cat|grep|find|sed|awk|curl|wget|git|npm|yarn|pnpm|node|python|pip|docker|chmod|sudo|export|source|if|then|else|fi|for|do|done|while|case|esac|function)\b/g;
  const flags = /\s(-{1,2}[\w-]+)/g;
  const variables = /(\$[\w{][^}]*}?)/g;

  return applyRules(code, [
    { re: comments, cls: "tok-comment" },
    { re: strings, cls: "tok-string" },
    { re: variables, cls: "tok-type" },
    { re: commands, cls: "tok-keyword" },
    { re: flags, cls: "tok-property" },
  ]);
};

const tokenizeJSON = (code: string) => {
  const strings = /(["'])(?:\\.|(?!\1)[^\\])*\1/g;
  const numbers = /\b(\d+\.?\d*)\b/g;
  const keywords = /\b(true|false|null)\b/g;

  return applyRules(code, [
    { re: strings, cls: "tok-string" },
    { re: keywords, cls: "tok-keyword" },
    { re: numbers, cls: "tok-number" },
  ]);
};

const LANG_RULES: Record<string, Tokenizer> = {
  javascript: tokenizeJS,
  typescript: tokenizeJS,
  jsx: tokenizeJS,
  tsx: tokenizeJS,
  python: tokenizePython,
  css: tokenizeCSS,
  scss: tokenizeCSS,
  html: tokenizeHTML,
  bash: tokenizeBash,
  shell: tokenizeBash,
  json: tokenizeJSON,
};

export const highlight = (code: string, lang: string) => {
  const normalizedLang = lang.toLowerCase();
  const tokenizer = LANG_RULES[normalizedLang];
  if (!tokenizer) return escapeHtml(code);
  return tokenizer(code);
};
