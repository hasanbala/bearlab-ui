import classnames from "classnames";
import styles from "../styles/tree.module.scss";
import { TreeSearchProps } from "../types/tree.types";

export const TreeSearch = (props: TreeSearchProps) => {
  const { query, placeholder, disabled, style, className, setQuery } = props;

  return (
    <div
      className={classnames(styles.searchWrapper, className?.search)}
      style={style?.search}
    >
      <input
        type="text"
        role="searchbox"
        autoComplete="off"
        value={query}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={placeholder}
        className={styles.searchInput}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
