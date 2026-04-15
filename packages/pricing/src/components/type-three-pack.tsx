import { TypeThreePackProps } from "../types/pricing.types";
import classnames from "classnames";
import styles from "../styles/pricing.module.scss";
import { Button } from "@bearlab/button";
import { FeatureList } from "../components/feature-list";

export const TypeThreePack = (props: TypeThreePackProps) => {
  const {
    pack,
    style,
    isActive,
    className,
    checkIcon,
    closeIcon,
    cardDescId,
    recommendedLabel,
    setActivePack,
    handleCardKeyDown,
  } = props;

  return (
    <article
      key={pack.id}
      role="listitem"
      aria-selected={isActive}
      aria-label={`${pack.packTitle} plan${pack.isRecommended ? ", recommended" : ""}`}
      tabIndex={0}
      onClick={() => setActivePack(pack.id)}
      onKeyDown={(e) => handleCardKeyDown(e, pack.id)}
      className={classnames(
        styles.card,
        styles.cardThree,
        isActive && styles.cardThreeActive,
        className.card,
        isActive && className.cardActive
      )}
      style={isActive ? { ...style.card, ...style.cardActive } : style.card}
    >
      {pack.isRecommended && (
        <span
          aria-label={recommendedLabel}
          className={classnames(styles.badge, className.badge)}
          style={style.badge}
        >
          {recommendedLabel}
        </span>
      )}
      <span
        className={classnames(
          styles.packTitle,
          isActive && styles.packTitleThreeActive
        )}
      >
        {pack.packTitle}
      </span>
      <p
        id={cardDescId}
        className={classnames(
          styles.packDescription,
          styles.packDescriptionThree,
          isActive && styles.packDescriptionThreeActive
        )}
      >
        {pack.packDescription}
      </p>
      <strong
        className={classnames(
          styles.price,
          styles.priceThree,
          isActive && styles.priceThreeActive,
          className.price
        )}
        aria-label={`Price: ${pack.price}`}
      >
        {pack.price}
      </strong>
      <span
        className={classnames(
          styles.pricePeriod,
          styles.pricePeriodThree,
          isActive && styles.pricePeriodThreeActive
        )}
      >
        {pack.priceTag}
      </span>
      <Button
        buttonType={"justText"}
        label={pack.buttonLabel}
        aria-label={`${pack.buttonLabel} — ${pack.packTitle}`}
        className={{
          root: classnames(
            styles.button,
            styles.buttonThree,
            isActive && styles.buttonThreeActive,
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
    </article>
  );
};
