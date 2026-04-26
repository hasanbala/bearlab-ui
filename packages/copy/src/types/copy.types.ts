export interface CopyClassNames {
  root?: string;
  text?: string;
}

export interface CopyStyles {
  root?: React.CSSProperties;
  text?: React.CSSProperties;
}

export interface CopyProps {
  text: string;
  label?: string;
  disabled?: boolean;
  style?: CopyStyles;
  className?: CopyClassNames;
}
