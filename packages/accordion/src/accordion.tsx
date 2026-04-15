import { useState } from "react";
import classnames from "classnames";
import { AccordionItem } from "./components/accordion-item";
import { AccordionProps } from "./types/accordion.types";
import styles from "./styles/accordion.module.scss";

export const Accordion = (props: AccordionProps) => {
  const {
    style,
    items,
    className,
    allowMultiple = false,
    defaultOpenIndexes = [],
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
      className={classnames(styles.container, className?.root)}
    >
      {items.map((item, index) => (
        <AccordionItem
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
