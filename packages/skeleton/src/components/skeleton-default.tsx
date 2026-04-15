import { SkeletonLine } from "./skeleton-line";
import type { SkeletonDefaultProps } from "../types/skeleton.types";
import styles from "../styles/skeleton.module.scss";

export const SkeletonDefault = (props: SkeletonDefaultProps) => {
  const { animated, lines } = props;

  return (
    <>
      {Array.from({ length: 2 }, (_, contentIndex) => (
        <div key={contentIndex} className={styles.content}>
          <div className={styles.section}>
            {Array.from(
              { length: contentIndex === 0 ? 2 : lines },
              (_, lineIndex) => (
                <SkeletonLine
                  key={lineIndex}
                  animated={animated}
                  style={{
                    width: `${Math.random() * 40 + 40}%`,
                    ...(lineIndex === (contentIndex === 0 ? 1 : lines - 1) && {
                      width: "70%",
                    }),
                  }}
                />
              ),
            )}
          </div>
          <div className={styles.section}>
            {Array.from(
              { length: contentIndex === 0 ? 2 : lines },
              (_, lineIndex) => (
                <SkeletonLine
                  key={lineIndex}
                  animated={animated}
                  style={{
                    width: `${Math.random() * 40 + 40}%`,
                    ...(lineIndex === (contentIndex === 0 ? 1 : lines - 1) && {
                      width: "70%",
                    }),
                  }}
                />
              ),
            )}
          </div>
        </div>
      ))}
    </>
  );
};
