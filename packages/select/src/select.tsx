import { useCallback, useId, useMemo, useRef, useState } from "react";
import { Search } from "./components/search";
import { Options } from "./components/options";
import {
  SelectMode,
  SelectOption,
  SelectProps,
  SelectValue,
} from "./types/select.types";
import { useClickOutside } from "./hooks/use-click-outside";
import { IconErrorTriangle } from "./assets/icons";
import { OptionsPortal } from "./components/options-portal";
import classNames from "classnames";
import styles from "./styles/select.module.scss";
import { resolveValue } from "./utils/select-utils";
import { DEFAULT_SELECT_LABELS } from "./constants/select-config";

export const Select = <
  T extends SelectOption,
  Mode extends SelectMode = "single",
>(
  props: SelectProps<T, Mode>
) => {
  const {
    name,
    value,
    label,
    error,
    style,
    labels,
    locale,
    options,
    disabled,
    className,
    isRequired,
    showImage = false,
    showSearch = true,
    mode = "single",
    showCheckbox = false,
    optionZIndex = 10100,
    highlightMatch = true,
    placeholder = "Select...",
    notFoundText = "No result found",
    emptyText = "There is no options",
    isLoading = false,
    singleValueDisplay = "text",
    onBlur,
    onChange,
  } = props;

  const uid = useId();
  const portalRef = useRef<HTMLDivElement>(null);
  const isSingle = mode === "single";
  const isSingleText = isSingle && singleValueDisplay === "text";
  const [query, setQuery] = useState("");
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputId = `select-input-${uid}`;
  const listboxId = `select-listbox-${uid}`;
  const labelId = `select-label-${uid}`;
  const errorId = `select-error-${uid}`;
  const text = useMemo(
    () => ({ ...DEFAULT_SELECT_LABELS, ...labels }),
    [labels]
  );

  const selectedItems = useMemo<T[]>(
    () => resolveValue<T>(value as SelectValue<T>, options),
    [value, options]
  );

  const filteredOptions = useMemo<T[]>(() => {
    if (!query.trim()) return options;
    const lower = query.toLocaleLowerCase(locale);
    return options.filter((o) =>
      o.label.toLocaleLowerCase(locale).includes(lower)
    );
  }, [options, query, locale]);

  const handleClose = useCallback(() => {
    setIsDropdownVisible(false);
    setActiveIndex(-1);
    setQuery("");
  }, []);

  const { containerRef } = useClickOutside(
    handleClose,
    setContainerWidth,
    portalRef
  );

  const fireOnChange = useCallback(
    (nextValue: SelectValue<T, Mode>, option?: T | null) => {
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
        if (!isSame || !isSingleText) {
          const nextValue = isSame ? null : item.value;
          fireOnChange(nextValue as SelectValue<T, Mode>, item);
        }
        handleClose();
      } else {
        const exists = selectedItems.some((s) => s.value === item.value);
        const nextItems = exists
          ? selectedItems.filter((s) => s.value !== item.value)
          : [...selectedItems, item];
        const nextValues = nextItems.map((s) => s.value);
        fireOnChange(nextValues as SelectValue<T, Mode>, item);
      }
    },
    [isSingle, isSingleText, selectedItems, fireOnChange, handleClose]
  );

  const handleRemove = useCallback(
    (updated: T[]) => {
      if (isSingle) {
        fireOnChange(null as SelectValue<T, Mode>, null);
      } else {
        const updatedValues = updated.map((s) => s.value);
        fireOnChange(updatedValues as SelectValue<T, Mode>, null);
      }
    },
    [isSingle, fireOnChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isLoading || disabled) return;
      const isSpaceSelect = !showSearch && e.key === " ";
      if (!isDropdownVisible) {
        if (e.key === "ArrowDown" || e.key === "Enter" || isSpaceSelect) {
          e.preventDefault();
          setIsDropdownVisible(true);
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case "Enter":
        case " ":
          if (e.key === " " && !isSpaceSelect) break;
          e.preventDefault();
          if (activeIndex >= 0 && filteredOptions[activeIndex]) {
            handleSelect(filteredOptions[activeIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          e.stopPropagation();
          setIsDropdownVisible(false);
          setActiveIndex(-1);
          break;
        case "Backspace":
          if (!query && !isSingleText && selectedItems.length > 0) {
            handleRemove(selectedItems.slice(0, -1));
          }
          break;
      }
    },
    [
      query,
      disabled,
      isLoading,
      showSearch,
      activeIndex,
      isSingleText,
      selectedItems,
      filteredOptions,
      isDropdownVisible,
      handleSelect,
      handleRemove,
    ]
  );

  const activeOptionId =
    activeIndex >= 0 && filteredOptions[activeIndex]
      ? `${listboxId}-option-${filteredOptions[activeIndex].value}`
      : undefined;

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!onBlur) return;
    const next = e.relatedTarget as Node | null;
    if (containerRef.current?.contains(next)) return;
    if (portalRef.current?.contains(next)) return;
    onBlur(e);
  };

  return (
    <div
      ref={containerRef}
      onBlur={handleBlur}
      style={style?.root}
      className={classNames(
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
      {name &&
        selectedItems.map((item) => (
          <input
            key={item.value}
            type="hidden"
            name={name}
            value={item.value}
          />
        ))}
      <Search
        mode={mode}
        error={error}
        query={query}
        style={style}
        labels={text}
        inputId={inputId}
        errorId={errorId}
        isRequired={isRequired}
        labelId={label ? labelId : undefined}
        disabled={disabled}
        isLoading={isLoading}
        listboxId={listboxId}
        className={className}
        showSearch={showSearch}
        placeholder={placeholder}
        isSingleText={isSingleText}
        selectedItems={selectedItems}
        containerWidth={containerWidth}
        activeOptionId={activeOptionId}
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
      >
        <Options
          query={query}
          style={style}
          labels={text}
          disabled={disabled}
          isLoading={isLoading}
          listboxId={listboxId}
          emptyText={emptyText}
          showImage={showImage}
          options={filteredOptions}
          className={className}
          activeIndex={activeIndex}
          notFoundText={notFoundText}
          showCheckbox={showCheckbox}
          selectedItems={selectedItems}
          isMultiple={mode === "multiple"}
          highlightMatch={highlightMatch}
          isDropdownVisible={isDropdownVisible}
          onSelect={handleSelect}
        />
      </OptionsPortal>
      {error && (
        <div id={errorId} className={styles.viewError}>
          <IconErrorTriangle />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
