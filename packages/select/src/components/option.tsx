import classnames from "classnames";
import { OptionProps } from "../types/select.types";
import styles from "../styles/select.module.scss";

export const Option = (props: OptionProps) => {
  const {
    label,
    style,
    image,
    className,
    isActive,
    optionId,
    disabled,
    dataIndex,
    isSelected,
    emphasizedValue,
    showImage = true,
    showCheckbox = true,
    highlightMatch = true,
    onSelect,
  } = props;

  const renderLabel = () => {
    if (highlightMatch && emphasizedValue?.trim()) {
      const escaped = emphasizedValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const html = label.replace(
        new RegExp(`(${escaped})(?!([^<]+)?<)`, "gi"),
        "<strong>$1</strong>"
      );
      return (
        <span
          className={styles.labelTitle}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    return <span className={styles.labelTitle}>{label}</span>;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    onSelect();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      role="option"
      id={optionId}
      tabIndex={-1}
      style={style?.option}
      data-index={dataIndex}
      aria-disabled={disabled}
      aria-selected={isSelected}
      className={classnames(
        styles.optionContainer,
        {
          [styles.activeOption]: isActive,
          [styles.disabledOption]: disabled,
        },
        className?.option
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.labelContainer}>
        {showCheckbox && (
          <span
            className={classnames(styles.checkbox, {
              [styles.checked]: isSelected,
            })}
            aria-hidden="true"
          />
        )}
        {showImage && image && (
          <img
            src={image}
            alt=""
            className={styles.optionImage}
            aria-hidden="true"
          />
        )}
        {renderLabel()}
      </div>
    </div>
  );
};
