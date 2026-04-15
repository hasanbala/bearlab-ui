import { useState } from "react";
import { UseModalReturn } from "../types/modal.types";

export const useModal = (initialState = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  return { isOpen, openModal, closeModal, toggleModal };
};
