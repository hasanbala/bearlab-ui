import classnames from "classnames";
import styles from "../styles/carousel.module.scss";
import { DotButtonProps } from "../types/carousel.types";

export const DotButton = (props: DotButtonProps) => {
  const { realIndex, index, onClick, activeDotStyle } = props;
  const isActive = index === realIndex;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-label={`Slide ${index + 1}`}
      className={classnames(styles.dot, {
        [styles.activeDot]: isActive,
      })}
      onClick={() => onClick(index)}
    >
      {isActive && (
        <span
          key={`fill-${realIndex}`}
          className={styles.dotFill}
          style={activeDotStyle}
        />
      )}
    </button>
  );
};
