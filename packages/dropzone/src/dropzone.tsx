import classnames from "classnames";
import { IconUpload } from "./assets/icons";
import { DropzoneList } from "./components/dropzone-list";
import { useDropzone } from "./hooks/use-dropzone";
import styles from "./styles/dropzone.module.scss";
import type { DropzoneProps } from "./types/dropzone.types";

export const Dropzone = (props: DropzoneProps) => {
  const {
    className,
    style,
    isLoading = false,
    multiple = false,
    accept = "application/pdf",
    files,
    setFiles,
    title = "Drag & Drop Files Here",
    subTitle = "Drag and drop the file here or click to upload",
    browseText = "Browse File",
    "aria-label": ariaLabel = "File upload area",
  } = props;

  const {
    isDragging,
    inputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
    handleKeyDown,
    handleRemoveFile,
  } = useDropzone({ isLoading, files, setFiles });

  return (
    <div
      className={classnames(styles.container, className?.root)}
      style={style?.root}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className={classnames(styles.content, className?.content)}
        style={style?.content}
        role="button"
        tabIndex={isLoading ? -1 : 0}
        aria-disabled={isLoading}
        aria-busy={isLoading}
        data-dragging={isDragging || undefined}
        data-disabled={isLoading || undefined}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        onClick={() => !isLoading && inputRef.current?.click()}
      >
        <div
          className={classnames(styles.icon, className?.icon)}
          style={style?.icon}
          aria-hidden="true"
        >
          <IconUpload />
        </div>

        <div className={styles.description}>
          <p
            className={classnames(styles.title, className?.title)}
            style={style?.title}
          >
            {title}
          </p>

          <p
            className={classnames(styles.subtitle, className?.subtitle)}
            style={style?.subtitle}
          >
            {subTitle}
          </p>

          <span
            className={classnames(styles.browse, className?.browse)}
            style={style?.browse}
            aria-hidden="true"
          >
            {browseText}
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={isLoading}
          onChange={handleInputChange}
          aria-hidden="true"
          tabIndex={-1}
          className={classnames(styles.input, className?.input)}
          style={style?.input}
        />
      </div>
      <DropzoneList
        files={files}
        isLoading={isLoading}
        onRemoveFile={handleRemoveFile}
        style={style}
        className={className}
      />
    </div>
  );
};
