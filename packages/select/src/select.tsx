import { useCallback, useId, useMemo, useRef, useState } from "react";
import { Search } from "./components/search";
import { Options } from "./components/options";
import { SelectOption, SelectProps } from "./types/select.types";
import { useClickOutside } from "./hooks/use-click-outside";
import { IconErrorTriangle } from "./assets/icons";
import { OptionsPortal } from "./components/options-portal";
import classNames from "classnames";
import styles from "./styles/select.module.scss";
import { resolveValue } from "./utils/select-utils";

export const Select = <T extends SelectOption>(props: SelectProps<T>) => {
  const {
    value,
    label,
    error,
    style,
    options,
    disabled,
    className,
    isRequired,
    showImage = true,
    mode = "single",
    showCheckbox = true,
    optionZIndex = 8888,
    highlightMatch = true,
    placeholder = "Select...",
    notFoundText = "No result found",
    emptyText = "There is no options",
    isLoading = false,
    onChange,
  } = props;

  const isSingle = mode === "single";
  const [query, setQuery] = useState("");

  const selectedItems = useMemo<T[]>(
    () => resolveValue(value, options),
    [value, options]
  );

  const uid = useId();
  const portalRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputId = `select-input-${uid}`;
  const listboxId = `select-listbox-${uid}`;
  const labelId = `select-label-${uid}`;

  const handleClose = useCallback(() => {
    setIsDropdownVisible(false);
    setActiveIndex(-1);
    if (selectedItems.length === 0) {
      setQuery("");
    }
  }, [selectedItems.length]);

  const { containerRef } = useClickOutside(
    handleClose,
    setContainerWidth,
    portalRef
  );

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
          handleRemove(selectedItems.slice(0, -1));
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
          className={styles.selectLabel}
          onClick={(e) => e.stopPropagation()}
        >
          {label} {isRequired && <span aria-hidden="true">*</span>}
        </label>
      )}
      <Search
        mode={mode}
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
          isDropdownVisible={isDropdownVisible}
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
