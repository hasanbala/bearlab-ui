import { useState, useRef, useCallback } from "react";
import type { UseDropzone, UseDropzoneReturn } from "../types/dropzone.types";

export const useDropzone = ({
  isLoading,
  files,
  setFiles,
}: UseDropzone): UseDropzoneReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isLoading) setIsDragging(true);
    },
    [isLoading]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (isLoading) return;
      setIsDragging(false);
      const dropped = e.dataTransfer.files;
      if (dropped?.length) setFiles(dropped);
    },
    [isLoading, setFiles]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLoading) return;
      const selected = e.target.files;
      if (selected?.length) setFiles(selected);
      e.target.value = "";
    },
    [isLoading, setFiles]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isLoading) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [isLoading]
  );

  const handleRemoveFile = useCallback(
    (name: string) => {
      if (isLoading) return;
      const filtered = Array.from(files ?? []).filter(
        (file) => file.name !== name
      );
      setFiles(filtered.length > 0 ? filtered : null);
    },
    [isLoading, files, setFiles]
  );

  return {
    isDragging,
    inputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
    handleKeyDown,
    handleRemoveFile,
  };
};
