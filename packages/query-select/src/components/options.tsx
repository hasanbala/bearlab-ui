import { useEffect, useRef } from "react";
import classnames from "classnames";
import { Option } from "./option";
import { IconBan } from "../assets/icons";
import { OptionsLoadingSkeleton } from "./options-loading-skeleton";
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
    isMultiple,
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
  const loading = isLoading || false;
  const hasQuery = query.trim().length >= (minLength ?? 3);

  const renderContent = () => {
    if (loading && hasQuery) {
      return (
        <OptionsLoadingSkeleton
          rows={6}
          showCheckbox={showCheckbox ?? true}
          showImage={showImage ?? true}
        />
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
          label={option.label}
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
      aria-multiselectable={isMultiple}
      aria-disabled={disabled}
      style={style?.options}
      className={classnames(
        styles.optionsContainer,
        {
          [styles.centeredOptions]: !hasOptions && !loading,
        },
        className?.options
      )}
    >
      {renderContent()}
    </div>
  );
};
