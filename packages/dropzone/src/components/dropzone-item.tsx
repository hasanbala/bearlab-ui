import classnames from "classnames";
import { Button } from "@bearlab/button";
import styles from "../styles/dropzone.module.scss";
import type { DropzoneItemProps } from "../types/dropzone.types";

export const DropzoneItem = (props: DropzoneItemProps) => {
  const { file, index, isLoading, onRemove, className, style } = props;

  return (
    <li className={classnames(styles.item, className)} style={style}>
      <span
        className={styles.itemName}
        id={`dropzone-file-${index}`}
        title={file.name}
      >
        {file.name}
      </span>
      <Button
        buttonType="justIcon"
        iconType={{ default: "delete" }}
        onClick={() => onRemove(file.name)}
        disabled={isLoading}
        label={`Remove ${file.name}`}
        aria-label={`Remove ${file.name}`}
        aria-describedby={`dropzone-file-${index}`}
      />
    </li>
  );
};
