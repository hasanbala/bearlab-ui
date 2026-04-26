export interface LoadingProps {
  style?: LoadingStyles;
  icon?: React.ElementType;
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
