import classnames from "classnames";
import { IconChevronDown } from "../assets/icons";
import { TreeCheckbox } from "./tree-checkbox";
import { TreeNodeProps } from "../types/tree.types";
import { highlightLabelHtml, isLeaf } from "../utils/tree-utils";
import { INDENT_PX } from "../constants/tree-config";
import styles from "../styles/tree.module.scss";

export const TreeNodeItem = (props: TreeNodeProps) => {
  const {
    node,
    depth,
    treeId,
    showIcon,
    showLine,
    checkable,
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
    onCheck,
  } = props;

  const leaf = isLeaf(node);
  const disabled = treeDisabled || node.disabled;
  const expanded = !leaf && expandedValues.has(node.value);
  const isActive = activeValue === node.value;
  const isSelected = selectedValues.has(node.value);
  const isChecked = checkedValues.has(node.value);
  const isIndeterminate = indeterminateValues.has(node.value);
  const nodeId = `${treeId}-node-${node.value}`;

  const renderLabel = () => {
    if (highlightMatch && query.trim() && matchedValues.has(node.value)) {
      return (
        <span
          className={classnames(styles.label, className?.label)}
          style={style?.label}
          dangerouslySetInnerHTML={{
            __html: highlightLabelHtml(node.label, query),
          }}
        />
      );
    }
    return (
      <span
        className={classnames(styles.label, className?.label)}
        style={style?.label}
      >
        {node.label}
      </span>
    );
  };

  const handleRowClick = () => {
    if (disabled) return;
    if (checkable) onCheck(node);
    else onSelect(node);
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (leaf) return;
    onToggleExpand(node);
  };

  return (
    <>
      <div
        id={nodeId}
        role="treeitem"
        tabIndex={-1}
        data-value={node.value}
        aria-level={depth + 1}
        aria-disabled={disabled || undefined}
        aria-expanded={leaf ? undefined : expanded}
        aria-selected={!checkable ? isSelected : undefined}
        aria-checked={
          checkable ? (isIndeterminate ? "mixed" : isChecked) : undefined
        }
        style={{ ...style?.node, paddingLeft: depth * INDENT_PX }}
        className={classnames(
          styles.node,
          {
            [styles.nodeSelected]: !checkable && isSelected,
            [styles.nodeActive]: isActive,
            [styles.nodeDisabled]: disabled,
            [styles.nodeLine]: showLine,
          },
          className?.node
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

        <div
          className={classnames(styles.nodeContent, className?.nodeContent)}
          style={style?.nodeContent}
        >
          {checkable && (
            <TreeCheckbox
              checked={isChecked}
              indeterminate={isIndeterminate}
              disabled={disabled}
              className={className?.checkbox}
              style={style?.checkbox}
            />
          )}
          {showIcon && node.icon && (
            <span className={styles.nodeIcon} aria-hidden="true">
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
            <TreeNodeItem
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
