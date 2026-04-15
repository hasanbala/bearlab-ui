import { useCallback, useEffect, useState } from "react";
import { UseModalAnimationReturn } from "../types/modal.types";

export const useModalAnimation = (isOpen: boolean): UseModalAnimationReturn => {
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = useCallback(() => {
    if (!isOpen) {
      setIsMounted(false);
    }
  }, [isOpen]);

  return { isMounted, handleAnimationEnd };
};
