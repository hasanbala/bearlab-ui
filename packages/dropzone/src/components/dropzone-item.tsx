import classnames from "classnames";
import { Button } from "@bearlab/button";
import styles from "../styles/dropzone.module.scss";
import type { DropzoneItemProps } from "../types/dropzone.types";

export const DropzoneItem = (props: DropzoneItemProps) => {
  const { file, index, isLoading, onRemove, onOpen, className, style } = props;

  return (
    <li className={classnames(styles.item, className)} style={style}>
      <span
        className={styles.itemName}
        id={`dropzone-file-${index}`}
        title={file.name}
      >
        {file.name}
      </span>
      <div className={styles.itemActions}>
        <Button
          buttonType="justIcon"
          iconType={{ default: "arrow" }}
          onClick={() => onOpen(file)}
          disabled={isLoading}
          label={`Open ${file.name} in new tab`}
          aria-label={`Open ${file.name} in new tab`}
          aria-describedby={`dropzone-file-${index}`}
        />
        <Button
          buttonType="justIcon"
          iconType={{ default: "delete" }}
          onClick={() => onRemove(file.name)}
          disabled={isLoading}
          label={`Remove ${file.name}`}
          aria-label={`Remove ${file.name}`}
          aria-describedby={`dropzone-file-${index}`}
        />
      </div>
    </li>
  );
};
