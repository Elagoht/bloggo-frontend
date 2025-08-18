import { Component, createMemo, For } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-solidjs";
import Button from "../../form/Button";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  maxVisiblePages?: number;
}

const Pagination: Component<PaginationProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const maxVisiblePages = () => props.maxVisiblePages || 5;

  // Get current page from URL parameters instead of props
  const currentPage = createMemo(
    () => parseInt(searchParams.page as string) || 1
  );

  const totalPages = createMemo(() =>
    Math.ceil(props.totalItems / props.itemsPerPage)
  );

  const visiblePages = createMemo(() => {
    const total = totalPages();
    const current = currentPage();
    const maxVisible = maxVisiblePages();

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
  });

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages()) {
      const newParams = Object.fromEntries(
        Object.entries(searchParams).filter(([key]) => key !== "page")
      );
      newParams.page = page.toString();
      setSearchParams(newParams);
    }
  };

  if (totalPages() <= 1) {
    return null;
  }

  return (
    <div class="flex items-center justify-center gap-2 mt-6">
      {/* Previous Button */}
      <Button
        variant="outline"
        color="primary"
        iconLeft={IconChevronLeft}
        disabled={currentPage() === 1}
        onClick={() => goToPage(currentPage() - 1)}
        class="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </Button>

      {/* Page Numbers */}
      <div class="flex items-center gap-1">
        {/* First page if not visible */}
        {visiblePages()[0] > 1 && (
          <>
            <Button
              variant="text"
              color="primary"
              onClick={() => goToPage(1)}
              class="w-10 h-10"
            >
              1
            </Button>
            {visiblePages()[0] > 2 && (
              <span class="px-2 text-smoke-500">...</span>
            )}
          </>
        )}

        {/* Visible page numbers */}
        <For each={visiblePages()}>
          {(pageNumber) => (
            <Button
              variant={pageNumber === currentPage() ? "default" : "text"}
              color="primary"
              onClick={() => goToPage(pageNumber)}
              class="w-10 h-10"
            >
              {pageNumber}
            </Button>
          )}
        </For>

        {/* Last page if not visible */}
        {visiblePages()[visiblePages().length - 1] < totalPages() && (
          <>
            {visiblePages()[visiblePages().length - 1] < totalPages() - 1 && (
              <span class="px-2 text-smoke-500">...</span>
            )}
            <Button
              variant="text"
              color="primary"
              onClick={() => goToPage(totalPages())}
              class="w-10 h-10"
            >
              {totalPages()}
            </Button>
          </>
        )}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        color="primary"
        iconRight={IconChevronRight}
        disabled={currentPage() === totalPages()}
        onClick={() => goToPage(currentPage() + 1)}
        class="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
