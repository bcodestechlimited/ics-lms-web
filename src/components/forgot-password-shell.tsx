import {useForgotPassword} from "@/hooks/useAuth";
import {ForgotPasswordSchema} from "@/schema/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {Loader2} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {useLocation, useNavigate} from "react-router";

export function ForgotPasswordForm() {
  const router = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const disabled = searchParams.get("disabled") === "true";
  const emailParam = searchParams.get("email") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const forgotPassword = useForgotPassword();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: emailParam,
    },
  });

  function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    setIsLoading(true);
    try {
      toast.promise(forgotPassword.mutateAsync(values.email), {
        loading: "Sending reset link...",
        success: (res) => {
          if (!res.success) return "Invalid credentials";
          setIsLoading(false);
          setShowSuccessDialog(true);
          return "Reset link sent successfully";
        },
        error: (res) => {
          setIsLoading(false);
          return (
            res?.response?.data?.message || "Reset link failed, Try again."
          );
        },
      });
    } catch {
      setIsLoading(false);
      return;
    }
  }

  const handleContinue = () => {
    setShowSuccessDialog(false);
    router("/login");
  };

  useEffect(() => {
    if (disabled) {
      form.setValue("email", emailParam);
    }
  }, [disabled, emailParam, form]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="bg-[#134587] w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="z-[99999]">
            <DialogHeader>
              <DialogTitle>Check your email</DialogTitle>
              <DialogDescription className="pt-2">
                We've sent a password reset link to your email address. Please
                check your inbox and follow the instructions to reset your
                password.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={handleContinue}
              className="w-full mt-4 bg-[#134587] hover:bg-[#134587]/90"
            >
              Continue to Login
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
