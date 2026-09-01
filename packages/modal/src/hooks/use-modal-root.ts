import { useEffect, useState } from "react";
import { MODAL_ROOT_ID } from "../constants/modal-config";

let ownedRefCount = 0;

export const useModalRootElement = (): { mountNode: HTMLElement | null } => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let el = document.getElementById(MODAL_ROOT_ID);
    let isOwner = false;

    if (!el) {
      el = document.createElement("div");
      el.id = MODAL_ROOT_ID;
      document.body.appendChild(el);
      isOwner = true;
    }

    if (isOwner) ownedRefCount += 1;
    setMountNode(el);

    return () => {
      if (!isOwner) return;
      ownedRefCount -= 1;
      if (ownedRefCount === 0 && el?.isConnected && !el.firstChild) {
        el.remove();
      }
    };
  }, []);

  return { mountNode };
};
