import { GenericNavbar } from "@/components/navbar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/hooks/useAuth";
import { ResetPasswordSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const resetPassword = useResetPassword();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const token = searchParams.get("token");

  function onSubmit(data: z.infer<typeof ResetPasswordSchema>) {
    if (!token) {
      return toast.error("Invalid token");
    }
    const payload = {
      newPassword: data.newPassword,
      token: token,
    };
    toast.promise(resetPassword.mutateAsync(payload), {
      loading: "Resetting password",
      success: (res) => {
        if (!res.success) {
          return "Error resetting password.";
        }
        setResetSuccess(true);
        return "Password reset successfully";
      },
      error: (err) => {
        console.log("error", err);
        return "An error occured! Try again.";
      },
    });
  }

  const handleRedirectToLogin = () => {
    window.location.href = "/auth/login";
  };
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <GenericNavbar />
      <main className="h-full flex-1 grid place-items-center overflow-hidden">
        <Card className="w-full max-w-md shadow-none">
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">Reset Password</h1>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            {...field}
                          />
                          <button
                            type="button"
                            aria-label={
                              showNewPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            aria-pressed={showNewPassword}
                            onClick={() => setShowNewPassword((v) => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            {...field}
                          />
                          <button
                            type="button"
                            aria-label={
                              showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            aria-pressed={showConfirmPassword}
                            onClick={() => setShowConfirmPassword((v) => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Remember your password?{" "}
              <a href="/auth/login" className="text-primary hover:underline">
                Login here
              </a>
            </p>
          </CardFooter>
        </Card>

        <AlertDialog open={resetSuccess} onOpenChange={() => {}}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-green-600">
                Password Reset Successful!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                Your password has been reset successfully. Please use your new
                password to log in.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col sm:flex-row sm:justify-center">
              <Button
                onClick={handleRedirectToLogin}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
              >
                Go to Login Page
              </Button>
            </AlertDialogFooter>
            <p className="text-xs text-center text-gray-500 mt-4">
              You can close this window or use the button above to continue.
            </p>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default ResetPasswordPage;
