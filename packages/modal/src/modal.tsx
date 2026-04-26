import { useEffect, useId, useRef } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { DEFAULT_MODAL_Z_INDEX } from "./constants/modal-config";
import { ModalAlertIcon } from "./components/modal-alert-icon";
import { ModalBody } from "./components/modal-body";
import { ModalHeader } from "./components/modal-header";
import { useFocusTrap } from "./hooks/use-focus-trap";
import { useModalAnimation } from "./hooks/use-modal-animation";
import type { ModalAnimationType, ModalProps } from "./types/modal.types";
import styles from "./styles/modal.module.scss";
import { IconCross } from "./assets/icons";

const getAnimClass = (
  animation: ModalAnimationType,
  isOpen: boolean
): string => {
  const dir = isOpen ? "Show" : "Hide";
  const name = animation.charAt(0).toUpperCase() + animation.slice(1);
  return styles[`animate${name}${dir}`] ?? "";
};

const getSizeClass = (size?: string): string => {
  if (!size) return "";
  const name = size.charAt(0).toUpperCase() + size.slice(1);
  return styles[`size${name}`] ?? "";
};

export const Modal = (props: ModalProps) => {
  const {
    title,
    isOpen,
    children,
    subTitle,
    style = {},
    className = {},
    loading = false,
    type = "default",
    size,
    alertType = "info",
    zIndex = DEFAULT_MODAL_Z_INDEX,
    animation = "zoom",
    onCancel: handleCancel,
  } = props;

  const titleId = useId();
  const descId = useId();
  const containerRef = useFocusTrap(isOpen);
  const { isMounted, handleAnimationEnd } = useModalAnimation(isOpen);
  const modalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal-root")
      : null;
  const originalOverflowRef = useRef<string>("");

  useEffect(() => {
    if (!isOpen) return;
    originalOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflowRef.current;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleCancel]);

  if (!modalRoot) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Modal]: 'modal-root' element was not found in the DOM.");
    }
    return null;
  }

  if (!isMounted) return null;

  const isFullscreen = type === "fullscreen";
  const isAlert = type === "alert";

  return ReactDOM.createPortal(
    <div
      className={classnames(styles.container, className.container)}
      style={{ zIndex, ...style.container }}
      onClick={handleCancel}
    >
      {!isFullscreen && (
        <div
          aria-hidden="true"
          style={style.overlay}
          className={classnames(
            styles.overlay,
            {
              [styles.overlayShow]: isOpen,
              [styles.overlayHide]: !isOpen,
            },
            className.overlay
          )}
        />
      )}
      <div
        ref={containerRef}
        role={isAlert ? "alertdialog" : "dialog"}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subTitle ? descId : undefined}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
        style={style.content}
        className={classnames(
          styles.content,
          {
            [styles.fullscreen]: isFullscreen,
            [styles.defaultModal]: !isFullscreen,
          },
          !isFullscreen && getSizeClass(size),
          getAnimClass(animation, isOpen),
          className.content
        )}
      >
        <button
          type="button"
          aria-label="Close Modal"
          onClick={handleCancel}
          className={classnames(styles.closeButton, className.closeButton)}
        >
          <IconCross aria-hidden="true" focusable="false" />
        </button>
        <ModalHeader
          titleId={titleId}
          descId={descId}
          title={title}
          subTitle={subTitle}
          type={type}
          className={{
            header: className.header,
            title: className.title,
            subTitle: className.subTitle,
          }}
          style={{ header: style.header }}
        />
        <ModalAlertIcon alertType={alertType} type={type} />
        <ModalBody
          loading={loading}
          className={{ bodyContent: className.bodyContent }}
          style={{ bodyContent: style.bodyContent }}
          isFullscreen={isFullscreen}
        >
          {children}
        </ModalBody>
      </div>
    </div>,
    modalRoot
  );
};
