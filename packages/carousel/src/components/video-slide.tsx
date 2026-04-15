import { useSlide } from "../hooks/useSlide";
import {
  IconPause,
  IconPlay,
  IconVolume2,
  IconVolumeOff,
} from "../assets/icons";
import { VideoSlideProps } from "../types/carousel.types";
import styles from "../styles/carousel.module.scss";
import classnames from "classnames";
import { useCallback } from "react";

export const VideoSlide = (props: VideoSlideProps) => {
  const { src, poster, isActive, className, style } = props;
  const { muted, paused, videoRef, setMuted, setPaused } = useSlide({
    isActive,
  });

  const togglePlay = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setPaused((prev) => !prev);
    },
    [setPaused]
  );

  const toggleMute = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setMuted((prev) => {
        const next = !prev;
        if (videoRef.current) videoRef.current.muted = next;
        return next;
      });
    },
    [setMuted, videoRef]
  );

  return (
    <>
      <video
        loop
        src={src}
        playsInline
        muted={muted}
        style={style}
        ref={videoRef}
        poster={poster}
        preload="metadata"
        className={classnames(styles.media, className)}
      />
      {isActive && (
        <div className={styles.videoControls}>
          <button
            className={styles.controlBtn}
            onClick={togglePlay}
            aria-label={paused ? "IconPlay" : "IconPause"}
          >
            {paused ? <IconPlay /> : <IconPause />}
          </button>
          <button
            className={styles.controlBtn}
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <IconVolumeOff /> : <IconVolume2 />}
          </button>
        </div>
      )}
    </>
  );
};
