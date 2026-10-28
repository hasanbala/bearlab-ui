import { useId, useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import { DEFAULT_COMMIT_KEYS } from "../constants/tag-input.config";
import {
  TagItem,
  UseTagInputProps,
  UseTagInputReturn,
} from "../types/tag-input.types";
import {
  commitValue,
  parsePastedText,
  removeItemById,
} from "../utils/tag-input.utils";

export const useCredentialInput = (
  props: UseTagInputProps
): UseTagInputReturn => {
  const {
    value,
    labels,
    format,
    maxItems,
    disabled,
    inputValue,
    onBlur = true,
    allowDuplicates = false,
    onAdd,
    onError,
    validate,
    onChange,
    onRemove,
    onInputChange,
  } = props;

  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [announcement, setAnnouncement] = useState("");

  const tryCommit = (raw: string) => {
    if (disabled) return;

    const result = commitValue(raw, value, format, labels, {
      validate,
      allowDuplicates,
      maxItems,
    });

    if (result.announcement) setAnnouncement(result.announcement);

    if (result.reason === "added" && result.nextList && result.item) {
      onChange(result.nextList);
      onAdd?.(result.item);
      if (result.item.status === "invalid") onError?.(result.item.value);
      onInputChange("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled || e.nativeEvent.isComposing) return;

    if (DEFAULT_COMMIT_KEYS.includes(e.key)) {
      if (e.key !== "Tab") e.preventDefault();
      tryCommit(inputValue);
      return;
    }

    if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      const last = value[value.length - 1];
      const next = removeItemById(value, last.id);
      onChange(next);
      onRemove?.(last);
      setAnnouncement(labels.removed(last.value));
    }
  };

  const handleBlur = () => {
    if (onBlur) tryCommit(inputValue);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    const text = e.clipboardData.getData("text");
    const candidates = parsePastedText(text);

    if (candidates.length <= 1) return;
    e.preventDefault();

    let nextList = [...value];
    candidates.forEach((candidate) => {
      const result = commitValue(candidate, nextList, format, labels, {
        validate,
        allowDuplicates,
        maxItems,
      });
      if (result.reason === "added" && result.nextList && result.item) {
        nextList = result.nextList;
        onAdd?.(result.item);
        if (result.item.status === "invalid") onError?.(result.item.value);
      }
    });

    onChange(nextList);
    onInputChange("");
    setAnnouncement(labels.pasted(candidates.length));
  };

  const handleRemove = (item: TagItem) => {
    if (disabled) return;
    const next = removeItemById(value, item.id);
    onChange(next);
    onRemove?.(item);
    setAnnouncement(labels.removed(item.value));
    inputRef.current?.focus();
  };

  return {
    listId,
    inputRef,
    announcement,
    handleBlur,
    handlePaste,
    handleRemove,
    handleKeyDown,
  };
};
