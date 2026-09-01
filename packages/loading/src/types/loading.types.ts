export type LoadingType =
  | "circle-dashed"
  | "circle-ellipse"
  | "disc"
  | "loader"
  | "loader-badging"
  | "loader-circle"
  | "loader-pinwheel"
  | "shell"
  | "square-dashed";

export interface LoadingProps {
  type?: LoadingType | undefined;
  style?: LoadingStyles;
  icon?: React.ElementType | null;
  className?: LoadingClassNames;
}

export interface LoadingClassNames {
  root?: string;
  icon?: string;
}

export interface LoadingStyles {
  root?: React.CSSProperties;
  icon?: React.CSSProperties;
}
