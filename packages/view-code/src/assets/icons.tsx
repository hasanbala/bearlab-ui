import { Check, Copy, Terminal, type LucideProps } from "lucide-react";

export const IconCheck = (props: LucideProps) => <Check size={14} {...props} />;

export const IconCopy = (props: LucideProps) => <Copy size={14} {...props} />;

export const IconTerminal = (props: LucideProps) => (
  <Terminal size={13} {...props} />
);
