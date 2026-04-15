import { useState, useCallback, useEffect, useRef } from "react";
import { GrowlItem } from "./types/growl.types";
import { ALL_POSITIONS, DEFAULT_POSITION } from "./constants/growl-config";
import { setAddGrowl } from "./utils/growl-utils";
import { PositionGroup } from "./components/position-group";

export const GrowlContainer = () => {
  const [toasts, setToasts] = useState<GrowlItem[]>([]);
  const counterRef = useRef(0);

  const addToast = useCallback((item: Omit<GrowlItem, "id">) => {
    setToasts((prev) => [...prev, { ...item, id: ++counterRef.current }]);
  }, []);

  useEffect(() => {
    setAddGrowl(addToast);
    return () => setAddGrowl(null);
  }, [addToast]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <>
      {ALL_POSITIONS.map((position) => (
        <PositionGroup
          key={position}
          position={position}
          onRemove={removeToast}
          toasts={toasts.filter(
            (t) => (t.position ?? DEFAULT_POSITION) === position
          )}
        />
      ))}
    </>
  );
};
