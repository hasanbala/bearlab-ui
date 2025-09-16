import { useState } from "react";
import { FaqByOne } from "./faqByOne";
import styles from "./faq.module.scss";

export const FaqV1 = (props: Props) => {
  const { data } = props;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) =>
    setOpenIndex(openIndex == index ? null : index);

  return (
    <div className={styles.containerByFaqOne}>
      {data.map((item, index) => (
        <FaqByOne
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex == index}
          toggleAccordion={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export interface Props {
  data: { title: string; content: string }[];
}
