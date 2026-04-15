import classnames from "classnames";
import { IconLoading } from "./assets/icons";
import type { LoadingProps } from "./types/loading.types";
import styles from "./styles/loading.module.scss";

export const Loading = (props: LoadingProps) => {
  const { className, style, icon: Icon } = props;

  const IconComponent = Icon ?? IconLoading;

  return (
    <div
      role="status"
      aria-live="polite"
      style={style?.root}
      className={classnames(styles.container, className?.root)}
    >
      <IconComponent
        style={style?.root}
        aria-hidden="true"
        focusable="false"
        className={classnames(styles.loading, className?.icon)}
      />
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
};
