import {LoginForm} from "@/components/login-shell";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {useGetUserSession} from "@/hooks/use-user";
import {Home} from "lucide-react";
import {Link, Navigate} from "react-router";

export default function LoginPage() {
  const {data: session} = useGetUserSession();
  if (session?._id) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2">
        <img
          src="/assets/image/login.webp"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center relative">
        <div className="absolute top-6 right-6">
          <Link to="/" className="text-blue-500">
            <Button variant={"link"} className="text-blue-500">
              <Home /> Back to home
            </Button>
          </Link>
        </div>
        <Card className="max-w-lg w-lg mx-auto border rounded-lg shadow-none">
          <CardHeader>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p>Sign in to continue learning</p>
          </CardHeader>
          <CardContent>
            <CardDescription className="space-y-4">
              <LoginForm />
              <div className="flex items-center justify-end mb-4">
                <Link to="/auth/forgot-password" className="text-[#404757]">
                  Forgot Password?
                </Link>
              </div>
            </CardDescription>

            <CardFooter className="flex items-center justify-center text-sm">
              Don't have an account?{" "}
              <Link to={"/auth/signup"} className="ml-1 text-[#404757]">
                {" "}
                Sign Up
              </Link>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
