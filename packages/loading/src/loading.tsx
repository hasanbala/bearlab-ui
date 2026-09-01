import classnames from "classnames";
import { DEFAULT_LOADING_TYPE, ICON_MAP } from "./constants/loading-config";
import type { LoadingProps } from "./types/loading.types";
import styles from "./styles/loading.module.scss";

export const Loading = (props: LoadingProps) => {
  const { className, style, icon: Icon, type = DEFAULT_LOADING_TYPE } = props;

  const IconComponent =
    Icon ?? ICON_MAP[type] ?? ICON_MAP[DEFAULT_LOADING_TYPE];

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
