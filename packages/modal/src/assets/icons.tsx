import {
  Badge,
  CircleAlert,
  CircleCheck,
  CircleX,
  Info,
  X,
  type LucideProps,
} from "lucide-react";

export const IconAlertBackground = (props: LucideProps) => (
  <Badge size={90} {...props} />
);

export const IconSuccess = (props: LucideProps) => (
  <CircleCheck size={38} color="#12b76a" {...props} />
);

export const IconWarning = (props: LucideProps) => (
  <CircleAlert size={38} color="#fd853a" {...props} />
);

export const IconError = (props: LucideProps) => (
  <CircleX size={38} color="#f04438" {...props} />
);

export const IconInfo = (props: LucideProps) => (
  <Info size={38} color="#0ba5ec" {...props} />
);

export { X as IconCross };
