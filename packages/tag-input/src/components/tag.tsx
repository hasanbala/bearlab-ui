import classnames from "classnames";
import styles from "../styles/tag-input.module.scss";
import { TagProps } from "../types/tag-input.types";
import { IconX } from "../assets/icons";

export const Tag = (props: TagProps) => {
  const { item, onRemove, disabled, className, style } = props;
  const isValid = item.status === "valid";
  const tagId = `credential-tag-${item.id}`;

  return (
    <span
      id={tagId}
      role="listitem"
      aria-label={`${item.value}, ${isValid ? "valid" : "invalid"}. Press delete to remove.`}
      className={classnames(
        styles.tag,
        {
          [styles.tagValid]: isValid,
          [styles.tagInvalid]: !isValid,
        },
        className?.tag
      )}
      style={{
        ...(isValid ? style?.tagValid : style?.tagInvalid),
        ...style?.tag,
      }}
    >
      <span
        className={classnames(styles.tagLabel, className?.tagLabel)}
        style={style?.tagLabel}
      >
        {item.value}
      </span>
      {!disabled && (
        <button
          tabIndex={0}
          type="button"
          disabled={disabled}
          aria-disabled={disabled}
          style={style?.tagRemove}
          aria-label={`Remove ${item.value}`}
          className={classnames(styles.tagRemove, className?.tagRemove)}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onRemove(item);
            }
          }}
        >
          <IconX width={12} height={12} aria-hidden="true" />
        </button>
      )}
    </span>
  );
};
