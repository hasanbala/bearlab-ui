export type BadgeVariant = "light" | "solid";
export type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";
export type BadgeSize = "small" | "medium";

export interface BadgeClassNames {
  root?: string;
  startIcon?: string;
  endIcon?: string;
}

export interface BadgeStyles {
  root?: React.CSSProperties;
  startIcon?: React.CSSProperties;
  endIcon?: React.CSSProperties;
}

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: BadgeColor;
  startIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string | number;
  className?: BadgeClassNames;
  style?: BadgeStyles;
}
