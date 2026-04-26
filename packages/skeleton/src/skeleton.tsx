import classnames from "classnames";
import type { SkeletonProps } from "./types/skeleton.types";
import { SkeletonArticle } from "./components/skeleton-article";
import { SkeletonCard } from "./components/skeleton-card";
import { SkeletonList } from "./components/skeleton-list";
import { SkeletonDefault } from "./components/skeleton-default";
import { SkeletonModal } from "./components/skeleton-modal";
import { SkeletonProfile } from "./components/skeleton-profile";
import { SkeletonTable } from "./components/skeleton-table";
import { SkeletonForm } from "./components/skeleton-form";
import styles from "./styles/skeleton.module.scss";

const VARIANT_MAP = {
  article: SkeletonArticle,
  card: SkeletonCard,
  list: SkeletonList,
  default: SkeletonDefault,
  modal: SkeletonModal,
  profile: SkeletonProfile,
  table: SkeletonTable,
  form: SkeletonForm,
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
      className={classnames(
        styles.container,
        styles[variant],
        className?.root
      )}
      style={style?.root}
    >
      <VariantComponent
        animated={animated}
        lines={lines}
        className={className}
        style={style}
      />
    </div>
  );
};
