import { useEffect, useId, useRef } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import {
  DEFAULT_CLOSE_LABEL,
  DEFAULT_MODAL_Z_INDEX,
} from "./constants/modal-config";
import { ModalAlertIcon } from "./components/modal-alert-icon";
import { ModalBody } from "./components/modal-body";
import { ModalHeader } from "./components/modal-header";
import { useFocusTrap } from "./hooks/use-focus-trap";
import { useModalAnimation } from "./hooks/use-modal-animation";
import { useModalRootElement } from "./hooks/use-modal-root";
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
    closeLabel = DEFAULT_CLOSE_LABEL,
    closeOnEscape = true,
    closeOnOverlayClick = true,
    initialFocusRef,
    onCancel: handleCancel,
  } = props;

  const titleId = useId();
  const descId = useId();
  const { ref: containerRef, handleKeyDown: handleTrapKeyDown } = useFocusTrap(
    { isActive: isOpen, initialFocusRef }
  );
  const pointerInsideRef = useRef(false);
  const pressStartedOnOverlayRef = useRef(false);
  const { isMounted, handleAnimationEnd } = useModalAnimation(isOpen);
  const { mountNode: modalRoot } = useModalRootElement();
  const originalOverflowRef = useRef<string>("");

  useEffect(() => {
    if (!isOpen) return;
    originalOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflowRef.current;
    };
  }, [isOpen]);

  if (!modalRoot || !isMounted) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      if (!isOpen || !closeOnEscape) return;
      e.stopPropagation();
      handleCancel();
      return;
    }
    handleTrapKeyDown(e);
  };

  const handleContainerMouseDown = () => {
    pressStartedOnOverlayRef.current = !pointerInsideRef.current;
    pointerInsideRef.current = false;
  };

  const handleContainerClick = () => {
    const isOverlayClick =
      !pointerInsideRef.current && pressStartedOnOverlayRef.current;
    pointerInsideRef.current = false;
    pressStartedOnOverlayRef.current = false;
    if (isOverlayClick && closeOnOverlayClick && isOpen) handleCancel();
  };

  const markPointerInside = () => {
    pointerInsideRef.current = true;
  };

  const isFullscreen = type === "fullscreen";
  const isAlert = type === "alert";

  return ReactDOM.createPortal(
    <div
      className={classnames(styles.container, className.container)}
      style={{ zIndex, ...style.container }}
      onMouseDown={handleContainerMouseDown}
      onClick={handleContainerClick}
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
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onMouseDownCapture={markPointerInside}
        onClickCapture={markPointerInside}
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
          aria-label={closeLabel}
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
