export type CarouselItem =
  | {
      type: "video";
      src: string;
      poster?: string;
      description?: string;
      title?: string;
    }
  | {
      type: "image";
      src: string;
      alt?: string;
      description?: string;
      title?: string;
    };

export interface CarouselProps {
  draggable?: boolean;
  sliderTime?: number;
  slideHeight?: number;
  items: CarouselItem[];
  containerWidth?: number;
  style?: CarouselStyles;
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
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onPointerCancel: (e: React.PointerEvent) => void;
    onClickCapture: (e: React.MouseEvent) => void;
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
  track?: React.CSSProperties;
  root?: React.CSSProperties;
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
  onClick: (value: number) => void;
  activeDotStyle: {
    animationDuration: string;
  };
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
