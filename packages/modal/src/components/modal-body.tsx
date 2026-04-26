import classnames from "classnames";
import type { ModalBodyProps } from "../types/modal.types";
import styles from "../styles/modal.module.scss";
import { ModalSkeleton } from "./modal-skeleton";

export const ModalBody = (props: ModalBodyProps) => {
  const {
    children,
    style = {},
    className = {},
    loading = false,
    isFullscreen,
  } = props;

  if (loading) return <ModalSkeleton lines={isFullscreen ? 12 : 4} />;

  return (
    <div
      className={classnames(styles.bodyContent, className.bodyContent)}
      style={style.bodyContent}
    >
      {children}
    </div>
  );
};
