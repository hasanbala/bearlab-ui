import { useLayoutEffect, useMemo, useRef, useState } from "react";
import classnames from "classnames";
import { IconChevronDown, IconLoaderCircle } from "../assets/icons";
import {
  QuerySelectSearchProps,
  QuerySelectOption,
} from "../types/query-select.types";
import { useVisibleItemsCount } from "../hooks/use-visible-items-count";
import { SelectionInlineItems } from "./selection-inline-items";
import styles from "../styles/query-select.module.scss";

export const Search = <T extends QuerySelectOption>(
  props: QuerySelectSearchProps<T>
) => {
  const {
    query,
    error,
    style,
    inputId,
    isSingle,
    disabled,
    className,
    listboxId,
    minLength,
    isLoading,
    placeholder,
    selectedItems,
    activeOptionId,
    debouncedValue,
    containerWidth,
    isSelectionCard,
    isDropdownVisible,
    setQuery,
    onChange,
    onKeyDown,
    setIsDropdownVisible,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ghostRef.current) return;
    setInputWidth(ghostRef.current.offsetWidth);
  }, [query]);

  const { selectedItemsRef, visibleCount } = useVisibleItemsCount(
    selectedItems,
    containerWidth,
    inputWidth,
    isSelectionCard
  );

  const inputStyle = useMemo(
    () => ({
      width: inputWidth || undefined,
      maxWidth: containerWidth - 100,
    }),
    [inputWidth, containerWidth]
  );

  const isTyping =
    isLoading ||
    (query !== debouncedValue && query.trim().length >= minLength!);

  return (
    <div
      style={style?.search}
      className={classnames(
        styles.searchWrapper,
        {
          [styles.error]: error,
        },
        className?.search
      )}
      onMouseDown={(e) => {
        if (isLoading) return;
        if (e.target === inputRef.current) return;
        e.preventDefault();
        inputRef.current?.focus();
      }}
      onClick={() => {
        if (isLoading) return;
        if (!isDropdownVisible) setIsDropdownVisible(true);
      }}
    >
      {!isSelectionCard && (
        <SelectionInlineItems
          style={style}
          disabled={disabled}
          className={className}
          visibleCount={visibleCount}
          selectedItems={selectedItems}
          ref={selectedItemsRef}
          setSelectedItems={onChange ?? (() => {})}
        />
      )}
      <div data-value={query || placeholder} className={styles.inputWrapper}>
        <span ref={ghostRef} className={styles.inputGhost} aria-hidden="true">
          {query || placeholder || " "}
        </span>
        <input
          type="text"
          name="search"
          role="combobox"
          autoComplete="off"
          aria-haspopup="listbox"
          aria-autocomplete="list"
          id={inputId}
          value={query}
          ref={inputRef}
          disabled={disabled || isLoading}
          aria-label={placeholder}
          aria-disabled={disabled || isLoading}
          placeholder={
            isSingle && !!selectedItems.length && !isSelectionCard
              ? ""
              : placeholder
          }
          aria-controls={listboxId}
          aria-expanded={isDropdownVisible}
          aria-activedescendant={activeOptionId}
          onKeyDown={onKeyDown}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div
        className={classnames(styles.inputDropdownIcon, {
          [styles.activeInputDropdownIcon]: isDropdownVisible && !isTyping,
        })}
        aria-hidden="true"
      >
        {isTyping ? (
          <IconLoaderCircle className={styles.loadingIcon} />
        ) : (
          <IconChevronDown />
        )}
      </div>
    </div>
  );
};
