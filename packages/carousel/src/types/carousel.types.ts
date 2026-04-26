export type CarouselItem =
  | {
      src: string;
      type: "video";
      title?: string;
      poster?: string;
      description?: string;
    }
  | {
      src: string;
      alt?: string;
      type: "image";
      title?: string;
      description?: string;
    };

export interface CarouselProps {
  draggable?: boolean;
  sliderTime?: number;
  slideHeight?: number;
  items: CarouselItem[];
  style?: CarouselStyles;
  containerWidth?: number;
  showNavigation?: boolean;
  loop?: "infinite" | "wrap";
  transitionDuration?: number;
  className?: CarouselClassNames;
}

export interface PromptOverlayProps {
  title?: string;
  className?: string;
  description?: string;
  style?: React.CSSProperties;
}

export interface UseCarouselProps {
  sliderTime?: number;
  items: CarouselItem[];
  loop: "infinite" | "wrap";
  transitionDuration?: number;
  slideHeightOverride?: number;
  containerWidthOverride?: number;
}

export interface UseCarouselReturn {
  isReady: boolean;
  realIndex: number;
  slideWidth: number;
  isResizing: boolean;
  slideHeight: number;
  currentIndex: number;
  trackTranslate: number;
  isTransitioning: boolean;
  activeDotDuration: number;
  displayItems: CarouselItem[];
  activeTransitionDuration: number;
  rootRef: React.RefObject<HTMLDivElement | null>;
  goNext: () => void;
  goPrev: () => void;
  pauseAutoPlay: () => void;
  resumeAutoPlay: () => void;
  handleTransitionEnd: () => void;
  goToReal: (realIdx: number) => void;
  handleDragEnd: (delta: number, velocity: number) => void;
}

export interface UseDragProps {
  draggable?: boolean;
  onDragStart?: () => void;
  onDragMove?: (delta: number) => void;
  onDragEnd: (delta: number, velocity: number) => void;
}

export interface UseDragReturn {
  isDragging: boolean;
  handlers: {
    onPointerUp: (e: React.PointerEvent) => void;
    onClickCapture: (e: React.MouseEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerCancel: (e: React.PointerEvent) => void;
  };
}

export interface UseSlideProps {
  isActive: boolean;
}

export interface UseSlideReturn {
  muted: boolean;
  paused: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface VideoSlideProps {
  src: string;
  poster?: string;
  isActive: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface CarouselStyles {
  dots?: React.CSSProperties;
  root?: React.CSSProperties;
  track?: React.CSSProperties;
  navigation?: React.CSSProperties;
  videoSlide?: React.CSSProperties;
  promptOverlay?: React.CSSProperties;
}

export interface CarouselClassNames {
  dots?: string;
  track?: string;
  root?: string;
  videoSlide?: string;
  navigation?: string;
  promptOverlay?: string;
}

export interface DotButtonProps {
  index: number;
  realIndex: number;
  activeDotStyle: {
    animationDuration: string;
  };
  onClick: (value: number) => void;
}

export interface SlideItemProps {
  index: number;
  slideWidth: number;
  item: CarouselItem;
  slideHeight: number;
  currentIndex: number;
  style?: CarouselStyles;
  className?: CarouselClassNames;
  handleNavigation: (index: number) => void;
}
