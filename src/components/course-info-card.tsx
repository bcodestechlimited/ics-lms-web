import {useGetUserSession} from "@/hooks/use-user";
import {AwardIcon, CheckCircle} from "lucide-react";
import {useLocation, useNavigate} from "react-router";
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
  isEnrolled?: boolean;
}

export function CourseInfoCard({
  _id,
  image,
  title,
  summary,
  isEnrolled,
}: CourseCardInterface) {
  const {data: session} = useGetUserSession();
  const userId = session?._id;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLaunchCourse = () => {
    if (!userId) return handleUserAuth();
    navigate("/course-checkout/" + _id);
  };

  const handleUserAuth = () => {
    toast.info("Login to take course");
    navigate("/auth/login", {state: {from: location.pathname}});
  };

  const handleGoToCourse = () => {
    navigate(`/dashboard/`);
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

          {isEnrolled ? (
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleGoToCourse}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Go to Course
            </Button>
          ) : session?._id ? (
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
