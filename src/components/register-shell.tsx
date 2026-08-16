import { useRegister } from "@/hooks/useAuth";
import { registerSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import PasswordInput from "./password-input-field";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export function RegisterShell() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      telephone: "",
    },
  });
  const register = useRegister();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    const payload = {
      email: values.email.toLowerCase().trim(),
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      telephone: values.telephone,
    };

    try {
      const res = await register.mutateAsync(payload);
      if (res.success) {
        setIsLoading(false);
        setShowSuccessDialog(true);
        form.reset();
      } else {
        setIsLoading(false);
        toast.error("Invalid credentials provided");
      }
    } catch {
      setIsLoading(false);
    }
  }

  const handleLoginRedirect = () => {
    setShowSuccessDialog(false);
    navigate("/auth/login");
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm font-medium">First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="First Name" className="h-10 text-sm" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm font-medium">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Last Name" className="h-10 text-sm" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} className="h-10 text-sm" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm font-medium">Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Telephone" className="h-10 text-sm" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm font-medium">Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} label="" placeholder="Create a password" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button className="bg-[#134587] hover:bg-[#0e3568] w-full h-10 text-sm font-medium mt-2" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="animate-spin text-white h-4 w-4" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Account Created Successfully</AlertDialogTitle>
            <AlertDialogDescription>
              Your account has been created. Please check your email to verify
              your account before logging in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleLoginRedirect}
              className="bg-[#134587]"
            >
              Continue to Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
