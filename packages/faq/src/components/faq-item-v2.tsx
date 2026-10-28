import classnames from "classnames";
import { Button } from "@bearlab/button";
import styles from "../styles/faq.module.scss";
import type { FaqItemProps } from "../types/faq.types";

export const FaqItemV2 = (props: FaqItemProps) => {
  const { id, title, content, isOpen, toggleAccordion, className, style } =
    props;
  const panelId = `${id}-panel`;

  const handleToggle = () => {
    if (toggleAccordion) toggleAccordion();
  };

  return (
    <div
      className={classnames(
        styles.faqByTwo,
        isOpen && styles.open,
        className?.item
      )}
      style={style?.item}
    >
      <div
        onClick={handleToggle}
        className={classnames(
          styles.header,
          isOpen ? styles.headerOpen : styles.headerClosed,
          className?.header
        )}
        style={style?.header}
      >
        <h4
          className={classnames(
            styles.title,
            isOpen ? styles.titleOpen : styles.titleClosed,
            className?.title
          )}
          style={style?.title}
        >
          {title}
        </h4>
        <Button
          label="Toggle accordion"
          aria-label={title}
          aria-expanded={!!isOpen}
          aria-controls={panelId}
          buttonType="justIcon"
          iconType={isOpen ? "minus" : "plus"}
          className={{
            root: classnames(
              styles.icon,
              isOpen && styles.iconOpen,
              className?.icon
            ),
          }}
          style={{ root: style?.icon }}
        />
      </div>
      {isOpen && (
        <div
          id={panelId}
          className={classnames(styles.content, className?.content)}
          style={style?.content}
        >
          <p
            className={classnames(styles.text, className?.text)}
            style={style?.text}
          >
            {content}
          </p>
        </div>
      )}
    </div>
  );
};
