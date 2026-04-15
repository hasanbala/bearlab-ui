export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertClassNames {
  root?: string;
  iconWrapper?: string;
  content?: string;
  title?: string;
  description?: string;
  link?: string;
}

export interface AlertStyles {
  root?: React.CSSProperties;
  iconWrapper?: React.CSSProperties;
  content?: React.CSSProperties;
  title?: React.CSSProperties;
  description?: React.CSSProperties;
  link?: React.CSSProperties;
}

export interface AlertProps {
  variant: AlertVariant;
  title: string;
  message: string;
  showLink?: boolean;
  linkHref?: string;
  linkText?: string;
  className?: AlertClassNames;
  style?: AlertStyles;
}
