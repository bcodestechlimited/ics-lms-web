import {useSession} from "@/hooks/useSession";
import {AwardIcon} from "lucide-react";
import {useNavigate} from "react-router";
import {toast} from "sonner";
import {Button} from "./ui/button";
import {Card, CardDescription, CardHeader} from "./ui/card";

interface CourseCardInterface {
  _id: string;
  image: string;
  title: string;
  description?: string;
  summary: string;
  moduleId?: string;
}

export function CourseInfoCard({
  _id,
  image,
  title,
  summary,
}: // moduleId,
CourseCardInterface) {
  const {session} = useSession();
  const userId = session.user?._id;
  // const launch = useLaunchCourse();
  const navigate = useNavigate();

  const handleLaunchCourse = () => {
    if (!userId) return handleUserAuth();

    // proceed to course checkout
    navigate("/course-checkout/" + _id);

    // toast.promise(launch.mutateAsync({courseId: _id, userId, moduleId}), {
    //   loading: "Launching course...",
    //   success: (res) => {
    //     if (res?.success) {
    //       navigate(`/dashboard/course/${_id}/modules/${moduleId}/overview`);
    //       return "Course launched successfully";
    //     }
    //   },
    //   error: "Error launching course",
    // });
  };

  const handleUserAuth = () => {
    toast.info("Login to take course");
    navigate("/auth/login");
  };

  return (
    <Card className="w-[400px] rounded-lg p-0 shadow-lg">
      <CardHeader className="max-h-[200px] p-0">
        <img
          src={image}
          alt="course info"
          className="h-full w-full object-cover rounded-t-lg"
        />
      </CardHeader>

      <CardDescription className="bg-white p-0 mt-0 space-y-1 rounded-lg">
        <div className="p-2 space-y-4">
          <div>
            <h3 className="font-bold text-[20px] text-[#212121]">
              {title} Course
            </h3>
            <p className="line-clamp-2 text-ellipsis">{summary}</p>
          </div>
          <div className="space-y-2 mt-4 text-[12px] text-[#212121]">
            <h3 className="font-bold text-lg">This course includes</h3>
            <div className="flex items-center gap-x-2">
              <AwardIcon className="h-4 w-4" />
              <span>Certificate</span>
            </div>
          </div>

          {session.status === "authenticated" ? (
            <Button className="w-full" onClick={handleLaunchCourse}>
              Proceed to checkout
            </Button>
          ) : (
            <Button className="w-full" onClick={handleUserAuth}>
              Take Course
            </Button>
          )}
        </div>
      </CardDescription>
    </Card>
  );
}
