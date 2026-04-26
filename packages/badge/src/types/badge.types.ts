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
  endIcon?: string;
  startIcon?: string;
}

export interface BadgeStyles {
  root?: React.CSSProperties;
  endIcon?: React.CSSProperties;
  startIcon?: React.CSSProperties;
}

export interface BadgeProps {
  size?: BadgeSize;
  color?: BadgeColor;
  style?: BadgeStyles;
  variant?: BadgeVariant;
  label: string | number;
  className?: BadgeClassNames;
  startIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  endIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
