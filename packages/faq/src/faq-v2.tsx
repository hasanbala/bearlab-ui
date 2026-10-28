import { useId, useState } from "react";
import classnames from "classnames";
import { FaqItemV2 } from "./components/faq-item-v2";
import styles from "./styles/faq.module.scss";
import type { FaqData, FaqV2Props } from "./types/faq.types";

const splitIntoColumns = (data: FaqData[], columns: number): FaqData[][] => {
  const count = Math.max(1, Math.floor(columns));
  const size = Math.ceil(data.length / count);
  return Array.from({ length: count }, (_, i) =>
    data.slice(i * size, (i + 1) * size)
  ).filter((group) => group.length > 0);
};

export const FaqV2 = (props: FaqV2Props) => {
  const { data, columns = 2, className, style } = props;

  const uid = useId();
  const groups = splitIntoColumns(data, columns);
  const [openIndexes, setOpenIndexes] = useState<Record<number, number | null>>(
    {}
  );

  const getOpenIndex = (groupIndex: number) =>
    openIndexes[groupIndex] === undefined ? 0 : openIndexes[groupIndex];

  const handleToggle = (groupIndex: number, index: number) =>
    setOpenIndexes((prev) => ({
      ...prev,
      [groupIndex]: getOpenIndex(groupIndex) === index ? null : index,
    }));

  return (
    <div
      className={classnames(styles.containerByFaqTwo, className?.root)}
      style={style?.root}
    >
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.column}>
          {group.map((item, index) => (
            <FaqItemV2
              key={item.id ?? index}
              id={`${uid}-${groupIndex}-${index}`}
              title={item.title}
              content={item.content}
              isOpen={getOpenIndex(groupIndex) === index}
              toggleAccordion={() => handleToggle(groupIndex, index)}
              className={className}
              style={style}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
