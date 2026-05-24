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

  const mergeFiles = useCallback(
    (incoming: File[]): File[] => {
      const existing = Array.from(files ?? []);
      const deduplicated = incoming.filter(
        (f) =>
          !existing.some(
            (ef) =>
              ef.name === f.name &&
              ef.size === f.size &&
              ef.lastModified === f.lastModified
          )
      );
      return [...existing, ...deduplicated];
    },
    [files]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (isLoading) return;
      setIsDragging(false);
      const dropped = e.dataTransfer.files;
      if (dropped?.length) setFiles(mergeFiles(Array.from(dropped)));
    },
    [isLoading, setFiles, mergeFiles]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLoading) return;
      const selected = e.target.files;
      // Convert to Array before clearing the input to avoid live FileList reference being emptied
      if (selected?.length) setFiles(mergeFiles(Array.from(selected)));
      e.target.value = "";
    },
    [isLoading, setFiles, mergeFiles]
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

  const handleOpenFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }, []);

  return {
    isDragging,
    inputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
    handleKeyDown,
    handleRemoveFile,
    handleOpenFile,
  };
};
