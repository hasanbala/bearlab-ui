import styles from "./faq.module.scss";
import classnames from "classnames";
import { Button, BUTTON_TYPE, ICON_TYPE } from "@bearlab/button";

export const FaqByOne = (props: Props) => {
  const { title, content, isOpen, toggleAccordion } = props;

  return (
    <div className={styles.faqByOne}>
      <div
        onClick={toggleAccordion}
        className={classnames(styles.header, isOpen && styles.headerOpen)}
      >
        <h4 className={styles.title}>{title}</h4>
        <Button
          label=""
          buttonType={BUTTON_TYPE.JUST_ICON}
          iconType={{ default: ICON_TYPE.ARROW_DOWN }}
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
  toggleAccordion: () => void;
}
