import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useResetPassword} from "@/hooks/useAuth";
import {ResetPasswordSchema} from "@/schema/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router";
import {toast} from "sonner";
import {z} from "zod";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const resetPassword = useResetPassword();
  const [resetSuccess, setResetSuccess] = useState(false);
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
      error: () => {
        return "An error occured! Try again.";
      },
    });
  }

  const handleRedirectToLogin = () => {
    window.location.href = "/auth/login";
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
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
            <a href="/login" className="text-primary hover:underline">
              Login here
            </a>
          </p>
        </CardFooter>
      </Card>

      {/* alert */}
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
    </div>
  );
};

export default ResetPasswordPage;
