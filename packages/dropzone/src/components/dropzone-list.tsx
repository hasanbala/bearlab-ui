import classnames from "classnames";
import { DropzoneItem } from "./dropzone-item";
import styles from "../styles/dropzone.module.scss";
import type { DropzoneListProps } from "../types/dropzone.types";

export const DropzoneList = (props: DropzoneListProps) => {
  const { files, isLoading, className, style, onRemoveFile, onOpenFile } =
    props;

  if (!files || files.length === 0) return null;

  const fileArray = Array.from(files);
  const count = fileArray.length;

  return (
    <div className={styles.listCard}>
      <div className={styles.listHeader}>
        <span>Uploaded Files</span>
        <span>
          {count} {count === 1 ? "file" : "files"}
        </span>
      </div>
      <div className={styles.listScroll}>
        <ul
          className={classnames(styles.list, className?.list)}
          style={style?.list}
          aria-label={`Selected files (${count})`}
          role="list"
        >
          {fileArray.map((file, index) => (
            <DropzoneItem
              key={`${file.name}-${index}`}
              file={file as File}
              index={index}
              isLoading={isLoading}
              onRemove={onRemoveFile}
              onOpen={onOpenFile}
              className={className?.item}
              style={style?.item}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
