import { useState } from "react";
import { FaqByTwo } from "./faqByTwo";
import styles from "./faq.module.scss";

export const FaqV2 = (props: Props) => {
  const { data } = props;

  const [openIndexFirstGroup, setOpenIndexFirstGroup] = useState<number | null>(
    0
  );
  const [openIndexSecondGroup, setOpenIndexSecondGroup] = useState<
    number | null
  >(0);

  const handleToggleFirstGroup = (index: number) =>
    setOpenIndexFirstGroup(openIndexFirstGroup == index ? null : index);

  const handleToggleSecondGroup = (index: number) =>
    setOpenIndexSecondGroup(openIndexSecondGroup == index ? null : index);

  const renderFaqItems = (
    data: { title: string; content: string }[],
    openIndex: number | null,
    handleToggle: (index: number) => void
  ) =>
    data.map((item, index) => (
      <FaqByTwo
        key={index}
        title={item.title}
        content={item.content}
        isOpen={openIndex == index}
        toggleAccordionTwo={() => handleToggle(index)}
      />
    ));

  return (
    <div className={styles.containerByFaqTwo}>
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

export interface Props {
  data: {
    title: string;
    content: string;
  }[];
}
