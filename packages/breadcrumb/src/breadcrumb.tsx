import { IconArrowRight, IconHome } from "./assets/icons";
import type {
  BreadcrumbProps,
  DefaultLinkProps,
} from "./types/breadcrumb.types";
import { SEPARATE_TYPE } from "./constants/breadcrumb-config";
import styles from "./styles/breadcrumb.module.scss";
import classnames from "classnames";

const DefaultLink = ({
  href,
  className,
  style,
  children,
}: DefaultLinkProps) => (
  <a href={href} className={className} style={style}>
    {children}
  </a>
);

export const Breadcrumb = (props: BreadcrumbProps) => {
  const {
    currentPageTitle,
    fromPageTitle = "Home Page",
    fromPageUrl = "/",
    showHomeIcon,
    separateType = SEPARATE_TYPE.ARROW,
    className,
    style,
    renderLink,
  } = props;

  const LinkComponent = renderLink ?? DefaultLink;

  const separator = {
    [SEPARATE_TYPE.ARROW]: <IconArrowRight aria-hidden="true" />,
    [SEPARATE_TYPE.SLASH]: (
      <span aria-hidden="true" className={styles.slash}>
        /
      </span>
    ),
    [SEPARATE_TYPE.DOT]: <span aria-hidden="true" className={styles.dot} />,
  };

  return (
    <div
      className={classnames(styles.container, className?.root)}
      style={style?.root}
    >
      <h2
        className={classnames(styles.title, className?.title)}
        style={style?.title}
      >
        {currentPageTitle}
      </h2>

      <nav
        aria-label="breadcrumb"
        className={classnames(styles.nav, className?.nav)}
        style={style?.nav}
      >
        <ol className={styles.list}>
          <li className={styles.item}>
            <LinkComponent
              href={fromPageUrl}
              className={classnames(styles.link, className?.fromLink)}
              style={style?.fromLink}
            >
              {showHomeIcon && <IconHome aria-hidden="true" />}
              {fromPageTitle}
            </LinkComponent>
          </li>

          <li aria-hidden="true" className={styles.separator}>
            {separator[separateType]}
          </li>

          <li className={styles.item}>
            <span
              aria-current="page"
              className={classnames(styles.current, className?.current)}
              style={style?.current}
            >
              {currentPageTitle}
            </span>
          </li>
        </ol>
      </nav>
    </div>
  );
};
