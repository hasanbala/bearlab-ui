import classnames from "classnames";
import type { ModalHeaderProps } from "../types/modal.types";
import styles from "../styles/modal.module.scss";

export const ModalHeader = ({
  type,
  title,
  descId,
  titleId,
  subTitle,
  style = {},
  className = {},
}: ModalHeaderProps) => {
  const isAlert = type === "alert";

  return (
    <div
      className={classnames(
        styles.header,
        isAlert && styles.headerAlert,
        className.header
      )}
      style={style.header}
    >
      <h2 id={titleId} className={classnames(styles.title, className.title)}>
        {title}
      </h2>
      {subTitle && (
        <p
          id={descId}
          className={classnames(styles.subTitle, className.subTitle)}
        >
          {subTitle}
        </p>
      )}
    </div>
  );
};
