import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/hooks/use-debounce";
import { useCourseFilterStore } from "@/store/course-filter.store";
import { Filter, RotateCcw, Search, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "./ui/button";

export function FilterComponent({ onFilterApply }: { onFilterApply?: () => void }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [localSearch, setLocalSearch] = useState(
    searchParams.get("search") || ""
  );
  const [localRating, setLocalRating] = useState<number | null>(
    searchParams.get("rating") ? Number(searchParams.get("rating")) : null
  );
  const [localCategory, setLocalCategory] = useState(
    searchParams.get("category") || ""
  );

  // Zustand setters
  const setSearch = useCourseFilterStore((s) => s.setSearch);
  const setRating = useCourseFilterStore((s) => s.setRating);
  const setCategory = useCourseFilterStore((s) => s.setCategory);
  const setPage = useCourseFilterStore((s) => s.setPage);

  const debouncedSearch = useDebounce(localSearch, 400);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (debouncedSearch) {
      params.search = debouncedSearch;
    }
    if (localRating !== null) {
      params.rating = String(localRating);
    }
    if (localCategory) {
      params.category = localCategory;
    }

    params.page = "1";

    setSearchParams(params, { replace: true });

    setSearch(debouncedSearch);
    setRating(localRating);
    setCategory(localCategory);
    setPage(1);
  }, [
    debouncedSearch,
    localRating,
    localCategory,
    setSearchParams,
    setSearch,
    setRating,
    setCategory,
    setPage,
  ]);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
  };

  const handleRatingChange = (value: number) => {
    const toggled = localRating === value ? null : value;
    setLocalRating(toggled);
  };

  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      setLocalCategory("");
    } else {
      setLocalCategory(value);
    }
  };

  const hasActiveFilters = Boolean(localSearch || localRating !== null || localCategory);

  const handleResetFilters = () => {
    setLocalSearch("");
    setLocalRating(null);
    setLocalCategory("");
  };

  return (
    <div className="space-y-6">
      {/* Header & Reset Action */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="text-base font-bold text-foreground">Filter Courses</h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Search
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search keywords..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 pr-8 h-10 text-xs sm:text-sm rounded-xl border-border/80"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => setLocalSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Category
        </Label>
        <Select onValueChange={handleCategoryChange} value={localCategory || "all"}>
          <SelectTrigger className="w-full h-10 text-xs sm:text-sm rounded-xl border-border/80">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="web development">Web Development</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="mobile development">Mobile Development</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="data science">Data Science</SelectItem>
            <SelectItem value="product management">Product Management</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rating Selection */}
      <div className="space-y-2.5">
        <Label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Minimum Rating
        </Label>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <label
              key={star}
              className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer text-xs font-medium ${
                localRating === star
                  ? "bg-primary/10 border-primary/40 text-primary font-semibold"
                  : "bg-muted/30 border-border/60 hover:bg-muted/60 text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={localRating === star}
                  onCheckedChange={() => handleRatingChange(star)}
                />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < star
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono">
                {star}.0 & up
              </span>
            </label>
          ))}
        </div>
      </div>

      {onFilterApply && (
        <div className="pt-2">
          <Button
            type="button"
            onClick={onFilterApply}
            className="w-full h-10 rounded-xl font-semibold text-xs"
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}
