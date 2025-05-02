import {ForgotPasswordForm} from "@/components/forgot-password-shell";
import {Home} from "lucide-react";
import {Link} from "react-router";

export default function ForgotPasswordPage() {
  return (
    <div className="relative">
      <Link
        to="/"
        className="absolute top-4 right-4 flex items-center gap-1 text-sm text-blue-600 hover:text-gray-900 transition-colors"
      >
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="border rounded-xl max-w-[500px] space-y-8 p-4">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
            <p className="text-center">
              Enter your email address and we will send you a link to reset your
              password
            </p>
          </div>
          <div>
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
