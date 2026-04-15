import { useSyncExternalStore } from "react";
import type { GlobalModalConfig, ModalStoreState } from "../types/modal.types";

type Listener = () => void;

const createModalStore = () => {
  let state: ModalStoreState = { isOpen: false, config: null };
  const listeners = new Set<Listener>();

  const setState = (partial: Partial<ModalStoreState>) => {
    state = { ...state, ...partial };
    listeners.forEach((l) => l());
  };

  return {
    open: (config: GlobalModalConfig) => setState({ isOpen: true, config }),
    close: () => setState({ isOpen: false }),
    getSnapshot: (): ModalStoreState => state,
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

export const modalStore = createModalStore();

const SERVER_SNAPSHOT: ModalStoreState = { isOpen: false, config: null };

export const useModalStore = () => {
  const state = useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getSnapshot,
    () => SERVER_SNAPSHOT
  );

  return {
    ...state,
    open: modalStore.open,
    close: modalStore.close,
  };
};
