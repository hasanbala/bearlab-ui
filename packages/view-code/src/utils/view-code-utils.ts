import { TokenRule } from "../types/view-code.types";
import { LANG_TOKEN_RULES } from "../constants/view-code-config";

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

/**
 * Highlights the given code based on the provided language.
 *
 * @param code - The source code to highlight.
 * @param lang - The language for tokenization rules.
 * @returns The highlighted HTML string.
 */
export const highlight = (code: string, lang: string) => {
  const normalizedLang = lang.toLowerCase();
  const rules = LANG_TOKEN_RULES[normalizedLang];

  if (!rules) return escapeHtml(code);

  return applyRules(code, rules);
};
