import type { ViewCardProps } from "./types/view-card.types";
import { ViewCardWithContent } from "./components/view-card-with-content";
import { ViewCardEmpty } from "./components/view-card-empty";

export const ViewCard = (props: ViewCardProps) => {
  const { children } = props;

  if (children) {
    return <ViewCardWithContent {...props} />;
  }

  return <ViewCardEmpty {...props} />;
};
