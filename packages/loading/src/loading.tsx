import classnames from "classnames";
import styles from "./loading.module.scss";
import { IconLoading } from "@bearlab/core";

export const Loading = (props: Props) => {
  const { className } = props;

  return (
    <div className={classnames(styles.container, className)}>
      <IconLoading className={styles.loading} />
    </div>
  );
};

interface Props {
  className?: string;
}
