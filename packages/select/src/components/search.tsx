import classnames from "classnames";
import { useMemo, useRef, useState } from "react";
import { SelectedItems } from "./selected-items";
import { IconChevronDown, IconLoaderCircle } from "../assets/icons";
import { SearchProps, SelectOption } from "../types/select.types";
import { useVisibleItemsCount } from "../hooks/use-visible-items-count";
import styles from "../styles/select.module.scss";
import { useIsomorphicLayoutEffect } from "../hooks/use-isomorphic-layout-effect";

export const Search = <T extends SelectOption>(props: SearchProps<T>) => {
  const {
    query,
    style,
    error,
    mode,
    labels,
    inputId,
    labelId,
    errorId,
    isRequired,
    disabled,
    listboxId,
    className,
    isLoading,
    showSearch,
    placeholder,
    isSingleText,
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
  const isSingle = mode == "single";
  const singleValue = isSingleText && !query ? selectedItems[0] : undefined;
  const inputPlaceholder =
    isSingle && !!selectedItems.length ? "" : placeholder;

  const { selectedItemsRef, visibleCount } = useVisibleItemsCount(
    selectedItems,
    containerWidth,
    inputWidth
  );

  useIsomorphicLayoutEffect(() => {
    if (!ghostRef.current) return;
    setInputWidth(ghostRef.current.offsetWidth);
  }, [query, inputPlaceholder]);

  const inputStyle = useMemo(
    () => ({
      width: inputWidth || undefined,
      maxWidth: containerWidth - 100,
    }),
    [inputWidth, containerWidth]
  );

  return (
    <div
      style={style?.search}
      className={classnames(
        styles.searchWrapper,
        {
          [styles.error]: error,
          [styles.readOnly]: !showSearch,
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
      {isSingleText ? (
        singleValue && (
          <span
            style={style?.singleValue}
            className={classnames(
              styles.singleValue,
              {
                [styles.singleValueMuted]: showSearch && isDropdownVisible,
              },
              className?.singleValue
            )}
          >
            {singleValue.label}
          </span>
        )
      ) : (
        <SelectedItems
          style={style}
          labels={labels}
          disabled={disabled}
          className={className}
          visibleCount={visibleCount}
          selectedItems={selectedItems}
          ref={selectedItemsRef}
          setSelectedItems={onChange ?? (() => {})}
        />
      )}
      <div
        data-value={query || inputPlaceholder}
        className={styles.inputWrapper}
      >
        <span ref={ghostRef} className={styles.inputGhost} aria-hidden="true">
          {query || inputPlaceholder || " "}
        </span>
        <input
          type="text"
          role="combobox"
          autoComplete="off"
          aria-haspopup="listbox"
          readOnly={!showSearch}
          aria-autocomplete={showSearch ? "list" : "none"}
          id={inputId}
          value={query}
          ref={inputRef}
          disabled={disabled || isLoading}
          aria-labelledby={labelId}
          aria-label={labelId ? undefined : placeholder}
          aria-invalid={!!error || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={error ? errorId : undefined}
          aria-disabled={disabled || isLoading}
          placeholder={inputPlaceholder}
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
          [styles.activeInputDropdownIcon]: isDropdownVisible && !isLoading,
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
