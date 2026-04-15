import classnames from "classnames";
import { useLayoutEffect, useRef, useState } from "react";
import { SelectedItems } from "./selected-items";
import { IconChevronDown, IconLoaderCircle } from "../assets/icons";
import { SearchProps, SelectOption } from "../types/select.types";
import { useVisibleItemsCount } from "../hooks/use-visible-items-count";
import styles from "../styles/select.module.scss";

export const Search = <T extends SelectOption>(props: SearchProps<T>) => {
  const {
    query,
    style,
    error,
    inputId,
    disabled,
    listboxId,
    className,
    isLoading,
    placeholder,
    selectedItems,
    containerWidth,
    debouncedValue,
    activeOptionId,
    isDropdownVisible,
    setQuery,
    onKeyDown,
    setOptions,
    setSelectedItems,
    setIsDropdownVisible,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value) setOptions([]);
  };

  useLayoutEffect(() => {
    if (!ghostRef.current) return;
    setInputWidth(ghostRef.current.offsetWidth);
  }, [query]);

  const { selectedItemsRef, visibleCount } = useVisibleItemsCount(
    selectedItems,
    containerWidth,
    inputWidth
  );

  const isTyping =
    isLoading || (query !== debouncedValue && query.trim().length > 0);

  return (
    <div
      style={style?.search}
      className={classnames(
        styles.searchContainer,
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
      <SelectedItems
        style={style}
        disabled={disabled}
        className={className}
        visibleCount={visibleCount}
        selectedItems={selectedItems}
        selectedItemsRef={selectedItemsRef}
        setSelectedItems={setSelectedItems}
      />
      <div className={styles.inputWrapper} data-value={query || placeholder}>
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
          aria-label={placeholder}
          aria-disabled={disabled}
          placeholder={placeholder}
          aria-controls={listboxId}
          aria-expanded={isDropdownVisible}
          aria-activedescendant={activeOptionId}
          onKeyDown={onKeyDown}
          onChange={handleInputChange}
          style={{
            width: inputWidth || undefined,
            maxWidth: containerWidth - 100,
          }}
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
