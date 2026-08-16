import AllCoursesContent from "@/components/all-courses";
import { FilterComponent } from "@/components/filter-component";
import Footer from "@/components/footer";
import NoCoursesFound from "@/components/no-course-found";
import PagePagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetAllCourses } from "@/hooks/use-course";
import { useCourseFilterStore } from "@/store/course-filter.store";
import { Filter, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetAllCourses();
  const setCategory = useCourseFilterStore((state) => state.setCategory);
  const { page, setPage, search, rating, category } = useCourseFilterStore();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const courses = (!isLoading && data?.data.courses) || [];
  const totalPages = (!isLoading && data?.data?.pagination?.totalPages) || 1;

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
    } else {
      setCategory("");
    }
  }, [searchParams, setCategory]);

  // Calculate total active filters count
  const activeFiltersCount = [
    Boolean(search),
    rating !== null,
    Boolean(category),
  ].filter(Boolean).length;

  const handleRemoveFilter = (filterType: "search" | "rating" | "category") => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(filterType);
    newParams.set("page", "1");
    setSearchParams(newParams, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Banner Section */}
      <header className="pt-6 sm:pt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#0B2239] via-[#134587] to-[#0A1A2E] text-white p-6 sm:p-10 md:p-12 border border-white/10">
            {/* Background Decorative Graphic */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <img
              src="/assets/image/course-hero.png"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20 pointer-events-none"
              alt=""
            />

            <div className="relative z-10 max-w-2xl space-y-3.5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold tracking-wider uppercase border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>World-Class Online Learning</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Sharpen Your Skills with Professional Courses
              </h1>
              <p className="text-xs sm:text-base text-white/80 leading-relaxed max-w-xl">
                Access hundreds of expert-led courses across technology, design, business, and personal growth to advance your career.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 flex-1">
        {/* Page Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-1.5 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              All Courses
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Explore industry-vetted courses taught by real-world professionals.
            </p>
          </div>

          {/* Mobile Filter Trigger & Course Count Bar */}
          <div className="flex items-center justify-between gap-3 w-full lg:hidden pt-2">
            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl gap-2 font-semibold text-xs h-10 px-4 shadow-xs shrink-0"
                >
                  <Filter className="w-4 h-4 text-primary" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-xs p-6 overflow-y-auto">
                <SheetHeader className="p-0 pb-4 text-left border-b border-border/60">
                  <SheetTitle className="text-lg font-bold">Filter Courses</SheetTitle>
                </SheetHeader>
                <div className="pt-4">
                  <FilterComponent onFilterApply={() => setIsMobileFilterOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            <span className="text-xs text-muted-foreground font-medium shrink-0">
              {!isLoading && `${courses.length} ${courses.length === 1 ? "course" : "courses"}`}
            </span>
          </div>
        </div>

        {/* Active Filter Badges (if any) */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-medium text-muted-foreground mr-1">
              Active Filters:
            </span>
            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                Search: "{search}"
                <button
                  type="button"
                  onClick={() => handleRemoveFilter("search")}
                  className="hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20 capitalize">
                Category: {category}
                <button
                  type="button"
                  onClick={() => handleRemoveFilter("category")}
                  className="hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {rating !== null && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                Rating: {rating}★ & up
                <button
                  type="button"
                  onClick={() => handleRemoveFilter("rating")}
                  className="hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-card p-6 rounded-2xl border border-border/80 shadow-xs sticky top-24 space-y-6">
            <FilterComponent />
          </aside>

          {/* Courses Listing Main Column */}
          <section className="w-full lg:col-span-9">
            {courses.length === 0 && !isLoading ? (
              <div className="flex items-center justify-center py-12 px-4 rounded-2xl bg-muted/20 border border-dashed border-border">
                <NoCoursesFound />
              </div>
            ) : (
              <div className="space-y-8">
                <AllCoursesContent courses={courses} isLoading={isLoading} />
                <PagePagination
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
