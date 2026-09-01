import { useEffect, useRef } from "react";
import classnames from "classnames";
import { IconBan, IconLoaderCircle } from "../assets/icons";
import { TreeOption } from "./tree-option";
import { TreeOptionsProps } from "../types/tree-select.types";
import styles from "../styles/tree-select.module.scss";

export const TreeOptions = (props: TreeOptionsProps) => {
  const {
    treeId,
    query,
    mode,
    treeData,
    listboxId,
    disabled,
    isLoading,
    showIcon,
    showLine,
    emptyText,
    notFoundText,
    activeValue,
    style,
    className,
    highlightMatch,
    matchedValues,
    selectedValues,
    checkedValues,
    indeterminateValues,
    expandedValues,
    onToggleExpand,
    onSelect,
  } = props;

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeValue === undefined) return;
    const activeEl = listRef.current?.querySelector(
      `[data-value="${CSS.escape(String(activeValue))}"]`
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeValue]);

  const hasOptions = treeData.length > 0;
  const loading = isLoading || false;
  const hasQuery = query.trim().length > 0;

  const renderContent = () => {
    if (loading) {
      return (
        <div
          className={styles.centeredState}
          role="status"
          aria-live="polite"
          aria-label="Loading options"
        >
          <IconLoaderCircle className={styles.loadingIcon} aria-hidden="true" />
        </div>
      );
    }

    if (!hasOptions) {
      const message = hasQuery ? notFoundText : emptyText;
      return (
        <div className={styles.centeredState} role="status" aria-live="polite">
          {message && <span>{message}</span>}
          <IconBan aria-hidden="true" />
        </div>
      );
    }

    return treeData.map((node) => (
      <TreeOption
        key={node.value}
        node={node}
        depth={0}
        treeId={treeId}
        mode={mode}
        query={query}
        disabled={disabled}
        showIcon={showIcon}
        showLine={showLine}
        style={style}
        className={className}
        highlightMatch={highlightMatch}
        activeValue={activeValue}
        matchedValues={matchedValues}
        selectedValues={selectedValues}
        checkedValues={checkedValues}
        indeterminateValues={indeterminateValues}
        expandedValues={expandedValues}
        onToggleExpand={onToggleExpand}
        onSelect={onSelect}
      />
    ));
  };

  return (
    <div
      ref={listRef}
      role="tree"
      id={listboxId}
      aria-label="Options"
      style={style?.options}
      aria-disabled={disabled}
      aria-multiselectable={mode === "multiple"}
      className={classnames(
        styles.optionsContainer,
        {
          [styles.centeredOptions]: !hasOptions || loading,
        },
        className?.options
      )}
    >
      {renderContent()}
    </div>
  );
};
