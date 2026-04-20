import {
  useCallback,
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
  useEffect,
} from "react";
import {
  CLONE_COUNT,
  DEFAULT_SLIDE_TIME,
  getSlideHeight,
  getSlideWidth,
  SLIDE_GAP,
} from "../constants/carousel-config";
import {
  CarouselItem,
  UseCarouselProps,
  UseCarouselReturn,
} from "../types/carousel.types";

export const useCarousel = ({
  loop,
  items,
  sliderTime = DEFAULT_SLIDE_TIME,
  slideHeightOverride,
  containerWidthOverride,
  transitionDuration = 560,
}: UseCarouselProps): UseCarouselReturn => {
  const count = items.length;
  const isInfinite = loop === "infinite";
  const isWrap = loop === "wrap";
  const rootRef = useRef<HTMLDivElement>(null);
  const jumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoPausedRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [measuredWidth, setMeasuredWidth] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(
    isInfinite ? CLONE_COUNT : 0
  );
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeDotDuration, setActiveDotDuration] = useState(
    sliderTime + transitionDuration / 1000
  );
  const containerWidth = containerWidthOverride ?? measuredWidth;
  const isReady = containerWidth > 0;
  const [activeTransitionDuration, setActiveTransitionDuration] =
    useState(transitionDuration);

  useEffect(() => {
    setActiveTransitionDuration(transitionDuration);
  }, [transitionDuration]);

  const slideWidth = getSlideWidth(containerWidth);
  const slideHeight = slideHeightOverride ?? getSlideHeight(slideWidth);
  const slideStep = slideWidth + SLIDE_GAP;
  const centerOffset = (containerWidth - slideWidth - SLIDE_GAP) / 2;
  const trackTranslate = centerOffset - currentIndex * slideStep;

  const extendedItems = useMemo<CarouselItem[]>(() => {
    if (!isInfinite || count === 0) return items;
    return [
      ...items.slice(-CLONE_COUNT),
      ...items,
      ...items.slice(0, CLONE_COUNT),
    ];
  }, [items, count, isInfinite]);

  const displayItems: CarouselItem[] = isInfinite ? extendedItems : items;

  const jumpTo = useCallback((index: number) => {
    setIsTransitioning(false);
    setCurrentIndex(index);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    });
  }, []);

  const realIndex = isInfinite
    ? (((currentIndex - CLONE_COUNT) % count) + count) % count
    : currentIndex;

  const goNextRef = useRef<() => void>(() => {});

  const scheduleNext = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (!sliderTime || sliderTime <= 0 || isAutoPausedRef.current) return;
    autoTimerRef.current = setTimeout(
      () => goNextRef.current(),
      sliderTime * 1_000
    );
  }, [sliderTime]);

  const goNext = useCallback(() => {
    setIsTransitioning(true);

    if (isWrap) {
      const isWrappingAround = currentIndex === count - 1;
      const delayedResetTime = 3000;
      if (isWrappingAround) {
        setActiveTransitionDuration(delayedResetTime);
        setActiveDotDuration((prev) => prev + delayedResetTime / 1000);
      } else {
        setActiveTransitionDuration(transitionDuration);
        setActiveDotDuration(sliderTime + transitionDuration / 1000);
      }
    }

    setCurrentIndex((p) => (isInfinite ? p + 1 : (p + 1) % count));
  }, [isWrap, currentIndex, count, transitionDuration, sliderTime, isInfinite]);

  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  const goPrev = useCallback(() => {
    setIsTransitioning(true);

    if (isWrap) {
      const isWrappingAround = currentIndex === 0;
      setActiveTransitionDuration(
        isWrappingAround
          ? transitionDuration * Math.max(count - 1, 1)
          : transitionDuration
      );
    }

    setCurrentIndex((p) => (isInfinite ? p - 1 : (p - 1 + count) % count));
  }, [isInfinite, isWrap, count, currentIndex, transitionDuration]);

  const goToReal = useCallback(
    (realIdx: number) => {
      setIsTransitioning(true);
      setActiveTransitionDuration(transitionDuration);
      setCurrentIndex(isInfinite ? CLONE_COUNT + realIdx : realIdx);
    },
    [isInfinite, transitionDuration]
  );

  const handleTransitionEnd = useCallback(() => {
    if (isInfinite) {
      const realEnd = CLONE_COUNT + count - 1;
      if (currentIndex < CLONE_COUNT) {
        jumpTo(currentIndex + count);
      } else if (currentIndex > realEnd) {
        jumpTo(currentIndex - count);
      }
    }

    setActiveTransitionDuration(transitionDuration);
    scheduleNext();
  }, [
    isInfinite,
    currentIndex,
    count,
    jumpTo,
    transitionDuration,
    scheduleNext,
  ]);

  const handleDragEnd = useCallback(
    (delta: number, velocity: number) => {
      const threshold = slideWidth * 0.18;
      const fast = velocity > 0.45;
      if (delta < -threshold || (fast && delta < 0)) goNext();
      else if (delta > threshold || (fast && delta > 0)) goPrev();
    },
    [slideWidth, goNext, goPrev]
  );

  const pauseAutoPlay = useCallback(() => {
    isAutoPausedRef.current = true;
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
  }, []);

  const resumeAutoPlay = useCallback(() => {
    isAutoPausedRef.current = false;
    scheduleNext();
  }, [scheduleNext]);

  useEffect(() => {
    if (isReady) scheduleNext();
  }, [isReady]);

  useLayoutEffect(() => {
    if (containerWidthOverride !== undefined) return;
    const el = rootRef.current;
    if (!el) return;
    setMeasuredWidth(
      Math.min(window.innerWidth, el.getBoundingClientRect().width)
    );

    const ro = new ResizeObserver(([entry]) => {
      setIsResizing(true);
      setMeasuredWidth(Math.min(window.innerWidth, entry.contentRect.width));

      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        setIsResizing(false);
      }, 150);
    });

    ro.observe(el);
    return () => {
      ro.disconnect();
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, [containerWidthOverride]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (jumpTimerRef.current) clearTimeout(jumpTimerRef.current);
    };
  }, []);

  return {
    rootRef,
    isReady,
    realIndex,
    slideWidth,
    isResizing,
    slideHeight,
    currentIndex,
    displayItems,
    trackTranslate,
    isTransitioning,
    activeDotDuration,
    activeTransitionDuration,
    goNext,
    goPrev,
    goToReal,
    pauseAutoPlay,
    handleDragEnd,
    resumeAutoPlay,
    handleTransitionEnd,
  };
};
