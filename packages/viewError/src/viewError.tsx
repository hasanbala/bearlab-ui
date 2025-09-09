import classnames from "classnames";
import styles from "./viewError.module.scss";
import { IconError2 } from "@bearlab/core";

export const ViewError = (props: Props) => {
  const { className, label } = props;

  return (
    <div className={classnames(styles.container, className)}>
      <IconError2 />
      <span>{label}</span>
    </div>
  );
};
export interface Props {
  className?: string;
  label: string;
}
