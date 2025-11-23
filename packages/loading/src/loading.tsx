import classnames from "classnames";
import styles from "./loading.module.scss";
import { IconLoading } from "@bearlab/core";

export const Loading = (props: Props) => {
  const { className, style } = props;

  return (
    <div className={classnames(styles.container, className)} style={style}>
      <IconLoading className={styles.loading} />
    </div>
  );
};

export interface Props {
  className?: string;
  style?: React.CSSProperties;
}
