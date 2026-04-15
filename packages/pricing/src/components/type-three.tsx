import { TypeThreeProps } from "../types/pricing.types";
import { usePricing } from "../hooks/use-pricing";
import classnames from "classnames";
import { TypeThreePack } from "./type-three-pack";
import styles from "../styles/pricing.module.scss";

export const TypeThree = (props: TypeThreeProps) => {
  const { packs, recommendedLabel, checkIcon, className, style, closeIcon } =
    props;

  const { activePack, setActivePack, handleCardKeyDown } = usePricing({
    defaultActivePack: 2,
  });

  return (
    <div
      role="list"
      aria-label="Pricing plans"
      className={classnames(styles.grid, styles.gridThree, className.grid)}
      style={{ ...style.root, ...style.grid }}
    >
      {packs.map((pack) => (
        <TypeThreePack
          key={pack.id}
          pack={pack}
          style={style}
          className={className}
          checkIcon={checkIcon}
          closeIcon={closeIcon}
          isActive={activePack === pack.id}
          recommendedLabel={recommendedLabel}
          cardDescId={`card-three-desc-${pack.id}`}
          setActivePack={setActivePack}
          handleCardKeyDown={handleCardKeyDown}
        />
      ))}
    </div>
  );
};
