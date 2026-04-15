import { useCallback, useEffect, useRef, useState } from "react";
import {
  GrowlAnimation,
  GrowlItem,
  GrowlProps,
  GrowlTheme,
  GrowlType,
} from "../types/growl.types";
import styles from "../styles/growl.module.scss";
import classnames from "classnames";
import {
  DEFAULT_ANIMATION,
  DEFAULT_THEME,
  TITLES,
} from "../constants/growl-config";
import {
  IconCross,
  IconError2,
  IconInfo2,
  IconSuccess,
  IconWarning3,
} from "../assets/icons";

const ANIM_CLASSES: Record<GrowlAnimation, string> = {
  default: styles.animDefault,
  flip: styles.animFlip,
  zoom: styles.animZoom,
  slide: styles.animSlide,
  bounce: styles.animBounce,
};

const THEME_CLASSES: Record<GrowlTheme, string> = {
  light: styles.themeLight,
  dark: styles.themeDark,
  colored: styles.themeColored,
};

const getNotificationClass = (item: GrowlItem, leaving: boolean): string =>
  classnames(
    styles.notification,
    ANIM_CLASSES[item.animation ?? DEFAULT_ANIMATION],
    THEME_CLASSES[item.theme ?? DEFAULT_THEME],
    {
      [styles.error]: item.type === "error",
      [styles.info]: item.type === "info",
      [styles.success]: item.type === "success",
      [styles.warning]: item.type === "warning",
      [styles.leaving]: leaving,
    },
    item?.className?.notification
  );

const ICONS: Record<GrowlType, React.JSX.Element> = {
  success: <IconSuccess />,
  error: <IconError2 />,
  warning: <IconWarning3 />,
  info: <IconInfo2 />,
};

export const Toast = (props: GrowlProps) => {
  const { item, onRemove } = props;

  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const remainingRef = useRef<number>(item.autoClose ?? 0);
  const startTimeRef = useRef<number>(Date.now());

  const remove = useCallback(() => {
    setLeaving(true);
    setTimeout(() => onRemove(item.id), 300);
  }, [item.id, onRemove]);

  const startTimer = useCallback(
    (duration: number) => {
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(remove, duration);
    },
    [remove]
  );

  useEffect(() => {
    if (item.autoClose) {
      remainingRef.current = item.autoClose;
      startTimer(item.autoClose);
    }
    return () => clearTimeout(timerRef.current);
  }, [item.autoClose, startTimer]);

  const handleMouseEnter = useCallback(() => {
    if (!item.pauseOnHover || !item.autoClose) return;
    clearTimeout(timerRef.current);
    remainingRef.current = Math.max(
      0,
      remainingRef.current - (Date.now() - startTimeRef.current)
    );
    setPaused(true);
  }, [item.pauseOnHover, item.autoClose]);

  const handleMouseLeave = useCallback(() => {
    if (!item.pauseOnHover || !item.autoClose) return;
    setPaused(false);
    startTimer(remainingRef.current);
  }, [item.pauseOnHover, item.autoClose, startTimer]);

  return (
    <div
      role="alert"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={item?.style?.notification}
      className={getNotificationClass(item, leaving)}
    >
      <div className={styles.iconWrapper}>{ICONS[item.type]}</div>
      <div
        style={item?.style?.body}
        className={classnames(styles.body, item?.className?.body)}
      >
        <span className={styles.title}>{item.title ?? TITLES[item.type]}</span>
        <span className={styles.message}>{item.message}</span>
      </div>
      <div onClick={remove} className={styles.close}>
        <IconCross />
      </div>
      {item.autoClose && (
        <div
          className={classnames(styles.progress, item?.className?.progress)}
          style={{
            animationDuration: `${item.autoClose}ms`,
            animationPlayState: paused ? "paused" : "running",
            ...item?.style?.progress,
          }}
        />
      )}
    </div>
  );
};
