import AllCoursesContent from "@/components/all-courses";
import { FilterComponent } from "@/components/filter-component";
import Footer from "@/components/footer";
import NoCoursesFound from "@/components/no-course-found";
import PagePagination from "@/components/pagination";
import { useGetAllCourses } from "@/hooks/use-course";
import { useCourseFilterStore } from "@/store/course-filter.store";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export default function CoursesPage() {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useGetAllCourses();
  const setCategory = useCourseFilterStore((state) => state.setCategory);
  const {page, setPage} = useCourseFilterStore();
  const courses = (!isLoading && data?.responseObject?.docs) || [];
  const totalPages = (!isLoading && data?.responseObject?.totalPages) || 1;

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
    } else {
      setCategory("");
    }
  }, [searchParams, setCategory]);

  return (
    <div>
      <header className="pt-[43px]">
        <div className="container mx-auto">
          <img
            src="/assets/image/course-hero.png"
            className="w-full h-auto object-cover hero-banner rounded-lg max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
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
          {/* filter component will go here */}
          <div className="col-start-1 col-end-3 p-2 border rounded-lg">
            <FilterComponent />
          </div>
          <div className="col-start-4 col-end-13">
            <div>
              {courses.length === 0 && !isLoading ? (
                <div className="flex items-center justify-center">
                  <div>
                    <NoCoursesFound />
                  </div>
                </div>
              ) : (
                <div>
                  <AllCoursesContent courses={courses} isLoading={isLoading} />
                  <div>
                    <PagePagination
                      page={page}
                      setPage={setPage}
                      totalPages={totalPages}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
