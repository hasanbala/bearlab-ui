import { modalStore, useModalStore } from "./store/modal.store";
import { Modal } from "./modal";
import { ModalFooter } from "./components/modal-footer";
import { useModalRootElement } from "./hooks/use-modal-root";

export const ModalRoot = () => {
  const { isOpen, config } = useModalStore();
  const { mountNode } = useModalRootElement();

  if (!config || !mountNode) return null;

  const handleCancel = () => {
    config.onCancel?.();
    modalStore.close();
  };

  const handleConfirm = config.onConfirm
    ? () => {
        config.onConfirm!();
        modalStore.close();
      }
    : undefined;

  return (
    <Modal
      isOpen={isOpen}
      onCancel={handleCancel}
      title={config.title}
      subTitle={config.subTitle}
      type={config.type}
      alertType={config.alertType}
      animation={config.animation}
      zIndex={config.zIndex}
      className={config.className}
      style={config.style}
    >
      {config.content}
      <ModalFooter
        type={config.type}
        alertType={config.alertType}
        confirmLabel={config.confirmLabel}
        cancelLabel={config.cancelLabel}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Modal>
  );
};
