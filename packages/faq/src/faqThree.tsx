import styles from "./faq.module.scss";
import {
  IconAdd,
  IconDocument,
  IconDots,
  IconExport,
  IconPing,
  IconSearch,
  IconTick,
  IconUpdate,
  IconSupport,
} from "@bearlab/core";
import { ICON_TYPE } from "./helpers";

export const FaqV3 = (props: Props) => {
  const { data, iconType } = props;

  const iconTypes = {
    [ICON_TYPE.ADD]: <IconAdd />,
    [ICON_TYPE.EXPORT]: <IconExport />,
    [ICON_TYPE.DOCUMENT]: <IconDocument />,
    [ICON_TYPE.UPDATE]: <IconUpdate />,
    [ICON_TYPE.SEARCH]: <IconSearch />,
    [ICON_TYPE.NOTIFY]: <IconPing />,
    [ICON_TYPE.DOTS]: <IconDots />,
    [ICON_TYPE.TICK]: <IconTick />,
    [ICON_TYPE.SUPPORT]: <IconSupport />,
    [ICON_TYPE.NONE]: <></>,
  };

  return (
    <div className={styles.containerByFaqThree}>
      {data.map((item, index: number) => (
        <div className={styles.wrapperFaq} key={index}>
          <div className={styles.iconContainer}>
            {iconType?.custom || iconTypes[iconType.default]}
          </div>
          <div className={styles.content}>
            <h4 className={styles.title}>{item.title}</h4>
            <p className={styles.description}>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export interface Props {
  data: { title: string; content: string }[];
  iconType: {
    default:
      | ICON_TYPE.NONE
      | ICON_TYPE.EXPORT
      | ICON_TYPE.ADD
      | ICON_TYPE.DOCUMENT
      | ICON_TYPE.UPDATE
      | ICON_TYPE.SEARCH
      | ICON_TYPE.NOTIFY
      | ICON_TYPE.DOTS
      | ICON_TYPE.TICK
      | ICON_TYPE.SUPPORT;
    custom?: null | React.ReactElement;
  };
}
