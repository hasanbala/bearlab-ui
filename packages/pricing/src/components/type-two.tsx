import { TypeTwoProps } from "../types/pricing.types";
import { usePricing } from "../hooks/use-pricing";
import classnames from "classnames";
import styles from "../styles/pricing.module.scss";
import { TypeTwoPack } from "./type-two-pack";

export const TypeTwo = (props: TypeTwoProps) => {
  const { packs, checkIcon, closeIcon, className, style } = props;

  const { activePack, setActivePack, handleCardKeyDown } = usePricing({
    defaultActivePack: 1,
  });

  return (
    <div
      role="list"
      aria-label="Pricing plans"
      className={classnames(styles.grid, styles.gridTwo, className.grid)}
      style={{ ...style.root, ...style.grid }}
    >
      {packs.map((pack) => (
        <TypeTwoPack
          pack={pack}
          key={pack.id}
          style={style}
          className={className}
          checkIcon={checkIcon}
          closeIcon={closeIcon}
          isActive={activePack === pack.id}
          cardDescId={`card-two-desc-${pack.id}`}
          setActivePack={setActivePack}
          handleCardKeyDown={handleCardKeyDown}
        />
      ))}
    </div>
  );
};
