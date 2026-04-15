import classnames from "classnames";
import { DropzoneItem } from "./dropzone-item";
import styles from "../styles/dropzone.module.scss";
import type { DropzoneListProps } from "../types/dropzone.types";

export const DropzoneList = (props: DropzoneListProps) => {
  const { files, isLoading, className, style, onRemoveFile } = props;

  if (!files || files.length === 0) return null;

  const fileArray = Array.from(files);

  return (
    <ul
      className={classnames(styles.list, className?.list)}
      style={style?.list}
      aria-label={`Selected files (${fileArray.length})`}
      role="list"
    >
      {fileArray.map((file, index) => (
        <DropzoneItem
          key={`${file.name}-${index}`}
          file={file as File}
          index={index}
          isLoading={isLoading}
          onRemove={onRemoveFile}
          className={className?.item}
          style={style?.item}
        />
      ))}
    </ul>
  );
};
