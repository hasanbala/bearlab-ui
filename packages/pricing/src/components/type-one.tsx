import { useId, useState } from "react";
import { Billing, TypeOneProps } from "../types/pricing.types";
import { usePricing } from "../hooks/use-pricing";
import classnames from "classnames";
import { TypeOnePack } from "./type-one-pack";
import styles from "../styles/pricing.module.scss";

export const TypeOne = (props: TypeOneProps) => {
  const {
    packs,
    heading,
    switchLabels,
    checkIcon,
    closeIcon,
    className,
    style,
  } = props;

  const { activePack, setActivePack, handleCardKeyDown } = usePricing({
    defaultActivePack: 1,
  });

  const switchGroupId = useId();
  const monthlyBtnId = useId();
  const annuallyBtnId = useId();
  const headingId = useId();
  const [billing, setBilling] = useState<Billing>();
  const isMonthly = billing === "monthly";

  const toggleBilling = (value: Billing): void => setBilling(value);

  return (
    <section
      aria-labelledby={headingId}
      className={classnames(styles.container, className.root)}
      style={style.root}
    >
      <header
        className={classnames(styles.header, className.header)}
        style={style.header}
      >
        <h2
          id={headingId}
          className={classnames(styles.title, className.title)}
          style={style.title}
        >
          {heading}
        </h2>
      </header>
      <div
        id={switchGroupId}
        role="group"
        aria-label="Billing cycle"
        className={classnames(styles.switchContainer, className.switchWrapper)}
        style={style.switchWrapper}
      >
        <div className={styles.switchWrapper}>
          <span
            aria-hidden="true"
            className={classnames(
              styles.switchIndicator,
              !isMonthly && styles.translateRight
            )}
          />
          <button
            id={monthlyBtnId}
            role="radio"
            aria-checked={isMonthly}
            onClick={() => toggleBilling("monthly")}
            className={classnames(
              styles.switchButton,
              isMonthly && styles.switchButtonActive
            )}
          >
            {switchLabels.monthly}
          </button>
          <button
            id={annuallyBtnId}
            role="radio"
            aria-checked={!isMonthly}
            onClick={() => toggleBilling("annually")}
            className={classnames(
              styles.switchButton,
              !isMonthly && styles.switchButtonActive
            )}
          >
            {switchLabels.annually}
          </button>
        </div>
      </div>
      <div
        role="list"
        aria-label="Pricing plans"
        className={classnames(styles.grid, className.grid)}
        style={style.grid}
      >
        {packs.map((pack) => (
          <TypeOnePack
            pack={pack}
            key={pack.id}
            style={style}
            className={className}
            checkIcon={checkIcon}
            closeIcon={closeIcon}
            isMonthly={isMonthly}
            isActive={activePack === pack.id}
            cardDescId={`card-desc-${pack.id}`}
            setActivePack={setActivePack}
            handleCardKeyDown={handleCardKeyDown}
          />
        ))}
      </div>
    </section>
  );
};
