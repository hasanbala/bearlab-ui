import {
  Check,
  Copy,
  Eye,
  EyeOff,
  Search,
  TriangleAlert,
  type LucideProps,
} from "lucide-react";

export const IconEyesClose = (props: LucideProps) => (
  <EyeOff size={20} {...props} />
);

export const IconEyesOpen = (props: LucideProps) => (
  <Eye size={20} {...props} />
);

export const IconCopy = (props: LucideProps) => <Copy size={20} {...props} />;

export const IconTick = (props: LucideProps) => (
  <Check color="#465fff" {...props} />
);

export const IconSearch = (props: LucideProps) => (
  <Search size={20} {...props} />
);

export { TriangleAlert as IconErrorTriangle };
