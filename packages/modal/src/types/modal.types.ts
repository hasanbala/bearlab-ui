export type ModalAnimationType = "fade" | "zoom" | "slide" | "flip" | "bounce";
export type ModalAlertType = "success" | "info" | "error" | "warning";
export type ModalType = "alert" | "default" | "fullscreen";

export interface ModalClassNames {
  container?: string;
  overlay?: string;
  content?: string;
  header?: string;
  title?: string;
  subTitle?: string;
  bodyContent?: string;
  closeButton?: string;
}

export interface ModalStyles {
  container?: React.CSSProperties;
  overlay?: React.CSSProperties;
  content?: React.CSSProperties;
  header?: React.CSSProperties;
  bodyContent?: React.CSSProperties;
}

export interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  title: string;
  children: React.ReactNode;
  subTitle?: string;
  loading?: boolean;
  type?: ModalType;
  alertType?: ModalAlertType;
  animation?: ModalAnimationType;
  zIndex?: number;
  className?: ModalClassNames;
  style?: ModalStyles;
}

export interface ModalHeaderProps {
  titleId: string;
  descId: string;
  title: string;
  type: ModalType;
  subTitle?: string;
  className?: Pick<ModalClassNames, "header" | "title" | "subTitle">;
  style?: Pick<ModalStyles, "header">;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  loading?: boolean;
  className?: Pick<ModalClassNames, "bodyContent">;
  style?: Pick<ModalStyles, "bodyContent">;
}

export interface ModalFooterProps {
  onCancel: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: ModalType;
  alertType?: ModalAlertType;
  className?: string;
}

export interface ModalAlertIconProps {
  alertType: ModalAlertType;
  type: ModalType;
}

export interface GlobalModalConfig {
  title: string;
  subTitle?: string;
  content: React.ReactNode;
  type?: ModalType;
  alertType?: ModalAlertType;
  animation?: ModalAnimationType;
  confirmLabel?: string;
  cancelLabel?: string;
  zIndex?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: ModalClassNames;
  style?: ModalStyles;
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
