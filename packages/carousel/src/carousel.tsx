import classnames from "classnames";
import styles from "./styles/carousel.module.scss";
import { useDrag } from "./hooks/useDrag";
import { IconChevronLeft, IconChevronRight } from "./assets/icons";
import { useCarousel } from "./hooks/useCarousel";
import { DEFAULT_SLIDE_TIME } from "./constants/carousel-config";
import { CarouselProps } from "./types/carousel.types";
import { DotButton } from "./components/dot-button";
import { SlideItem } from "./components/slide-item";
import { useCallback, useMemo, useRef } from "react";

export const Carousel = (props: CarouselProps) => {
  const {
    items,
    style,
    className,
    draggable = true,
    loop = "infinite",
    showNavigation = false,
    transitionDuration = 560,
    slideHeight: slideHeightProp,
    sliderTime = DEFAULT_SLIDE_TIME,
    containerWidth: containerWidthProp,
  } = props;

  const trackRef = useRef<HTMLDivElement>(null);

  const {
    rootRef,
    isReady,
    realIndex,
    isResizing,
    slideWidth,
    slideHeight,
    currentIndex,
    displayItems,
    trackTranslate,
    isTransitioning,
    activeDotDuration,
    activeTransitionDuration,
    goPrev,
    goNext,
    goToReal,
    handleDragEnd,
    pauseAutoPlay,
    resumeAutoPlay,
    handleTransitionEnd,
  } = useCarousel({
    items,
    loop,
    sliderTime,
    slideHeightOverride: slideHeightProp,
    containerWidthOverride: containerWidthProp,
    transitionDuration,
  });

  const handleDragMove = useCallback(
    (delta: number) => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${trackTranslate + delta * 0.65}px)`;
      }
    },
    [trackTranslate]
  );

  const { isDragging, handlers } = useDrag({
    draggable,
    onDragStart: pauseAutoPlay,
    onDragMove: handleDragMove,
    onDragEnd: (delta, velocity) => {
      handleDragEnd(delta, velocity);
      resumeAutoPlay();
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${trackTranslate}px)`;
      }
    },
  });

  const handleNavigation = useCallback(
    (index: number) => {
      if (isDragging) return;
      const diff = index - currentIndex;
      if (diff === 1) goNext();
      else if (diff === -1) goPrev();
    },
    [isDragging, currentIndex, goNext, goPrev]
  );

  const activeDotStyle = useMemo(
    () => ({ animationDuration: `${activeDotDuration}s` }),
    [activeDotDuration]
  );

  const containerStyle = useMemo(
    () =>
      ({
        ...style?.root,
        "--carousel-transition-dur": `${activeTransitionDuration}ms`,
      }) as React.CSSProperties,
    [style?.root, activeTransitionDuration]
  );

  if (items.length === 0) return null;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="Carousel"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      className={classnames(
        styles.container,
        {
          [styles.dragging]: isDragging,
          [styles.noDrag]: !draggable,
        },
        className?.root
      )}
      style={containerStyle}
      {...handlers}
    >
      <div
        ref={trackRef}
        style={{
          transform: `translateX(${trackTranslate}px)`,
          ...style?.track,
        }}
        onTransitionEnd={handleTransitionEnd}
        className={classnames(
          styles.track,
          {
            [styles.noTransition]: !isTransitioning || isDragging || isResizing,
            [styles.trackHidden]: !isReady,
          },
          className?.track
        )}
      >
        {displayItems.map((item, idx) => (
          <SlideItem
            key={idx}
            index={idx}
            item={item}
            style={style}
            className={className}
            slideWidth={slideWidth}
            slideHeight={slideHeight}
            currentIndex={currentIndex}
            handleNavigation={handleNavigation}
          />
        ))}
      </div>
      {showNavigation && (
        <div
          style={style?.navigation}
          className={classnames(styles.nav, className?.navigation)}
        >
          <button
            className={styles.navBtn}
            onClick={goPrev}
            aria-label="Previous"
          >
            <IconChevronLeft />
          </button>
          <button className={styles.navBtn} onClick={goNext} aria-label="Next">
            <IconChevronRight />
          </button>
        </div>
      )}
      <div
        role="tablist"
        aria-label="Slides"
        style={style?.dots}
        className={classnames(styles.dots, className?.dots)}
      >
        {items.map((_, idx) => (
          <DotButton
            key={idx}
            index={idx}
            onClick={goToReal}
            realIndex={realIndex}
            activeDotStyle={activeDotStyle}
          />
        ))}
      </div>
    </div>
  );
};
