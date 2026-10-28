import { useCallback, useEffect, useState } from "react";
import { MODAL_CLOSE_FALLBACK_MS } from "../constants/modal-config";
import { UseModalAnimationReturn } from "../types/modal.types";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useModalAnimation = (isOpen: boolean): UseModalAnimationReturn => {
  const [isMounted, setIsMounted] = useState(isOpen);

  if (isOpen && !isMounted) setIsMounted(true);

  useEffect(() => {
    if (isOpen || !isMounted) return;
    if (prefersReducedMotion()) {
      setIsMounted(false);
      return;
    }
    const timer = setTimeout(() => setIsMounted(false), MODAL_CLOSE_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [isOpen, isMounted]);

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLElement>) => {
      if (e.target !== e.currentTarget || isOpen) return;
      setIsMounted(false);
    },
    [isOpen]
  );

  return { isMounted, handleAnimationEnd };
};
