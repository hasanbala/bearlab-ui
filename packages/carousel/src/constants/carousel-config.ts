export const MESSAGE_TRUNCATE = 120;
export const CLONE_COUNT = 2;
export const SLIDE_GAP = 20;
export const DEFAULT_SLIDE_TIME = 4;
export const DRAG_THRESHOLD_PX = 8;

export const INTERACTIVE_SELECTOR =
  'button, a, input, select, textarea, [role="button"], [role="tab"]';

export const getSlideWidth = (containerWidth: number): number => {
  if (containerWidth <= 0) return 0;
  if (containerWidth >= 1024) return Math.min(800, containerWidth * 0.9);
  if (containerWidth >= 640) return Math.min(600, containerWidth * 0.9);
  return containerWidth * 0.88;
};

export const getSlideHeight = (slideWidth: number): number => {
  if (slideWidth <= 0) return 0;
  if (slideWidth >= 600) return slideWidth * 0.6;
  const mobileHeight = slideWidth * 1.1;
  return Math.max(320, mobileHeight);
};
