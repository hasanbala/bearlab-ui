export type ModalType = "alert" | "default" | "fullscreen";
export type ModalSizeType = "small" | "medium" | "large" | "xlarge";
export type ModalAlertType = "success" | "info" | "error" | "warning";
export type ModalAnimationType = "fade" | "zoom" | "slide" | "flip" | "bounce";

export interface ModalClassNames {
  title?: string;
  header?: string;
  overlay?: string;
  content?: string;
  subTitle?: string;
  container?: string;
  closeButton?: string;
  bodyContent?: string;
}

export interface ModalStyles {
  header?: React.CSSProperties;
  overlay?: React.CSSProperties;
  content?: React.CSSProperties;
  container?: React.CSSProperties;
  bodyContent?: React.CSSProperties;
}

export interface ModalProps {
  title: string;
  isOpen: boolean;
  zIndex?: number;
  type?: ModalType;
  size?: ModalSizeType;
  subTitle?: string;
  loading?: boolean;
  style?: ModalStyles;
  children: React.ReactNode;
  alertType?: ModalAlertType;
  className?: ModalClassNames;
  animation?: ModalAnimationType;
  onCancel: () => void;
}

export interface ModalHeaderProps {
  title: string;
  descId: string;
  type: ModalType;
  titleId: string;
  subTitle?: string;
  style?: Pick<ModalStyles, "header">;
  className?: Pick<ModalClassNames, "header" | "title" | "subTitle">;
}

export interface ModalBodyProps {
  loading?: boolean;
  isFullscreen: boolean;
  children: React.ReactNode;
  style?: Pick<ModalStyles, "bodyContent">;
  className?: Pick<ModalClassNames, "bodyContent">;
}

export interface ModalFooterProps {
  type?: ModalType;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  alertType?: ModalAlertType;
  onCancel: () => void;
  onConfirm?: () => void;
}

export interface ModalAlertIconProps {
  type: ModalType;
  alertType: ModalAlertType;
}

export interface GlobalModalConfig {
  title: string;
  zIndex?: number;
  type?: ModalType;
  size?: ModalSizeType;
  subTitle?: string;
  style?: ModalStyles;
  cancelLabel?: string;
  confirmLabel?: string;
  content: React.ReactNode;
  alertType?: ModalAlertType;
  className?: ModalClassNames;
  animation?: ModalAnimationType;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ModalStoreState {
  isOpen: boolean;
  config: GlobalModalConfig | null;
}

export interface UseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

export interface UseModalAnimationReturn {
  isMounted: boolean;
  handleAnimationEnd: () => void;
}

export interface ModalSkeletonProps {
  lines: number;
  animated?: boolean;
}
