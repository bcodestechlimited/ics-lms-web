import AllCoursesContent from "@/components/all-courses";
import {FilterComponent} from "@/components/filter-component";
import Footer from "@/components/footer";
import NoCoursesFound from "@/components/no-course-found";
import PagePagination from "@/components/pagination";
import {useGetAllPublishedCourses} from "@/hooks/use-course";
import {useCourseFilterStore} from "@/store/course-filter.store";
import {useEffect} from "react";
import {useSearchParams} from "react-router";

export default function CourseCategoryPage() {
  const [searchParams] = useSearchParams();

  // Zustand setters
  const setCategory = useCourseFilterStore((s) => s.setCategory);
  const setSearch = useCourseFilterStore((s) => s.setSearch);
  const setRating = useCourseFilterStore((s) => s.setRating);
  const setPage = useCourseFilterStore((s) => s.setPage);
  const page = useCourseFilterStore((s) => s.page);

  // This hook now reads from `search`, `rating`, `category`, `page`, `limit`
  const {data, isLoading} = useGetAllPublishedCourses();
  const courses = (!isLoading && data?.responseObject?.docs) || [];
  const totalPages = (!isLoading && data?.responseObject?.totalPages) || 1;

  useEffect(() => {
    // On mount (or whenever the URL changes), sync URL → Zustand store:
    const categoryFromUrl = searchParams.get("category") || "";
    const searchFromUrl = searchParams.get("search") || "";
    const ratingFromUrl = searchParams.get("rating")
      ? Number(searchParams.get("rating"))
      : null;
    const pageFromUrl = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    setCategory(categoryFromUrl);
    setSearch(searchFromUrl);
    setRating(ratingFromUrl);
    setPage(pageFromUrl);
  }, [searchParams, setCategory, setSearch, setRating, setPage]);

  return (
    <div>
      <header className="pt-[43px]">
        <div className="container mx-auto">
          <img
            src="/assets/image/course-hero.png"
            className="hero-banner"
            alt="course hero banner"
          />
        </div>
      </header>

      <main className="container mx-auto space-y-16">
        <div>
          <h2 className="text-[32px] font-bold">All Courses</h2>
          <p className="text-gray-500">
            Explore courses from experienced, real-world experts.
          </p>
        </div>

        <div className="grid grid-cols-12">
          {/* Filter Sidebar */}
          <div className="col-start-1 col-end-3 p-2 border rounded-lg">
            <FilterComponent />
          </div>

          {/* Courses List */}
          <div className="col-start-4 col-end-13">
            {courses.length === 0 && !isLoading ? (
              <div className="flex items-center justify-center">
                <NoCoursesFound />
              </div>
            ) : (
              <>
                <AllCoursesContent courses={courses} isLoading={isLoading} />
                <div className="mt-8">
                  <PagePagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
