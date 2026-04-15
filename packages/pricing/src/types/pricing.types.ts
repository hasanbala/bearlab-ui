export type Billing = "monthly" | "annually";
export type PricingProps =
  | PricingTypeOneProps
  | PricingTypeTwoProps
  | PricingTypeThreeProps;

export interface PackFeature {
  value: boolean;
  label: string;
}

export interface PackTypeOne {
  id: number;
  packTitle: string;
  packDescription: string;
  buttonLabel: string;
  features: PackFeature[];
  priceTag: string;
  campaignPriceByMonthly: string;
  campaignPriceByAnnually: string;
  originalPriceByMonthly: string;
  originalPriceByAnnually: string;
}

export interface PackTypeTwo {
  id: number;
  packTitle: string;
  packDescription: string;
  buttonLabel: string;
  features: PackFeature[];
  packIcon: React.ComponentType<{ "aria-hidden"?: boolean | "true" | "false" }>;
  price: string;
  priceTag: string;
}

export interface PackTypeThree {
  id: number;
  packTitle: string;
  packDescription: string;
  buttonLabel: string;
  features: PackFeature[];
  price: string;
  priceTag: string;
  isRecommended?: boolean;
}

export interface SwitchLabels {
  monthly: string;
  annually: string;
}

export interface PricingClassNames {
  root?: string;
  header?: string;
  title?: string;
  switchWrapper?: string;
  grid?: string;
  card?: string;
  cardActive?: string;
  cardHeader?: string;
  price?: string;
  featureList?: string;
  featureItem?: string;
  divider?: string;
  button?: string;
  buttonActive?: string;
  badge?: string;
}

export interface PricingStyles {
  root?: React.CSSProperties;
  header?: React.CSSProperties;
  title?: React.CSSProperties;
  switchWrapper?: React.CSSProperties;
  grid?: React.CSSProperties;
  card?: React.CSSProperties;
  cardActive?: React.CSSProperties;
  button?: React.CSSProperties;
  buttonActive?: React.CSSProperties;
  badge?: React.CSSProperties;
}

interface PricingBaseProps {
  defaultActivePack?: number;
  checkIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  className?: PricingClassNames;
  style?: PricingStyles;
}

export interface PricingTypeOneProps extends PricingBaseProps {
  type: "one";
  packs: PackTypeOne[];
  heading: string;
  switchLabels?: SwitchLabels;
  defaultBilling?: Billing;
}

export interface PricingTypeTwoProps extends PricingBaseProps {
  type: "two";
  packs: PackTypeTwo[];
}

export interface PricingTypeThreeProps extends PricingBaseProps {
  type: "three";
  packs: PackTypeThree[];
  recommendedLabel?: string;
}

export interface FeatureListProps {
  label: string;
  value: boolean;
  isActive: boolean;
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
}

export interface TypeOneProps {
  packs: PackTypeOne[];
  heading: string;
  switchLabels: { monthly: string; annually: string };
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  style: PricingStyles;
}

export interface TypeTwoProps {
  packs: PackTypeTwo[];
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  style: PricingStyles;
}

export interface TypeThreeProps {
  packs: PackTypeThree[];
  recommendedLabel: string;
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  style: PricingStyles;
}

export interface UsePricingProps {
  defaultBilling?: Billing;
  defaultActivePack?: number;
}

export interface UsePricingReturn {
  activePack: number;
  setActivePack: (activePack: number) => void;
  handleCardKeyDown: (e: React.KeyboardEvent<HTMLElement>, id: number) => void;
}

export interface TypeOnePackProps {
  isActive: boolean;
  pack: PackTypeOne;
  cardDescId: string;
  isMonthly: boolean;
  style: PricingStyles;
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  setActivePack: (active: number) => void;
  handleCardKeyDown: (e: React.KeyboardEvent<HTMLElement>, id: number) => void;
}

export interface TypeTwoPackProps {
  isActive: boolean;
  pack: PackTypeTwo;
  cardDescId: string;
  style: PricingStyles;
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  setActivePack: (active: number) => void;
  handleCardKeyDown: (e: React.KeyboardEvent<HTMLElement>, id: number) => void;
}

export interface TypeThreePackProps {
  isActive: boolean;
  pack: PackTypeThree;
  cardDescId: string;
  style: PricingStyles;
  recommendedLabel: string;
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  setActivePack: (active: number) => void;
  handleCardKeyDown: (e: React.KeyboardEvent<HTMLElement>, id: number) => void;
}
