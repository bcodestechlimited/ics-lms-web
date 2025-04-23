import {CourseInterface} from "@/interfaces/course.interface";
import {CourseCard} from "./course-card";
import {CourseCardSkeleton} from "./course-card-skeleton";

export default function AllCoursesContent({
  courses,
  isLoading,
}: {
  courses: CourseInterface[];
  isLoading: boolean;
}) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-8">
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <CourseCardSkeleton key={index} />
            ))
          : courses.map((course: CourseInterface) => {
              return (
                <CourseCard
                  image={course.image}
                  description={course.description}
                  title={course.title}
                  instructor="L&D Team"
                  duration=""
                  key={course._id}
                  updatedAt={course.updatedAt}
                  _id={course._id}
                  summary={course.summary}
                />
              );
            })}
      </div>
    </div>
  );
}
