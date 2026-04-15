import { useId } from "react";
import classnames from "classnames";
import { IconEmpty } from "../assets/icons";
import styles from "../styles/view-card.module.scss";
import type { ViewCardProps } from "../types/view-card.types";

export const ViewCardEmpty = (props: ViewCardProps) => {
  const { title, description, className, style } = props;
  const titleId = useId();

  return (
    <div
      className={classnames(styles.containerWithEmptyCard, className?.root)}
      style={style?.root}
      role={title ? "region" : undefined}
      aria-labelledby={title ? titleId : undefined}
    >
      <div
        className={classnames(styles.content, className?.content)}
        style={style?.content}
      >
        {title && (
          <h3
            id={titleId}
            className={classnames(styles.title, className?.title)}
            style={style?.title}
          >
            {title}
          </h3>
        )}
        {description && (
          <p
            className={classnames(styles.description, className?.description)}
            style={style?.description}
          >
            {description}
          </p>
        )}
      </div>
      <div
        className={classnames(styles.icon, className?.icon)}
        style={style?.icon}
        aria-hidden="true"
      >
        <IconEmpty />
      </div>
    </div>
  );
};
