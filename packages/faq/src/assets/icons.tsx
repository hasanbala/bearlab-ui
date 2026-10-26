import {
  Bell,
  Check,
  EllipsisVertical,
  Files,
  Info,
  Pencil,
  Plus,
  Search,
  Upload,
  type LucideProps,
} from "lucide-react";

export const IconPing = (props: LucideProps) => <Bell size={20} {...props} />;

export const IconSearch = (props: LucideProps) => (
  <Search size={20} {...props} />
);

export const IconUpdate = (props: LucideProps) => (
  <Pencil size={18} {...props} />
);

export {
  Plus as IconAdd,
  Files as IconDocument,
  Upload as IconExport,
  EllipsisVertical as IconDots,
  Check as IconTick,
  Info as IconSupport,
};
