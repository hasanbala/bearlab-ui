import {
  DEFAULT_ANIMATION,
  DEFAULT_THEME,
  DEFAULT_POSITION,
  DEFAULT_PAUSE_ON_HOVER,
} from "../constants/growl-config";
import { GrowlType, GrowlOptions, GrowlInterface } from "../types/growl.types";
import { _addGrowl } from "../utils/growl-utils";

export const growl = ((
  type: GrowlType,
  message: string,
  options?: GrowlOptions
) => {
  _addGrowl?.({
    type,
    message,
    style: options?.style,
    title: options?.title,
    className: options?.className,
    autoClose: options?.autoClose ?? 5000,
    theme: options?.theme ?? DEFAULT_THEME,
    position: options?.position ?? DEFAULT_POSITION,
    animation: options?.animation ?? DEFAULT_ANIMATION,
    pauseOnHover: options?.pauseOnHover ?? DEFAULT_PAUSE_ON_HOVER,
  });
}) as GrowlInterface;

growl.success = (msg: string, opt?: GrowlOptions) => growl("success", msg, opt);
growl.error = (msg: string, opt?: GrowlOptions) => growl("error", msg, opt);
growl.info = (msg: string, opt?: GrowlOptions) => growl("info", msg, opt);
growl.warning = (msg: string, opt?: GrowlOptions) => growl("warning", msg, opt);
