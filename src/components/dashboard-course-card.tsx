import {useLaunchCourse} from "@/hooks/use-course";
import {PlayCircle} from "lucide-react";
import {useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "sonner";
import {Card, CardContent, CardDescription, CardHeader} from "./ui/card";

export default function DashboardCourseCard({
  title,
  description,
  image,
  id,
}: {
  id: string;
  title: string;
  description: string;
  image: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const launchCourse = useLaunchCourse();
  const navigate = useNavigate();

  const handleLaunchCourse = () => {
    toast.promise(
      launchCourse.mutateAsync({
        courseId: id,
      }),
      {
        loading: "Launching course...",
        success: (res) => {
          if (!res.success) {
            return "Error launching course";
          }

          navigate(
            `/dashboard/courses/${res.responseObject.data.courseId}/modules/${res.responseObject.data.moduleId}/overview`
          );
          return "Course launched successfully";
        },
        error: "Error launching course",
      }
    );
  };

  return (
    <Card
      className="w-full max-w-[374px] grid grid-rows-[auto_1fr] gap-4 p-2 rounded-lg shadow-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleLaunchCourse}
    >
      <CardHeader className="rounded-lg p-0 relative aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg transition-opacity">
            <PlayCircle className="w-12 h-12 text-white" />
          </div>
        )}
      </CardHeader>

      <CardDescription className="p-0 text-[#0B2239] grid grid-rows-[auto_1fr] gap-2">
        <CardContent className="p-0 h-full flex flex-col justify-between">
          <h2 className="text-[14px] font-semibold line-clamp-2 leading-tight">
            {title || "Leadership"}
          </h2>
          <p className="text-[12px] text-[#666666] line-clamp-3 mt-2">
            {description ||
              "You can invest in your future by studying with us whenever you want"}
          </p>
        </CardContent>
      </CardDescription>
    </Card>
  );
}
