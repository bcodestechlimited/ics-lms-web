import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between sm:justify-center gap-3 sm:gap-6 mt-8 sm:mt-12 py-4 w-full border-t border-border/60">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        className="rounded-xl px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium gap-1.5 shadow-xs"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </Button>

      <div className="text-xs sm:text-sm font-medium text-muted-foreground px-2 text-center">
        Page <span className="font-bold text-foreground">{page}</span> of{" "}
        <span className="font-bold text-foreground">{totalPages}</span>
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
        className="rounded-xl px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium gap-1.5 shadow-xs"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
