import { CircleAlert, CircleCheck, Info, type LucideProps } from "lucide-react";

export const IconInfo = (props: LucideProps) => <Info size={38} {...props} />;

export const IconSuccess = (props: LucideProps) => (
  <CircleCheck size={38} {...props} />
);

export { CircleAlert as IconErrorCircle, CircleAlert as IconWarning };
