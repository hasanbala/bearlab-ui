import classnames from "classnames";
import { AVATAR_TEXT_COLORS } from "./constants/avatar-config";
import type { AvatarTextProps } from "./types/avatar.types";
import styles from "./styles/avatar-text.module.scss";

const getFirstGrapheme = (word: string, locale?: string): string => {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
    const first = segmenter.segment(word)[Symbol.iterator]().next();
    return first.done ? "" : first.value.segment;
  }
  return Array.from(word)[0] ?? "";
};

export const AvatarText = (props: AvatarTextProps) => {
  const { name, locale, className, style } = props;

  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => getFirstGrapheme(word, locale))
    .join("")
    .toLocaleUpperCase(locale);

  const getColorClass = (name: string) => {
    const index = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return AVATAR_TEXT_COLORS[index % AVATAR_TEXT_COLORS.length];
  };

  return (
    <div
      className={classnames(
        styles.container,
        styles[getColorClass(name)],
        className?.root
      )}
      style={style?.root}
      aria-label={name}
      role="img"
    >
      <span
        className={classnames(styles.avatarLabel, className?.label)}
        style={style?.label}
        aria-hidden="true"
      >
        {initials}
      </span>
    </div>
  );
};
