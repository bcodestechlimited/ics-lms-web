import {useState, useEffect} from "react";
import {useSearchParams} from "react-router";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "./ui/label";
import {useCourseFilterStore} from "@/store/course-filter.store";
import useDebounce from "@/hooks/use-debounce";

export function FilterComponent() {
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

  const debouncedSearch = useDebounce(localSearch, 500);

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

    // Reset to page=1 on any filter change
    params.page = "1";

    setSearchParams(params, {replace: true});

    // Write into Zustand store
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

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Filter Courses</h3>

      <div className="space-y-2">
        <Label>Search</Label>
        <Input
          type="text"
          placeholder="Search courses..."
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Rating</h4>
        {[5, 4, 3, 2, 1].map((star) => (
          <label key={star} className="flex items-center gap-2">
            <Checkbox
              checked={localRating === star}
              onCheckedChange={() => handleRatingChange(star)}
            />
            <span>
              {star} {Array.from({length: star}, () => "⭐").join("")}
            </span>
          </label>
        ))}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Category</Label>
        <Select onValueChange={handleCategoryChange} value={localCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web development">Web Development</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="mobile development">
              Mobile Development
            </SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="data science">Data Science</SelectItem>
            <SelectItem value="product management">
              Product Management
            </SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
