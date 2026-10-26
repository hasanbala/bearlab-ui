import {
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  EllipsisVertical,
  Files,
  LoaderCircle,
  Minus,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  Upload,
  X,
  type LucideProps,
} from "lucide-react";

export const IconArrow = (props: LucideProps) => (
  <ArrowRight size={20} {...props} />
);

export const IconUpdate = (props: LucideProps) => (
  <Pencil size={18} {...props} />
);

export const IconSearch = (props: LucideProps) => (
  <Search size={20} {...props} />
);

export const IconPing = (props: LucideProps) => <Bell size={20} {...props} />;

export const IconArrowDown2 = (props: LucideProps) => (
  <ChevronDown size={20} {...props} />
);

export const IconPlus = (props: LucideProps) => <Plus size={28} {...props} />;

export const IconMinus = (props: LucideProps) => <Minus size={28} {...props} />;

export const IconFilter = (props: LucideProps) => (
  <SlidersHorizontal size={20} {...props} />
);

export const IconCopy = (props: LucideProps) => <Copy size={20} {...props} />;

export const IconLoadingSpin = (props: LucideProps) => (
  <LoaderCircle size={20} {...props} />
);

export {
  Plus as IconAdd,
  Trash2 as IconDelete,
  Upload as IconExport,
  X as IconCross,
  ChevronDown as IconArrowDown,
  Files as IconDocument,
  EllipsisVertical as IconDots,
  ChevronRight as IconArrowRight,
  Check as IconTick,
};
