import { Check, Minus, TriangleAlert, type LucideProps } from "lucide-react";

export const IconDisabled = (props: LucideProps) => (
  <Check size={14} color="#E4E7EC" {...props} />
);

export const IconChecked = (props: LucideProps) => (
  <Check size={14} {...props} />
);

export const IconIndeterminate = (props: LucideProps) => (
  <Minus size={14} {...props} />
);

export { TriangleAlert as IconErrorTriangle };
