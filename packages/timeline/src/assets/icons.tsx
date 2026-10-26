import {
  CircleCheck,
  Info,
  LoaderCircle,
  TriangleAlert,
  type LucideProps,
} from "lucide-react";

export const IconSpinner = (props: LucideProps) => (
  <LoaderCircle size={16} {...props} />
);

export {
  TriangleAlert as IconError,
  Info as IconInfo,
  CircleCheck as IconSuccess,
  TriangleAlert as IconWarning,
};
