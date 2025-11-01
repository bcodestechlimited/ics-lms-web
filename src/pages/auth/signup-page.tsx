import { RegisterShell } from "@/components/register-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSession } from "@/hooks/useSession";
import { Home } from "lucide-react";
import { Link, Navigate } from "react-router";

const SignupPage = () => {
  const { session } = useSession();

  if (session.status === "authenticated") {
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
          <CardContent className="space-y-4">
            <CardDescription className="space-y-4">
              <RegisterShell />
            </CardDescription>

            <CardFooter className="flex items-center justify-center text-sm">
              Have an account?{" "}
              <Link to={"/auth/login"} className="ml-1 text-[#404757]">
                {" "}
                Sign In
              </Link>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
