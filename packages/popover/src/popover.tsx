import classnames from "classnames";
import styles from "./popover.module.scss";

export const Popover = (props: Props) => {
  const { className, label } = props;

  return <div className={classnames(styles.container, className)}>{label}</div>;
};

interface Props {
  className?: string;
  label: string | number;
}
