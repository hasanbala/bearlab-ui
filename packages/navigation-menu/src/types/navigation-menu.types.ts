export type NavigationMenuOrientation = "horizontal" | "vertical";

export type NavigationMenuIcon = React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
>;

export interface NavigationMenuLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  disabled?: boolean;
  icon?: NavigationMenuIcon;
}

export interface NavigationMenuGroup {
  label?: string;
  links: NavigationMenuLink[];
}

export interface NavigationMenuContent {
  groups?: NavigationMenuGroup[];
  custom?: React.ReactNode;
}

export interface NavigationMenuItem {
  value: string;
  label: string;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  icon?: NavigationMenuIcon;
  content?: NavigationMenuContent;
}

export interface NavigationMenuClassNames {
  root?: string;
  list?: string;
  item?: string;
  trigger?: string;
  triggerIcon?: string;
  content?: string;
  contentInner?: string;
  group?: string;
  groupLabel?: string;
  link?: string;
  linkIcon?: string;
  linkLabel?: string;
  linkDescription?: string;
  indicator?: string;
}

export interface NavigationMenuStyles {
  root?: React.CSSProperties;
  list?: React.CSSProperties;
  item?: React.CSSProperties;
  trigger?: React.CSSProperties;
  triggerIcon?: React.CSSProperties;
  content?: React.CSSProperties;
  contentInner?: React.CSSProperties;
  group?: React.CSSProperties;
  groupLabel?: React.CSSProperties;
  link?: React.CSSProperties;
  linkIcon?: React.CSSProperties;
  linkLabel?: React.CSSProperties;
  linkDescription?: React.CSSProperties;
  indicator?: React.CSSProperties;
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[];
  orientation?: NavigationMenuOrientation;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  delayDuration?: number;
  skipDelayDuration?: number;
  showIndicator?: boolean;
  sideOffset?: number;
  renderLink?: (
    link: NavigationMenuLink,
    children: React.ReactNode,
    props: NavigationMenuRenderLinkProps
  ) => React.ReactNode;
  "aria-label"?: string;
  className?: NavigationMenuClassNames;
  style?: NavigationMenuStyles;
}

export interface NavigationMenuRenderLinkProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  role?: string;
  onClick?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  "data-nav-trigger"?: string;
  "data-nav-value"?: string;
  "data-nav-link"?: string;
}

export interface MenuItemProps {
  item: NavigationMenuItem;
  orientation: NavigationMenuOrientation;
  isOpen: boolean;
  sideOffset: number;
  portalRef: React.RefObject<HTMLDivElement | null>;
  portalStyle?: React.CSSProperties;
  className?: NavigationMenuClassNames;
  style?: NavigationMenuStyles;
  renderLink?: NavigationMenuProps["renderLink"];
  onTriggerEnter: (value: string) => void;
  onTriggerLeave: () => void;
  onTriggerClick: (value: string) => void;
  onContentEnter: () => void;
  onContentLeave: () => void;
  onClose: () => void;
}

export interface MenuContentProps {
  id: string;
  labelledBy: string;
  content: NavigationMenuContent;
  contentRef: React.RefObject<HTMLDivElement | null>;
  className?: NavigationMenuClassNames;
  style?: NavigationMenuStyles;
  renderLink?: NavigationMenuProps["renderLink"];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  onClose: () => void;
}

export interface ContentPortalProps {
  isOpen: boolean;
  side: NavigationMenuSide;
  coords: ContentCoords;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface MenuLinkProps {
  link: NavigationMenuLink;
  className?: NavigationMenuClassNames;
  style?: NavigationMenuStyles;
  renderLink?: NavigationMenuProps["renderLink"];
  onSelect: () => void;
}

export interface MenuIndicatorProps {
  activeValue: string | null;
  orientation: NavigationMenuOrientation;
  listRef: React.RefObject<HTMLUListElement | null>;
  className?: string;
  style?: React.CSSProperties;
}

export interface UseNavigationMenu {
  value?: string | null;
  defaultValue?: string | null;
  delayDuration?: number;
  skipDelayDuration?: number;
  onValueChange?: (value: string | null) => void;
}

export interface UseNavigationMenuReturn {
  activeValue: string | null;
  onTriggerEnter: (value: string) => void;
  onTriggerLeave: () => void;
  onTriggerClick: (value: string) => void;
  onContentEnter: () => void;
  onContentLeave: () => void;
  close: () => void;
}

export interface UseClickOutsideOptions {
  enabled?: boolean;
  ignoreRef?: React.RefObject<HTMLElement | null>;
}

export type MenubarOverflow = "none" | "start" | "end" | "both";

export type NavigationMenuSide = "block-end" | "inline-end";

export interface ContentCoords {
  top: number;
  left: number;
}

export interface IndicatorRect {
  start: number;
  size: number;
}
