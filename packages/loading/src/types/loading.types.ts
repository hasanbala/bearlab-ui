import type { CSSProperties, ElementType } from "react";

export interface LoadingProps {
  className?: ClassNamesProps;
  style?: StylesProps;
  icon?: ElementType;
}

export interface ClassNamesProps {
  root?: string;
  icon?: string;
}

export interface StylesProps {
  root?: React.CSSProperties;
  icon?: React.CSSProperties;
}
