import { useEffect, useRef } from "react";
import classnames from "classnames";
import { Option } from "./option";
import { IconBan, IconLoaderCircle } from "../assets/icons";
import {
  QuerySelectOptionsProps,
  QuerySelectOption,
} from "../types/query-select.types";
import styles from "../styles/query-select.module.scss";

export const Options = <T extends QuerySelectOption>(
  props: QuerySelectOptionsProps<T>
) => {
  const {
    query,
    style,
    options,
    disabled,
    className,
    emptyText,
    isLoading,
    listboxId,
    showImage,
    activeIndex,
    showCheckbox,
    notFoundText,
    selectedItems,
    highlightMatch,
    isDropdownVisible,
    minLength,
    onSelect,
  } = props;

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeIndex < 0) return;
    const activeEl = listRef.current?.querySelector(
      `[data-index="${activeIndex}"]`
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!isDropdownVisible) return null;

  const hasOptions = options.length > 0;
  const hasQuery = query.trim().length > (minLength ?? 3);

  const renderContent = () => {
    if (isLoading && hasQuery) {
      return (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading options"
          className={styles.centeredState}
        >
          <IconLoaderCircle className={styles.loadingIcon} aria-hidden="true" />
        </div>
      );
    }

    if (!hasOptions) {
      const message = hasQuery ? notFoundText : emptyText;
      return (
        <div className={styles.centeredState} role="status" aria-live="polite">
          {message && <span>{message}</span>}
          <IconBan aria-hidden="true" />
        </div>
      );
    }

    return options.map((option, index) => {
      const optionId = `${listboxId}-option-${option.value}`;
      const isSelected = selectedItems.some((s) => s.value === option.value);

      return (
        <Option
          style={style}
          dataIndex={index}
          key={option.value}
          name={option.label}
          optionId={optionId}
          image={option.image}
          className={className}
          showImage={showImage}
          isSelected={isSelected}
          emphasizedValue={query}
          showCheckbox={showCheckbox}
          highlightMatch={highlightMatch}
          isActive={index === activeIndex}
          onSelect={() => onSelect(option)}
          disabled={disabled || option.disabled}
        />
      );
    });
  };

  return (
    <div
      ref={listRef}
      id={listboxId}
      role="listbox"
      aria-label="Options"
      aria-multiselectable
      aria-disabled={disabled}
      style={style?.options}
      className={classnames(
        styles.selectOptionsContainer,
        {
          [styles.centeredOptions]: !hasOptions || (isLoading && hasQuery),
        },
        className?.options
      )}
    >
      {renderContent()}
    </div>
  );
};
