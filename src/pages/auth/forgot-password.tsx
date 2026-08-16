import { ForgotPasswordForm } from "@/components/forgot-password-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ShieldCheck, Lock, Clock } from "lucide-react";
import { Link } from "react-router";

const appName = import.meta.env.VITE_APP_NAME?.trim() || "Logira";

export default function ForgotPasswordPage() {
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
          <Link
            to="/"
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl w-fit border border-white/15 hover:bg-white/20 transition-all"
          >
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
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure Password Recovery</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            Seamlessly Regain Access to Your Account.
          </h2>
          <p className="text-white/80 text-base leading-relaxed">
            We prioritize your account security. Get back to your courses, certifications, and learning goals in just a few clicks.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-white">
                <Lock className="w-5 h-5 text-emerald-400" />
                <p className="text-lg font-bold">256-Bit</p>
              </div>
              <p className="text-xs text-white/80 font-medium mt-1">Encrypted Token Verification</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-blue-300" />
                <p className="text-lg font-bold">Instant Delivery</p>
              </div>
              <p className="text-xs text-white/80 font-medium mt-1">Directly to Your Inbox</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 text-xs text-white/60">
          © {new Date().getFullYear()} {appName} LMS. All rights reserved. Managed by BCT Limited.
        </div>
      </div>

      {/* Right Form Panel (Mobile & Desktop) */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between w-full mb-6">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/assets/image/logo-black.png"
              alt={`${appName} Logo`}
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <span className="font-bold text-lg sm:text-xl text-[#0B2239] tracking-tight sm:hidden">
              {appName}
            </span>
          </Link>

          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 text-xs sm:text-sm font-medium hover:bg-muted"
            >
              <Home className="w-4 h-4 text-primary" />
              <span>Back to home</span>
            </Button>
          </Link>
        </div>

        {/* Forgot Password Card */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          <Card className="border border-border/80 rounded-2xl shadow-lg bg-card p-6 sm:p-8 space-y-6">
            <ForgotPasswordForm />
          </Card>
        </div>

        {/* Mobile / Bottom Footer Copyright */}
        <div className="text-center text-xs text-muted-foreground pt-6">
          © {new Date().getFullYear()} {appName} LMS. All rights reserved.
        </div>
      </div>
    </div>
  );
}
