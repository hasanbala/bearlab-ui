import { SkeletonListItem } from "./skeleton-list-item";
import type { SkeletonListProps } from "../types/skeleton.types";

export const SkeletonList = (props: SkeletonListProps) => {
  const { animated, lines, className, style } = props;

  return (
    <>
      {Array.from({ length: lines }, (_, index) => (
        <SkeletonListItem
          key={index}
          animated={animated}
          className={className}
          style={style}
        />
      ))}
    </>
  );
};
