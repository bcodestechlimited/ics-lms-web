import {CourseCardSkeleton} from "@/components/course-card-skeleton";
import DashboardCourseCard from "@/components/dashboard-course-card";
import {Card} from "@/components/ui/card";
import {useGetMyEnrolledCourses} from "@/hooks/use-dashboard";
import {CourseEnrollmentInterface} from "@/interfaces/course.interface";
import DashboardLayout from "@/layouts/dashboard-layout";


const styles = {
  container: {
    notEnrolled: `h-full w-full flex items-center justify-center`,
    enrolled: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`,
    noCoursesText: `text-lg font-medium w-full text-center`,
  },
};

export default function UserDashboard() {
  const {data, isLoading} = useGetMyEnrolledCourses();
  // const {data: assignedCoursesData, isLoading: assignedCoursesLoading} =
  // useGetMyAssignedCourses();
  const courses = !isLoading && data?.responseObject?.data;
  // const assignedCourses =
  //   !assignedCoursesLoading && assignedCoursesData?.responseObject?.data;

  return (
    <DashboardLayout>
      <div className="container mx-auto p-12 space-y-16">
        <Card className="rounded-xl p-8 space-y-8 border shadow-none">
          <h1 className="text-[#013467] font-bold text-[20px]">Your Courses</h1>
          <div>
            {courses.length === 0 ? (
              <div className={styles.container.notEnrolled}>
                <p className={styles.container.noCoursesText}>
                  You are not currently enrolled in any course{" "}
                </p>
              </div>
            ) : isLoading ? (
              <div className={styles.container.enrolled}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className={styles.container.enrolled}>
                {!isLoading &&
                  courses?.map((course: CourseEnrollmentInterface) => (
                    <DashboardCourseCard
                      key={course._id}
                      id={course._id}
                      description={course.summary}
                      title={course.title}
                      image={course.image}
                    />
                  ))}
              </div>
            )}
          </div>
        </Card>

        {/* <Card className="rounded-xl p-8 space-y-8 border shadow-none">
          <h3 className="text-[#013467] font-bold text-[20px]">
            Assigned Courses
          </h3>
          <div>
            {assignedCourses.length === 0 ? (
              <div className={styles.container.notEnrolled}>
                <p className={styles.container.noCoursesText}>
                  You are not currently assigned any course(s)
                </p>
              </div>
            ) : assignedCoursesLoading ? (
              <div className={styles.container.enrolled}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className={styles.container.enrolled}>
                {!assignedCoursesLoading &&
                  assignedCourses.map((course: CourseEnrollmentInterface) => (
                    <DashboardCourseCard
                      key={course._id}
                      id={course._id}
                      description={course.summary}
                      title={course.title}
                      image={course.image}
                    />
                  ))}
              </div>
            )}
          </div>
        </Card> */}
      </div>
    </DashboardLayout>
  );
}

