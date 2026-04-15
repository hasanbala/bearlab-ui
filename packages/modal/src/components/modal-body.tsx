import classnames from "classnames";
import { Loading } from "@bearlab/loading";
import type { ModalBodyProps } from "../types/modal.types";
import styles from "../styles/modal.module.scss";

export const ModalBody = ({
  children,
  style = {},
  className = {},
  loading = false,
}: ModalBodyProps) => {
  if (loading) {
    return (
      <div
        aria-live="polite"
        aria-busy="true"
        className={styles.loadingWrapper}
      >
        <Loading className={{ root: styles.loading }} />
      </div>
    );
  }

  return (
    <div
      className={classnames(styles.bodyContent, className.bodyContent)}
      style={style.bodyContent}
    >
      {children}
    </div>
  );
};
