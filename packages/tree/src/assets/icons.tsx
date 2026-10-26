import {
  Ban,
  Check,
  ChevronDown,
  Minus,
  TriangleAlert,
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
  Ban as IconBan,
  TriangleAlert as IconErrorTriangle,
};
