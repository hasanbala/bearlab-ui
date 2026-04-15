import { useEffect, useRef, useState } from "react";
import { UseSlideProps, UseSlideReturn } from "../types/carousel.types";

export const useSlide = ({ isActive }: UseSlideProps): UseSlideReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive && !paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
      if (!isActive) {
        video.currentTime = 0;
      }
    }
  }, [isActive, paused]);

  return { videoRef, paused, muted, setMuted, setPaused };
};
