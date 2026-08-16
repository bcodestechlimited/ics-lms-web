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
    <Card className="w-full max-w-[400px] mx-auto rounded-2xl p-0 shadow-lg border border-border/80 bg-card overflow-hidden">
      <CardHeader className="h-[180px] sm:h-[200px] p-0 overflow-hidden">
        <img
          src={image}
          alt={title || "course thumbnail"}
          className="h-full w-full object-cover"
        />
      </CardHeader>

      <CardDescription className="bg-card p-4 sm:p-6 space-y-4 rounded-b-2xl text-foreground">
        <div className="space-y-2">
          <h3 className="font-bold text-lg sm:text-xl text-[#0B2239] leading-snug">
            {title} Course
          </h3>
          <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {summary}
          </p>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-border/60 text-xs sm:text-sm text-foreground">
          <h4 className="font-bold text-sm sm:text-base text-[#0B2239]">This course includes</h4>
          <div className="flex items-center gap-x-2 text-muted-foreground">
            <AwardIcon className="h-4 w-4 text-primary" />
            <span>Certificate of completion</span>
          </div>
        </div>

        <div className="pt-2">
          {isEnrolled ? (
            <Button
              className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm sm:text-base shadow-sm"
              onClick={handleGoToCourse}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Go to Course
            </Button>
          ) : session?._id ? (
            <Button className="w-full h-11 bg-[#134587] hover:bg-[#0b2d5a] text-white font-semibold rounded-xl text-sm sm:text-base shadow-sm" onClick={handleLaunchCourse}>
              Proceed to checkout
            </Button>
          ) : (
            <Button className="w-full h-11 bg-[#134587] hover:bg-[#0b2d5a] text-white font-semibold rounded-xl text-sm sm:text-base shadow-sm" onClick={handleUserAuth}>
              Take Course
            </Button>
          )}
        </div>
      </CardDescription>
    </Card>
  );
}
