import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Search } from "./components/search";
import { Options } from "./components/options";
import { SelectionCardItems } from "./components/selection-card-items";
import { useClickOutside } from "./hooks/use-click-outside";
import { useDebounce } from "./hooks/use-debounce";
import {
  QuerySelectProps,
  QuerySelectOption,
} from "./types/query-select.types";
import { OptionsPortal } from "./components/options-portal";
import { IconErrorTriangle } from "./assets/icons";
import classnames from "classnames";
import styles from "./styles/query-select.module.scss";
import { resolveValue } from "./utils/select-utils";

export const QuerySelect = <T extends QuerySelectOption>(
  props: QuerySelectProps<T>
) => {
  const {
    value,
    label,
    error,
    style,
    disabled,
    className,
    isRequired,
    minLength = 3,
    delayTime = 500,
    showImage = true,
    mode = "multiple",
    showCheckbox = true,
    optionZIndex = 8888,
    highlightMatch = true,
    selectionDisplay = "card",
    notFoundText = "No result found",
    emptyText = "There is no options",
    placeholder = "Enter at least 3 characters",
    noSelectionText = "There is no selected choice",
    onSearch,
    onChange,
  } = props;

  const isSingle = mode === "single";
  const [query, setQuery] = useState("");

  const uid = useId();
  const portalRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<T[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { debouncedValue } = useDebounce(query, delayTime);

  const inputId = `autocomplete-select-input-${uid}`;
  const listboxId = `autocomplete-select-listbox-${uid}`;
  const labelId = `autocomplete-label-${uid}`;
  const [containerWidth, setContainerWidth] = useState(0);

  const shouldSkipSearch = useMemo(
    () =>
      query.trim() === "" ||
      debouncedValue !== query ||
      query.trim().length < minLength,
    [query, debouncedValue, minLength]
  );

  const selectedItems = useMemo<T[]>(
    () => resolveValue(value, options),
    [value, options]
  );

  const handleClose = useCallback(() => {
    setIsDropdownVisible(false);
    setActiveIndex(-1);
    if (selectedItems.length === 0) {
      setQuery("");
    }
  }, [selectedItems.length]);

  const { containerRef } = useClickOutside(
    handleClose,
    selectionDisplay,
    setContainerWidth,
    portalRef
  );

  useEffect(() => {
    const fetchData = async () => {
      if (shouldSkipSearch) {
        setOptions([]);
        return;
      }

      setIsLoading(true);
      try {
        const result = await onSearch(debouncedValue);
        setOptions(result);
        setIsDropdownVisible(true);
      } catch (err) {
        console.warn(err);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, debouncedValue, shouldSkipSearch, onSearch]);

  const handleSelect = useCallback(
    (item: T) => {
      if (item.disabled) return;

      if (isSingle) {
        const isSame = selectedItems[0]?.value === item.value;
        const next = isSame ? null : item;

        (onChange as ((v: T | null) => void) | undefined)?.(next);
        handleClose();
      } else {
        const exists = selectedItems.some((s) => s.value === item.value);
        const next = exists
          ? selectedItems.filter((s) => s.value !== item.value)
          : [...selectedItems, item];

        (onChange as ((v: T[]) => void) | undefined)?.(next);
      }
    },
    [isSingle, selectedItems, onChange]
  );

  const handleRemove = useCallback(
    (updated: T[]) => {
      if (isSingle) {
        (onChange as ((v: T | null) => void) | undefined)?.(null);
      } else {
        (onChange as ((v: T[]) => void) | undefined)?.(updated);
      }
    },
    [isSingle, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isDropdownVisible) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          e.preventDefault();
          setIsDropdownVisible(true);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && options[activeIndex]) {
            handleSelect(options[activeIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsDropdownVisible(false);
          setActiveIndex(-1);
          break;
        case "Backspace":
          if (!query && selectedItems.length > 0) {
            handleRemove(selectedItems.slice(0, -1));
          }
          break;
      }
    },
    [
      isDropdownVisible,
      options,
      activeIndex,
      query,
      selectedItems,
      handleSelect,
      handleRemove,
    ]
  );

  const activeOptionId = useMemo(
    () =>
      activeIndex >= 0 && options[activeIndex]
        ? `${listboxId}-option-${options[activeIndex].value}`
        : undefined,
    [activeIndex, options, listboxId]
  );

  return (
    <div
      ref={containerRef}
      style={style?.root}
      className={classnames(
        styles.container,
        disabled && styles.disabled,
        className?.root
      )}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={inputId}
          className={styles.selectLabel}
          onClick={(e) => e.stopPropagation()}
        >
          {label} {isRequired && <span aria-hidden="true">*</span>}
        </label>
      )}
      {mode === "multiple" && selectionDisplay === "card" && (
        <SelectionCardItems
          style={style}
          disabled={disabled}
          className={className}
          selectedItems={selectedItems}
          noSelectionText={noSelectionText}
          onRemoveSelect={handleRemove}
        />
      )}
      <Search
        mode={mode}
        style={style}
        error={error}
        query={query}
        inputId={inputId}
        disabled={disabled}
        isLoading={isLoading}
        className={className}
        listboxId={listboxId}
        minLength={minLength}
        placeholder={placeholder}
        selectedItems={selectedItems}
        containerWidth={containerWidth}
        activeOptionId={activeOptionId}
        debouncedValue={debouncedValue}
        selectionDisplay={selectionDisplay}
        isDropdownVisible={isDropdownVisible}
        setQuery={setQuery}
        onChange={handleRemove}
        onKeyDown={handleKeyDown}
        setIsDropdownVisible={setIsDropdownVisible}
      />
      <OptionsPortal
        ref={portalRef}
        anchorRef={containerRef}
        isVisible={isDropdownVisible}
        disabled={disabled}
        optionZIndex={optionZIndex}
      >
        <Options
          style={style}
          query={query}
          options={options}
          disabled={disabled}
          isLoading={isLoading}
          emptyText={emptyText}
          className={className}
          listboxId={listboxId}
          showImage={showImage}
          activeIndex={activeIndex}
          notFoundText={notFoundText}
          showCheckbox={showCheckbox}
          selectedItems={selectedItems}
          highlightMatch={highlightMatch}
          isDropdownVisible={isDropdownVisible}
          minLength={minLength}
          onSelect={handleSelect}
        />
      </OptionsPortal>
      {error && (
        <div className={styles.viewError}>
          <IconErrorTriangle />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
