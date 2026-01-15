import React from "react";
import classnames from "classnames";
import styles from "./loading.module.scss";
import { IconLoading } from "@bearlab/core";

export const Loading = (props: LoadingProps) => {
  const { className, style, icon: Icon } = props;

  const IconComponent = Icon || IconLoading;

  return (
    <div className={classnames(styles.container, className)} style={style}>
      <IconComponent className={styles.loading} />
    </div>
  );
};

export interface LoadingProps {
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ElementType;
}
