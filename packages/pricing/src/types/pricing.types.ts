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
  priceTag: string;
  packTitle: string;
  buttonLabel: string;
  packDescription: string;
  features: PackFeature[];
  originalPriceByMonthly: string;
  campaignPriceByMonthly: string;
  campaignPriceByAnnually: string;
  originalPriceByAnnually: string;
}

export interface PackTypeTwo {
  id: number;
  price: string;
  priceTag: string;
  packTitle: string;
  buttonLabel: string;
  features: PackFeature[];
  packDescription: string;
  packIcon: React.ComponentType<{ "aria-hidden"?: boolean | "true" | "false" }>;
}

export interface PackTypeThree {
  id: number;
  price: string;
  priceTag: string;
  packTitle: string;
  buttonLabel: string;
  features: PackFeature[];
  packDescription: string;
  isRecommended?: boolean;
}

export interface SwitchLabels {
  monthly: string;
  annually: string;
}

export interface PricingClassNames {
  root?: string;
  card?: string;
  grid?: string;
  price?: string;
  title?: string;
  badge?: string;
  header?: string;
  button?: string;
  divider?: string;
  cardActive?: string;
  cardHeader?: string;
  featureItem?: string;
  featureList?: string;
  buttonActive?: string;
  switchWrapper?: string;
}

export interface PricingStyles {
  root?: React.CSSProperties;
  grid?: React.CSSProperties;
  card?: React.CSSProperties;
  badge?: React.CSSProperties;
  title?: React.CSSProperties;
  button?: React.CSSProperties;
  header?: React.CSSProperties;
  cardActive?: React.CSSProperties;
  buttonActive?: React.CSSProperties;
  switchWrapper?: React.CSSProperties;
}

interface PricingBaseProps {
  style?: PricingStyles;
  defaultActivePack?: number;
  checkIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  className?: PricingClassNames;
}

export interface PricingTypeOneProps extends PricingBaseProps {
  type: "one";
  heading: string;
  packs: PackTypeOne[];
  defaultBilling?: Billing;
  switchLabels?: SwitchLabels;
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
  heading: string;
  packs: PackTypeOne[];
  style: PricingStyles;
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
  switchLabels: { monthly: string; annually: string };
}

export interface TypeTwoProps {
  packs: PackTypeTwo[];
  style: PricingStyles;
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
}

export interface TypeThreeProps {
  style: PricingStyles;
  packs: PackTypeThree[];
  recommendedLabel: string;
  checkIcon: React.ReactNode;
  closeIcon: React.ReactNode;
  className: PricingClassNames;
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
