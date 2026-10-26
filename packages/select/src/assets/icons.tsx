import {
  Ban,
  Check,
  ChevronDown,
  LoaderPinwheel,
  TriangleAlert,
  X,
  type LucideProps,
} from "lucide-react";

export const IconChecked = (props: LucideProps) => (
  <Check size={14} color="#fff" {...props} />
);

export {
  TriangleAlert as IconErrorTriangle,
  Ban as IconBan,
  X as IconX,
  ChevronDown as IconChevronDown,
  LoaderPinwheel as IconLoaderCircle,
};
