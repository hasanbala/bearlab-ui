import { FeatureList } from "./feature-list";
import { Button } from "@bearlab/button";
import classnames from "classnames";
import styles from "../styles/pricing.module.scss";
import { TypeTwoPackProps } from "../types/pricing.types";

export const TypeTwoPack = (props: TypeTwoPackProps) => {
  const {
    pack,
    style,
    isActive,
    className,
    checkIcon,
    closeIcon,
    cardDescId,
    setActivePack,
    handleCardKeyDown,
  } = props;

  const PackIcon = pack.packIcon;

  return (
    <article
      key={pack.id}
      role="listitem"
      aria-selected={isActive}
      aria-label={`${pack.packTitle} plan`}
      tabIndex={0}
      onClick={() => setActivePack(pack.id)}
      onKeyDown={(e) => handleCardKeyDown(e, pack.id)}
      className={classnames(
        styles.card,
        styles.cardTwo,
        isActive && styles.cardTwoActive,
        className.card,
        isActive && className.cardActive
      )}
      style={isActive ? { ...style.card, ...style.cardActive } : style.card}
    >
      <header className={styles.cardTwoHeader}>
        <span className={classnames(styles.packTitle, styles.packTitleTwo)}>
          {pack.packTitle}
        </span>
        <span aria-hidden="true" className={styles.packIconWrapper}>
          <PackIcon aria-hidden={true} />
        </span>
      </header>
      <div className={styles.priceGroup}>
        <strong
          className={classnames(styles.price, styles.priceTwo, className.price)}
          aria-label={`Price: ${pack.price} ${pack.priceTag}`}
        >
          {pack.price}
        </strong>
        <span
          aria-hidden="true"
          className={classnames(styles.pricePeriod, styles.pricePeriodTwo)}
        >
          / {pack.priceTag}
        </span>
      </div>
      <p id={cardDescId} className={styles.packDescription}>
        {pack.packDescription}
      </p>
      <div
        role="separator"
        aria-hidden="true"
        className={classnames(
          styles.divider,
          isActive && styles.dividerActive,
          className.divider
        )}
      />
      <ul
        role="list"
        aria-label="Plan features"
        aria-describedby={cardDescId}
        className={classnames(styles.featureList, className.featureList)}
      >
        {pack.features.map((feature, index) => (
          <FeatureList
            key={index}
            isActive={isActive}
            checkIcon={checkIcon}
            closeIcon={closeIcon}
            className={className}
            value={feature.value}
            label={feature.label}
          />
        ))}
      </ul>
      <Button
        buttonType={"justText"}
        label={pack.buttonLabel}
        aria-label={`${pack.buttonLabel} — ${pack.packTitle}`}
        className={{
          root: classnames(
            styles.button,
            styles.buttonTwo,
            isActive && styles.buttonTwoActive,
            className.button,
            isActive && className.buttonActive
          ),
        }}
        style={{
          root: isActive
            ? { ...style.button, ...style.buttonActive }
            : style.button,
        }}
      />
    </article>
  );
};
