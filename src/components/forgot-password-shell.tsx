import { useForgotPassword } from "@/hooks/useAuth";
import { ForgotPasswordSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  KeyRound,
  Loader2,
  Mail,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const RESEND_COOLDOWN = 60; // 60 seconds resend timer

function getEmailProviderInfo(email: string): { name: string; url: string } | null {
  if (!email || !email.includes("@")) return null;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return null;

  if (domain.includes("gmail.com")) {
    return { name: "Gmail", url: "https://mail.google.com" };
  }
  if (
    domain.includes("outlook.com") ||
    domain.includes("hotmail.com") ||
    domain.includes("live.com") ||
    domain.includes("msn.com")
  ) {
    return { name: "Outlook", url: "https://outlook.live.com" };
  }
  if (domain.includes("yahoo.com") || domain.includes("ymail.com")) {
    return { name: "Yahoo Mail", url: "https://mail.yahoo.com" };
  }
  if (domain.includes("icloud.com") || domain.includes("me.com")) {
    return { name: "iCloud Mail", url: "https://www.icloud.com/mail" };
  }
  if (domain.includes("proton.me") || domain.includes("protonmail.com")) {
    return { name: "Proton Mail", url: "https://mail.proton.me" };
  }
  return null;
}

export function ForgotPasswordForm() {
  const router = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const emailParam = searchParams.get("email") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [countdown, setCountdown] = useState(0);

  const forgotPassword = useForgotPassword();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: emailParam,
    },
  });

  // Handle resend countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendResetEmail = async (email: string, isResendCall = false) => {
    if (isResendCall) {
      setIsResending(true);
    } else {
      setIsLoading(true);
    }

    try {
      const res = await forgotPassword.mutateAsync(email);
      if (res?.success === false) {
        toast.error(res?.message || "Failed to send reset link. Please try again.");
        if (isResendCall) setIsResending(false);
        else setIsLoading(false);
        return;
      }

      setSubmittedEmail(email);
      setIsSubmitted(true);
      setCountdown(RESEND_COOLDOWN);

      if (isResendCall) {
        toast.success("Reset link resent! Please check your inbox.");
      } else {
        toast.success("Reset link sent successfully!");
      }
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message || err?.message || "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
      setIsResending(false);
    }
  };

  function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    handleSendResetEmail(values.email, false);
  }

  const handleResend = () => {
    if (countdown > 0 || isResending || !submittedEmail) return;
    handleSendResetEmail(submittedEmail, true);
  };

  const handleEditEmail = () => {
    setIsSubmitted(false);
    setCountdown(0);
    setTimeout(() => {
      form.setValue("email", submittedEmail);
      form.setFocus("email");
    }, 50);
  };

  const emailProvider = getEmailProviderInfo(submittedEmail);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="forgot-form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Header Title & Subtitle */}
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Account Recovery</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Forgot password?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                No worries! Enter the email address associated with your account, and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-semibold text-foreground">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                            <Mail className="h-4 w-4" />
                          </div>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10 pr-10 h-11 text-sm rounded-xl border-border/80 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
                            autoComplete="email"
                            autoFocus
                            {...field}
                          />
                          {field.value && (
                            <button
                              type="button"
                              onClick={() => form.setValue("email", "")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
                              aria-label="Clear email"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-medium text-destructive" />
                    </FormItem>
                  )}
                />

                {/* Info Note */}
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/60 border border-border/50 text-xs text-muted-foreground leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    We protect your privacy. A password reset link will only be sent if an account exists for this email address.
                  </span>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all gap-2 bg-[#134587] hover:bg-[#0B2239] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {/* Back to Login Footer Link */}
            <div className="pt-2 flex items-center justify-between text-xs sm:text-sm text-muted-foreground border-t border-border/60">
              <span>Remember your password?</span>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-semibold hover:underline transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-6 text-left"
          >
            {/* Header Success Badge */}
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Check your inbox
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  We've sent a password reset link to:
                </p>
              </div>

              {/* Submitted Email Badge with Edit action */}
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-muted/80 border border-border/70">
                <div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-semibold text-sm text-foreground truncate">
                    {submittedEmail}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleEditEmail}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline shrink-0 p-1 rounded hover:bg-background/60 transition-colors"
                  title="Edit email address"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Change</span>
                </button>
              </div>
            </div>

            {/* Instruction Steps */}
            <div className="space-y-3 p-4 rounded-xl bg-background border border-border/80 shadow-sm text-xs sm:text-sm space-y-2.5">
              <p className="font-semibold text-foreground text-xs uppercase tracking-wider text-muted-foreground">
                Next Steps:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    1
                  </span>
                  <span>
                    Open the email from <strong>Logira LMS</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    2
                  </span>
                  <span>
                    Click the <strong>"Reset Password"</strong> link (valid for 15 minutes).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    3
                  </span>
                  <span>
                    Can't find it? Be sure to check your <strong>spam or junk folder</strong>.
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Email Launcher Button (if webmail provider matches) */}
            {emailProvider && (
              <a
                href={emailProvider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition-all"
              >
                <span>Open {emailProvider.name}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* Actions: Resend & Back to Login */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span>Didn't get the email?</span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResend}
                  disabled={countdown > 0 || isResending}
                  className="w-full sm:w-auto h-9 text-xs font-medium rounded-lg gap-2 border-border/80 shadow-none"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Resending...</span>
                    </>
                  ) : countdown > 0 ? (
                    <>
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>Resend in {countdown}s</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 text-primary" />
                      <span>Resend Email</span>
                    </>
                  )}
                </Button>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={() => router("/auth/login")}
                className="w-full h-11 rounded-xl text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Sign In</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
