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
import { DEFAULT_ANIMATION, DEFAULT_THEME } from "../constants/growl-config";
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
    styles.growl,
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
  const { item, labels, onRemove } = props;

  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
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

  const pause = useCallback(() => {
    if (!item.autoClose || pausedRef.current) return;
    pausedRef.current = true;
    clearTimeout(timerRef.current);
    remainingRef.current = Math.max(
      0,
      remainingRef.current - (Date.now() - startTimeRef.current)
    );
    setPaused(true);
  }, [item.autoClose]);

  const resume = useCallback(() => {
    if (!item.autoClose || !pausedRef.current) return;
    pausedRef.current = false;
    setPaused(false);
    startTimer(remainingRef.current);
  }, [item.autoClose, startTimer]);

  const handleMouseEnter = () => {
    if (item.pauseOnHover) pause();
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!item.pauseOnHover) return;
    if (e.currentTarget.contains(document.activeElement)) return;
    resume();
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    if (item.pauseOnHover && e.currentTarget.matches(":hover")) return;
    resume();
  };

  const isUrgent = item.type === "error" || item.type === "warning";

  return (
    <div
      role={isUrgent ? "alert" : "status"}
      aria-live={isUrgent ? "assertive" : "polite"}
      aria-atomic="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={pause}
      onBlur={handleBlur}
      style={item?.style?.notification}
      className={getNotificationClass(item, leaving)}
    >
      <div className={styles.iconWrapper}>{ICONS[item.type]}</div>
      <div
        style={item?.style?.body}
        className={classnames(styles.body, item?.className?.body)}
      >
        <span className={styles.title}>{item.title ?? labels[item.type]}</span>
        <span className={styles.message}>{item.message}</span>
      </div>
      <button
        type="button"
        onClick={remove}
        aria-label={labels.close}
        className={styles.close}
      >
        <IconCross aria-hidden="true" />
      </button>
      {!!item.autoClose && (
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
