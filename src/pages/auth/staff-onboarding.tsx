import PasswordInput from "@/components/password-input-field";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {useStaffOnboarding} from "@/hooks/useAuth";
import {PasswordFormValues, passwordSchema} from "@/schema/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router";
import {toast} from "sonner";

const StaffOnboarding = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onboardStaff = useStaffOnboarding();

  const onSubmit = async (values: PasswordFormValues) => {
    setError(null);
    setIsLoading(true);
    if (!token || !email) {
      toast.error("Invalid token or email");
      return;
    }
    const payload = {
      email: decodeURIComponent(email as string),
      token: token as string,
      password: values.currentPassword,
      newPassword: values.newPassword,
    };
    try {
      toast.promise(onboardStaff.mutateAsync(payload), {
        loading: "Updating password...",
        success: (res) => {
          setIsLoading(false);
          if (!res.success) {
            return "Invalid credentials";
          }

          navigate("/auth/login");
          return "Onboarding successful";
        },
        error: (res) => {
          setIsLoading(false);
          return res?.response?.data?.message || "Onboarding failed";
        },
      });
    } catch {
      setIsLoading(false);
      setError(
        "Failed to update password. Please check your current password."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/assets/image/logo.svg"
            className="h-[70px] mb-4"
            alt="Company Logo"
          />
          <h1 className="text-2xl font-semibold mb-2">Welcome to Logira LMS</h1>
          <p className="text-gray-600 text-center">
            Please update your password to complete your account setup
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Temporary Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Enter temporary password"
                      label=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({field}) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      label=""
                      placeholder="Enter new password"
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
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Confirm new password"
                      label=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need help? Contact{" "}
            <a
              href="mailto:learning@icsoutsourcing.com"
              className="text-primary"
            >
              IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffOnboarding;
