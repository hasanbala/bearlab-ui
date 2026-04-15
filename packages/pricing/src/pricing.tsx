import { IconCheckLine, IconCloseLine } from "./assets/icons";
import { TypeOne } from "./components/type-one";
import { TypeThree } from "./components/type-three";
import { TypeTwo } from "./components/type-two";
import { PricingProps } from "./types/pricing.types";

const DefaultCheckIcon = () => <IconCheckLine aria-hidden="true" />;
const DefaultCloseIcon = () => <IconCloseLine aria-hidden="true" />;

export const Pricing = (props: PricingProps) => {
  const {
    style = {},
    className = {},
    checkIcon = <DefaultCheckIcon />,
    closeIcon = <DefaultCloseIcon />,
  } = props;

  const commonProps = {
    ...{ checkIcon },
    ...{ closeIcon },
    ...{ className },
    ...{ style },
  };

  if (props.type === "one") {
    const { switchLabels = { monthly: "Monthly", annually: "Annually" } } =
      props;
    return (
      <TypeOne
        packs={props.packs}
        heading={props.heading}
        switchLabels={switchLabels}
        {...commonProps}
      />
    );
  }

  if (props.type === "two") {
    return <TypeTwo packs={props.packs} {...commonProps} />;
  }

  if (props.type === "three") {
    const { recommendedLabel = "Recommended" } = props;
    return (
      <TypeThree
        packs={props.packs}
        recommendedLabel={recommendedLabel}
        {...commonProps}
      />
    );
  }

  return null;
};
