import { useEffect, useRef } from "react";
import classnames from "classnames";
import { IconBan, IconLoaderCircle } from "../assets/icons";
import { Option } from "./option";
import { OptionsProps, SelectOption } from "../types/select.types";
import styles from "../styles/select.module.scss";

export const Options = <T extends SelectOption>(props: OptionsProps<T>) => {
  const {
    style,
    query,
    options,
    disabled,
    isLoading,
    isMultiple,
    listboxId,
    emptyText,
    showImage,
    className,
    activeIndex,
    showCheckbox,
    notFoundText,
    selectedItems,
    highlightMatch,
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

  const hasOptions = options.length > 0;
  const loading = isLoading || false;
  const hasQuery = query.trim().length > 0;

  const renderContent = () => {
    if (loading && hasQuery) {
      return (
        <div
          className={styles.centeredState}
          role="status"
          aria-live="polite"
          aria-label="Loading options"
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
          optionId={optionId}
          label={option.label}
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
      role="listbox"
      id={listboxId}
      aria-label="Options"
      style={style?.options}
      aria-disabled={disabled}
      aria-multiselectable={isMultiple}
      className={classnames(
        styles.optionsContainer,
        {
          [styles.centeredOptions]: !hasOptions || (loading && hasQuery),
        },
        className?.options
      )}
    >
      {renderContent()}
    </div>
  );
};
