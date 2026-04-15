import classnames from "classnames";
import type { SkeletonProps } from "./types/skeleton.types";
import { SkeletonArticle } from "./components/skeleton-article";
import { SkeletonCard } from "./components/skeleton-card";
import { SkeletonList } from "./components/skeleton-list";
import { SkeletonDefault } from "./components/skeleton-default";
import styles from "./styles/skeleton.module.scss";

const VARIANT_MAP = {
  article: SkeletonArticle,
  card: SkeletonCard,
  list: SkeletonList,
  default: SkeletonDefault,
} as const;

export const Skeleton = (props: SkeletonProps) => {
  const {
    className,
    variant = "default",
    lines = 4,
    animated = true,
    style,
  } = props;

  const VariantComponent = VARIANT_MAP[variant];

  return (
    <div
      className={classnames(styles.container, styles[variant], className)}
      style={style}
    >
      <VariantComponent animated={animated} lines={lines} />
    </div>
  );
};
