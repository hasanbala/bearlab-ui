import { useEffect, useRef, useState } from "react";
import { MODAL_ROOT_ID } from "../constants/modal-config";

export const useModalRootElement = (): { mountNode: HTMLElement | null } => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const isOwner = useRef(false);

  useEffect(() => {
    let el = document.getElementById(MODAL_ROOT_ID);

    if (!el) {
      el = document.createElement("div");
      el.id = MODAL_ROOT_ID;
      document.body.appendChild(el);
      isOwner.current = true;
    }

    setMountNode(el);

    return () => {
      if (isOwner.current && el?.isConnected) {
        document.body.removeChild(el);
      }
    };
  }, []);

  return { mountNode };
};
