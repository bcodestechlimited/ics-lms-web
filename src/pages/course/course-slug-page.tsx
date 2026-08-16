/* eslint-disable @typescript-eslint/no-explicit-any */
import { CourseInfoCard } from "@/components/course-info-card";
import DisplayMarkupContent from "@/components/display-markup-content";
import Footer from "@/components/footer";
import { PageLoader } from "@/components/loading-spinner";
import { useGetACourseById } from "@/hooks/use-course";
import { useGetMyEnrolledCourses } from "@/hooks/use-dashboard";
import { EnrolledCourse } from "@/interfaces/course.interface";
import {
  Globe,
  RefreshCw,
  BookOpen,
  Award,
  Clock,
  Users,
  CheckCircle2,
  Star,
  ChevronRight,
} from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function CourseSlugPage() {
  // const [isScrolled, setIsScrolled] = useState(false);
  const params = useParams();
  const { data, isLoading } = useGetACourseById(params?.id);
  const { data: enrolledCourses, isLoading: enrolledCoursesLoading } =
    useGetMyEnrolledCourses();

  const isEnrolled =
    !enrolledCoursesLoading &&
    enrolledCourses?.responseObject?.data?.some(
      (course: EnrolledCourse) => course._id === params?.id,
    );

  useEffect(() => {
    const handleScroll = () => {
      // setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  const course = data?.responseObject?.data;
  const coursePrice = course?.course_price?.price?.coursePricing;

  const handleReadMoreClick = () => {
    document.getElementById("course-overview")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative bg-gray-50 min-h-screen flex flex-col">
      <div className="relative bg-gradient-to-br from-[#134587] via-[#1a5a9f] to-[#0f3666] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 lg:py-20 relative">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 text-white space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-200">
                <span>Courses</span>
                <span>/</span>
                <span className="truncate">Professional Development</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                {course?.title}
              </h1>

              <div className="space-y-3">
                <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed line-clamp-3">
                  {course?.summary}
                </p>
                <button
                  type="button"
                  onClick={handleReadMoreClick}
                  className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-white/90 hover:text-white"
                  aria-label="Read more about this course"
                >
                  Read more
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-blue-400/30 text-xs sm:text-sm">
                <div>
                  <p className="text-blue-200">Created by</p>
                  <p className="font-semibold text-sm sm:text-base">L&D LMS</p>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-200">Last Updated</p>
                    <p className="font-semibold text-sm sm:text-base">
                      {course?.updatedAt
                        ? new Date(course.updatedAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-200">Language</p>
                    <p className="font-semibold text-sm sm:text-base">English</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:col-span-5 lg:flex justify-end">
              <CourseInfoCard
                _id={course?._id}
                image={course?.image}
                title={course?.title}
                description=""
                summary={course?.summary}
                moduleId={course?.course_modules?.[0]}
                isEnrolled={isEnrolled}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Mobile CourseInfoCard displayed at top of content on mobile screens */}
          <div className="lg:hidden w-full flex justify-center">
            <CourseInfoCard
              _id={course?._id}
              image={course?.image}
              title={course?.title}
              description=""
              summary={course?.summary}
              moduleId={course?.course_modules?.[0]}
              isEnrolled={isEnrolled}
            />
          </div>

          <div className="lg:col-span-7 space-y-8 sm:space-y-12">
            <section
              id="course-overview"
              className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-200/80 shadow-sm scroll-mt-24"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B2239] mb-3 sm:mb-4">
                Overview
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {course?.summary}
              </p>
            </section>

            <section className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-200/80 shadow-sm">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B2239] mb-4 sm:mb-6">
                What you'll learn
              </h2>

              <div className="space-y-4 font-normal w-full max-w-full text-sm sm:text-base leading-relaxed">
                <DisplayMarkupContent content={course?.description} />
              </div>
            </section>

            <section className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-200/80 shadow-sm">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B2239] mb-4 sm:mb-6">
                Course Content
              </h2>
              <div className="space-y-3">
                {course?.course_modules?.map((module: any, index: number) => (
                  <div
                    key={module._id ?? index}
                    className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border border-gray-200 hover:border-[#134587] hover:shadow-md transition-all cursor-pointer bg-gray-50/50 hover:bg-white"
                  >
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#134587] text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5">
                        {module.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Updated{" "}
                        {module.updatedAt
                          ? new Date(module.updatedAt).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-200/80 shadow-sm">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B2239] mb-4 sm:mb-6">
                Requirements
              </h2>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>No prior experience required</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Willingness to learn and adapt</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Access to a computer with internet connection</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-sm">
              <h3 className="font-bold text-lg sm:text-xl text-[#0B2239] mb-4">This course includes:</h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-[#134587] flex-shrink-0" />
                  <span>
                    {course?.course_modules?.length || 0} comprehensive modules
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-[#134587] flex-shrink-0" />
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#134587] flex-shrink-0" />
                  <span>Lifetime access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[#134587] flex-shrink-0" />
                  <span>Expert instructor support</span>
                </li>
              </ul>
            </div>

            {coursePrice && (
              <div className="bg-gradient-to-br from-[#134587] to-[#0f3666] rounded-2xl p-6 text-white shadow-md">
                <h3 className="font-bold text-lg sm:text-xl mb-2">Course Price</h3>
                <p className="text-3xl sm:text-4xl font-bold mb-3">
                  ₦{coursePrice.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-blue-100">
                  One-time payment • Lifetime access
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
