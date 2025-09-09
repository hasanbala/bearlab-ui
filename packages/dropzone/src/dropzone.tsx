import { useState } from "react";
import classnames from "classnames";
import { IconUpload } from "@bearlab/core";
import { Button, BUTTON_TYPE, ICON_TYPE } from "@bearlab/button";
import styles from "./dropzone.module.scss";

export const Dropzone = (props: Props) => {
  const { className, isLoading, multiple, accept, files, setFiles } = props;

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!isLoading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    if (!isLoading) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isLoading) {
      setIsDragging(false);
      const files = e.dataTransfer.files;
      setFiles(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isLoading) {
      const files = e.target.files;
      setFiles(files);
    }
  };

  const handleRemoveFile = (name: string) => {
    if (!isLoading) {
      const filteredFiles = Array.from(files as any).filter(
        (item: any) => item.name !== name
      ) as any;

      setFiles(filteredFiles);
    }
  };

  const renderContent = () => {
    if (files?.length) {
      return (
        <div className={styles.card}>
          {Array.from(files).map((file, index) => (
            <div className={styles.addedItem} key={index}>
              <div key={index}>{file.name}</div>
              <Button
                buttonType={BUTTON_TYPE.JUST_ICON}
                iconType={{ default: ICON_TYPE.DELETE }}
                onClick={() => handleRemoveFile(file.name)}
                label="Remove"
                disabled={isLoading}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={classnames(
          styles.content,
          isDragging && styles.dragging,
          isLoading && styles.disabled,
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={styles.icon}>
          <IconUpload />
        </div>
        <div className={styles.description}>
          <div className={styles.title}>Drag & Drop Files Here</div>
          <div className={styles.subTitle}>
            Drag and drop the file here or click to upload
          </div>
          <div className={styles.link}>Browse File</div>
        </div>
        <input
          type="file"
          multiple={multiple}
          disabled={isLoading}
          accept={accept ?? "application/pdf"}
          onChange={handleFileInputChange}
        />
      </div>
      {renderContent()}
    </div>
  );
};

export interface Props {
  className?: string;
  accept?: any;
  multiple?: boolean;
  isLoading?: boolean;
  files: FileList | null;
  setFiles: (_val: FileList | null) => void;
}
