import {
  Ban,
  Check,
  ChevronDown,
  LoaderPinwheel,
  Minus,
  TriangleAlert,
  X,
  type LucideProps,
} from "lucide-react";

export const IconChecked = (props: LucideProps) => (
  <Check size={14} color="#fff" {...props} />
);

export const IconMinus = (props: LucideProps) => (
  <Minus size={14} color="#fff" {...props} />
);

export {
  ChevronDown as IconChevronDown,
  X as IconX,
  Ban as IconBan,
  LoaderPinwheel as IconLoaderCircle,
  TriangleAlert as IconErrorTriangle,
};
