import { RegisterShell } from "@/components/register-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSession } from "@/hooks/useSession";
import { Home } from "lucide-react";
import { Link, Navigate } from "react-router";

const appName = import.meta.env.VITE_APP_NAME?.trim() || "Logira";

const SignupPage = () => {
  const { session } = useSession();

  if (session.status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Desktop Branded Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0B2239] via-[#134587] to-[#0A1A2E] text-white p-12 flex-col justify-between overflow-hidden">
        {/* Background Decorative Graphic */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <img
          src="/assets/image/login.webp"
          alt="Students learning background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />

        {/* Top Logo Brand Header */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl w-fit border border-white/15 hover:bg-white/20 transition-all">
            <img
              src="/assets/image/logo.png"
              alt={`${appName} Logo`}
              className="h-10 w-auto object-contain"
            />
            <span className="font-bold text-xl tracking-tight">{appName} LMS</span>
          </Link>
        </div>

        {/* Center Brand Value Proposition */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold tracking-wider uppercase backdrop-blur-md border border-white/15">
            <span>🚀 Start Learning Today</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            Join Thousands of Learners Growing with {appName} LMS.
          </h2>
          <p className="text-white/80 text-base leading-relaxed">
            Create your account to access curated course catalogs, track your learning progress, and earn career-boosting certificates.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-bold text-white">500+</p>
              <p className="text-xs text-white/80 font-medium mt-1">Hours of Content</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-bold text-white">120+</p>
              <p className="text-xs text-white/80 font-medium mt-1">Active Students</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 text-xs text-white/60">
          © {new Date().getFullYear()} {appName} LMS. All rights reserved. Managed by BCT Limited.
        </div>
      </div>

      {/* Right Form Panel (Mobile & Desktop) */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative py-8 sm:py-12">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between w-full mb-6">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/assets/image/logo-black.png"
              alt={`${appName} Logo`}
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <span className="font-bold text-lg sm:text-xl text-[#0B2239] tracking-tight sm:hidden">{appName}</span>
          </Link>

          <Link to="/">
            <Button variant="outline" size="sm" className="rounded-full gap-2 text-xs sm:text-sm font-medium hover:bg-muted">
              <Home className="w-4 h-4 text-primary" />
              <span>Back to home</span>
            </Button>
          </Link>
        </div>

        {/* Signup Card */}
        <div className="w-full max-w-lg mx-auto my-auto py-2">
          <Card className="border border-border/80 rounded-2xl shadow-lg bg-card p-4 sm:p-8 space-y-6">
            <CardHeader className="p-0 space-y-2 text-left">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/image/logo-black.png"
                  alt={`${appName} Logo`}
                  className="h-9 w-auto object-contain lg:hidden"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Create an account</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Register with your details to start learning on <strong className="text-foreground">{appName} LMS</strong>.
              </p>
            </CardHeader>

            <CardContent className="p-0 space-y-4">
              <RegisterShell />
            </CardContent>

            <CardFooter className="p-0 pt-4 border-t border-border/60 flex items-center justify-center text-xs sm:text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/auth/login" className="ml-1 text-primary hover:underline font-bold">
                Sign In
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Mobile / Bottom Footer Copyright */}
        <div className="text-center text-xs text-muted-foreground pt-6">
          © {new Date().getFullYear()} {appName} LMS. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
