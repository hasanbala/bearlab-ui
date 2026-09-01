import { useMemo } from "react";
import type {
  UseProgressParams,
  UseProgressReturn,
} from "../types/progress.types";
import { clamp, resolvePercent, resolveStatus } from "../utils/progress-utils";

export const useProgress = (params: UseProgressParams): UseProgressReturn => {
  const {
    percent,
    value,
    minValue,
    maxValue,
    status,
    bufferValue,
    indeterminate,
  } = params;

  return useMemo(() => {
    const resolved = resolvePercent({ percent, value, minValue, maxValue });
    const effectiveStatus = indeterminate
      ? (status ?? "active")
      : resolveStatus(resolved, status);

    const bufferPercent =
      bufferValue != null ? clamp(bufferValue, 0, 100) : null;

    return {
      percent: resolved,
      bufferPercent,
      status: effectiveStatus,
      isComplete: resolved >= 100,
      displayPercent: Math.round(resolved),
    };
  }, [percent, value, minValue, maxValue, status, bufferValue, indeterminate]);
};
