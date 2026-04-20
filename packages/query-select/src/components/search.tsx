import { useLayoutEffect, useRef, useState } from "react";
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
    mode,
    query,
    error,
    style,
    inputId,
    disabled,
    className,
    listboxId,
    minLength,
    isLoading,
    placeholder,
    activeOptionId,
    debouncedValue,
    isDropdownVisible,
    selectionDisplay,
    containerWidth,
    selectedItems,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const { selectedItemsRef, visibleCount } = useVisibleItemsCount(
    selectedItems,
    containerWidth,
    inputWidth,
    selectionDisplay
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
        if (e.target === inputRef.current) return;
        e.preventDefault();
        inputRef.current?.focus();
      }}
      onClick={() => {
        if (!isDropdownVisible) setIsDropdownVisible(true);
      }}
    >
      {mode === "multiple" && selectionDisplay === "inline" && (
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
          disabled={disabled}
          aria-disabled={disabled}
          aria-label={placeholder}
          aria-controls={listboxId}
          placeholder={placeholder}
          aria-expanded={isDropdownVisible}
          aria-activedescendant={activeOptionId}
          onKeyDown={onKeyDown}
          onChange={handleInputChange}
          style={
            selectionDisplay === "inline"
              ? {
                  width: inputWidth || undefined,
                  maxWidth: containerWidth - 100,
                }
              : undefined
          }
        />
      </div>
      <div
        className={classnames(styles.arrowIcon, {
          [styles.activeArrowIcon]: isDropdownVisible && !isTyping,
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
