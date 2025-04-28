import {CourseCardSkeleton} from "@/components/course-card-skeleton";
import {ExpiredCourseCard} from "@/components/expired-course-card";
import {useGetExpiredCourses} from "@/hooks/use-user";
import {ExpiredCoursesInterface} from "@/interfaces/course.interface";
import DashboardLayout from "@/layouts/dashboard-layout";

const DashboardExpiredCourses = () => {
  const {data, isLoading} = useGetExpiredCourses();
  const courses = !isLoading && data.responseObject;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-start-2 col-end-12 py-16 space-y-16">
          <h1 className="text-2xl font-bold text-[#013467]">Expired Courses</h1>
          {courses.length === 0 && (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-3xl font-medium text-gray-600">
                No Expired Courses
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-12">
            {isLoading
              ? [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <CourseCardSkeleton key={index} />
                ))
              : courses.map((course: ExpiredCoursesInterface) => {
                  return (
                    <ExpiredCourseCard
                      key={course._id}
                      id={course.course._id}
                      image={course.course.image}
                      title={course.course.title}
                      expiresAt={course.expiresAt}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardExpiredCourses;
