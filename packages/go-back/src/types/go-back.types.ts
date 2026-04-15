export interface GoBackClassNames {
  root?: string;
}

export interface GoBackStyles {
  root?: React.CSSProperties;
}

export interface GoBackProps {
  label?: string;
  className?: GoBackClassNames;
  isDisabled?: boolean;
  onNavigate: () => void;
  style?: GoBackStyles;
}
