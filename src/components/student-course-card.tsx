import { Card, CardDescription } from "./ui/card";

export default function StudentCourseCard() {
  return (
    <Card className="px-[22px] w-full">
      <CardDescription className="flex items-center gap-x-[17px]">
        <div className="w-fit">
          <img
            src="/assets/image/complete-course-icon.svg"
            className="h-[40px] w-[40px]"
          />
        </div>
        <div className="text-[#1C1C1C] ">
          <h2 className="font-bold text-[32px]">5</h2>
          <p className="font-medium">Completed Courses</p>
        </div>
      </CardDescription>
    </Card>
  );
}
