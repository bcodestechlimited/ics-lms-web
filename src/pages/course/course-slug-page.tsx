import {CourseInfoCard} from "@/components/course-info-card";
import DisplayMarkupContent from "@/components/display-markup-content";
import Footer from "@/components/footer";
import Loader, {PageLoader} from "@/components/loading-spinner";
import {useGetACourseById} from "@/hooks/use-course";
import {GlobeIcon, RefreshCwIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {useParams} from "react-router";

export default function CourseSlugPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const params = useParams();
  const {data, isLoading} = useGetACourseById(params?.id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 400;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  const course = !isLoading && data?.responseObject?.data;

  return (
    <div className="relative">
      <div className="h-[400px] bg-[#134587]">
        <div className="container mx-auto grid grid-cols-12 py-20 h-full">
          <header className="space-y-4 col-start-1 col-end-6 text-white">
            <h1 className="text-[32px] font-bold leading-normal">
              {course?.title}
            </h1>
            <h3 className="font-medium leading-normal">{course?.summary}</h3>

            <div className="space-y-4 mt-20">
              <div>
                <h3 className="font-medium">
                  Created by, <span className="">L&D LMS</span>
                </h3>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="flex items-center gap-x-2">
                  <RefreshCwIcon className="h-5 w-5" />
                  <p>
                    Latest Update{" "}
                    {new Date(course?.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <GlobeIcon className="h-5 w-5" />
                  <p className="">English</p>
                </div>
              </div>
            </div>
          </header>

          {!isScrolled && (
            <div className="col-start-9 col-end-13 h-0 justify-end flex">
              <div>
                {isLoading ? (
                  <Loader />
                ) : (
                  <CourseInfoCard
                    _id={!isLoading && course?._id}
                    image={!isLoading && course?.image}
                    title={!isLoading && course?.title}
                    description=""
                    summary={!isLoading && course?.summary}
                    moduleId={!isLoading && course?.course_modules[0]}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed position card that appears after scrolling */}
      {isScrolled && (
        <div className="fixed top-6 right-2.5 z-50 px-6 md:px-12 lg:px-24 xl:px-32">
          <CourseInfoCard
            _id={course?._id}
            image={course?.image}
            title={course?.title}
            description=""
            summary={course?.summary}
            moduleId={course?.course_modules[0]}
          />
        </div>
      )}

      <main>
        <div className="text-[#0B2239] container mx-auto py-[100px] grid grid-cols-12 scroll-mt-20">
          <div className="col-start-1 col-end-7 space-y-[32px]">
            <h2 className="text-[32px] font-bold">What you will learn</h2>
            <div className="space-y-4">
              <DisplayMarkupContent content={course?.description} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
