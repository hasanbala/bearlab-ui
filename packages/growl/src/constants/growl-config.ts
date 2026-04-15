import {
  GrowlAnimation,
  GrowlPosition,
  GrowlTheme,
  GrowlType,
} from "../types/growl.types";

export const TITLES: Record<GrowlType, string> = {
  success: "Successful",
  error: "Error",
  warning: "Warning",
  info: "Info",
};

export const DEFAULT_ANIMATION: GrowlAnimation = "default";
export const DEFAULT_THEME: GrowlTheme = "light";
export const DEFAULT_POSITION: GrowlPosition = "top-right";
export const DEFAULT_PAUSE_ON_HOVER = true;

export const ALL_POSITIONS: GrowlPosition[] = [
  "top-right",
  "top-left",
  "top-center",
  "bottom-right",
  "bottom-left",
  "bottom-center",
];

export const BOTTOM_POSITIONS: GrowlPosition[] = [
  "bottom-right",
  "bottom-left",
  "bottom-center",
];
