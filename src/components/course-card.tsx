/* eslint-disable @typescript-eslint/no-unused-vars */
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
    // /courses/:id
    navigate(`/courses/${id}`);
  };

  // Configure floating UI
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      inline(),
      offset(10),
      flip({
        fallbackPlacements: ["right", "left", "top", "bottom"],
      }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
    placement: "right" as Placement,
  });

  // Setup event listeners for interactions
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  // Merge all the interactions into props
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`star-${i}`}
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {halfStar && (
          <svg
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half-star" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-star)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        )}
        <span className="ml-1 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
        <span className="ml-1 text-sm text-gray-500">
          {/* ({students.toLocaleString()} students) */}
        </span>
      </div>
    );
  };

  return (
    <div
      className="inline-block"
      ref={(node) => {
        // Set both refs - one for the floating UI and one for our own use
        refs.setReference(node);
        if (cardRef.current !== node) {
          cardRef.current = node as HTMLDivElement | null;
        }
      }}
      {...getReferenceProps()}
    >
      <Card
        className="w-full max-w-[374px] h-full max-h-[350px] p-2 rounded-lg hover:shadow-lg transition-shadow pb-7 cursor-pointer"
        onClick={() => {
          handleViewCourse(_id as string);
        }}
      >
        <CardHeader className="rounded-lg p-0">
          <img
            src={image || "/assets/image/Leadership.png"}
            alt={title || "Leadership"}
            className="max-h-[166px] h-[166px] object-cover rounded-lg"
          />
        </CardHeader>
        <CardDescription className="space-y-4 p-0 text-[#0B2239]">
          <CardContent className="p-0 text-[#0B2239]">
            <div className="mb-2">
              <h2 className="leading-normal text-[15px] font-bold">{title}</h2>
              <p className="text-gray-500 text-sm font-medium">{instructor}</p>
            </div>
            <p className="line-clamp-2 text-sm">{summary}</p>
          </CardContent>
          <CardFooter className="p-0">
            {/* <p className="font-bold text-[16px]">{price || "#9,435,800"}</p> */}
          </CardFooter>
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
          className="z-50 w-96 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
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
                {/* <span className="mx-2">•</span> */}
                {/* <span>{duration}</span> */}
              </div>
            </div>
            <p className="text-sm text-gray-600">{summary}</p>

            {/* {renderStars(rating)} */}

            <div className="text-sm">
              <p className="font-medium mb-1 text-[16px]">
                What you will learn
              </p>
              {/* {description} // display the description in this place*/}
              <ul className="space-y-2">
                {/* <DisplayCourseHiglights content={description} /> */}
                <DisplayCourseHighlights content={description} />
              </ul>
              {/* <div className="flex flex-wrap gap-1">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div> */}
            </div>

            <div className="pt-2">
              {/* <p className="font-bold text-lg">{price}</p> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
