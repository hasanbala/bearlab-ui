import { SEPARATE_TYPE } from "../constants/breadcrumb-config";

export type SeparateType = (typeof SEPARATE_TYPE)[keyof typeof SEPARATE_TYPE];

export interface BreadcrumbClassNames {
  nav?: string;
  root?: string;
  title?: string;
  fromLink?: string;
  current?: string;
}

export interface BreadcrumbStyles {
  nav?: React.CSSProperties;
  root?: React.CSSProperties;
  title?: React.CSSProperties;
  current?: React.CSSProperties;
  fromLink?: React.CSSProperties;
}

export type BreadcrumbHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface BreadcrumbItem {
  href: string;
  title: React.ReactNode;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  navLabel?: string;
  showTitle?: boolean;
  headingLevel?: BreadcrumbHeadingLevel;
  fromPageUrl?: string;
  fromPageTitle?: string;
  showHomeIcon?: boolean;
  currentPageTitle: string;
  style?: BreadcrumbStyles;
  separateType?: SeparateType;
  className?: BreadcrumbClassNames;
  renderLink?: (props: DefaultLinkProps) => React.ReactNode;
}

export interface DefaultLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
