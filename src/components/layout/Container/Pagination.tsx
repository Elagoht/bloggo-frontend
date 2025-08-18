import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Button from "../../form/Button";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const maxVisiblePages = props.maxVisiblePages || 5;

  // Get current page from URL parameters instead of props
  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1"),
    [searchParams]
  );

  const totalPages = useMemo(
    () => Math.ceil(props.totalItems / props.itemsPerPage),
    [props.totalItems, props.itemsPerPage]
  );

  const visiblePages = useMemo(() => {
    const total = totalPages;
    const current = currentPage;
    const maxVisible = maxVisiblePages;

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisible / 2);
    let start = Math.max(1, current - halfVisible);
    let end = Math.min(total, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [totalPages, currentPage, maxVisiblePages]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", page.toString());
      setSearchParams(newParams);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous Button */}
      <Button
        variant="outline"
        color="primary"
        iconLeft={IconChevronLeft}
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {/* First page if not visible */}
        {visiblePages[0] > 1 && (
          <>
            <Button
              variant="text"
              color="primary"
              onClick={() => goToPage(1)}
              className="w-10 h-10"
            >
              1
            </Button>
            {visiblePages[0] > 2 && (
              <span className="px-2 text-smoke-500">...</span>
            )}
          </>
        )}

        {/* Visible page numbers */}
        {visiblePages.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPage ? "default" : "text"}
            color="primary"
            onClick={() => goToPage(pageNumber)}
            className="w-10 h-10"
          >
            {pageNumber}
          </Button>
        ))}

        {/* Last page if not visible */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-smoke-500">...</span>
            )}
            <Button
              variant="text"
              color="primary"
              onClick={() => goToPage(totalPages)}
              className="w-10 h-10"
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        color="primary"
        iconRight={IconChevronRight}
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;
