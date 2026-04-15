import { BOTTOM_POSITIONS } from "../constants/growl-config";
import { PositionGroupProps } from "../types/growl.types";
import classnames from "classnames";
import { Toast } from "./toast";
import styles from "../styles/growl.module.scss";

const POSITION_CLASSES: Record<string, string> = {
  "top-right": styles.topRight,
  "top-left": styles.topLeft,
  "top-center": styles.topCenter,
  "bottom-right": styles.bottomRight,
  "bottom-left": styles.bottomLeft,
  "bottom-center": styles.bottomCenter,
};

export const PositionGroup = (props: PositionGroupProps) => {
  const { position, toasts, onRemove } = props;

  if (toasts.length === 0) return null;

  const isBottom = BOTTOM_POSITIONS.includes(position);

  return (
    <div
      className={classnames(styles.container, POSITION_CLASSES[position], {
        [styles.containerReverse]: isBottom,
      })}
    >
      {toasts.map((t) => (
        <Toast key={t.id} item={t} onRemove={onRemove} />
      ))}
    </div>
  );
};
