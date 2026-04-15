import { useRef } from "react";
import classnames from "classnames";
import { IconChevronDown, IconLoaderCircle } from "../assets/icons";
import {
  QuerySelectSearchProps,
  QuerySelectOption,
} from "../types/query-select.types";
import styles from "../styles/query-select.module.scss";

export const Search = <T extends QuerySelectOption>(
  props: QuerySelectSearchProps<T>
) => {
  const {
    query,
    error,
    style,
    inputId,
    disabled,
    className,
    listboxId,
    isLoading,
    placeholder,
    activeOptionId,
    debouncedValue,
    isDropdownVisible,
    minLength,
    setQuery,
    onKeyDown,
    setOptions,
    setIsDropdownVisible,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value) setOptions([]);
  };

  const isTyping =
    isLoading ||
    (query !== debouncedValue &&
      query.trim().length >= minLength!);

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
      <div data-value={query || placeholder} className={styles.inputWrapper}>
        <input
          type="text"
          name="search"
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
