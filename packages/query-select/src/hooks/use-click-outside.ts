import { useEffect, useRef } from "react";

export const useClickOutside = (
  onClose: () => void,
  selectionLayout: "card" | "inline",
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>,
  ignoreRef?: React.RefObject<HTMLElement | null>
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideContainer = containerRef.current?.contains(target);
      const insidePortal = ignoreRef?.current?.contains(target);
      if (!insideContainer && !insidePortal) onClose();
    };
    document.addEventListener("mousedown", handleMouseDown, true);
    return () =>
      document.removeEventListener("mousedown", handleMouseDown, true);
  }, [onClose, ignoreRef]);

  useEffect(() => {
    if (!containerRef.current || selectionLayout === "card") return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [selectionLayout, setContainerWidth]);

  return { containerRef };
};
