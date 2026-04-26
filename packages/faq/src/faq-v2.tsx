import { useState } from "react";
import classnames from "classnames";
import { FaqItemV2 } from "./components/faq-item-v2";
import styles from "./styles/faq.module.scss";
import type { FaqV2Props } from "./types/faq.types";

export const FaqV2 = (props: FaqV2Props) => {
  const { data, className, style } = props;

  const [openIndexFirstGroup, setOpenIndexFirstGroup] = useState<number | null>(
    0
  );
  const [openIndexSecondGroup, setOpenIndexSecondGroup] = useState<
    number | null
  >(0);

  const handleToggleFirstGroup = (index: number) =>
    setOpenIndexFirstGroup(openIndexFirstGroup === index ? null : index);

  const handleToggleSecondGroup = (index: number) =>
    setOpenIndexSecondGroup(openIndexSecondGroup === index ? null : index);

  const renderFaqItems = (
    list: typeof data,
    openIndex: number | null,
    handleToggle: (index: number) => void
  ) =>
    list.map((item, index) => (
      <FaqItemV2
        key={index}
        title={item.title}
        content={item.content}
        isOpen={openIndex === index}
        toggleAccordion={() => handleToggle(index)}
        className={className}
        style={style}
      />
    ));

  return (
    <div
      className={classnames(styles.containerByFaqTwo, className?.root)}
      style={style?.root}
    >
      <div className={styles.column}>
        {renderFaqItems(
          data.slice(0, 3),
          openIndexFirstGroup,
          handleToggleFirstGroup
        )}
      </div>
      <div className={styles.column}>
        {renderFaqItems(
          data.slice(3, 7),
          openIndexSecondGroup,
          handleToggleSecondGroup
        )}
      </div>
    </div>
  );
};
