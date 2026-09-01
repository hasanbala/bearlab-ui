import { useCallback, useState } from "react";
import {
  TextareaValue,
  UseCharacterLimitProps,
  UseCharacterLimitReturn,
} from "../types/textarea.types";

const toText = (value: TextareaValue) => {
  if (value === undefined || value === null) return "";

  return Array.isArray(value) ? value.join("") : String(value);
};

const resolveLimit = (maxCharacter?: number) => {
  if (typeof maxCharacter !== "number") return undefined;
  if (!Number.isFinite(maxCharacter) || maxCharacter <= 0) return undefined;

  return Math.floor(maxCharacter);
};

export const useCharacterLimit = (
  props: UseCharacterLimitProps
): UseCharacterLimitReturn => {
  const { value, defaultValue, maxCharacter, onChange } = props;

  const limit = resolveLimit(maxCharacter);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(() =>
    toText(defaultValue)
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (limit !== undefined && e.target.value.length > limit) {
        e.target.value = e.target.value.slice(0, limit);
      }

      if (limit !== undefined && !isControlled) {
        setInternalValue(e.target.value);
      }

      onChange?.(e);
    },
    [isControlled, limit, onChange]
  );

  const characterCount =
    limit === undefined
      ? 0
      : (isControlled ? toText(value) : internalValue).length;

  return { limit, characterCount, handleChange };
};
