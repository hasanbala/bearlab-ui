import classnames from "classnames";
import styles from "../styles/faq.module.scss";
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
} from "../assets/icons";
import type { FaqV3ItemProps } from "../types/faq.types";

const ICONS = {
  add: IconAdd,
  export: IconExport,
  document: IconDocument,
  update: IconUpdate,
  search: IconSearch,
  notify: IconPing,
  dots: IconDots,
  tick: IconTick,
  support: IconSupport,
  none: null,
} as const;

const resolveIconNode = (
  iconType: NonNullable<FaqV3ItemProps["iconType"]>
): React.ReactNode => {
  if (iconType.custom) return iconType.custom;

  const Icon = ICONS[iconType.default];
  if (!Icon) return null;

  return <Icon aria-hidden="true" focusable="false" />;
};

export const FaqItemV3 = (props: FaqV3ItemProps) => {
  const { item, iconType, className, style } = props;

  return (
    <div
      className={classnames(styles.wrapperFaq, className?.item)}
      style={style?.item}
    >
      <div
        className={classnames(styles.iconContainer, className?.icon)}
        style={style?.icon}
      >
        {resolveIconNode(iconType)}
      </div>
      <div
        className={classnames(styles.content, className?.content)}
        style={style?.content}
      >
        <h4
          className={classnames(styles.title, className?.title)}
          style={style?.title}
        >
          {item.title}
        </h4>
        <p
          className={classnames(styles.description, className?.text)}
          style={style?.text}
        >
          {item.content}
        </p>
      </div>
    </div>
  );
};
