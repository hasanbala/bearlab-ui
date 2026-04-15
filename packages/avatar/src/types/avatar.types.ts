import type React from "react";

export type AvatarSize =
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";

export type AvatarStatus = "online" | "offline" | "busy" | "none";

export interface AvatarIconClassNames {
  root?: string;
  image?: string;
  status?: string;
}

export interface AvatarIconStyles {
  root?: React.CSSProperties;
  image?: React.CSSProperties;
  status?: React.CSSProperties;
}

export interface AvatarIconProps {
  src: string;
  alt?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: AvatarIconClassNames;
  style?: AvatarIconStyles;
}

export interface AvatarTextClassNames {
  root?: string;
  label?: string;
}

export interface AvatarTextStyles {
  root?: React.CSSProperties;
  label?: React.CSSProperties;
}

export interface AvatarTextProps {
  name: string;
  className?: AvatarTextClassNames;
  style?: AvatarTextStyles;
}
