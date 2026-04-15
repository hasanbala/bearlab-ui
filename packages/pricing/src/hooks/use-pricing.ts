import { useState, KeyboardEvent } from "react";
import { UsePricingProps, UsePricingReturn } from "../types/pricing.types";

export const usePricing = ({
  defaultActivePack = 0,
}: UsePricingProps = {}): UsePricingReturn => {
  const [activePack, setActivePack] = useState<number>(defaultActivePack);

  const handleCardKeyDown = (
    e: KeyboardEvent<HTMLElement>,
    id: number
  ): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActivePack(id);
    }
  };

  return {
    activePack,
    setActivePack,
    handleCardKeyDown,
  };
};
