import { useState, useCallback, useEffect, useRef } from "react";
import { GrowlContainerProps, GrowlItem } from "./types/growl.types";
import {
  ALL_POSITIONS,
  DEFAULT_CLOSE_LABEL,
  DEFAULT_POSITION,
  TITLES,
} from "./constants/growl-config";
import { setAddGrowl } from "./utils/growl-utils";
import { PositionGroup } from "./components/position-group";

export const GrowlContainer = (props: GrowlContainerProps) => {
  const { labels } = props;
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

  const text = { ...TITLES, close: DEFAULT_CLOSE_LABEL, ...labels };

  return (
    <>
      {ALL_POSITIONS.map((position) => (
        <PositionGroup
          key={position}
          position={position}
          labels={text}
          onRemove={removeToast}
          toasts={toasts.filter(
            (t) => (t.position ?? DEFAULT_POSITION) === position
          )}
        />
      ))}
    </>
  );
};
