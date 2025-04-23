import { useNavigate } from "react-router";
import { Button } from "./ui/button";

const NoCoursesFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <div className="max-w-md w-full">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          No Courses Found
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't find any courses matching your criteria.
        </p>
        <Button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NoCoursesFound;
