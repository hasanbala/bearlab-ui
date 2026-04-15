export const getVisiblePages = (
  totalPages: number,
  currentPage: number,
  maxPages: number
): (number | "...")[] => {
  if (totalPages <= maxPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];
  const halfMaxPages = Math.floor(maxPages / 2);

  pages.push(1);

  let start: number;
  let end: number;

  if (currentPage <= halfMaxPages + 1) {
    start = 2;
    end = Math.min(maxPages - 1, totalPages - 1);
  } else if (currentPage >= totalPages - halfMaxPages) {
    start = Math.max(totalPages - maxPages + 2, 2);
    end = totalPages - 1;
  } else {
    start = currentPage - halfMaxPages + 1;
    end = currentPage + halfMaxPages - 1;
  }

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
};
