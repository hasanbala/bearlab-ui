import { useCallback, useEffect, useRef, useState } from "react";
import type {
  UseNavigationMenu,
  UseNavigationMenuReturn,
} from "../types/navigation-menu.types";
import {
  DEFAULT_DELAY_DURATION,
  DEFAULT_SKIP_DELAY_DURATION,
} from "../constants/navigation-config";

const CLOSE_GRACE = 150;

export const useNavigationMenu = ({
  value,
  defaultValue = null,
  delayDuration = DEFAULT_DELAY_DURATION,
  skipDelayDuration = DEFAULT_SKIP_DELAY_DURATION,
  onValueChange,
}: UseNavigationMenu): UseNavigationMenuReturn => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | null>(
    defaultValue
  );

  const activeValue = isControlled ? (value ?? null) : internalValue;

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCloseTime = useRef<number>(0);
  const activeValueRef = useRef<string | null>(activeValue);

  activeValueRef.current = activeValue;

  const clearTimers = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const setActive = useCallback(
    (next: string | null) => {
      if (next === activeValueRef.current) return;
      if (next === null) {
        lastCloseTime.current = Date.now();
      }
      if (!isControlled) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const close = useCallback(() => {
    clearTimers();
    setActive(null);
  }, [clearTimers, setActive]);

  const onTriggerEnter = useCallback(
    (next: string) => {
      clearTimers();

      const withinSkipWindow =
        activeValueRef.current !== null ||
        Date.now() - lastCloseTime.current < skipDelayDuration;

      if (withinSkipWindow) {
        setActive(next);
        return;
      }

      openTimer.current = setTimeout(() => setActive(next), delayDuration);
    },
    [clearTimers, setActive, delayDuration, skipDelayDuration]
  );

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setActive(null), CLOSE_GRACE);
  }, [clearTimers, setActive]);

  const onTriggerClick = useCallback(
    (next: string) => {
      clearTimers();
      setActive(activeValueRef.current === next ? null : next);
    },
    [clearTimers, setActive]
  );

  const onContentEnter = useCallback(() => clearTimers(), [clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  return {
    activeValue,
    onTriggerEnter,
    onTriggerLeave: scheduleClose,
    onTriggerClick,
    onContentEnter,
    onContentLeave: scheduleClose,
    close,
  };
};
