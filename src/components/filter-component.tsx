import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./ui/label";
import { useCourseFilterStore } from "@/store/course-filter.store";
import useDebounce from "@/hooks/use-debounce";

export function FilterComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState(
    searchParams.get("search") || ""
  );
  const [localRating, setLocalRating] = useState<number | null>(
    searchParams.get("rating") ? Number(searchParams.get("rating")) : null
  );
  const [localTopic, setLocalTopic] = useState(searchParams.get("topic") || "");

  const setSearch = useCourseFilterStore((state) => state.setSearch);
  const setRating = useCourseFilterStore((state) => state.setRating);
  const setTopic = useCourseFilterStore((state) => state.setTopic);

  const debouncedLocalSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (debouncedLocalSearch) params.search = debouncedLocalSearch;
    if (localRating) params.rating = localRating.toString();
    if (localTopic) params.topic = localTopic;

    setSearchParams(params, { replace: true });
    setSearch(debouncedLocalSearch);
  }, [
    debouncedLocalSearch,
    localRating,
    localTopic,
    setSearchParams,
    setSearch,
  ]);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
  };

  const handleRatingChange = (value: number) => {
    const newRating = localRating === value ? null : value;
    setLocalRating(newRating);
    setRating(newRating);
  };

  const handleTopicChange = (value: string) => {
    if (value === "all") {
      setLocalTopic("");
      setTopic("");
    } else {
      setLocalTopic(value);
      setTopic(value);
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
              {star} {Array.from({ length: star }, () => "⭐").join("")}
            </span>
          </label>
        ))}
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Category</Label>
        <Select onValueChange={handleTopicChange}>
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
