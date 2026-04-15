import { useCallback, useId, useRef, useState } from "react";
import { Search } from "./components/search";
import { Options } from "./components/options";
import { SelectOption, SelectProps } from "./types/select.types";
import { useClickOutside } from "./hooks/use-click-outside";
import { IconErrorTriangle } from "./assets/icons";
import { OptionsPortal } from "./components/options-portal";
import classNames from "classnames";
import styles from "./styles/select.module.scss";

export const Select = <T extends SelectOption>(props: SelectProps<T>) => {
  const {
    query,
    label,
    error,
    style,
    options,
    disabled,
    isLoading,
    className,
    isRequired,
    selectedItems,
    debouncedValue,
    showImage = true,
    mode = "multiple",
    showCheckbox = true,
    highlightMatch = true,
    optionZIndex = 8888,
    placeholder = "Select...",
    notFoundText = "No result found",
    emptyText = "There is no options",
    setQuery,
    onChange,
    setOptions,
    setSelectedItems,
  } = props;

  const uid = useId();
  const portalRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputId = `select-input-${uid}`;
  const listboxId = `select-listbox-${uid}`;
  const labelId = `select-label-${uid}`;

  const { containerRef } = useClickOutside(
    () => {
      setIsDropdownVisible(false);
      setActiveIndex(-1);
      setQuery("");
    },
    setContainerWidth,
    portalRef
  );

  const updateSelected = useCallback(
    (items: T[]) => {
      setSelectedItems(items);
      onChange?.(items);
    },
    [onChange, setSelectedItems]
  );

  const handleSelect = useCallback(
    (item: T) => {
      if (item.disabled) return;

      if (mode === "single") {
        const isSame = selectedItems[0]?.value === item.value;
        updateSelected(isSame ? [] : [item]);
        setIsDropdownVisible(false);
        setActiveIndex(-1);
        setQuery("");
      } else {
        const exists = selectedItems.some((s) => s.value === item.value);
        updateSelected(
          exists
            ? selectedItems.filter((s) => s.value !== item.value)
            : [...selectedItems, item]
        );
      }
    },
    [mode, selectedItems, updateSelected, setQuery]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          updateSelected(selectedItems.slice(0, -1));
        }
        break;
    }
  };

  const activeOptionId =
    activeIndex >= 0 && options[activeIndex]
      ? `${listboxId}-option-${options[activeIndex].value}`
      : undefined;

  return (
    <div
      ref={containerRef}
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
          className={styles.label}
          onClick={(e) => e.stopPropagation()}
        >
          {label} {isRequired && <span aria-hidden="true">*</span>}
        </label>
      )}
      <Search
        error={error}
        query={query}
        style={style}
        inputId={inputId}
        disabled={disabled}
        isLoading={isLoading}
        listboxId={listboxId}
        className={className}
        placeholder={placeholder}
        selectedItems={selectedItems}
        debouncedValue={debouncedValue}
        containerWidth={containerWidth}
        activeOptionId={activeOptionId}
        isDropdownVisible={isDropdownVisible}
        setQuery={setQuery}
        setOptions={setOptions}
        onKeyDown={handleKeyDown}
        setSelectedItems={updateSelected}
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
          mode={mode}
          query={query}
          style={style}
          options={options}
          disabled={disabled}
          isLoading={isLoading}
          listboxId={listboxId}
          emptyText={emptyText}
          showImage={showImage}
          className={className}
          activeIndex={activeIndex}
          notFoundText={notFoundText}
          showCheckbox={showCheckbox}
          selectedItems={selectedItems}
          highlightMatch={highlightMatch}
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
