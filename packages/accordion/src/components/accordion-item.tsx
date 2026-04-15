import classnames from "classnames";
import { AccordionItemProps } from "../types/accordion.types";
import styles from "../styles/accordion.module.scss";
import { IconChevronDown } from "../assets/icons";

export const AccordionItem = (props: AccordionItemProps) => {
  const {
    id,
    style,
    title,
    isOpen,
    content,
    className,
    onToggle,
    renderTitle,
    renderContent,
  } = props;

  return (
    <div
      data-open={isOpen}
      style={style?.accordionItem}
      className={classnames(styles.accordionItem, className?.accordionItem)}
    >
      <button
        type="button"
        id={`accordion-header-${id}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        onClick={onToggle}
        className={styles.header}
      >
        <div className={styles.titleWrapper}>
          {renderTitle ? (
            renderTitle(title, isOpen)
          ) : (
            <h4 className={styles.title}>{title}</h4>
          )}
        </div>
        <div
          className={classnames(styles.iconWrapper, isOpen && styles.iconOpen)}
        >
          <IconChevronDown aria-hidden="true" className={styles.icon} />
        </div>
      </button>

      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
        aria-hidden={!isOpen}
        inert={!isOpen || undefined}
        className={styles.contentWrapper}
      >
        <div className={styles.contentInner}>
          {renderContent ? (
            renderContent(content)
          ) : (
            <p className={styles.text}>{content}</p>
          )}
        </div>
      </div>
    </div>
  );
};
