import styles from "../styles/pricing.module.scss";
import classnames from "classnames";
import { TypeOnePackProps } from "../types/pricing.types";
import { FeatureList } from "../components/feature-list";
import { Button } from "@bearlab/button";

export const TypeOnePack = (props: TypeOnePackProps) => {
  const {
    pack,
    style,
    isActive,
    isMonthly,
    className,
    checkIcon,
    closeIcon,
    cardDescId,
    setActivePack,
    handleCardKeyDown,
  } = props;

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
        styles.cardOne,
        isActive && styles.cardActive,
        className.card,
        isActive && className.cardActive
      )}
      style={isActive ? { ...style.card, ...style.cardActive } : style.card}
    >
      <span
        className={classnames(
          styles.packTitle,
          isActive && styles.packTitleActive
        )}
      >
        {pack.packTitle}
      </span>
      <div className={styles.priceRow}>
        <div className={styles.priceGroup}>
          <strong
            className={classnames(
              styles.price,
              isActive && styles.priceActive,
              className.price
            )}
            aria-label={`Price: ${isMonthly ? pack.campaignPriceByMonthly : pack.campaignPriceByAnnually} per ${pack.priceTag}`}
          >
            {isMonthly
              ? pack.campaignPriceByMonthly
              : pack.campaignPriceByAnnually}
          </strong>
          <span
            aria-hidden="true"
            className={classnames(
              styles.pricePeriod,
              isActive && styles.pricePeriodActive
            )}
          >
            / {pack.priceTag}
          </span>
        </div>
        <span
          aria-label={`Original price: ${isMonthly ? pack.originalPriceByMonthly : pack.originalPriceByAnnually}`}
          className={classnames(
            styles.originalPrice,
            isActive && styles.originalPriceActive
          )}
        >
          {isMonthly
            ? pack.originalPriceByMonthly
            : pack.originalPriceByAnnually}
        </span>
      </div>
      <p
        id={cardDescId}
        className={classnames(
          styles.packDescription,
          isActive && styles.packDescriptionActive
        )}
      >
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
            isActive && styles.buttonActive,
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
