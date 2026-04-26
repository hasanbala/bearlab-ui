export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertClassNames {
  root?: string;
  link?: string;
  title?: string;
  content?: string;
  iconWrapper?: string;
  description?: string;
}

export interface AlertStyles {
  root?: React.CSSProperties;
  link?: React.CSSProperties;
  title?: React.CSSProperties;
  content?: React.CSSProperties;
  description?: React.CSSProperties;
  iconWrapper?: React.CSSProperties;
}

export interface AlertProps {
  title: string;
  message: string;
  linkHref?: string;
  linkText?: string;
  showLink?: boolean;
  style?: AlertStyles;
  variant: AlertVariant;
  className?: AlertClassNames;
}
