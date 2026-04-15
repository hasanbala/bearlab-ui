import { FeatureListProps } from "../types/pricing.types";
import classnames from "classnames";
import styles from "../styles/pricing.module.scss";

export const FeatureList = (props: FeatureListProps) => {
  const { value, label, isActive, checkIcon, closeIcon, className } = props;

  return (
    <li
      role="listitem"
      className={classnames(
        styles.featureItem,
        isActive && styles.featureItemActive,
        value ? styles.included : styles.excluded,
        className.featureItem
      )}
    >
      <span
        aria-label={value ? "Included" : "Not included"}
        className={styles.featureIcon}
      >
        {value ? checkIcon : closeIcon}
      </span>
      <span>{label}</span>
    </li>
  );
};
