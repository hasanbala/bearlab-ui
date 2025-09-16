import classnames from "classnames";
import { Button, BUTTON_TYPE, ICON_TYPE } from "@bearlab/button";
import styles from "./faq.module.scss";

export const FaqByTwo = (props: Props) => {
  const { title, content, isOpen, toggleAccordionTwo } = props;

  return (
    <div className={classnames(styles.faqByTwo, isOpen && styles.open)}>
      <div
        onClick={toggleAccordionTwo}
        className={classnames(
          styles.header,
          isOpen ? styles.headerOpen : styles.headerClosed
        )}
      >
        <h4
          className={classnames(
            styles.title,
            isOpen ? styles.titleOpen : styles.titleClosed
          )}
        >
          {title}
        </h4>
        <Button
          label=""
          buttonType={BUTTON_TYPE.JUST_ICON}
          iconType={{ default: isOpen ? ICON_TYPE.MINUS : ICON_TYPE.PLUS }}
          className={classnames(styles.icon, isOpen && styles.iconOpen)}
        />
      </div>
      {isOpen && (
        <div className={styles.content}>
          <p className={styles.text}>{content}</p>
        </div>
      )}
    </div>
  );
};

interface Props {
  title: string;
  content: string;
  isOpen: boolean;
  toggleAccordionTwo: () => void;
}
