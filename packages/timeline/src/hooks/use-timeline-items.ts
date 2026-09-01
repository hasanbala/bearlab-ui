import { useMemo } from "react";
import type {
  ResolvedTimelineItem,
  TimelineItem,
  TimelineItemPosition,
  UseTimelineItems,
} from "../types/timeline.types";

const resolveSide = (
  item: TimelineItem,
  index: number,
  mode: UseTimelineItems["mode"]
): TimelineItemPosition => {
  if (mode === "right") return "right";
  if (mode === "left") return "left";
  if (item.position) return item.position;
  return index % 2 === 0 ? "left" : "right";
};

export const useTimelineItems = ({
  items,
  mode,
  reverse,
  pending,
  pendingDot,
}: UseTimelineItems): ResolvedTimelineItem[] => {
  return useMemo(() => {
    const ordered = reverse ? [...items].reverse() : items;
    const hasPending = pending !== undefined && pending !== false;

    const resolved: ResolvedTimelineItem[] = ordered.map((item, index) => ({
      key: item.key ?? index,
      item,
      index,
      isPending: false,
      isLast: !hasPending && index === ordered.length - 1,
      side: resolveSide(item, index, mode),
    }));

    if (hasPending) {
      const pendingItem: TimelineItem = {
        content: pending === true ? null : pending,
        dot: pendingDot,
      };

      resolved.push({
        key: "__pending__",
        item: pendingItem,
        index: -1,
        isPending: true,
        isLast: true,
        side: resolveSide(pendingItem, resolved.length, mode),
      });
    }

    return resolved;
  }, [items, mode, reverse, pending, pendingDot]);
};
