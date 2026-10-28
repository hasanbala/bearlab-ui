import { useState, useCallback, useRef } from "react";

export const useCopy = (
  getValue: () => string | undefined,
  isDisabled: boolean | undefined
) => {
  const [isCopy, setIsCopy] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    const value = getValue();
    if (isDisabled || !value) return;

    try {
      await window.navigator.clipboard.writeText(value);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setIsCopy(true);
      timeoutRef.current = setTimeout(() => setIsCopy(false), 3000);
    } catch {
      console.warn("Clipboard copy failed.");
    }
  }, [getValue, isDisabled]);

  return { isCopy, handleCopy };
};
