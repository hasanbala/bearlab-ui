import { useCallback, useRef, useState } from "react";
import {
  DRAG_THRESHOLD_PX,
  INTERACTIVE_SELECTOR,
} from "../constants/carousel-config";
import { UseDragProps, UseDragReturn } from "../types/carousel.types";

export const useDrag = ({
  onDragEnd,
  onDragStart,
  onDragMove,
  draggable = true,
}: UseDragProps): UseDragReturn => {
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isActiveRef = useRef(false);

  const reset = useCallback(() => {
    isActiveRef.current = false;
    hasDraggedRef.current = false;
    setIsDragging(false);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!draggable) return;
      if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) return;
      if (e.button !== 0) return;

      isActiveRef.current = true;
      hasDraggedRef.current = false;
      startXRef.current = e.clientX;
      startTimeRef.current = Date.now();

      if (e.target instanceof HTMLElement) {
        e.target.setPointerCapture(e.pointerId);
      }
    },
    [draggable]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggable || !isActiveRef.current) return;
      const delta = e.clientX - startXRef.current;

      if (!hasDraggedRef.current && Math.abs(delta) > DRAG_THRESHOLD_PX) {
        hasDraggedRef.current = true;
        setIsDragging(true);
        onDragStart?.();
      }

      if (hasDraggedRef.current) {
        e.preventDefault();
        onDragMove?.(delta);
      }
    },
    [draggable, onDragStart, onDragMove]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!draggable || !isActiveRef.current) return;
      isActiveRef.current = false;

      const delta = e.clientX - startXRef.current;
      const elapsed = Date.now() - startTimeRef.current;
      const velocity = elapsed > 0 ? Math.abs(delta) / elapsed : 0;

      setIsDragging(false);

      if (hasDraggedRef.current) {
        onDragEnd(delta, velocity);
      }
    },
    [draggable, onDragEnd]
  );

  const onPointerCancel = useCallback(() => {
    if (!draggable) return;
    reset();
  }, [draggable, reset]);

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDraggedRef.current = false;
    }
  }, []);

  return {
    isDragging,
    handlers: {
      onPointerUp,
      onPointerDown,
      onPointerMove,
      onClickCapture,
      onPointerCancel,
    },
  };
};
