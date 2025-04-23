import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl overflow-hidden shadow-xl rounded-xl">
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <CardHeader className="relative p-8">
            <img
              src="/assets/image/not-found.jpg"
              alt="Lost in the woods"
              className="w-full h-64 md:h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 text-xs rounded"></div>
          </CardHeader>

          {/* Content Section */}
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-bold text-primary">404</h1>
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                Oops! Lost in the Wilderness
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                The page you're looking for seems to have wandered off the
                trail. Let's get you back to familiar ground.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <Button asChild className="w-full">
                <Link to="/">Return to Homepage</Link>
              </Button>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Or try searching for what you need
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link to="#">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to={"#"}>Service Status</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
