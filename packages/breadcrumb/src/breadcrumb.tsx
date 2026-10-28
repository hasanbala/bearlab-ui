import { IconArrowRight, IconHome } from "./assets/icons";
import type {
  BreadcrumbProps,
  DefaultLinkProps,
} from "./types/breadcrumb.types";
import { SEPARATE_TYPE } from "./constants/breadcrumb-config";
import styles from "./styles/breadcrumb.module.scss";
import { Fragment } from "react";
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
    items,
    navLabel = "Breadcrumb",
    showTitle = true,
    headingLevel = 2,
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
  const Heading = `h${headingLevel}` as const;
  const trail = items ?? [{ href: fromPageUrl, title: fromPageTitle }];

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
      {showTitle && (
        <Heading
          className={classnames(styles.title, className?.title)}
          style={style?.title}
        >
          {currentPageTitle}
        </Heading>
      )}

      <nav
        aria-label={navLabel}
        className={classnames(styles.nav, className?.nav)}
        style={style?.nav}
      >
        <ol className={styles.list}>
          {trail.map((item, index) => (
            <Fragment key={`${item.href}-${index}`}>
              <li className={styles.item}>
                <LinkComponent
                  href={item.href}
                  className={classnames(styles.link, className?.fromLink)}
                  style={style?.fromLink}
                >
                  {index === 0 && showHomeIcon && (
                    <IconHome aria-hidden="true" />
                  )}
                  {item.title}
                </LinkComponent>
              </li>
              <li aria-hidden="true" className={styles.separator}>
                {separator[separateType]}
              </li>
            </Fragment>
          ))}

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
