import classnames from "classnames";
import { QuerySelectOptionProps } from "../types/query-select.types";
import { IconChecked } from "../assets/icons";
import { splitByMatch } from "../utils/query-select-utils";
import styles from "../styles/query-select.module.scss";

export const Option = (props: QuerySelectOptionProps) => {
  const {
    label,
    style,
    image,
    optionId,
    isActive,
    disabled,
    dataIndex,
    className,
    isSelected,
    emphasizedValue,
    showImage = true,
    showCheckbox = true,
    highlightMatch = true,
    onSelect,
  } = props;

  const renderLabel = () => {
    if (highlightMatch && emphasizedValue?.trim()) {
      return (
        <span className={styles.labelTitle}>
          {splitByMatch(label, emphasizedValue).map((part, index) =>
            index % 2 === 1 ? <strong key={index}>{part}</strong> : part
          )}
        </span>
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
      onClick={handleClick}
      data-index={dataIndex}
      aria-disabled={disabled}
      onKeyDown={handleKeyDown}
      aria-selected={isSelected}
      className={classnames(
        styles.optionContainer,
        {
          [styles.activeOption]: isActive,
          [styles.disabledOption]: disabled,
        },
        className?.option
      )}
    >
      <div className={styles.labelContainer}>
        {showCheckbox && (
          <span
            className={classnames(styles.checkbox, {
              [styles.checked]: isSelected,
            })}
            aria-hidden="true"
          >
            {isSelected && <IconChecked className={styles.iconChecked} />}
          </span>
        )}
        {showImage && image && (
          <img
            alt=""
            src={image}
            aria-hidden="true"
            className={styles.optionImage}
          />
        )}
        {renderLabel()}
      </div>
    </div>
  );
};
