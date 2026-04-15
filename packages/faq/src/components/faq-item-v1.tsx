import classnames from "classnames";
import { Button } from "@bearlab/button";
import styles from "../styles/faq.module.scss";
import type { FaqItemV1Props } from "../types/faq.types";

export const FaqItemV1 = (props: FaqItemV1Props) => {
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
      <div
        role="button"
        aria-expanded={isOpen}
        id={`accordion-header-${id}`}
        aria-controls={`accordion-panel-${id}`}
        onClick={onToggle}
        style={style?.header}
        className={classnames(styles.header, className?.header)}
      >
        <div
          style={style?.titleWrapper}
          className={classnames(styles.titleWrapper, className?.titleWrapper)}
        >
          {renderTitle ? (
            renderTitle(title, isOpen)
          ) : (
            <h4 className={styles.title}>{title}</h4>
          )}
        </div>
        <Button
          label=""
          buttonType={"justIcon"}
          iconType={{ default: "arrow_down" }}
          style={{ root: style?.icon }}
          className={{
            root: classnames(
              styles.icon,
              isOpen && styles.iconOpen,
              className?.icon
            ),
          }}
        />
      </div>
      <div
        style={style?.contentWrapper}
        className={classnames(styles.contentWrapper, className?.contentWrapper)}
        aria-hidden={!isOpen}
      >
        <div
          style={style?.contentInner}
          className={classnames(styles.contentInner, className?.contentInner)}
        >
          {renderContent ? (
            renderContent(content)
          ) : (
            <p
              style={style?.text}
              className={classnames(styles.text, className?.text)}
            >
              {content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
