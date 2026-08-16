import {CourseInterface} from "@/interfaces/course.interface";
import {
  FloatingArrow,
  Placement,
  arrow,
  autoUpdate,
  flip,
  inline,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import {useRef, useState} from "react";
import {useNavigate} from "react-router";
import {DisplayCourseHighlights} from "./display-markup-content";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";

interface CourseCardProps extends CourseInterface {
  instructor?: string;
  level?: string;
  duration?: string;
  lectures?: number;
  students?: number;
  skills?: string[];
}

export function CourseCard({
  _id,
  image = "/assets/image/Leadership.png",
  title = "Leadership",
  description = "You can invest in your future by studying with us whenever you want",
  summary,
  updatedAt,
  instructor = "L&D Team",
}: Partial<CourseCardProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleViewCourse = (id: string) => {
    navigate(`/courses/${id}`);
  };

  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      inline(),
      offset(10),
      flip({
        fallbackPlacements: ["right", "left", "top", "bottom"],
      }),
      shift({padding: 5}),
      arrow({element: arrowRef}),
    ],
    whileElementsMounted: autoUpdate,
    placement: "right" as Placement,
  });

  const hover = useHover(context, {move: false});
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {role: "tooltip"});

  const {getReferenceProps, getFloatingProps} = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <div
      className="w-full flex justify-center h-full"
      ref={(node) => {
        refs.setReference(node);
        if (cardRef.current !== node) {
          cardRef.current = node as HTMLDivElement | null;
        }
      }}
      {...getReferenceProps()}
    >
      <Card
        className="w-full max-w-[374px] border border-border/50 shadow-sm hover:shadow-md rounded-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between h-full bg-card"
        onClick={() => {
          handleViewCourse(_id as string);
        }}
      >
        <CardHeader className="rounded-t-xl p-0">
          <img
            src={image || "/assets/image/Leadership.png"}
            alt={title || "Leadership"}
            className="w-full h-[180px] sm:h-[166px] object-cover rounded-t-xl"
          />
        </CardHeader>
        <CardDescription className="space-y-4 p-4 text-[#0B2239] flex-1 flex flex-col justify-between">
          <CardContent className="p-0 text-[#0B2239]">
            <div className="mb-2">
              <h2 className="leading-snug text-base font-bold line-clamp-1">{title}</h2>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">{instructor}</p>
            </div>
            <p className="line-clamp-2 text-xs sm:text-sm text-gray-600 leading-relaxed">{summary}</p>
          </CardContent>
          <CardFooter className="p-0"></CardFooter>
        </CardDescription>
      </Card>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            zIndex: 50,
          }}
          {...getFloatingProps()}
          className="hidden md:block z-50 w-80 sm:w-96 max-w-[calc(100vw-32px)] bg-white rounded-lg shadow-xl border border-gray-200 p-4"
        >
          <FloatingArrow ref={arrowRef} context={context} fill="white" />

          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <div className="flex items-center text-[12px]">
                <span className="font-medium">Updated Recently</span>
                <span className="mx-2">•</span>
                <span>
                  {updatedAt && new Date(updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p className="text-sm line-clamp-3 text-gray-600">{summary}</p>

            <div className="text-sm">
              <p className="font-medium mb-1 text-[16px]">
                What you will learn
              </p>

              <ul className="space-y-2">
                <DisplayCourseHighlights content={description} />
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
