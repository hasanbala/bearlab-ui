import { SEPARATE_TYPE } from "../constants/breadcrumb-config";

export type SeparateType = (typeof SEPARATE_TYPE)[keyof typeof SEPARATE_TYPE];

export interface BreadcrumbClassNames {
  root?: string;
  title?: string;
  nav?: string;
  fromLink?: string;
  current?: string;
}

export interface BreadcrumbStyles {
  root?: React.CSSProperties;
  title?: React.CSSProperties;
  nav?: React.CSSProperties;
  fromLink?: React.CSSProperties;
  current?: React.CSSProperties;
}

export interface BreadcrumbProps {
  currentPageTitle: string;
  fromPageTitle?: string;
  fromPageUrl?: string;
  showHomeIcon?: boolean;
  separateType?: SeparateType;
  className?: BreadcrumbClassNames;
  style?: BreadcrumbStyles;
  renderLink?: (props: RenderLinkProps) => React.ReactNode;
}

export interface RenderLinkProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
