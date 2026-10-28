export type AlertVariant = "success" | "error" | "warning" | "info";
export type AlertRole = "alert" | "status" | "none";
export type AlertHeadingLevel = 2 | 3 | 4 | 5 | 6;

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
  title: React.ReactNode;
  message?: React.ReactNode;
  role?: AlertRole;
  children?: React.ReactNode;
  headingLevel?: AlertHeadingLevel;
  linkComponent?: React.ElementType;
  linkHref?: string;
  linkText?: string;
  linkTarget?: React.HTMLAttributeAnchorTarget;
  showLink?: boolean;
  style?: AlertStyles;
  variant: AlertVariant;
  className?: AlertClassNames;
}
