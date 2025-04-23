import { Button } from "./ui/button";

interface PagePaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function PagePagination({
  page,
  setPage,
  totalPages,
}: PagePaginationProps) {
  return (
    <div className="flex items-center mt-8 gap-x-8 w-max">
      <Button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 disabled:opacity-50"
      >
        Previous
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
}
