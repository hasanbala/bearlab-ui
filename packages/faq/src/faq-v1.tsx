import classnames from "classnames";
import { FaqItemV1 } from "./components/faq-item-v1";
import styles from "./styles/faq.module.scss";
import type { FaqV1Props } from "./types/faq.types";
import { useState } from "react";

export const FaqV1 = (props: FaqV1Props) => {
  const {
    data,
    className,
    style,
    defaultOpenIndexes = [],
    allowMultiple = false,
    renderTitle,
    renderContent,
  } = props;

  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    () => new Set(defaultOpenIndexes)
  );

  const handleToggle = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);

      if (allowMultiple) {
        next.has(index) ? next.delete(index) : next.add(index);
      } else {
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.clear();
          next.add(index);
        }
      }
      return next;
    });
  };

  return (
    <div
      style={style?.root}
      className={classnames(styles.containerByFaqOne, className?.root)}
    >
      {data.map((item, index) => (
        <FaqItemV1
          style={style}
          title={item.title}
          className={className}
          key={item.id ?? index}
          id={item.id ?? String(index)}
          content={item.content}
          isOpen={openIndexes.has(index)}
          renderTitle={renderTitle}
          renderContent={renderContent}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};
