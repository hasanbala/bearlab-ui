import classnames from "classnames";
import { IconChevronDown } from "../assets/icons";
import { TreeCheckbox } from "./tree-checkbox";
import { TreeOptionProps } from "../types/tree-select.types";
import { highlightLabelHtml, isLeaf } from "../utils/tree-select-utils";
import { INDENT_PX } from "../constants/tree-select-config";
import styles from "../styles/tree-select.module.scss";

export const TreeOption = (props: TreeOptionProps) => {
  const {
    node,
    depth,
    treeId,
    mode,
    showIcon,
    showLine,
    disabled: treeDisabled,
    query,
    highlightMatch = true,
    activeValue,
    matchedValues,
    selectedValues,
    checkedValues,
    indeterminateValues,
    expandedValues,
    style,
    className,
    onToggleExpand,
    onSelect,
  } = props;

  const isMultiple = mode === "multiple";
  const leaf = isLeaf(node);
  const disabled = treeDisabled || node.disabled;
  const expanded = !leaf && expandedValues.has(node.value);
  const isActive = activeValue === node.value;
  const isSelected = selectedValues.has(node.value);
  const isChecked = checkedValues.has(node.value);
  const isIndeterminate = indeterminateValues.has(node.value);
  const optionId = `${treeId}-node-${node.value}`;

  const renderLabel = () => {
    if (highlightMatch && query.trim() && matchedValues.has(node.value)) {
      return (
        <span
          className={styles.labelTitle}
          dangerouslySetInnerHTML={{
            __html: highlightLabelHtml(node.label, query),
          }}
        />
      );
    }
    return <span className={styles.labelTitle}>{node.label}</span>;
  };

  const handleRowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onSelect(node);
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (leaf) return;
    onToggleExpand(node);
  };

  return (
    <>
      <div
        id={optionId}
        role="treeitem"
        tabIndex={-1}
        data-value={node.value}
        aria-level={depth + 1}
        aria-disabled={disabled || undefined}
        aria-expanded={leaf ? undefined : expanded}
        aria-selected={!isMultiple ? isSelected : undefined}
        aria-checked={
          isMultiple ? (isIndeterminate ? "mixed" : isChecked) : undefined
        }
        style={{ ...style?.option, paddingLeft: depth * INDENT_PX }}
        className={classnames(
          styles.optionContainer,
          {
            [styles.optionSelected]: !isMultiple && isSelected,
            [styles.activeOption]: isActive,
            [styles.disabledOption]: disabled,
            [styles.optionLine]: showLine,
          },
          className?.option
        )}
        onClick={handleRowClick}
      >
        <span
          className={classnames(styles.expandIcon, className?.expandIcon, {
            [styles.expandIconOpen]: expanded,
            [styles.expandIconLeaf]: leaf,
          })}
          style={style?.expandIcon}
          onClick={handleChevronClick}
        >
          {!leaf && <IconChevronDown />}
        </span>

        <div className={styles.labelContainer}>
          {isMultiple && (
            <TreeCheckbox
              checked={isChecked}
              indeterminate={isIndeterminate}
              disabled={disabled}
              className={className?.checkbox}
              style={style?.checkbox}
            />
          )}
          {showIcon && node.icon && (
            <span className={styles.optionIcon} aria-hidden="true">
              {node.icon}
            </span>
          )}
          {renderLabel()}
        </div>
      </div>

      {!leaf && expanded && (
        <div
          className={classnames(styles.childrenWrapper, {
            [styles.childrenLine]: showLine,
          })}
        >
          {node.children!.map((child) => (
            <TreeOption
              {...props}
              key={child.value}
              node={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </>
  );
};
