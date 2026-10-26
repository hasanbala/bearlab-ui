import {
  CircleCheck,
  Info,
  TriangleAlert,
  X,
  type LucideProps,
} from "lucide-react";

export const IconCross = (props: LucideProps) => (
  <X color="#667085" {...props} />
);

export const IconError2 = (props: LucideProps) => (
  <TriangleAlert size={12} color="#ff0000" {...props} />
);

export const IconInfo2 = (props: LucideProps) => (
  <Info color="#465fff" {...props} />
);

export const IconSuccess = (props: LucideProps) => (
  <CircleCheck size={38} color="#12b76a" {...props} />
);

export const IconWarning3 = (props: LucideProps) => (
  <TriangleAlert size={12} color="#fd853a" {...props} />
);
