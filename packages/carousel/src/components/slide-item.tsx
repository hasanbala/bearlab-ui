import { SlideItemProps } from "../types/carousel.types";
import classnames from "classnames";
import styles from "../styles/carousel.module.scss";
import { VideoSlide } from "./video-slide";
import { PromptOverlay } from "./prompt-overlay";
import { memo } from "react";

export const SlideItem = memo((props: SlideItemProps) => {
  const {
    item,
    index,
    style,
    className,
    slideWidth,
    slideHeight,
    currentIndex,
    handleNavigation,
  } = props;

  const isActive = index === currentIndex;

  return (
    <div
      className={classnames(styles.slide, {
        [styles.active]: isActive,
      })}
      style={{
        width: slideWidth || undefined,
        height: slideHeight || undefined,
      }}
      onClick={() => handleNavigation(index)}
      aria-hidden={!isActive}
    >
      {item.type === "video" ? (
        <VideoSlide
          src={item.src}
          isActive={isActive}
          poster={item.poster}
          style={style?.videoSlide}
          className={className?.videoSlide}
        />
      ) : (
        <img
          className={styles.media}
          src={item.src}
          alt={(item as { alt?: string }).alt ?? ""}
          draggable={false}
          loading="lazy"
        />
      )}
      {isActive && (item?.title || item?.description) && (
        <PromptOverlay
          title={item.title}
          style={style?.promptOverlay}
          description={item.description}
          className={className?.promptOverlay}
        />
      )}
    </div>
  );
});
