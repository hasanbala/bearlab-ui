import React from "react";
import classnames from "classnames";
import { Button } from "@bearlab/button";
import styles from "../styles/table.module.scss";
import type { PaginationNumberProps } from "../types/table.types";

export const PaginationNumber = React.memo((props: PaginationNumberProps) => {
  const { className, page, idx, initialPage, goToPage, disabled } = props;

  return (
    <li key={`page-${page}-${idx}`}>
      <Button
        buttonType="justText"
        label={String(page)}
        onClick={() => goToPage(page as number)}
        disabled={disabled}
        aria-label={`Go to page ${page}`}
        aria-current={initialPage === page ? "page" : undefined}
        className={{
          root: classnames(
            initialPage === page
              ? classnames(styles.pageButtonActive, className?.pageButtonActive)
              : classnames(
                  styles.pageButtonInactive,
                  className?.pageButtonInactive
                ),
            className?.pageButton
          ),
        }}
      />
    </li>
  );
});

PaginationNumber.displayName = "PaginationNumber";
