import React, { useMemo } from "react";
import classnames from "classnames";
import { Button } from "@bearlab/button";
import styles from "../styles/table.module.scss";
import { getVisiblePages } from "../utils/get-visible-pages";
import { IconChevronDown } from "../assets/icons";
import { PaginationNumber } from "./pagination-number";
import type { TablePaginationComponentProps } from "../types/table.types";

export const TablePagination = React.memo(
  (props: TablePaginationComponentProps) => {
    const {
      paginationId,
      totalPages,
      initialPage,
      maxPages,
      isMobile,
      mobileMinimize,
      disabled,
      showPageNumbers,
      showPageSizeSelector,
      pageSize,
      pageSizeOptions,
      pageSizePlaceholder,
      goToPage,
      onPageChange,
      renderPageInfo,
      className,
      style,
    } = props;

    const visiblePages = useMemo(
      () => getVisiblePages(totalPages, initialPage, maxPages),
      [totalPages, initialPage, maxPages]
    );

    const pageSizeSelectOptions = useMemo(
      () =>
        pageSizeOptions.map((size) => ({
          value: size.toString(),
          label: `${size} / page`,
        })),
      [pageSizeOptions]
    );

    return (
      <div
        id={paginationId}
        className={classnames(
          styles.paginationWrapper,
          className?.paginationWrapper
        )}
        style={style?.paginationWrapper}
      >
        <nav
          aria-label="Table pagination"
          className={classnames(
            styles.paginationControls,
            isMobile && styles.tabletControls,
            className?.paginationControls
          )}
          style={style?.paginationControls}
        >
          <Button
            label="Previous page"
            buttonType="justIcon"
            iconType={{ default: "arrow" }}
            onClick={() => goToPage(initialPage - 1)}
            disabled={disabled || initialPage === 1}
            variant="secondary"
            aria-label="Go to previous page"
            className={{
              root: classnames(styles.prevButton, className?.pageButton),
            }}
            reverseIconText
          />
          {mobileMinimize && (
            <span
              aria-live="polite"
              aria-atomic="true"
              className={classnames(styles.pageInfo, className?.pageInfo)}
              style={style?.pageInfo}
            >
              {renderPageInfo
                ? renderPageInfo(initialPage, totalPages)
                : `Page ${initialPage} of ${totalPages}`}
            </span>
          )}
          {showPageNumbers && (
            <ul
              className={classnames(
                styles.pageList,
                mobileMinimize && styles.ghostPageList,
                className?.pageList
              )}
              style={style?.pageList}
              aria-hidden={mobileMinimize}
            >
              {visiblePages.map((page, idx) =>
                page === "..." ? (
                  <li key={`ellipsis-${idx}`} aria-hidden="true">
                    <span
                      className={classnames(
                        styles.ellipsis,
                        className?.ellipsis
                      )}
                      style={style?.ellipsis}
                    >
                      &hellip;
                    </span>
                  </li>
                ) : (
                  <PaginationNumber
                    key={`page-${page}-${idx}`}
                    idx={idx}
                    page={page}
                    initialPage={initialPage}
                    goToPage={goToPage}
                    disabled={disabled}
                    className={className}
                  />
                )
              )}
            </ul>
          )}
          <Button
            label="Next page"
            buttonType="justIcon"
            iconType={{ default: "arrow" }}
            onClick={() => goToPage(initialPage + 1)}
            disabled={disabled || initialPage === totalPages}
            variant="secondary"
            aria-label="Go to next page"
            className={{
              root: classnames(styles.pageButton, className?.pageButton),
            }}
          />
        </nav>
        {showPageSizeSelector && (
          <div className={styles.pageSizeSelectorWrapper}>
            <select
              onChange={(e) => onPageChange(Number(e.target.value), true)}
              name="pageSize"
              value={pageSize.toString()}
              aria-label="Rows per page"
              className={classnames(
                styles.pageSizeSelector,
                className?.pageSizeSelector
              )}
            >
              {pageSizePlaceholder && (
                <option value="" disabled>
                  {pageSizePlaceholder}
                </option>
              )}
              {pageSizeSelectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className={styles.arrowIcon}>
              <IconChevronDown />
            </div>
          </div>
        )}
      </div>
    );
  }
);

TablePagination.displayName = "TablePagination";
