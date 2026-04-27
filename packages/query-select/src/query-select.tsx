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
  QuerySelectValue,
  QuerySelectMode,
} from "./types/query-select.types";
import { OptionsPortal } from "./components/options-portal";
import { IconErrorTriangle } from "./assets/icons";
import classnames from "classnames";
import styles from "./styles/query-select.module.scss";
import { resolveValue } from "./utils/query-select-utils";

export const QuerySelect = <
  T extends QuerySelectOption,
  Mode extends QuerySelectMode = "single",
>(
  props: QuerySelectProps<T, Mode>
) => {
  const {
    name,
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
    mode = "single",
    showCheckbox = true,
    optionZIndex = 8888,
    highlightMatch = true,
    selectionLayout = "inline",
    notFoundText = "No result found",
    emptyText = "There is no options",
    placeholder = "Enter at least 3 characters",
    noSelectionText = "There is no selected choice",
    onSearch,
    onChange,
  } = props;

  const isSingle = mode == "single";
  const isSelectionCard = selectionLayout == "card";
  const [query, setQuery] = useState("");
  const uid = useId();
  const portalRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<T[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { debouncedValue } = useDebounce(query, delayTime);
  const inputId = `query-select-input-${uid}`;
  const listboxId = `query-select-listbox-${uid}`;
  const labelId = `query-label-${uid}`;
  const [containerWidth, setContainerWidth] = useState(0);
  const cachedItemsRef = useRef<T[]>([]);

  const shouldSkipSearch = useMemo(
    () =>
      query.trim() == "" ||
      debouncedValue !== query ||
      query.trim().length < minLength,
    [query, debouncedValue, minLength]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (shouldSkipSearch) return;
      setIsLoading(true);
      try {
        const result = await onSearch(debouncedValue);
        setOptions(result);
        setIsDropdownVisible(true);
      } catch (err) {
        console.warn(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, debouncedValue, shouldSkipSearch, onSearch]);

  const selectedItems = useMemo<T[]>(() => {
    const nextItems = resolveValue<T>(
      value as QuerySelectValue<T>,
      options,
      cachedItemsRef.current
    );
    cachedItemsRef.current = nextItems;
    return nextItems;
  }, [value, options]);

  const handleClose = useCallback(() => {
    setIsDropdownVisible(false);
    setActiveIndex(-1);
    if (selectedItems.length == 0) {
      setQuery("");
      setOptions([]);
    }
  }, [selectedItems.length]);

  const { containerRef } = useClickOutside(
    handleClose,
    selectionLayout,
    setContainerWidth,
    portalRef
  );

  const fireOnChange = useCallback(
    (nextValue: QuerySelectValue<T, Mode>, option?: T | null) => {
      if (!onChange) return;
      if (name) {
        const syntheticEvent = {
          target: { name: name, value: nextValue, type: "select" },
          currentTarget: { name: name, value: nextValue, type: "select" },
        } as unknown as React.ChangeEvent<HTMLElement>;
        (
          onChange as unknown as (event: React.ChangeEvent<HTMLElement>) => void
        )(syntheticEvent);
      } else {
        (onChange as (v: typeof nextValue, o?: T) => void)(
          nextValue,
          option as T
        );
      }
    },
    [onChange, name]
  );

  const handleSelect = useCallback(
    (item: T) => {
      if (item.disabled) return;
      if (isSingle) {
        const isSame = selectedItems[0]?.value === item.value;
        const nextValue = isSame ? null : item.value;
        cachedItemsRef.current = isSame ? [] : [item];
        fireOnChange(nextValue as QuerySelectValue<T, Mode>, item);
      } else {
        const exists = selectedItems.some((s) => s.value === item.value);
        const nextItems = exists
          ? selectedItems.filter((s) => s.value !== item.value)
          : [...selectedItems, item];
        const nextValues = nextItems.map((s) => s.value);
        cachedItemsRef.current = nextItems;
        fireOnChange(nextValues as QuerySelectValue<T, Mode>, item);
      }
    },
    [isSingle, selectedItems, fireOnChange]
  );

  const handleRemove = useCallback(
    (updated: T[]) => {
      if (isSingle) {
        fireOnChange(null as QuerySelectValue<T, Mode>, null);
      } else {
        const updatedValues = updated.map((s) => s.value);
        fireOnChange(updatedValues as QuerySelectValue<T, Mode>, null);
      }
    },
    [isSingle, fireOnChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isLoading || disabled) return;
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
      query,
      options,
      disabled,
      isLoading,
      activeIndex,
      selectedItems,
      isDropdownVisible,
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
      {isSelectionCard && (
        <SelectionCardItems
          style={style}
          disabled={disabled}
          className={className}
          selectedItems={selectedItems}
          noSelectionText={noSelectionText}
          onRemoveSelect={handleRemove}
          isDropdownVisible={isDropdownVisible}
        />
      )}
      <Search
        isSingle={isSingle}
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
        isSelectionCard={isSelectionCard}
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
        optionZIndex={optionZIndex}
        isSelectionCard={isSelectionCard}
      >
        <Options
          isMultiple={mode == "multiple"}
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
