import { useCallback, useEffect, useRef } from "react";
import { UseDotsAutoScrollReturn } from "../types/carousel.types";

export const useDotsAutoScroll = (
  activeIndex: number
): UseDotsAutoScrollReturn => {
  const dotsRef = useRef<HTMLDivElement>(null);

  const scrollActiveIntoView = useCallback((behavior: ScrollBehavior) => {
    const el = dotsRef.current;
    if (!el) return;
    if (el.scrollWidth <= el.clientWidth + 1) return;

    const active = el.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!active) return;

    const elRect = el.getBoundingClientRect();
    const dotRect = active.getBoundingClientRect();
    const delta =
      dotRect.left - elRect.left - (el.clientWidth - dotRect.width) / 2;

    el.scrollTo({ left: el.scrollLeft + delta, behavior });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    scrollActiveIntoView(prefersReducedMotion ? "auto" : "smooth");
  }, [activeIndex, scrollActiveIntoView]);

  useEffect(() => {
    const el = dotsRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => scrollActiveIntoView("auto"));
    observer.observe(el);

    return () => observer.disconnect();
  }, [scrollActiveIntoView]);

  return dotsRef;
};
