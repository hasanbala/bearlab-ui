import classnames from "classnames";
import { FaqItemV3 } from "./components/faq-item-v3";
import styles from "./styles/faq.module.scss";
import type { FaqV3Props } from "./types/faq.types";

export const FaqV3 = (props: FaqV3Props) => {
  const { data, iconType, className, style } = props;

  return (
    <div
      className={classnames(styles.containerByFaqThree, className?.root)}
      style={style?.root}
    >
      {data.map((item, index: number) => (
        <FaqItemV3
          key={index}
          item={item}
          iconType={iconType}
          className={className}
          style={style}
        />
      ))}
    </div>
  );
};
