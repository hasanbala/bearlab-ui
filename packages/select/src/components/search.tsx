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
    mode,
    inputId,
    disabled,
    listboxId,
    className,
    isLoading,
    placeholder,
    selectedItems,
    containerWidth,
    activeOptionId,
    isDropdownVisible,
    setQuery,
    onKeyDown,
    onChange,
    setIsDropdownVisible,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ghostRef.current) return;
    setInputWidth(ghostRef.current.offsetWidth);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.trim()) return;
    setQuery(e.target.value);
  };

  const { selectedItemsRef, visibleCount } = useVisibleItemsCount(
    selectedItems,
    containerWidth,
    inputWidth
  );

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
      {mode === "multiple" && (
        <SelectedItems
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
          aria-autocomplete={"list"}
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
          [styles.activeArrowIcon]: isDropdownVisible && !isLoading,
        })}
        aria-hidden="true"
      >
        {isLoading ? (
          <IconLoaderCircle className={styles.loadingIcon} />
        ) : (
          <IconChevronDown />
        )}
      </div>
    </div>
  );
};
