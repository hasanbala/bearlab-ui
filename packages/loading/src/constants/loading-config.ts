import {
  IconCircleDashed,
  IconCircleEllipse,
  IconDisc,
  IconLoader,
  IconLoaderBadging,
  IconLoaderCircle,
  IconLoaderPinwheel,
  IconShell,
  IconSquareDashed,
} from "../assets/icons";
import type { LoadingType } from "../types/loading.types";

export const DEFAULT_LOADING_TYPE: LoadingType = "loader-circle";

export const ICON_MAP: Record<LoadingType, React.ElementType> = {
  "circle-dashed": IconCircleDashed,
  "circle-ellipse": IconCircleEllipse,
  disc: IconDisc,
  loader: IconLoader,
  "loader-badging": IconLoaderBadging,
  "loader-circle": IconLoaderCircle,
  "loader-pinwheel": IconLoaderPinwheel,
  shell: IconShell,
  "square-dashed": IconSquareDashed,
};
